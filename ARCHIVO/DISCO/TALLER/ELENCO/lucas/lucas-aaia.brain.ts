/**
 * Lucas AAIA Brain — Scrum Master del Índice
 * 
 * Este archivo define una App AAIA para Lucas, permitiéndole operar
 * como un agente autónomo con ciclos de percepción-razonamiento-acción.
 * 
 * A diferencia del cerebro Prolog (declarativo), este cerebro AAIA
 * permite a Lucas:
 * - Recibir perceptos del entorno (cambios en índices, commits, etc.)
 * - Razonar sobre coherencia DRY
 * - Emitir eferencias (notificaciones, validaciones)
 * 
 * Uso:
 *   1. aaia_create_session({ appId: 'lucas-mentor' })
 *   2. aaia_send_percepto({ percepto: { tipo: 'indice_cambio', ... } })
 *   3. aaia_step_fia({ fiaIndex: 0 })
 *   4. aaia_get_eferencia({ fiaIndex: 0 })
 * 
 * @module lucas-aaia-brain
 * @version 1.0.0
 * @epic MCP-AAIA-SERVER-1.0.0
 */

import { iFIA, IMundo, IModelo, RunState, IResultado } from '../../../AAIAGallery/alephscript/src/FIA/iFIA';
import { Subject, Subscription } from 'rxjs';

// =============================================================================
// TIPOS ESPECÍFICOS DE LUCAS
// =============================================================================

/**
 * Percepto que Lucas puede recibir
 */
export interface LucasPercepto {
  tipo: 'indice_cambio' | 'commit_nuevo' | 'plugin_instalado' | 'coherencia_check' | 'navegacion';
  fuente: string;
  payload: {
    archivo?: string;
    ubicacion?: string;
    pregunta?: string;
    contenido?: any;
  };
  timestamp: Date;
}

/**
 * Eferencia que Lucas puede emitir
 */
export interface LucasEferencia {
  tipo: 'validacion' | 'navegacion' | 'alerta' | 'consejo' | 'actualizacion';
  destino: string;
  payload: {
    resultado?: 'ok' | 'warning' | 'error';
    mensaje?: string;
    ruta?: string;
    sugerencias?: string[];
  };
  timestamp: Date;
}

/**
 * Modelo del mundo de Lucas: estado de los índices
 */
export interface LucasMundoModelo extends IModelo {
  indiceFuncional: {
    capacidades: Map<string, string>;
    ultimaActualizacion: Date;
  };
  indiceTecnico: {
    estructuras: Map<string, string>;
    ultimaActualizacion: Date;
  };
  coherenciaDRY: {
    duplicados: string[];
    huerfanos: string[];
    healthScore: number;
  };
  sesionesActivas: string[];
}

// =============================================================================
// MUNDO DE LUCAS
// =============================================================================

/**
 * Mundo en el que Lucas opera: los índices del Scriptorium
 */
export class LucasMundo implements IMundo {
  nombre = 'MundoIndices';
  runState: RunState = 'STOP';
  
  modelo: LucasMundoModelo = {
    indiceFuncional: {
      capacidades: new Map([
        ['editar_reglas_prolog', 'PrologEditor/frontend'],
        ['ejecutar_query_prolog', 'MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts'],
        ['crear_packs_mcp', '.github/plugins/mcp-presets/packs'],
        ['publicar_web', 'docs/'],
        ['gestionar_plugins', '.github/plugins'],
        ['operar_fias', 'MCPGallery/mcp-mesh-sdk/src/MCPAAIAServer.ts'],
      ]),
      ultimaActualizacion: new Date(),
    },
    indiceTecnico: {
      estructuras: new Map([
        ['agentes_core', '.github/agents'],
        ['agentes_plugin', '.github/plugins/*/agents'],
        ['instrucciones', '.github/plugins/scriptorium-pack/instructions'],
        ['backlog_activo', 'ARCHIVO/DISCO/BACKLOG_BORRADORES'],
        ['elenco', 'ARCHIVO/DISCO/TALLER/ELENCO'],
      ]),
      ultimaActualizacion: new Date(),
    },
    coherenciaDRY: {
      duplicados: [],
      huerfanos: [],
      healthScore: 100,
    },
    sesionesActivas: [],
  };

  eferencia: Subject<LucasEferencia> = new Subject();
  aferencias: Subscription[] = [];

  ciclo(): void {
    // Ciclo del mundo: verificar coherencia periódica
    this.verificarCoherencia();
  }

