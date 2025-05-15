<template>
  <div>
    <button @click="showCreateModal = true" class="btn-ajouter">Créer un créneau</button>

    <vue-cal
        ref="vuecal"
        default-view="week"
        :events="events"
        :editable-events="false"
        :on-event-change="handleEventChange"
        :disable-views="['create']"
        style="height: 600px"
    >
      <template v-slot:event="{ event }">
        <div
            class="event-custom"
            :style="{
      backgroundColor: event.id_activite === idActivite ? '#43aa8b' : '#cccccc',
      color: event.id_activite === idActivite ? 'white' : 'black'
    }"
        >
          <span>{{ event.title }}</span>
          <button class="delete-btn" @click="deleteEvent(event)">✖</button>
        </div>
      </template>
    </vue-cal>

    <div v-if="showCreateModal" class="modal-overlay">
      <div class="modal">
        <h3>Créer un créneau</h3>
        <label>Activité :</label>
        <select v-model="newEvent.idActivite">
          <option v-for="act in activites" :key="act.id_activite" :value="act.id_activite">
            {{ act.nom_activite }}
          </option>
        </select>

        <label>Titre :</label>
        <input type="text" v-model="newEvent.title" />

        <label>Date de début :</label>
        <input type="datetime-local" v-model="newEvent.start" />

        <label>Date de fin :</label>
        <input type="datetime-local" v-model="newEvent.end" />

        <button @click="createEvent">Ajouter</button>
        <button @click="showCreateModal = false">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import calendrierService from '@/services/calendrier.service';
import { getActivitesByPrestataire } from '@/services/activite.service';

export default {
  name: 'AfficherCreneaux',
  components: { VueCal },
  props: {
    idActivite: {
      type: Number,
      required: true
    },
    idPrestataire: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      events: [],
      activites: [],
      showCreateModal: false,
      newEvent: { idActivite: null, title: '', start: '', end: '' }
    };
  },
  async mounted() {
    try {
      const res = await getActivitesByPrestataire(this.idPrestataire);
      this.activites = res;
      await this.loadEvents();
    } catch (err) {
      console.error('Erreur lors du chargement des activités :', err);
    }
  },
  methods: {
    async loadEvents() {
      this.events = [];
      for (const act of this.activites) {
        const creneaux = await calendrierService.getCreneauxByActivite(act.id_activite);
        this.events.push(...creneaux.map(c => ({
          ...c,
          idActivite: act.id_activite, // ← ceci règle le souci
          start: new Date(c.start),
          end: new Date(c.end),
          class: act.id_activite === this.idActivite ? 'event-green' : 'event-default',
          content: c.title
        })));
      }
    },
    getColor(id) {
      const palette = ['#f94144', '#f3722c', '#43aa8b', '#577590', '#f9c74f'];
      return palette[id % palette.length];
    },
    async createEvent() {
      const event = {
        id: `new-${Date.now()}`,
        ...this.newEvent,
        start: new Date(this.newEvent.start),
        end: new Date(this.newEvent.end),
        background: this.getColor(this.newEvent.idActivite),
        content: this.newEvent.title,
        title: this.newEvent.title
      };
      try {
        await calendrierService.syncCreneauxForActivite(event.idActivite, {
          added: [event], modified: [], deleted: []
        });
        this.events.push(event);
        this.showCreateModal = false;
        this.resetForm();
      } catch (e) {
        alert("Erreur lors de la création du créneau");
      }
    },
    resetForm() {
      this.newEvent = { idActivite: null, title: '', start: '', end: '' };
    },
    async handleEventChange(event) {
      const confirmMove = confirm(`Déplacer le créneau "${event.title}" ?`);
      if (!confirmMove) {
        await this.loadEvents();
        return;
      }
      const movedEvent = {
        ...event,
        start: new Date(event.start).toISOString(),  // format ISO pour .split('T')
        end: new Date(event.end).toISOString(),
        id: event.id,
        idActivite: event.idActivite || event.id_activite
      };

      try {
        await calendrierService.syncCreneauxForActivite(movedEvent.idActivite, {
          added: [],
          modified: [movedEvent],
          deleted: []
        });
      } catch (e) {
        alert("Erreur lors du déplacement");
        await this.loadEvents();
      }
    },
    async deleteEvent(event) {
      const confirmDelete = confirm(`Supprimer le créneau "${event.title}" ?`);
      if (!confirmDelete) return;

      try {
        await calendrierService.syncCreneauxForActivite(event.idActivite || event.id_activite, {
          added: [], modified: [], deleted: [event.id]
        });
        this.events = this.events.filter(e => e.id !== event.id);
      } catch (e) {
        alert("Erreur lors de la suppression");
      }
    }
  }
};
</script>

<style>
.event-green {
  background-color: #43aa8b !important;
  color: white;
  padding: 4px;
  border-radius: 4px;
}

.event-default {
  background-color: #cccccc !important;
  color: black;
  padding: 4px;
  border-radius: 4px;
}

.btn-ajouter {
  margin-bottom: 1rem;
  padding: 10px 15px;
  font-weight: bold;
  background: #43aa8b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.event-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
}

.delete-btn {
  background: none;
  border: none;
  color: black;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  min-width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
