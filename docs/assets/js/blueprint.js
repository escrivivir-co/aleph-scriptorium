/*
 * Aleph Scriptorium - Blueprint Visual Index
 * Controlador JavaScript para navegación impress.js
 * SCRIPT-1.25.0
 */

(function (document, window) {
    'use strict';

    // Estado de la presentación
    const state = {
        api: null,
        currentSlide: 1,
        totalSlides: 7,
        isOverview: false
    };

    /**
     * Inicialización robusta de impress.js
     */
    function initBlueprint() {
        console.log("📐 Blueprint Visual Index: Inicializando...");
        
        // Verificar si impress está disponible
        if (typeof window.impress !== "function") {
            console.warn("⚠️ impress.js no disponible. Activando modo fallback.");
            activateFallbackMode();
            return false;
        }

        // Verificar contenedor #impress
        const impressRoot = document.getElementById('impress');
        if (!impressRoot) {
            console.error("❌ Contenedor #impress no encontrado.");
            activateFallbackMode();
            return false;
        }

        try {
            state.api = window.impress('impress');
            state.api.init();
            console.log("✅ Blueprint inicializado correctamente");
            
            document.body.classList.remove('impress-not-supported');
            document.body.classList.add('impress-supported');
            
            // Contar slides
            const steps = document.querySelectorAll('.step');
            state.totalSlides = steps.length;
            updateProgress();
            
            return true;
        } catch (error) {
            console.error("❌ Error al inicializar:", error.message);
            activateFallbackMode();
            return false;
        }
    }

    /**
     * Modo fallback: navegación lineal sin 3D
     */
    function activateFallbackMode() {
        document.body.classList.add('fallback-mode');
        document.body.classList.remove('impress-not-supported');
        
        // Mostrar todos los pasos secuencialmente
        const steps = document.querySelectorAll('.step');
        steps.forEach((step) => {
            step.style.position = 'relative';
            step.style.opacity = '1';
            step.style.transform = 'none';
            step.classList.add('active');
        });
        
        console.log("📄 Modo fallback activado: scroll lineal");
    }

    /**
     * Actualizar indicador de progreso
     */
    function updateProgress() {
        const current = document.getElementById('current-slide');
        const total = document.getElementById('total-slides');
        
        if (current) current.textContent = state.currentSlide;
        if (total) total.textContent = state.totalSlides;
    }

    /**
     * Manejar cambio de slide
     */
    function onStepEnter(event) {
        const step = event.target;
        const steps = Array.from(document.querySelectorAll('.step'));
        state.currentSlide = steps.indexOf(step) + 1;
        state.isOverview = step.id === 'overview';
        
        updateProgress();
        
        console.log(`📐 Slide: ${step.id || 'sin-id'} (${state.currentSlide}/${state.totalSlides})`);
    }

    /**
     * Atajos de teclado adicionales
     */
    function setupKeyboardShortcuts() {
        document.addEventListener('keyup', function(event) {
            if (!state.api) return;
            
            switch(event.key.toLowerCase()) {
                case 'o':
                    // Ir a overview
                    state.api.goto('overview');
                    break;
                case 'h':
                case '1':
                    // Ir al inicio
                    state.api.goto('overview');
                    break;
            }
        });
    }

    /**
     * Inicializar Mermaid.js para diagramas
     */
    function initMermaid() {
        if (typeof mermaid !== 'undefined') {
            mermaid.initialize({
                startOnLoad: true,
                theme: 'dark',
                themeVariables: {
                    primaryColor: '#3b82f6',
                    primaryTextColor: '#ffffff',
                    primaryBorderColor: '#444444',
                    lineColor: '#666666',
                    secondaryColor: '#1a1a1a',
                    tertiaryColor: '#0a0a0a'
                }
            });
            console.log("📊 Mermaid.js inicializado");
        }
    }

    /**
     * Hipergraph interactivo (si existe)
     */
    function initHypergraph() {
        const container = document.querySelector('.hypergraph-container');
        if (!container) return;

        // Posicionar nodos en círculo
        const nodes = container.querySelectorAll('.hypergraph-node:not(.center)');
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        const radius = Math.min(centerX, centerY) - 60;

        nodes.forEach((node, i) => {
            const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle) - 40;
            const y = centerY + radius * Math.sin(angle) - 40;
            
            node.style.left = `${x}px`;
            node.style.top = `${y}px`;
        });

        // Click handlers para navegación
        nodes.forEach(node => {
            node.addEventListener('click', () => {
                const href = node.dataset.href;
                if (href) {
                    window.location.href = href;
                }
            });
        });

        console.log("🔗 Hypergraph inicializado con", nodes.length, "nodos");
    }

    // Inicialización al cargar la página
    window.addEventListener('load', function() {
        if (!initBlueprint()) return;
        
        setupKeyboardShortcuts();
        initHypergraph();
        
        // Escuchar eventos de navegación
        document.addEventListener('impress:stepenter', onStepEnter);
    });

    // Inicializar Mermaid cuando esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMermaid);
    } else {
        initMermaid();
    }

})(document, window);
