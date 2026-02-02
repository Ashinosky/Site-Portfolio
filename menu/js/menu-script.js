document.addEventListener("DOMContentLoaded", function () {
    console.log("Le script JavaScript est chargé !");

    
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

    const mainElements = document.querySelectorAll(".logo_ylb.hidden, .home_text.hidden, .arrow_leaf.hidden, .menu-container");

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



    // Sélectionne tous les textes et images concernés
    const allTextElements = document.querySelectorAll(".titles, .intro p, .fa-solid, .fa-brands.fa-linkedin, .loc-link, .tel-link, .mail-link, .linkedIn-link");
    const allImageElements = document.querySelectorAll(".selection"); 

    // Masquer les textes et images au départ
    allTextElements.forEach(element => {
        element.setAttribute("data-text", element.innerHTML); // Sauvegarde du texte
        element.innerHTML = ""; // Efface pour permettre l'effet
        element.style.opacity = "0"; // Caché avant animation
    });

    allImageElements.forEach(image => {
        image.style.opacity = "0"; // Cache les images
        image.style.transform = "translateY(20px)"; // Déplacement léger
        image.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"; // Animation fluide
    });

    // Fonction d'animation de texte (machine à écrire)
    function typeEffect(element, speed, callback) {
        const text = element.getAttribute("data-text");
        let i = 0;
        element.innerHTML = ""; // Nettoie l'élément

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback(); // Passe au texte suivant
            }
        }
        element.style.opacity = "1"; // Rend visible
        type();
    }

    // Fonction pour animer les textes un par un
    function animateTextElements(index = 0) {
        console.log("Animation de texte en cours...");
        if (index < allTextElements.length) {
            typeEffect(allTextElements[index], 10, () => {
                setTimeout(() => animateTextElements(index + 1)); // Pause avant le suivant
            });
        } else {
            showImages(); // Une fois les textes finis, afficher les images
        }
    }

    // Fonction pour afficher les images après le texte
    function showImages() {
        allImageElements.forEach((image, i) => {
            setTimeout(() => {
                image.style.opacity = "1";
                image.style.transform = "translateY(0)";
            }, i * 100); // Affichage progressif des images
        });
    }

    // Observer la section et lancer l'animation au bon moment
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            console.log("Intersection détectée:", entry.target);
            if (entry.isIntersecting) {
                console.log("Element visible:", entry.target);
                observer.unobserve(entry.target); // Stoppe l'observation après activation
                animateTextElements(); // Démarre l'animation
            }
        });
    }, { threshold: 0.1 });

    // 🔽 🔽 C'est ICI que tu ajoutes ça :
    const introSection = document.querySelector("#intro");
    if (introSection) {
        observer.observe(introSection);
    }

    /* Scroll fluide et centré */
    const scrollLinks = document.querySelectorAll('.navbar-nav a, .home_text a');

    scrollLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
    
            // Si c'est un lien vers une section interne (avec un #)
            if (targetId.startsWith("#")) {
                event.preventDefault();
    
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = -350;
    
                    window.scrollTo({
                        top: targetElement.offsetTop - (window.innerHeight / 2) + (targetElement.clientHeight / 2) - offset,
                        behavior: "smooth"
                    });
                }
            }
            // Sinon (vers une autre page), on laisse le lien fonctionner normalement
        });
    });
    
    const menuToggle = document.querySelector(".menu-toggle");
    const menuClose = document.querySelector(".menu-close");
    const navbarNav = document.querySelector(".navbar-nav");
    const body = document.body;
    const navbar = document.querySelector(".navbar"); // Ajout de la sélection de la navbar

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

    // Gérer le clic sur les liens du menu
    const menuLinks = document.querySelectorAll(".navbar-nav a");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            console.log(`Lien cliqué : ${link.getAttribute("href")}`); // Affiche le lien cliqué dans la console

            // Fermer le menu après un clic sur un lien
            navbar.classList.remove("fullscreen");
            navbarNav.classList.remove("show");
            body.classList.remove("blurred");
            menuToggle.style.display = "block";
            menuClose.style.display = "none";
        });
    });

    // Gestion du bouton scroll to top
    const scrollToTopBtn = document.getElementById("scrollToTop");

    // Afficher/cacher le bouton selon la position du scroll
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    // Remonter en haut au clic
    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});
