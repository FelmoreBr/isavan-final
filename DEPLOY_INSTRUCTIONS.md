# Guía de Despliegue para Isavan Web - Actualizada

He completado los pasos técnicos iniciales en este entorno. Aquí está el estado actual y lo que falta por hacer.

## ✅ Lo que ya hice
1.  **Instalación de Dependencias**: Ya ejecuté `npm install`. El proyecto tiene todas sus librerías listas.
2.  **Configuración de Git**: El repositorio local está inicializado y conectado al remoto (`https://github.com/FelmoreBr/IsavanWeb-v2.git`).
3.  **Preparación de Código**: He realizado un commit con todos los cambios necesarios.

## 🚀 Pasos Finales (Debes realizarlos tú)

### 1. Subir el código a GitHub
Como Git requiere autenticación en tu navegador, por favor ejecuta este comando en tu terminal:

```powershell
git push -u origin main
```
*Si te pide iniciar sesión, sigue las instrucciones en la ventana que se abrirá en tu navegador.*

### 2. Configurar el Dashboard de Sanity (Si no lo has hecho)
Asegúrate de que tu proyecto en [sanity.io/manage](https://www.sanity.io/manage):
- Permita CORS desde el dominio de tu futura web y desde Vercel (`*.vercel.app`).
- Tenga el Dataset correcto (usualmente `production`).

### 3. Despliegue en Vercel
1. Ve a [Vercel](https://vercel.com/new).
2. Selecciona el repositorio **IsavanWeb-v2**.
3. En la sección **Environment Variables**, añade estas dos (puedes copiarlas de tu `.env.local` si las tienes ahí):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Haz clic en **Deploy**.

## 🛠️ Notas Adicionales
- **Sanity Studio**: Está integrado en la ruta `/studio`. No necesitas desplegarlo por separado.
- **Scripts de Semilla**: Si necesitas importar datos iniciales, puedes usar `npm run seed:concerts` una vez que tengas las variables de entorno configuradas localmente.

¡Tu web estará en línea en unos minutos!
