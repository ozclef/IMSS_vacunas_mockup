export const VACCINES_CATALOG = [
  // Prioridad A
  { id: 'v1', name: 'Influenza (Sanofi)', priority: 'A' },
  { id: 'v2', name: 'Influenza (Seqirus)', priority: 'A' },
  { id: 'v3', name: 'Tétanos, difteria y pertussis (Td/Tdap)', priority: 'A' },
  { id: 'v4', name: 'Hepatitis B (Pediátrica)', priority: 'A' },
  { id: 'v5', name: 'Hepatitis B (Adulto)', priority: 'A' },
  { id: 'v6', name: 'Neumococo (polisacárido 23-valente)', priority: 'A' },
  { id: 'v7', name: 'Neumococo (conjugada 13-valente)', priority: 'A' },
  // Prioridad B
  { id: 'v8', name: 'Varicela (Monodosis)', priority: 'B' },
  { id: 'v9', name: 'Rubéola, Paperas y Sarampión (MMR)', priority: 'B' },
  { id: 'v10', name: 'Hepatitis A (Pediátrica)', priority: 'B' },
  { id: 'v11', name: 'Hepatitis A (Adulto)', priority: 'B' },
  { id: 'v12', name: 'Papiloma Humano (VPH - Bivalente)', priority: 'B' },
  { id: 'v13', name: 'Papiloma Humano (VPH - Tetravalente)', priority: 'B' },
  { id: 'v14', name: 'Meningococo', priority: 'B' },
  { id: 'v15', name: 'COVID-19 (Pfizer)', priority: 'B' },
  { id: 'v16', name: 'COVID-19 (Moderna)', priority: 'B' },
  { id: 'v17', name: 'Rotavirus', priority: 'B' },
];

export const COFEPRIS_LOTS = [
  // Influenza
  { id: 'l1', lotNumber: 'LV-1234', status: 'Liberado' },
  { id: 'l2', lotNumber: 'LV-4321', status: 'Liberado' },
  { id: 'l3', lotNumber: 'LV-5555', status: 'En Cuarentena' },
  // Tdap
  { id: 'l4', lotNumber: 'TD-9001', status: 'Liberado' },
  { id: 'l5', lotNumber: 'TD-9002', status: 'Liberado' },
  // HepB
  { id: 'l6', lotNumber: 'HB-1000', status: 'Liberado' },
  { id: 'l7', lotNumber: 'HB-2000', status: 'Liberado' },
  { id: 'l8', lotNumber: 'HB-3000', status: 'En Cuarentena' },
  // Neumococo
  { id: 'l9', lotNumber: 'NE-4500', status: 'Liberado' },
  { id: 'l10', lotNumber: 'NE-4501', status: 'Liberado' },
  // COVID
  { id: 'l11', lotNumber: 'CV-PF-01', status: 'Liberado' },
  { id: 'l12', lotNumber: 'CV-MD-02', status: 'Liberado' },
];

export const LOCATIONS = [
  { id: 'loc1', name: 'UMF 26 (CDMX)' },
  { id: 'loc2', name: 'UMF 34 (Monterrey)' },
  { id: 'loc3', name: 'Hospital General Regional 1 (Tijuana)' },
  { id: 'loc4', name: 'UMF 4 (Guadalajara)' },
  { id: 'loc5', name: 'UMF 15 (Puebla)' },
  { id: 'loc6', name: 'UMF 20 (Cancún)' },
  { id: 'loc7', name: 'Hospital GZ 1 (León)' },
  { id: 'loc8', name: 'Hospital GZ 2 (Querétaro)' },
  { id: 'loc9', name: 'UMF 33 (Chihuahua)' },
  { id: 'loc10', name: 'UMF 51 (Mérida)' },
  { id: 'loc11', name: 'Hospital Especialidades 1 (CMN Siglo XXI)' },
  { id: 'loc12', name: 'Hospital Especialidades 2 (CMN La Raza)' },
  { id: 'loc13', name: 'UMF 7 (Tlalnepantla)' },
  { id: 'loc14', name: 'UMF 11 (Toluca)' },
  { id: 'loc15', name: 'UMF 21 (Aguascalientes)' },
  { id: 'loc16', name: 'UMF 8 (Ensenada)' },
  { id: 'loc17', name: 'UMF 2 (Hermosillo)' },
  { id: 'loc18', name: 'UMF 6 (Saltillo)' },
  { id: 'loc19', name: 'UMF 14 (Pachuca)' },
  { id: 'loc20', name: 'UMF 1 (Cuernavaca)' },
];

import patientsData from './patients.json';

// Scenarios mapping NSS to specific alerts, now including 50 random patients
export const MOCK_PATIENTS: Record<string, any> = patientsData;
