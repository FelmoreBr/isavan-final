# FleetSection - Documentación de Implementación

## 📋 Descripción
Componente moderno de "Nuestra Flota" con diseño split-screen que muestra dos vehículos lado a lado.

## 🎨 Características
- ✅ Diseño split-screen (50/50) en desktop
- ✅ Apilado vertical en móvil
- ✅ Imágenes de fondo con efectos hover
- ✅ Listas de beneficios con íconos de Lucide React
- ✅ Botones CTA verdes con animaciones
- ✅ Transición central sutil en desktop
- ✅ Totalmente responsivo
- ✅ Efectos de glassmorphism en badges

## 🚀 Uso

### 1. Importar en tu página
```tsx
import FleetSection from '@/components/home/FleetSection';

export default function Home() {
  return (
    <main>
      {/* Otras secciones */}
      <FleetSection />
      {/* Más secciones */}
    </main>
  );
}
```

### 2. Agregar imágenes
Coloca las siguientes imágenes en `public/images/`:
- `peugeot-308-bg.jpg` (Recomendado: 1920x1080px, landscape)
- `peugeot-traveller-bg.jpg` (Recomendado: 1920x1080px, landscape)

**Tip:** Usa imágenes de alta calidad con los vehículos en ángulo 3/4 frontal.

## 🎯 Estructura del Componente

```
FleetSection
├── Mitad Izquierda (Peugeot 308)
│   ├── Imagen de fondo con overlay
│   ├── Badge "Ejecutivo"
│   ├── Título + Subtítulo
│   ├── Descripción
│   ├── Lista de 4 beneficios
│   └── Botón "Reservar Auto"
│
├── Transición Central (línea verde)
│
└── Mitad Derecha (Peugeot Traveller)
    ├── Imagen de fondo con overlay
    ├── Badge "Grupal"
    ├── Título + Subtítulo
    ├── Descripción
    ├── Lista de 4 beneficios
    └── Botón "Reservar Van"
```

## 📱 Responsividad

| Breakpoint | Comportamiento |
|------------|----------------|
| `xs/sm/md` | Apilado vertical (50vh cada mitad) |
| `lg+` | Split-screen horizontal (50% cada mitad) |

## 🎨 Personalización

### Cambiar colores del CTA
```tsx
// Línea 101 y 186
className="... bg-green-600 hover:bg-green-500 ..."
// Cambia green-600 por tu color preferido
```

### Modificar beneficios
Edita las listas `<ul>` en las líneas 69-99 (308) y 154-184 (Traveller).

### Ajustar altura mínima
```tsx
// Línea 9
className="... min-h-screen ..."
// Cambia a min-h-[80vh] o tu preferencia
```

## 🔗 Enlaces
Los botones "Reservar Auto" y "Reservar Van" apuntan a `#contacto`.
Modifica el `href` en las líneas 101 y 186 según necesites.

## 🎭 Efectos Implementados
- **Hover en imágenes:** Brightness aumenta y escala 105%
- **Hover en beneficios:** Background de íconos se ilumina
- **Hover en botones:** Escala 105% con transición suave
- **Gradientes:** Overlays para legibilidad del texto

## 📦 Dependencias
- `next/image` (Next.js)
- `next/link` (Next.js)
- `lucide-react` (Íconos)

## 💡 Tips de Optimización
1. Usa imágenes WebP para mejor rendimiento
2. Asegúrate de que las imágenes sean < 500KB
3. Considera lazy loading para imágenes no críticas
4. Prueba en diferentes dispositivos

## 🐛 Troubleshooting

### Las imágenes no se muestran
- Verifica que las rutas sean correctas: `/images/peugeot-308-bg.jpg`
- Asegúrate de que las imágenes estén en `public/images/`

### El layout se rompe en móvil
- Verifica que Tailwind esté configurado correctamente
- Revisa que los breakpoints `lg:` estén funcionando

### Los íconos no aparecen
- Instala lucide-react: `npm install lucide-react`
- Verifica las importaciones en la línea 5

## 📄 Licencia
Componente creado para Isavan - Traslados VIP