  private verificarCoherencia(): void {
    // Detectar duplicados
    const capacidades = Array.from(this.modelo.indiceFuncional.capacidades.keys());
    const estructuras = Array.from(this.modelo.indiceTecnico.estructuras.keys());
    
    const duplicados = capacidades.filter(c => estructuras.includes(c));
    this.modelo.coherenciaDRY.duplicados = duplicados;
    
    // Calcular health score
    const totalItems = capacidades.length + estructuras.length;
    const issues = duplicados.length + this.modelo.coherenciaDRY.huerfanos.length;
    this.modelo.coherenciaDRY.healthScore = Math.max(0, 100 - (issues / totalItems) * 100);
  }
}

// =============================================================================
// FIA LUCAS MENTOR
// =============================================================================

/**
 * FIA de Lucas: razona sobre coherencia documental
 */
export class LucasMentorFIA implements iFIA {
  nombre = 'Lucas-Mentor';
  paradigma = 'sbr'; // Sistema Basado en Reglas
  
  mundo: LucasMundo;
  runState: RunState = 'STOP';
  runStateEvent: Subject<RunState> = new Subject();
  
  private perceptoActual: LucasPercepto | null = null;
  private cache: Map<string, any> = new Map();

  constructor(mundo: LucasMundo) {
    this.mundo = mundo;
  }

  /**
   * Recibir percepto del entorno
   */
  recibirPercepto(percepto: LucasPercepto): void {
    this.perceptoActual = percepto;
  }

  /**
   * Razonar sobre el percepto actual
   */
  razona(): IResultado {
    if (!this.perceptoActual) {
      return {
        exito: false,
        eferencia: null,
        mensaje: 'Sin percepto para procesar',
      };
    }

    const percepto = this.perceptoActual;
    let eferencia: LucasEferencia;

    switch (percepto.tipo) {
      case 'indice_cambio':
        eferencia = this.razonarCambioIndice(percepto);
        break;
      
      case 'commit_nuevo':
        eferencia = this.razonarCommit(percepto);
        break;
      
      case 'navegacion':
        eferencia = this.razonarNavegacion(percepto);
        break;
      
      case 'coherencia_check':
        eferencia = this.razonarCoherencia();
        break;
      
      case 'plugin_instalado':
        eferencia = this.razonarPluginNuevo(percepto);
        break;
      
      default:
        eferencia = {
          tipo: 'alerta',
          destino: 'usuario',
          payload: {
            resultado: 'warning',
            mensaje: `Percepto desconocido: ${percepto.tipo}`,
          },
          timestamp: new Date(),
        };
    }

    // Emitir eferencia al mundo
    this.mundo.eferencia.next(eferencia);
    this.perceptoActual = null;

    return {
      exito: true,
      eferencia,
      mensaje: `Procesado: ${percepto.tipo}`,
    };
  }

  /**
   * Razonar sobre cambio en índice
   */
  private razonarCambioIndice(percepto: LucasPercepto): LucasEferencia {
    const archivo = percepto.payload.archivo || '';
    
    // Verificar si el cambio mantiene coherencia
    this.mundo.ciclo();
    const health = this.mundo.modelo.coherenciaDRY.healthScore;

    if (health < 70) {
      return {
        tipo: 'alerta',
        destino: '@ox',
        payload: {
          resultado: 'warning',
          mensaje: `Coherencia DRY comprometida (${health}%)`,
          sugerencias: [
            'Verificar duplicados en Funcional.md y Tecnico.md',
            'Invocar @indice validar coherencia',
          ],
        },
        timestamp: new Date(),
      };
    }

    return {
      tipo: 'validacion',
      destino: 'usuario',
      payload: {
        resultado: 'ok',
        mensaje: `Índice actualizado: ${archivo}. Coherencia: ${health}%`,
      },
      timestamp: new Date(),
    };
  }

  /**
   * Razonar sobre commit nuevo
   */
  private razonarCommit(percepto: LucasPercepto): LucasEferencia {
    const contenido = percepto.payload.contenido || '';
    
    // Verificar formato de commit
    const patronCommit = /^(feat|fix|docs|refactor|chore|archive)\([\w\/\-]+\):/;
    const esValido = patronCommit.test(contenido);

    return {
      tipo: 'validacion',
      destino: 'usuario',
      payload: {
        resultado: esValido ? 'ok' : 'error',
        mensaje: esValido 
          ? 'Commit conforme a protocolo DevOps'
          : 'Commit NO conforme. Formato: <tipo>(<scope>): <descripción>',
        sugerencias: esValido ? [] : [
          'Tipos: feat, fix, docs, refactor, chore, archive',
          'Scope: script/agents, fund/caps, etc.',
        ],
      },
      timestamp: new Date(),
    };
  }

