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

    const mainElements = document.querySelectorAll(".logo_ylb.hidden, .home_text.hidden, .arrow_leaf.hidden, .task-descr img.hidden");

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
const allTextElements = document.querySelectorAll(".task-descr h1, .task-descr p, .task-descr-right p, .titles, .fa-solid, .fa-brands.fa-linkedin, .loc-link, .tel-link, .mail-link, .linkedIn-link");
const allImageElements = document.querySelectorAll(".task-descr img, .carousel-container");

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
    if (index < allTextElements.length) {
        typeEffect(allTextElements[index], 5, () => {
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
        if (entry.isIntersecting) {
            observer.unobserve(entry.target); // Stoppe l'observation après activation
            animateTextElements(); // Démarre l'animation
        }
    });
}, { threshold: 0.1 });

// Lancer l'observation de la section
observer.observe(document.querySelector("#task-descr"));


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
    

    let index = 0;
    const carouselImages = document.querySelector(".carousel-images");
    const images = document.querySelectorAll(".carousel-images img");
    const totalImages = images.length;
    
    // → Largeur du conteneur visible (pas les images)
    const imageWidth = document.querySelector(".carousel-container").offsetWidth;
    let interval;
    
    function moveSlide(direction) {
        clearInterval(interval);
        index += direction;
    
        if (index < 0) {
            index = totalImages - 1;
        } else if (index >= totalImages) {
            index = 0;
        }
    
        updateCarousel();
        startAutoSlide();
    }
    
    function updateCarousel() {
        const newTransformValue = -index * imageWidth;
        carouselImages.style.transform = `translateX(${newTransformValue}px)`;
    }
    
    function startAutoSlide() {
        interval = setInterval(() => {
            moveSlide(1);
        }, 4000);
    }
    
    document.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
    document.querySelector(".next").addEventListener("click", () => moveSlide(1));
    
    startAutoSlide();
    


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
