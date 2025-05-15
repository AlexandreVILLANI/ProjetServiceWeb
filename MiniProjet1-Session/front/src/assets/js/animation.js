class Utils {
    // Méthode pour vérifier si un élément est visible dans la fenêtre
    isElementInView(element, fullyInView) {
        const elementRect = element.getBoundingClientRect(); // Obtenir les dimensions de l'élément
        const pageTop = 0; // Le haut de la fenêtre
        const pageBottom = window.innerHeight; // Le bas de la fenêtre

        const elementTop = elementRect.top;
        const elementBottom = elementRect.bottom;

        if (fullyInView) {
            // Complètement visible dans la fenêtre
            return elementTop >= pageTop && elementBottom <= pageBottom;
        } else {
            // Partiellement visible
            return elementBottom >= pageTop && elementTop <= pageBottom;
        }
    }
}

// Fonction pour gérer l'animation des éléments
function addFadeIn(repeat) {
    const elementsToFadeIn = document.querySelectorAll('.will-fadeIn'); // Sélectionner les éléments

    elementsToFadeIn.forEach((element, index) => {
        const utils = new Utils();
        const isElementInView = utils.isElementInView(element, false);

        if (isElementInView) {
            if (!element.classList.contains('fadeInRight') && !element.classList.contains('fadeInLeft')) {
                if (index % 2 === 0) {
                    element.classList.add('fadeInRight'); // Ajouter classe fadeInRight
                } else {
                    element.classList.add('fadeInLeft'); // Ajouter classe fadeInLeft
                }
            }
        } else if (repeat) {
            element.classList.remove('fadeInRight');
            element.classList.remove('fadeInLeft');
        }
    });
}

// Initialisation des événements
window.addEventListener('load', () => {
    addFadeIn(false); // Ajouter les animations au chargement
});

window.addEventListener('scroll', () => {
    addFadeIn(true); // Gérer les animations au scroll
});

export default {
    Utils,
    addFadeIn
};
