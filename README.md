# IMSS CENTINELA - Sistema Nacional de Gestión de Vacunas

IMSS CENTINELA is a mobile application prototype built for the Mexican Social Security Institute (IMSS). It is designed to streamline the vaccination registration process, manage clinical histories, and broadcast critical medical alerts across national healthcare units.

The application leverages React Native and Expo to provide a cross-platform mobile experience. It integrates strict data validation, an offline-first mock catalog architecture, and automated alert triggering systems based on patient demographics and clinical history.

## Prerequisites

Before installing the project, ensure you have the following dependencies installed on your system:

- Node.js (version 18.x or newer recommended)
- npm (Node Package Manager)

## Installation

1. Navigate to the project directory:
   ```bash
   cd imss-app
   ```

2. Install all project dependencies:
   ```bash
   npm install
   ```

## Running the Application

This project is built using Expo. You can run the application on multiple platforms using the Expo CLI.

To start the development server and run the application in a web browser:
```bash
npm run web
```

To start the Metro Bundler for iOS and Android testing:
```bash
npx expo start
```
From the Metro Bundler terminal, you can:
- Press `a` to open the app on a connected Android device or emulator.
- Press `i` to open the app on an iOS simulator.
- Scan the displayed QR code with the Expo Go app on a physical mobile device.

## Compilation and Build

To compile the TypeScript source code and verify that there are no type errors without emitting built files, run:
```bash
npx tsc --noEmit
```

To create a production build for Android (.apk or .aab) or iOS, use Expo Application Services (EAS):
```bash
npx eas-cli build --platform all
```
*(Note: An Expo account and initial EAS configuration are required for cloud building).*




----




# IMSS Vacunas — Mockup

Sistema simulado para el registro, consulta e historial de vacunación IMSS.
Proyecto con fines educativos / mockup, **no es un sistema oficial del IMSS**.

## ¿Qué hace?

- Registrar vacunación de pacientes
- Consultar historial de vacunas por paciente
- Mostrar alertas de vacunas pendientes / próximas
- Flujo de registro y consulta para personal de salud

## Estructura del repo


```
IMSS_vacunas_mockup/
├── assets/              # Logos, iconos e imágenes
├── design/              # Mockups en PNG (landing, registro, historial, alertas)
├── diagrams/            # Diagramas HTML del sistema
│   ├── 00_indice.html
│   ├── 01_flujo_registro.html
│   ├── 02_flujo_consulta.html
│   ├── 03_secuencia_registro.html
│   ├── 04_secuencia_alertas.html
│   ├── 05_arquitectura_integracion.html
│   ├── 06_modelo_entidades.html
│   ├── 07_logica_alertas.html
│   └── 08_roles_y_permisos.html
├── imss-app/            # App móvil en React Native + Expo
│   ├── src/screens/
│   ├── src/components/
│   ├── src/data/
│   └── src/navigation/
└── Fase3_Rol1_MVP_y_Flujo.pdf

```

## Cómo ver los diagramas

Solo abre cualquier archivo de `diagrams/` en tu navegador.
Empieza por `00_indice.html`.

## Cómo correr la app

```bash
cd imss-app
npm install
npx expo start
