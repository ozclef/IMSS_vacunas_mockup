# IMSS Digital - Módulo de Vacunación (MVP Fase 3)

Este documento contiene información útil para probar y validar el flujo de la aplicación, enfocándose en los datos de prueba (mock data) configurados para simular escenarios reales del Expediente Clínico y COFEPRIS.

## 🚀 Cómo Iniciar la App

Para levantar el entorno web (ideal para pruebas rápidas de UI):
```bash
npm run web
# Opcional: Si hay errores de caché, usar `npm run web -- --clear`
```

## 💉 Flujo: Registrar Vacuna (Alta Demanda)

El flujo de "Registrar Vacuna" está optimizado para clínicas de alta demanda.
1. Al entrar, seleccionas la **Ubicación**, la **Vacuna** y el **Lote** para la "sesión" actual.
2. Al continuar, entras a la pantalla de **Registro Rápido** (Rapid Registration).
3. En esta pantalla, puedes ingresar el NSS del paciente.

### 📋 Datos de Prueba: NSS y Alertas

Hemos configurado 4 pacientes de prueba para simular los 4 escenarios de alerta requeridos en la Fase 3. **Ingresa los siguientes NSS de 10 dígitos en la pantalla de Registro Rápido** para ver cómo reacciona el sistema:

| NSS a ingresar | Paciente Simulado | Tipo de Alerta que Detona | Descripción del Escenario |
| :--- | :--- | :--- | :--- |
| `1111111111` | Juan Pérez | **Dosis Vencida** | El paciente tiene una dosis de Hepatitis B con más de 30 días de retraso. |
| `2222222222` | María García | **Cobertura Baja en UMF** | La cobertura de Influenza en la UMF es menor al 80%. |
| `3333333333` | Carlos López | **Lote Sin Movimiento** | El lote seleccionado no tiene aplicaciones registradas en 48 hrs. |
| `4444444444` | Ana Martínez | **Esquema Incompleto** | Paciente en grupo de riesgo (68 años) le falta la vacuna del Neumococo. |

> **Nota:** También hemos generado 50 pacientes adicionales de prueba para simular una base de datos más amplia. Sus NSS comienzan a partir del `5000000000` (Ej. `5000000000`, `5000000001`, ..., `5000000049`). Si ingresas cualquier otro NSS válido (10 dígitos o más) que no esté en la base, el sistema mostrará un estado de "Sin Alertas Críticas".

## 📜 Flujo: Revisar Historial

En la pantalla de Historial Clínico, se ha implementado el **filtro "Solo vacunas"**.
- Por defecto, el historial muestra eventos médicos mixtos (Ej. Consultas Generales, Estudios de Laboratorio, Aplicaciones de Vacunas).
- Al activar el **Toggle (Switch)** de "Solo vacunas", la lista filtrará dinámicamente cualquier evento que no sea una vacunación, dejando únicamente el historial de inmunización del paciente.

## 🗄️ Estructura de Datos Mocks (`src/data/mockData.ts`)

La aplicación simula conexiones a sistemas externos utilizando los siguientes catálogos estáticos:
- **`VACCINES_CATALOG`**: Simula el catálogo maestro. Incluye vacunas de Prioridad A (Influenza, Tdap, Hepatitis B, Neumococo) y Prioridad B (Varicela, MMR, Hepatitis A, VPH, Meningococo).
- **`COFEPRIS_LOTS`**: Simula la API de COFEPRIS con lotes liberados y en cuarentena.
- **`LOCATIONS`**: Simula el catálogo de UMFs y Hospitales de adscripción.
- **`MOCK_PATIENTS`**: Simula la consulta al Expediente Clínico Digital para retornar las alertas mencionadas arriba.