  /**
   * Razonar sobre navegación (¿dónde está X?)
   */
  private razonarNavegacion(percepto: LucasPercepto): LucasEferencia {
    const pregunta = percepto.payload.pregunta || '';
    
    // Buscar en índice funcional
    for (const [cap, ubicacion] of this.mundo.modelo.indiceFuncional.capacidades) {
      if (pregunta.toLowerCase().includes(cap.replace(/_/g, ' '))) {
        return {
          tipo: 'navegacion',
          destino: 'usuario',
          payload: {
            resultado: 'ok',
            mensaje: `"${cap}" está en:`,
            ruta: ubicacion,
          },
          timestamp: new Date(),
        };
      }
    }

    // Buscar en índice técnico
    for (const [est, ubicacion] of this.mundo.modelo.indiceTecnico.estructuras) {
      if (pregunta.toLowerCase().includes(est.replace(/_/g, ' '))) {
        return {
          tipo: 'navegacion',
          destino: 'usuario',
          payload: {
            resultado: 'ok',
            mensaje: `"${est}" está en:`,
            ruta: ubicacion,
          },
          timestamp: new Date(),
        };
      }
    }

    return {
      tipo: 'consejo',
      destino: 'usuario',
      payload: {
        resultado: 'warning',
        mensaje: 'No encontré esa capacidad. Prueba con:',
        sugerencias: [
          '@indice consultar funcional',
          '@indice consultar tecnico',
          '@ox ¿qué agente uso para...?',
        ],
      },
      timestamp: new Date(),
    };
  }

  /**
   * Razonar sobre coherencia general
   */
  private razonarCoherencia(): LucasEferencia {
    this.mundo.ciclo();
    const coherencia = this.mundo.modelo.coherenciaDRY;

    return {
      tipo: 'validacion',
      destino: 'usuario',
      payload: {
        resultado: coherencia.healthScore >= 70 ? 'ok' : 'warning',
        mensaje: `Reporte de coherencia DRY`,
        sugerencias: [
          `Health Score: ${coherencia.healthScore}%`,
          `Duplicados: ${coherencia.duplicados.length}`,
          `Huérfanos: ${coherencia.huerfanos.length}`,
        ],
      },
      timestamp: new Date(),
    };
  }

  /**
   * Razonar sobre plugin nuevo instalado
   */
  private razonarPluginNuevo(percepto: LucasPercepto): LucasEferencia {
    return {
      tipo: 'actualizacion',
      destino: '@indice',
      payload: {
        resultado: 'ok',
        mensaje: 'Plugin instalado. Actualizar índices:',
        sugerencias: [
          'Añadir entrada a Funcional.md (capacidades nuevas)',
          'Añadir entrada a Tecnico.md (estructura de archivos)',
          '@pluginmanager listar para verificar',
        ],
      },
      timestamp: new Date(),
    };
  }

  /**
   * Instanciar nueva FIA (factory)
   */
  instanciar(): iFIA {
    return new LucasMentorFIA(new LucasMundo());
  }

  /**
   * Describir la FIA
   */
  abstrae(): string {
    return `[${this.nombre}] FIA SBR para coherencia documental. Estado: ${this.runState}`;
  }
}

// =============================================================================
// APP AAIA: LUCAS-MENTOR
// =============================================================================

/**
 * Configuración de la App AAIA de Lucas
 */
export const LucasMentorApp = {
  id: 'lucas-mentor',
  nombre: 'Lucas Mentor',
  descripcion: 'Scrum Master del Índice - Coherencia DRY',
  version: '1.0.0',
  
  mundo: LucasMundo,
  fias: [
    {
      clase: LucasMentorFIA,
      config: {
        nombre: 'Lucas-Mentor',
        paradigma: 'sbr',
        autoStart: false,
      },
    },
  ],
  
  // Perceptos que acepta
  perceptosAceptados: [
    'indice_cambio',
    'commit_nuevo', 
    'plugin_instalado',
    'coherencia_check',
    'navegacion',
  ],
  
  // Eferencias que emite
  eferenciasEmitidas: [
    'validacion',
    'navegacion',
    'alerta',
    'consejo',
    'actualizacion',
  ],
  
  // Integración con otros cerebros
  integrationPoints: {
    prolog: {
      sessionPrefix: 'lucas-',
      brainFile: 'lucas-prolog.brain.pl',
      queriesDisponibles: [
        'documentacion_coherente(X)',
        'ubicacion_canonica(Tipo, Donde)',
        'consejo(Situacion, Mensaje)',
      ],
    },
    templates: {
      indexFile: 'templates-index.json',
      source: 'AgentLoreSDK/cli-tool/components',
    },
  },
};

export default LucasMentorApp;
