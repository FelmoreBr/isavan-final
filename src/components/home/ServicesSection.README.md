# Sección de Servicios - Guía de Imágenes

## 📸 Imágenes Requeridas

La sección "Soluciones de Transporte" utiliza 5 imágenes de fondo para las tarjetas grandes. Actualmente están usando placeholders temporales que deben ser reemplazadas con imágenes reales del cliente.

### Ubicación de las Imágenes
Todas las imágenes deben estar en: `public/images/`

### Imágenes a Reemplazar

| Archivo | Servicio | Descripción Sugerida | Dimensiones Recomendadas |
|---------|----------|---------------------|-------------------------|
| `matri-big.jpg` | Matrimonios | Foto de ceremonia o celebración de boda | 600x600px mínimo |
| `limache-big.jpg` | Limache FC | Estadio, hinchada o jugadores del equipo | 600x600px mínimo |
| `sur-big.jpg` | Turismo Sur | Paisaje del sur de Chile (Pucón, Valdivia, etc.) | 600x600px mínimo |
| `empresas-big.jpg` | Empresas | Profesionales en vehículo o transporte corporativo | 600x600px mínimo |
| `fiesta-big.jpg` | Eventos Nocturnos | Ambiente de fiesta o salida nocturna | 600x600px mínimo |

### Características de las Imágenes

- **Formato**: JPG o PNG
- **Tamaño**: Mínimo 600x600px (se recomienda 800x800px o superior)
- **Estilo**: Las imágenes se muestran en escala de grises (`grayscale filter`) con opacidad del 60%
- **Posición**: Se ubican en la esquina inferior derecha de cada tarjeta grande
- **Optimización**: Comprimir las imágenes para web (calidad 80-85%)

### Cómo Reemplazar las Imágenes

1. Preparar las imágenes según las especificaciones anteriores
2. Guardar cada imagen con el nombre exacto indicado en la tabla
3. Copiar las imágenes a la carpeta `public/images/`
4. Las imágenes se actualizarán automáticamente en el sitio

### Notas Técnicas

- Las imágenes actuales (`matri-big.jpg` tiene una imagen generada, las demás son placeholders del logo de la van)
- El componente aplica automáticamente:
  - Filtro de escala de grises
  - Opacidad al 60%
  - Bordes redondeados
  - Posicionamiento absoluto en la esquina inferior derecha

### Servicios en la Sección

1. **Matrimonios** (Rosa/Pink)
   - Grande: "Transporte para tu Matrimonio"
   - Chico: "Rondas de Retorno"

2. **Limache FC** (Rojo/Red)
   - Chico: "Ruta a Santiago"
   - Grande: "Partidos en Quillota ⚽"

3. **Turismo** (Verde/Emerald)
   - Grande: "Giras al Sur de Chile"
   - Chico: "Turismo Local"

4. **Empresas** (Gris/Slate)
   - Chico: "Convenio Factura 30 Días"
   - Grande: "Transporte de Personal"

5. **Eventos** (Violeta/Violet)
   - Grande: "Salidas Nocturnas y Pubs"
   - Chico: "Cuida tu Licencia"

---

## 🎨 Paleta de Colores por Servicio

- **Matrimonios**: `bg-pink-900` / `bg-pink-800`
- **Limache FC**: `bg-red-800` / `bg-red-900`
- **Turismo**: `bg-emerald-900` / `bg-emerald-800`
- **Empresas**: `bg-slate-800` / `bg-slate-900`
- **Eventos**: `bg-violet-900` / `bg-violet-800`

---

**Última actualización**: Diciembre 2025
