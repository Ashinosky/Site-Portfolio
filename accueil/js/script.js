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

    
    const menuToggle = document.querySelector(".menu-toggle");
    const menuClose = document.querySelector(".menu-close");
    const navbarNav = document.querySelector(".navbar-nav");
    const body = document.body;

    // Gérer le clic sur le bouton menu-toggle
    menuToggle.addEventListener("click", () => {
        navbar.classList.add("fullscreen"); // La navbar prend toute la page
        navbarNav.classList.add("show"); // Affiche les liens
        body.classList.add("blurred"); // Désactive le défilement
        menuToggle.style.display = "none"; // Cache le bouton hamburger
        menuClose.style.display = "block"; // Affiche le bouton de fermeture
    });

    // Gérer le clic sur le bouton de fermeture
    menuClose.addEventListener("click", () => {
        navbar.classList.remove("fullscreen"); // Réduit la navbar
        navbarNav.classList.remove("show"); // Cache les liens
        body.classList.remove("blurred"); // Réactive le défilement
        menuToggle.style.display = "block"; // Affiche le bouton hamburger
        menuClose.style.display = "none"; // Cache le bouton de fermeture
    });

    // Fonction pour fermer le menu
    function closeMenu() {
        navbar.classList.remove("fullscreen"); // Réduit la navbar
        navbarNav.classList.remove("show"); // Cache les liens
        body.classList.remove("blurred"); // Réactive le défilement
        menuToggle.style.display = "block"; // Affiche le bouton hamburger
        menuClose.style.display = "none"; // Cache le bouton de fermeture
    }

    // Gérer le clic sur les liens du menu
    const menuLinks = document.querySelectorAll(".navbar-nav a");
    menuLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Empêche la navigation par défaut
            console.log(`Lien cliqué : ${link.getAttribute("href")}`); // Affiche le lien cliqué dans la console

            // Fermer le menu après un clic sur un lien
            navbar.classList.remove("fullscreen");
            navbarNav.classList.remove("show");
            body.classList.remove("blurred");
            menuToggle.style.display = "block";
            menuClose.style.display = "none";
        });
    });

});
