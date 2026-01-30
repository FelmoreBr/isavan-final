# 🎸 Guía Rápida: Importar Conciertos a Sanity

## 📋 Pasos para Ejecutar el Script de Seeding

### 1️⃣ Obtener tu Token de Sanity

1. Ve a [Sanity Manage](https://sanity.io/manage)
2. Selecciona tu proyecto
3. Navega a **API** → **Tokens**
4. Haz clic en **"Add API token"**
5. Configura:
   - **Name**: `Import Script Token`
   - **Permissions**: **Editor** o **Admin**
6. Copia el token (⚠️ solo se muestra una vez)

### 2️⃣ Ejecutar el Script

Tienes 2 opciones:

#### Opción A: Comando directo (Recomendado)
```bash
SANITY_TOKEN=tu_token_aqui npm run seed:concerts
```

#### Opción B: Agregar a .env.local
1. Abre `.env.local`
2. Agrega esta línea:
   ```
   SANITY_TOKEN=tu_token_aqui
   ```
3. Ejecuta:
   ```bash
   npm run seed:concerts
   ```

### 3️⃣ Verificar los Datos

1. Abre tu Sanity Studio: http://localhost:3000/studio
2. Ve a la sección **"Concerts"**
3. Deberías ver **8 conciertos** importados

### ✅ Conciertos Importados

- ✅ Limp Bizkit - Metropolitan Santiago (13 Dic 2025)
- ✅ Purple Disco Machine - Teatro Caupolicán (13 Dic 2025)
- ✅ Bad Bunny - Estadio Nacional (9 Ene 2026)
- ✅ Festival del Huaso - Olmué (15 Ene 2026)
- ✅ Avenged Sevenfold - Estadio Nacional (24 Ene 2026)
- ✅ My Chemical Romance - Estadio Bicentenario (28 Ene 2026)
- ✅ Chayanne - Movistar Arena (7 Feb 2026)
- ✅ AC/DC - Estadio Nacional (11 Mar 2026)

### 🔄 Nota sobre Idempotencia

El script es **idempotente**: puedes ejecutarlo múltiples veces sin duplicar datos.
Usa `createOrReplace` basado en el `_id` de cada concierto.

### ❓ Problemas Comunes

**"Falta la variable de entorno SANITY_TOKEN"**
→ Asegúrate de pasar el token al ejecutar el comando

**Error 401: Unauthorized**
→ Tu token no tiene permisos de escritura. Genera uno nuevo con permisos de Editor/Admin

**Los conciertos no aparecen en el sitio**
→ Espera unos segundos y recarga la página. Next.js usa caché.

---

📚 **Documentación completa**: Ver `scripts/README.md`
