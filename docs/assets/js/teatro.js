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
        isOverview: false
    };

    // Inicialización
    document.addEventListener("DOMContentLoaded", function () {
        console.log("🎭 Teatro Interactivo: Inicializando...");
        
        // Verificar si impress está cargado
        if (typeof impress === "undefined") {
            console.warn("⚠️ impress.js no detectado. Cargando modo fallback...");
            return;
        }

        // Inicializar impress
        const api = impress();
        api.init();

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
        }
        
        console.log(`🎭 Escena: ${state.currentStep} (Anillo ${state.currentRing})`);
    }

})(document, window);
