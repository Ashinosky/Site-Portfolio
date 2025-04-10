document.addEventListener("DOMContentLoaded", function () {
    console.log("Le script JavaScript est chargé !");

    const navbar = document.querySelector(".navbar");
    const navbarLinks = document.querySelectorAll(".navbar-nav a.hidden_x");
    const logoContainer = document.querySelector(".logo-container");
    
    // Fonction pour gérer le défilement
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
            logoContainer.classList.add("scrolled"); // Ajoute la classe pour rétrécir et déplacer le logo
            navbarLinks.forEach(link => {
                link.classList.add("show_x"); // Ajoute uniquement la classe pour l'opacité
            });
        } else {
            navbar.classList.remove("scrolled");
            logoContainer.classList.remove("scrolled"); // Réinitialise le logo à son état initial
            navbarLinks.forEach(link => {
                link.classList.remove("show_x");
            });
        }
    }
    
    // Écouteur pour détecter le défilement
    window.addEventListener("scroll", handleScroll);

    history.scrollRestoration = "manual";
    
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);

    const menuElements = document.querySelectorAll(".navbar-nav a.hidden_x");

    menuElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add("show_x");
        }, index * 300);
    });

    const mainElements = document.querySelectorAll(".logo_ylb.hidden, .logo.hidden, .home_text.hidden, .arrow_leaf.hidden");

    mainElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add("show");
        }, index * 500);
    });

    const scrollElements = document.querySelectorAll(".hidden_1");

    if (scrollElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        scrollElements.forEach(element => observer.observe(element));
    }

   // Fonction pour l'effet de machine à écrire
function typeEffect(element, speed) {
    const text = element.getAttribute("data-text"); // Récupérer le texte original
    element.innerHTML = ""; // Efface l'ancien texte
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.add("typed"); // Ajoute la classe une fois terminé
        }
    }
    element.style.opacity = "1"; // Rendre visible avant l'animation
    type();
}

// Sélectionne tous les textes concernés
const allTextElements = document.querySelectorAll(".accueil p, .p-skills p, .projets p, .w-exp p, .text-right li, .text-left li, .accueil a, .projets a, .titles, .fa-solid, .loc-link, .tel-link, .mail-link, .linkedIn-link"); // Ajout de tous les textes à l'effet

// Boucle sur tous les textes et initialise l'effet
allTextElements.forEach(element => {
    element.setAttribute("data-text", element.innerHTML); // Sauvegarde du texte
    element.innerHTML = ""; // Efface pour permettre l'effet
    element.style.opacity = "0"; // Caché avant animation
});

// Observer les textes pour déclencher l'animation
const textObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains("typed")) {
            typeEffect(entry.target, 30);
            observer.unobserve(entry.target); // Arrête d'observer après l'animation
        }
    });
}, { threshold: 0.3 }); // Augmenté légèrement

// Activer l'observation
allTextElements.forEach(element => textObserver.observe(element));


    /* Scroll fluide et centré */
    const scrollLinks = document.querySelectorAll('.navbar-nav a, .home_text a');

    scrollLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offset = - 950; // Ajuste cette valeur pour bien centrer

                window.scrollTo({
                    top: targetElement.offsetTop - (window.innerHeight / 2) + (targetElement.clientHeight / 2) - offset,
                    behavior: "smooth"
                });
            }
        });
    });

    let index = 0;
    const carouselImages = document.querySelector(".carousel-images");
    const images = document.querySelectorAll(".carousel-images img");
    const totalImages = images.length;
    const imageWidth = document.querySelector(".carousel-container").offsetWidth + 20; // Largeur + espacement
    let interval;

    function moveSlide(direction) {
        clearInterval(interval); // Arrête temporairement le défilement automatique
        index += direction;

        if (index < 0) {
            index = totalImages - 1; // Revient à la dernière image
        } else if (index >= totalImages) {
            index = 0; // Revient à la première image
        }

        updateCarousel();
        startAutoSlide(); // Relance l'autodéfilement
    }

    function updateCarousel() {
        const newTransformValue = -index * imageWidth;
        carouselImages.style.transform = `translateX(${newTransformValue}px)`;
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            moveSlide(1); // Défile vers la droite toutes les 4 secondes
        }, 4000);
    }
    
    // Ajouter les événements pour les boutons
    document.querySelector(".prev").addEventListener("click", function () {
        moveSlide(-1);
    });

    document.querySelector(".next").addEventListener("click", function () {
        moveSlide(1);
    });

    startAutoSlide(); // Lancer le défilement automatique au chargement


    // Sélectionner les éléments nécessaires
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox .close");

    // Ajouter un événement de clic sur chaque image du carrousel
    document.querySelectorAll(".carousel-images img").forEach(img => {
        img.addEventListener("click", function () {
            lightbox.style.display = "flex"; // Afficher la lightbox
            lightboxImg.src = this.src; // Mettre à jour l'image de la lightbox
            document.body.style.overflow = "hidden"; // Désactiver le défilement de la page
        });
    });

    // Fermer la lightbox lorsqu'on clique sur le bouton de fermeture
    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto"; // Réactiver le défilement de la page
    });

    // Fermer la lightbox lorsqu'on clique en dehors de l'image
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto"; // Réactiver le défilement de la page
        }
    });

});
