# Scripts de Utilidad

Este directorio contiene scripts de utilidad para el proyecto Isavan.

## 📋 Scripts Disponibles

### `import-concerts.mjs`

Script de seeding para importar la cartelera de conciertos a Sanity CMS.

#### 🎯 Propósito
Poblar la base de datos de Sanity con los conciertos reales de la temporada Dic 2025 - Mar 2026.

#### 🔑 Requisitos Previos

1. **Token de Sanity con permisos de escritura:**
   - Ve a [Sanity Manage](https://sanity.io/manage)
   - Selecciona tu proyecto
   - Ve a "API" → "Tokens"
   - Crea un nuevo token con permisos de **Editor** o **Admin**
   - Copia el token (solo se muestra una vez)

2. **Variables de entorno:**
   - `SANITY_TOKEN`: Tu token de escritura
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: ID de tu proyecto (ya debería estar en `.env.local`)

#### 🚀 Uso

```bash
# Opción 1: Pasar el token directamente
SANITY_TOKEN=tu_token_aqui node scripts/import-concerts.mjs

# Opción 2: Agregar el token a .env.local y ejecutar
node scripts/import-concerts.mjs
```

#### ✨ Características

- **Idempotente**: Usa `createOrReplace` basado en el `_id` del concierto
- **Seguro**: Si ejecutas el script múltiples veces, NO duplicará los datos
- **Transaccional**: Todos los conciertos se importan en una sola transacción
- **Informativo**: Muestra progreso y mensajes claros en consola

#### 📊 Datos Incluidos

El script importa **8 conciertos**:

1. **Limp Bizkit** - Metropolitan Santiago (13 Dic 2025)
2. **Purple Disco Machine** - Teatro Caupolicán (13 Dic 2025)
3. **Bad Bunny** - Estadio Nacional (9 Ene 2026)
4. **Festival del Huaso** - Olmué (15 Ene 2026)
5. **Avenged Sevenfold** - Estadio Nacional (24 Ene 2026)
6. **My Chemical Romance** - Estadio Bicentenario (28 Ene 2026)
7. **Chayanne** - Movistar Arena (7 Feb 2026)
8. **AC/DC** - Estadio Nacional (11 Mar 2026)

#### 🔍 Verificación

Después de ejecutar el script:

1. Ve a tu [Sanity Studio](http://localhost:3000/studio)
2. Navega a "Concerts"
3. Deberías ver los 8 conciertos importados

#### ⚠️ Solución de Problemas

**Error: "Falta la variable de entorno SANITY_TOKEN"**
- Asegúrate de pasar el token al ejecutar el script

**Error 401: "Unauthorized"**
- Tu token es inválido o no tiene permisos de escritura
- Genera un nuevo token con permisos de Editor/Admin

**Error de módulo no encontrado**
- Asegúrate de estar en la raíz del proyecto
- El script usa `next-sanity` que ya está instalado

#### 📝 Notas

- El script usa el dataset `production` por defecto
- Los slugs son únicos y coinciden con las rutas de Next.js
- Cada concierto tiene tema (rock/pop/party/classic) para el diseño visual
