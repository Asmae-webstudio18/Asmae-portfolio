const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

function closeMenu() {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
    );
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

const yearElement = document.getElementById("current-year");

yearElement.textContent = new Date().getFullYear();

const animatedElements = document.querySelectorAll(
    ".service-card, .about-content, .value-item, " +
    ".testimonial-card, .contact-info, .contact-form"
);

if ("IntersectionObserver" in window) {
    document.body.classList.add("js-ready");

    animatedElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    animatedElements.forEach((element) => {
        observer.observe(element);
    });
}

const pageSections = document.querySelectorAll(
    "main section[id]"
);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    document.querySelectorAll(".nav-link").forEach((link) => {
                        const isActive =
                            link.getAttribute("href") ===
                            "#" + entry.target.id;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -65% 0px"
        }
    );

    pageSections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

const bookingForm = document.getElementById("booking-form");
const formStatus = document.getElementById("form-status");

const whatsappNumber = "34612345678";

bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) {
        return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const message = document.getElementById("message").value.trim();

    const whatsappMessage = [
        "¡Hola! Me gustaría solicitar una cita en Rose Beauty Studio.",
        "",
        "Nombre: " + name,
        "Teléfono: " + (phone || "No indicado"),
        "Tratamiento: " + service,
        "Fecha preferida: " + (date || "Por concretar"),
        "Mensaje: " + (message || "Sin comentarios")
    ].join("\n");

    const whatsappURL =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(whatsappMessage);

    formStatus.textContent =
        "Se abrirá WhatsApp para que puedas revisar y enviar tu solicitud.";

    const whatsappWindow = window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

    if (!whatsappWindow) {
        formStatus.textContent =
            "Si no se abre WhatsApp, revisa si tu navegador ha bloqueado la ventana emergente.";
    }
});
