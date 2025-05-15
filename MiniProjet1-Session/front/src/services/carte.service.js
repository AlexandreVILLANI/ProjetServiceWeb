import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import store from '@/store';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

let map = null;
let markerInstances = [];
let drawnItems = null;
let drawControl = null;



function initMap(containerId) {
    const bounds = L.latLngBounds(
        L.latLng(47.636579, 6.859607),
        L.latLng(47.640521, 6.867641),
    );

    map = L.map(containerId, {
        maxBoundsViscosity: 1.0,
    }).setView([47.637826, 6.863494], 16);

    map.setMaxBounds(bounds);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 17,
        maxZoom: 21,
    }).addTo(map);

    drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    loadZonesOnMap();

    store.dispatch('carte/loadMarkers').then(() => {
        loadMarkersOnMap();
    });
    store.dispatch('carte/loadZones').then(() => {
        loadZonesOnMap();
    });

    map.on('click', onMapClick);

    loadMarkersOnMap();
    loadZonesOnMap();
}


function loadMarkersOnMap() {
    markerInstances.forEach(marker => map.removeLayer(marker));
    markerInstances = [];

    const state = store.state.carte;
    let markersToDisplay = [];

    if (state.isAdminMode || state.isPrestataireMode) {
        markersToDisplay = state.markers;
    } else {
        markersToDisplay = state.markers.filter(marker => marker.status === 'valide');
    }

    markersToDisplay.forEach((marker, index) => {
        const iconColor = marker.status === 'en_attente' ? 'red' : 'black';
        const customIcon = L.icon({
            iconUrl: require(`@/assets/restaurant-icon-${iconColor}.svg`),
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
        });

        const markerInstance = L.marker(marker.latLng, { icon: customIcon }).addTo(map);
        const popupContent = createPopupContent(marker.name, marker.description, index, marker.status);
        markerInstance.bindPopup(popupContent);

        markerInstance.on('mouseover', function () {
            this.openPopup();  // Ouvre le popup lorsque le marqueur est survolé
        });

        markerInstance.on('mouseout', function () {
            setTimeout(() => {
                this.closePopup();
            }, 1000);
        });

        markerInstances.push(markerInstance);
    });
}






function onMapClick(e) {
    if (!store.state.carte.isAddingPrestation) return;

    const latlng = e.latlng;

    // Vérifiez si le point est dans une zone autorisée
    if (store.state.carte.isAdminMode || isPointInZones(latlng)) {
        store.commit('carte/SET_TEMP_LATLNG', latlng);
        store.commit('carte/TOGGLE_ADD_PRESTATION', false);
        store.commit('carte/SHOW_FORM', true);
    } else {
        alert("Vous ne pouvez ajouter une prestation que dans les zones définies par l'administrateur.");
    }
}


function createPopupContent(name, description, index, status) {
    const statusLabel = status === 'en_attente' ? 'En attente de validation' : 'Validée';

    if (store.state.carte.isAdminMode) {
        // Admin : affiche le bouton de validation si nécessaire
        const validationButton = status === 'en_attente'
            ? `<button onclick="window.validateMarker(${index})">Valider</button>`
            : '';

        return `
          <div>
            <b>${name}</b><br />
            ${description}<br />
            <i>${statusLabel}</i><br />
            ${validationButton}
            <button onclick="window.deleteMarker(${index})">Supprimer</button>
          </div>`;
    }

    return `
      <div>
        <b>${name}</b><br />
        ${description}<br />
        <i>${statusLabel}</i>
      </div>`;

}


window.deleteMarker = (index) => {
    store.dispatch('carte/deleteMarker', index);
    reloadMapMarkers();
};
window.validateMarker = (index) => {
    store.dispatch('carte/validateMarker', index)
        .then(() => {
            console.log('Marqueur validé et sauvegardé.');
            reloadMapMarkers(); // Recharge les marqueurs pour mettre à jour la carte
        })
        .catch((error) => {
            console.error('Erreur lors de la validation du marqueur :', error);
        });
};


function updateMarkerPopups() {
    store.state.carte.markers.forEach((marker, index) => {
        const markerInstance = markerInstances[index];
        if (markerInstance) {
            const popupContent = createPopupContent(
                marker.name,
                marker.description,
                index,
                marker.status
            );
            markerInstance.getPopup().setContent(popupContent);
        }
    });
}

