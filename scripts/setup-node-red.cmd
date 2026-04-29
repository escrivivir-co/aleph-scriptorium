@echo off
REM ═══════════════════════════════════════════════════════════════════════════
REM Node-RED Setup Script for Aleph Scriptorium (Windows)
REM ═══════════════════════════════════════════════════════════════════════════
REM 
REM Este script instala Node-RED y los nodos custom del Scriptorium:
REM - node-red-dashboard (legacy UI)
REM - @flowfuse/node-red-dashboard (Dashboard 2)
REM - node-red-contrib-alephscript (13 nodos)
REM - node-red-contrib-alephscript-escribiente (7 nodos)
REM - node-red-contrib-wiki-racer (1 nodo)
REM
REM Uso:
REM   scripts\setup-node-red.cmd [--skip-global] [--contrib-only]
REM
REM ═══════════════════════════════════════════════════════════════════════════

setlocal EnableDelayedExpansion

REM Colores (limitado en CMD)
set "GREEN=[32m"
set "YELLOW=[33m"
set "RED=[31m"
set "BLUE=[34m"
set "NC=[0m"

REM Detectar directorio del script
set "SCRIPT_DIR=%~dp0"
set "WORKSPACE_DIR=%SCRIPT_DIR%.."

REM Directorios de submódulos
set "WIRING_EDITOR_DIR=%WORKSPACE_DIR%\WiringEditor"
set "WIRING_APP_DIR=%WORKSPACE_DIR%\WiringAppHypergraphEditor"

REM Directorio Node-RED del usuario
set "NODE_RED_DIR=%USERPROFILE%\.node-red"

REM Parsear argumentos
set "SKIP_GLOBAL=false"
set "CONTRIB_ONLY=false"

:parse_args
if "%~1"=="" goto :start
if "%~1"=="--skip-global" set "SKIP_GLOBAL=true"
if "%~1"=="--contrib-only" set "CONTRIB_ONLY=true"
shift
goto :parse_args

:start
echo.
echo %BLUE%===============================================================%NC%
echo %BLUE%   Node-RED Setup for Aleph Scriptorium (Windows)%NC%
echo %BLUE%===============================================================%NC%
echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Verificar prerequisitos
REM ─────────────────────────────────────────────────────────────────────────────
echo %YELLOW%🔍 Verificando prerequisitos...%NC%

REM Node.js
where node >nul 2>&1
if errorlevel 1 (
    echo %RED%❌ Node.js no encontrado. Instala Node.js 18+ primero.%NC%
    echo    -^> https://nodejs.org/
    exit /b 1
)

for /f "tokens=1 delims=v." %%a in ('node --version') do set NODE_VERSION=%%a
for /f "tokens=2 delims=v." %%a in ('node --version') do set NODE_MAJOR=%%a
echo %GREEN%✓ Node.js encontrado%NC%

REM npm
where npm >nul 2>&1
if errorlevel 1 (
    echo %RED%❌ npm no encontrado.%NC%
    exit /b 1
)
echo %GREEN%✓ npm encontrado%NC%

REM Verificar submódulos
if not exist "%WIRING_EDITOR_DIR%\packages\node-red-contrib-alephscript" (
    echo %RED%❌ Submódulo WiringEditor no encontrado.%NC%
    echo    -^> Ejecuta: git submodule update --init --recursive
    exit /b 1
)
echo %GREEN%✓ Submódulo WiringEditor encontrado%NC%

if not exist "%WIRING_APP_DIR%\node-red-contrib-wikir-racer" (
    echo %RED%❌ Submódulo WiringAppHypergraphEditor no encontrado.%NC%
    echo    -^> Ejecuta: git submodule update --init --recursive
    exit /b 1
)
echo %GREEN%✓ Submódulo WiringAppHypergraphEditor encontrado%NC%

echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Paso 1: Instalar Node-RED globalmente
REM ─────────────────────────────────────────────────────────────────────────────
if "%SKIP_GLOBAL%"=="false" (
    echo %YELLOW%📦 Paso 1: Instalando Node-RED globalmente...%NC%
    
    where node-red >nul 2>&1
    if errorlevel 1 (
        echo   -^> npm install -g --unsafe-perm node-red
        call npm install -g --unsafe-perm node-red
        echo %GREEN%✓ Node-RED instalado%NC%
    ) else (
        echo %GREEN%✓ Node-RED ya instalado%NC%
    )
) else (
    echo %YELLOW%⏭️  Paso 1: Saltando instalación global (--skip-global)%NC%
)

echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Paso 2: Crear directorio .node-red si no existe
REM ─────────────────────────────────────────────────────────────────────────────
echo %YELLOW%📁 Paso 2: Verificando directorio Node-RED...%NC%

if not exist "%NODE_RED_DIR%" (
    echo   -^> Creando %NODE_RED_DIR%
    mkdir "%NODE_RED_DIR%"
    
    REM Inicializar package.json básico
    echo {"name": "node-red-project", "description": "Node-RED user directory", "version": "1.0.0"} > "%NODE_RED_DIR%\package.json"
)
echo %GREEN%✓ Directorio: %NODE_RED_DIR%%NC%

echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Paso 3: Instalar dashboards Node-RED (legacy + v2)
REM ─────────────────────────────────────────────────────────────────────────────
if "%CONTRIB_ONLY%"=="false" (
    echo %YELLOW%🎨 Paso 3: Instalando dashboards Node-RED (legacy + Dashboard 2)...%NC%
    
    cd /d "%NODE_RED_DIR%"
    echo   -^> npm install node-red-dashboard @flowfuse/node-red-dashboard
    call npm install node-red-dashboard @flowfuse/node-red-dashboard
    echo %GREEN%✓ node-red-dashboard y @flowfuse/node-red-dashboard instalados%NC%
) else (
    echo %YELLOW%⏭️  Paso 3: Saltando dashboard (--contrib-only)%NC%
)

echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Paso 4: Build node-red-contrib-alephscript
REM ─────────────────────────────────────────────────────────────────────────────
echo %YELLOW%🔨 Paso 4: Compilando node-red-contrib-alephscript + escribiente...%NC%

cd /d "%WIRING_EDITOR_DIR%"

REM Instalar dependencias si no existen
if not exist "node_modules" (
    echo   -^> npm install (raíz)
    call npm install 2>nul
)

REM Build del paquete contrib
cd /d "%WIRING_EDITOR_DIR%\packages\node-red-contrib-alephscript"
if not exist "node_modules" (
    echo   -^> npm install (contrib)
    call npm install
)

echo   -^> npm run build:full
call npm run build:full 2>nul || call npm run build

cd /d "%WIRING_EDITOR_DIR%\packages\node-red-contrib-alephscript-escribiente"
if not exist "node_modules" (
    echo   -^> npm install (escribiente)
    call npm install
)

echo   -^> npm run build:full [escribiente]
call npm run build:full 2>nul || call npm run build

echo %GREEN%✓ node-red-contrib-alephscript y escribiente compilados%NC%

echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Paso 5: Instalar node-red-contrib-alephscript en Node-RED
REM ─────────────────────────────────────────────────────────────────────────────
echo %YELLOW%🔌 Paso 5: Instalando node-red-contrib-alephscript (13 nodos)...%NC%

cd /d "%NODE_RED_DIR%"
set "CONTRIB_PATH=%WIRING_EDITOR_DIR%\packages\node-red-contrib-alephscript"

echo   -^> npm install "%CONTRIB_PATH%"
call npm install "%CONTRIB_PATH%"

echo %GREEN%✓ 13 nodos AlephScript instalados%NC%

echo.
echo %YELLOW%📝 Paso 5b: Instalando node-red-contrib-alephscript-escribiente (7 nodos)...%NC%

cd /d "%NODE_RED_DIR%"
set "ESCRIBIENTE_PATH=%WIRING_EDITOR_DIR%\packages\node-red-contrib-alephscript-escribiente"

echo   -^> npm install "%ESCRIBIENTE_PATH%"
call npm install "%ESCRIBIENTE_PATH%"

echo %GREEN%✓ 7 nodos Escribiente instalados%NC%

echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Paso 6: Instalar node-red-contrib-wiki-racer en Node-RED
REM ─────────────────────────────────────────────────────────────────────────────
echo %YELLOW%🎮 Paso 6: Instalando node-red-contrib-wiki-racer (1 nodo)...%NC%

cd /d "%NODE_RED_DIR%"
set "WIKI_RACER_PATH=%WIRING_APP_DIR%\node-red-contrib-wikir-racer"

echo   -^> npm install "%WIKI_RACER_PATH%"
call npm install "%WIKI_RACER_PATH%"

echo %GREEN%✓ 1 nodo Wiki-Racer instalado%NC%

echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Resumen
REM ─────────────────────────────────────────────────────────────────────────────
echo %BLUE%===============================================================%NC%
echo %GREEN%✅ Setup completado exitosamente!%NC%
echo %BLUE%===============================================================%NC%
echo.
echo 📍 %YELLOW%Próximos pasos:%NC%
echo.
echo   1. Arrancar Node-RED:
echo      %GREEN%node-red%NC%
echo.
echo   2. Abrir el editor:
echo      %GREEN%http://localhost:1880%NC%
echo.
echo   3. Abrir el dashboard (después de deploy):
echo      %GREEN%http://localhost:1880/ui%NC%
echo.
echo   4. O usa las tasks de VS Code:
echo      %GREEN%Ctrl+Shift+P -^> Tasks: Run Task -^> NRE: Start [Editor]%NC%
echo.
echo 📦 %YELLOW%Nodos instalados (21 total):%NC%
echo   - node-red-dashboard (legacy UI widgets)
echo   - @flowfuse/node-red-dashboard (Dashboard 2)
echo   - node-red-contrib-alephscript (13 nodos)
echo   - node-red-contrib-alephscript-escribiente (7 nodos)
echo   - node-red-contrib-wiki-racer (1 nodo)
echo.

endlocal
