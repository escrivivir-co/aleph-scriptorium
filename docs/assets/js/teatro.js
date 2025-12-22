/*
 * Teatro Interactivo - Aleph Scriptorium
 * Controlador de visualización 3D basado en impress.js
 * 
 * Mapea los 12 estadios del monomito a 3 anillos concéntricos:
 * - Anillo 0: Inicio (Centro)
 * - Anillo 1: Partida (Estadios 1-4)
 * - Anillo 2: Iniciación (Estadios 5-8)
 * - Anillo 3: Retorno (Estadios 9-12)
 */

(function (document, window) {
    'use strict';

    // Configuración de anillos (radios en px)
    const RINGS = {
        0: 0,
        1: 1000,
        2: 2000,
        3: 3000
    };

    // Estado del teatro
    const state = {
        currentRing: 0,
        currentStep: null,
        isOverview: false,
        api: null
    };

    // Inicialización robusta (BUG-002 fix)
    function initImpress() {
        console.log("🎭 Teatro Interactivo: Inicializando...");
        
        // Verificar si impress está cargado como función
        if (typeof impress !== "function") {
            console.error("❌ impress.js no disponible como función. Activando modo fallback.");
            activateFallbackMode();
            return false;
        }

        try {
            // Inicializar impress
            state.api = impress();
            state.api.init();
            console.log("✅ impress.js inicializado correctamente");
            return true;
        } catch (error) {
            console.error("❌ Error al inicializar impress.js:", error);
            activateFallbackMode();
            return false;
        }
    }

    // Modo fallback: navegación lineal sin 3D
    function activateFallbackMode() {
        document.body.classList.add('fallback-mode');
        document.body.classList.remove('impress-not-supported');
        
        // Hacer visible el índice lateral siempre
        const index = document.querySelector('.theater-index');
        if (index) {
            index.classList.add('active');
            index.style.transform = 'translateX(0)';
        }
        
        // Mostrar todos los pasos secuencialmente
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, i) => {
            step.style.position = 'relative';
            step.style.opacity = '1';
            step.style.transform = 'none';
            step.style.marginBottom = '40px';
        });
        
        console.log("📄 Modo fallback activado: navegación lineal");
    }

    // Inicialización al cargar DOM
    document.addEventListener("DOMContentLoaded", function () {
        if (!initImpress()) return;
        
        const api = state.api;

        // Configurar controles
        setupControls(api);
        setupRingSlider(api);
        setupMiniMap(api);

        // Escuchar eventos de paso
        document.addEventListener("impress:stepenter", function (event) {
            updateState(event.target);
        });
    });

    function setupControls(api) {
        // Teclas adicionales si son necesarias
        document.addEventListener("keyup", function (event) {
            if (event.key === "o" || event.key === "O") {
                api.goto("overview");
            }
        });
    }

    function setupRingSlider(api) {
        const slider = document.getElementById("ring-slider");
        if (!slider) return;

        slider.addEventListener("input", function (event) {
            const ring = parseInt(event.target.value);
            focusRing(api, ring);
        });
    }

    function setupMiniMap(api) {
        const links = document.querySelectorAll(".theater-index a");
        links.forEach(link => {
            link.addEventListener("click", function(e) {
                // Dejar que impress maneje el hash change
            });
        });
    }

    function focusRing(api, ringIndex) {
        // Buscar el primer paso de ese anillo
        // Convención: id="step-{estadio}"
        // Anillo 0: step-0 (o inicio)
        // Anillo 1: step-1
        // Anillo 2: step-5
        // Anillo 3: step-9
        
        let targetStep = "overview";
        
        switch(ringIndex) {
            case 0: targetStep = "step-1"; break; // Inicio
            case 1: targetStep = "step-2"; break; // Partida
            case 2: targetStep = "step-6"; break; // Iniciación
            case 3: targetStep = "step-10"; break; // Retorno
        }
        
        api.goto(targetStep);
    }

    function updateState(stepElement) {
        state.currentStep = stepElement.id;
        
        // Actualizar UI del slider si existe
        const ring = stepElement.dataset.ring;
        if (ring) {
            state.currentRing = parseInt(ring);
            const slider = document.getElementById("ring-slider");
            if (slider) slider.value = state.currentRing;
            
            // Actualizar label del anillo
            const label = document.getElementById("ring-label");
            if (label) label.textContent = state.currentRing;
        }
        
        // Sincronizar índice lateral (marcar elemento activo)
        syncSidebarIndex(stepElement.id);
        
        console.log(`🎭 Escena: ${state.currentStep} (Anillo ${state.currentRing})`);
    }

    function syncSidebarIndex(stepId) {
        // Quitar clase active de todos
        const items = document.querySelectorAll('.theater-index li');
        items.forEach(item => item.classList.remove('active'));
        
        // Añadir clase active al elemento correspondiente
        const activeItem = document.querySelector(`.theater-index li[data-step="${stepId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            // Scroll suave al elemento si está fuera de vista
            activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Mostrar índice lateral al hover en el borde derecho
    document.addEventListener('mousemove', function(e) {
        const index = document.querySelector('.theater-index');
        if (!index) return;
        
        // Si el cursor está en los últimos 50px de la derecha, mostrar
        if (window.innerWidth - e.clientX < 50) {
            index.classList.add('active');
        } else if (window.innerWidth - e.clientX > 300) {
            // Si está lejos, ocultar
            index.classList.remove('active');
        }
    });

})(document, window);