function reloadMapMarkers() {
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) map.removeLayer(layer);
    });
    loadMarkersOnMap();
}

function addDrawingTools() {
    if (!map || !drawnItems) {
        console.error('La carte ou le groupe drawnItems n’est pas initialisé.');
        return;
    }

    drawControl = new L.Control.Draw({
        draw: {
            polygon: {
                allowIntersection: false,
                showArea: true,
                shapeOptions: {
                    color: '#ff0000',
                },
            },
            polyline: false,
            rectangle: false,
            circle: false,
            marker: false,
        },
        edit: {
            featureGroup: drawnItems,
        },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, onPolygonCreated);

    map.on('draw:deleted', (e) => {
        const layers = e.layers;

        layers.eachLayer(layer => {
            removeZoneFromStore(layer);
        });

        loadZonesOnMap();
        store.dispatch('carte/saveZones');
    });
}


function removeZoneFromStore(layer) {
    const latlngs = layer.getLatLngs();

    const zones = store.state.carte.zones;

    const indexToRemove = zones.findIndex(zone => {
        const zoneLatLngs = Array.isArray(zone.latlngs[0])
            ? zone.latlngs.map(group => group.map(coord => [coord.lat, coord.lng]))
            : zone.latlngs.map(coord => [coord.lat, coord.lng]);

        const layerLatLngs = Array.isArray(latlngs[0])
            ? latlngs.map(group => group.map(coord => [coord.lat, coord.lng]))
            : latlngs.map(coord => [coord.lat, coord.lng]);

        return JSON.stringify(zoneLatLngs) === JSON.stringify(layerLatLngs);
    });

    if (indexToRemove !== -1) {
        store.commit('carte/REMOVE_ZONE', indexToRemove);
    } else {
        console.warn('Aucune correspondance trouvée pour la zone supprimée.');
    }
}


function removeDrawingTools() {
    if (!map || !drawnItems) {
        console.error("La carte ou 'drawnItems' n'est pas initialisé.");
        return;
    }

    if (drawControl) {
        map.removeControl(drawControl);
        drawControl = null;
    }

    console.log("Outils de dessin supprimés, zones existantes préservées.");
}





function onPolygonCreated(e) {
    const layer = e.layer;

    const latlngs = layer.getLatLngs().map(latlng => {
        if (Array.isArray(latlng)) {
            return latlng.map(ll => ({ lat: ll.lat, lng: ll.lng }));
        }
        return { lat: latlng.lat, lng: latlng.lng };
    });

    const zone = {
        latlngs,
        color: '#ff0000',
    };

    store.dispatch('carte/addZone', zone);

    layer.addTo(drawnItems);

    loadZonesOnMap();
}
function loadZonesOnMap() {
    if (!drawnItems) {
        console.error('drawnItems non initialisé.');
        return;
    }

    drawnItems.clearLayers();

    const zones = store.state.carte.zones;

    zones.forEach(zone => {
        try {
            const latlngs = Array.isArray(zone.latlngs[0])
                ? zone.latlngs.map(group => group.map(coord => [coord.lat, coord.lng]))
                : zone.latlngs.map(coord => [coord.lat, coord.lng]);

            const polygon = L.polygon(latlngs, { color: zone.color });
            polygon.addTo(drawnItems); // Ajoutez au groupe drawnItems
        } catch (error) {
            console.error('Erreur lors du chargement des zones :', error);
        }
    });
}

function isPointInZones(latlng) {
    if (!drawnItems) {
        console.error("drawnItems n'est pas initialisé.");
        return false;
    }

    const layers = drawnItems.getLayers();
    for (const layer of layers) {
        if (layer instanceof L.Polygon) { // Vérifiez si c'est un polygone
            if (layer.getBounds().contains(latlng)) { // Vérifiez si le point est dans les limites
                return true;
            }
        }
    }
    return false;
}


export {
    initMap,
    loadMarkersOnMap,
    onMapClick,
    createPopupContent,
    updateMarkerPopups,
    reloadMapMarkers,
    addDrawingTools,
    removeDrawingTools,
    onPolygonCreated,
    loadZonesOnMap,
    drawnItems
};
