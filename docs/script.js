
console.log("Portfolio de Asmae cargado correctamente");

document.documentElement.classList.add("js");

const secciones = document.querySelectorAll("main section");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
        (entradas, observer) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observer.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    secciones.forEach((seccion) => {
        seccion.classList.add("animada");
        observador.observe(seccion);
    });
} else {
    secciones.forEach((seccion) => {
        seccion.classList.add("visible");
    });
}

const botonContacto = document.querySelector("#contacto .boton");

if (botonContacto) {
    botonContacto.addEventListener("click", () => {
        console.log("Se ha pulsado el botón de contacto");
    });
}