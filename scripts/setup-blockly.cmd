@echo off
REM ═══════════════════════════════════════════════════════════════════════════
REM Blockly Editor Setup Script for Aleph Scriptorium (Windows)
REM ═══════════════════════════════════════════════════════════════════════════
REM 
REM Este script instala y construye el SDK de Blockly Editor:
REM - blockly-alephscript-blocks (6 categorías de bloques)
REM - blockly-gamify-ui (Editor Angular, puerto 4200)
REM - blockly-runtime-gamify-ui (Runtime, puerto 4300)
REM
REM Uso:
REM   scripts\setup-blockly.cmd [--skip-build] [--dev]
REM
REM Opciones:
REM   --skip-build    Solo instalar dependencias, no construir
REM   --dev           Arrancar en modo desarrollo después de setup
REM
REM ═══════════════════════════════════════════════════════════════════════════

setlocal EnableDelayedExpansion

REM Detectar directorio
set "SCRIPT_DIR=%~dp0"
set "WORKSPACE_DIR=%SCRIPT_DIR%.."
set "BLOCKLY_DIR=%WORKSPACE_DIR%\BlocklyEditor"

REM Parsear argumentos
set "SKIP_BUILD=false"
set "DEV_MODE=false"

:parse_args
if "%~1"=="" goto :end_parse
if "%~1"=="--skip-build" (
    set "SKIP_BUILD=true"
    shift
    goto :parse_args
)
if "%~1"=="--dev" (
    set "DEV_MODE=true"
    shift
    goto :parse_args
)
shift
goto :parse_args
:end_parse

echo ═══════════════════════════════════════════════════════════════
echo    Blockly Editor Setup for Aleph Scriptorium
echo ═══════════════════════════════════════════════════════════════
echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Verificar prerequisitos
REM ─────────────────────────────────────────────────────────────────────────────
echo [32m🔍 Verificando prerequisitos...[0m

REM Node.js
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [31m❌ Node.js no encontrado. Instala Node.js 18+ primero.[0m
    echo    → https://nodejs.org/
    exit /b 1
)
for /f "tokens=1 delims=v" %%a in ('node --version') do set NODE_VERSION=%%a
echo [32m✓ Node.js encontrado[0m

REM npm
npm --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [31m❌ npm no encontrado.[0m
    exit /b 1
)
echo [32m✓ npm encontrado[0m

REM Angular CLI (opcional)
ng version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [32m✓ Angular CLI instalado[0m
) else (
    echo [33m⚠ Angular CLI no instalado globalmente (se usará npx)[0m
)

REM Verificar submódulo
if not exist "%BLOCKLY_DIR%\packages" (
    echo [31m❌ Submódulo BlocklyEditor no encontrado.[0m
    echo    → Ejecuta: git submodule update --init --recursive
    exit /b 1
)
echo [32m✓ Submódulo BlocklyEditor encontrado[0m

echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Paso 1: Instalar dependencias raíz
REM ─────────────────────────────────────────────────────────────────────────────
echo [33m📦 Paso 1: Instalando dependencias raíz...[0m

cd /d "%BLOCKLY_DIR%"

if not exist "node_modules" (
    echo   → npm install
    call npm install
) else (
    echo [32m✓ Dependencias raíz ya instaladas[0m
)

echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Paso 2: Instalar dependencias de todos los paquetes
REM ─────────────────────────────────────────────────────────────────────────────
echo [33m📦 Paso 2: Instalando dependencias de paquetes...[0m

echo   → npm run install:all
call npm run install:all 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo   → Instalando paquetes individualmente...
    
    REM blockly-alephscript-blocks
    if exist "%BLOCKLY_DIR%\packages\blockly-alephscript-blocks" (
        echo     → blockly-alephscript-blocks
        cd /d "%BLOCKLY_DIR%\packages\blockly-alephscript-blocks"
        call npm install
    )
    
    REM blockly-gamify-ui
    if exist "%BLOCKLY_DIR%\packages\blockly-gamify-ui" (
        echo     → blockly-gamify-ui
        cd /d "%BLOCKLY_DIR%\packages\blockly-gamify-ui"
        call npm install
    )
    
    REM blockly-runtime-gamify-ui
    if exist "%BLOCKLY_DIR%\packages\blockly-runtime-gamify-ui" (
        echo     → blockly-runtime-gamify-ui
        cd /d "%BLOCKLY_DIR%\packages\blockly-runtime-gamify-ui"
        call npm install
    )
    
    cd /d "%BLOCKLY_DIR%"
)

echo [32m✓ Dependencias de paquetes instaladas[0m

echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Paso 3: Construir todos los paquetes
REM ─────────────────────────────────────────────────────────────────────────────
if "%SKIP_BUILD%"=="false" (
    echo [33m🔨 Paso 3: Construyendo paquetes...[0m
    
    cd /d "%BLOCKLY_DIR%"
    
    REM Construir bloques primero
    echo   → Construyendo blockly-alephscript-blocks...
    call npm run build:blocks 2>nul
    if %ERRORLEVEL% NEQ 0 (
        cd /d "%BLOCKLY_DIR%\packages\blockly-alephscript-blocks"
        call npm run build
        cd /d "%BLOCKLY_DIR%"
    )
    echo [32m    ✓ blockly-alephscript-blocks[0m
    
    REM Construir UI
    echo   → Construyendo blockly-gamify-ui...
    call npm run build:ui 2>nul
    if %ERRORLEVEL% NEQ 0 (
        cd /d "%BLOCKLY_DIR%\packages\blockly-gamify-ui"
        call npm run build
        cd /d "%BLOCKLY_DIR%"
    )
    echo [32m    ✓ blockly-gamify-ui[0m
    
    REM Construir Runtime UI
    echo   → Construyendo blockly-runtime-gamify-ui...
    call npm run build:runtime-ui 2>nul
    if %ERRORLEVEL% NEQ 0 (
        cd /d "%BLOCKLY_DIR%\packages\blockly-runtime-gamify-ui"
        call npm run build 2>nul
        cd /d "%BLOCKLY_DIR%"
    )
    echo [32m    ✓ blockly-runtime-gamify-ui[0m
    
    echo.
) else (
    echo [33m⏭️  Paso 3: Saltando build (--skip-build)[0m
    echo.
)

REM ─────────────────────────────────────────────────────────────────────────────
REM Resumen
REM ─────────────────────────────────────────────────────────────────────────────
echo ═══════════════════════════════════════════════════════════════
echo [32m✅ Setup completado exitosamente![0m
echo ═══════════════════════════════════════════════════════════════
echo.
echo 📍 Próximos pasos:
echo.
echo   1. Arrancar el editor (desarrollo):
echo      cd BlocklyEditor ^&^& npm run dev:ui
echo.
echo   2. Abrir el editor:
echo      http://localhost:4200
echo.
echo   3. O usa las tasks de VS Code:
echo      Ctrl+Shift+P → Tasks: Run Task → BLE: Start [Editor]
echo.
echo 📦 Paquetes instalados:
echo   - blockly-alephscript-blocks (6 categorías de bloques)
echo   - blockly-gamify-ui (Editor Angular, puerto 4200)
echo   - blockly-runtime-gamify-ui (Runtime, puerto 4300)
echo.

REM ─────────────────────────────────────────────────────────────────────────────
REM Modo desarrollo (opcional)
REM ─────────────────────────────────────────────────────────────────────────────
if "%DEV_MODE%"=="true" (
    echo [33m🚀 Arrancando en modo desarrollo...[0m
    cd /d "%BLOCKLY_DIR%"
    call npm run dev:ui
)

endlocal
