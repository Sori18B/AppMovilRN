# 🎨 Guía de Estilo Visual - Ecommerce App

## 📋 Tabla de Contenidos

1. [Paleta de Colores](#paleta-de-colores)
2. [Tipografía](#tipografía)
3. [Espaciado y Layout](#espaciado-y-layout)
4. [Componentes](#componentes)
5. [Animaciones](#animaciones)
6. [Mejores Prácticas](#mejores-prácticas)

---

## 🎨 Paleta de Colores

### Colores Primarios (Morado/Púrpura)

```typescript
primary: '#7C3AED'; // Morado principal - Botones, iconos activos, acciones principales
primaryLight: '#A78BFA'; // Morado claro - Backgrounds secundarios, hover states
primaryDark: '#6D28D9'; // Morado oscuro - Textos sobre fondos claros, estados pressed
```

**Uso:**

- ✅ Botones principales (CTA)
- ✅ Iconos de navegación activos
- ✅ Links y elementos interactivos
- ✅ Borders de inputs con foco
- ✅ Badges y etiquetas importantes

### Colores Secundarios (Rosa/Magenta)

```typescript
secondary: '#EC4899'; // Rosa - Complementa al morado
secondaryLight: '#F472B6'; // Rosa claro - Accents
secondaryDark: '#DB2777'; // Rosa oscuro - Estados hover
```

**Uso:**

- ✅ Accents y detalles visuales
- ✅ Badges de categorías
- ✅ Elementos decorativos

### Colores de Fondo

```typescript
background: '#F5F3FF'; // Lavanda muy suave - Background principal de la app
backgroundLight: '#FFFFFF'; // Blanco - Cards, modales, headers
backgroundDark: '#EDE9FE'; // Lavanda - Secciones destacadas
```

### Colores de Estado

```typescript
success: '#10B981'; // Verde - Éxito, confirmaciones
error: '#EF4444'; // Rojo - Errores, validaciones fallidas
warning: '#F59E0B'; // Ámbar - Advertencias
info: '#A78BFA'; // Morado claro - Información
```

### Escala de Grises

```typescript
gray50: '#F9FAFB'; // Muy claro
gray100: '#F3F4F6';
gray200: '#E5E7EB'; // Borders sutiles
gray300: '#D1D5DB'; // Disabled elements
gray400: '#9CA3AF';
gray500: '#6B7280'; // Iconos inactivos
gray600: '#4B5563';
gray700: '#374151';
gray800: '#1F2937';
gray900: '#111827'; // Textos muy oscuros
```

### Colores de Texto

```typescript
textPrimary: '#2D3748'; // Títulos, textos principales
textSecondary: '#718096'; // Subtítulos, descripciones
textLight: '#A0AEC0'; // Placeholders, textos terciarios
```

---

## 🔤 Tipografía

### Jerarquía de Tamaños

```typescript
// Títulos
h1: 32px, fontWeight: 'bold'
h2: 28px, fontWeight: 'bold'
h3: 24px, fontWeight: '600'
h4: 20px, fontWeight: '600'

// Cuerpo
body: 16px, fontWeight: '400'
bodyBold: 16px, fontWeight: '600'
small: 14px, fontWeight: '400'
caption: 12px, fontWeight: '400'

// Botones
button: 16px, fontWeight: '600'
```

### Mejores Prácticas

- ✅ Usar `fontWeight` numérico ('400', '500', '600', 'bold')
- ✅ Mantener line-height entre 1.4-1.6 para legibilidad
- ❌ Evitar más de 3 tamaños de fuente por pantalla

---

## 📏 Espaciado y Layout

### Sistema de Espaciado (Base 4px)

```typescript
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 20px
xxl: 24px
xxxl: 32px
```

### Padding de Contenedores

```typescript
screenPadding: 20px      // Padding horizontal de pantallas
cardPadding: 16px        // Padding interno de cards
buttonPadding: 12-16px   // Padding vertical de botones
```

### Border Radius

```typescript
small: 5px    // Inputs, badges pequeños
medium: 8px   // Botones, cards pequeños
large: 12px   // Cards principales
xl: 16px      // Modales, containers grandes
```

### Sombras

```typescript
// Small
shadowColor: '#000000'
shadowOffset: { width: 0, height: 1 }
shadowOpacity: 0.05
shadowRadius: 2
elevation: 1

// Medium
shadowOffset: { width: 0, height: 2 }
shadowOpacity: 0.1
shadowRadius: 4
elevation: 3

// Large
shadowOffset: { width: 0, height: 4 }
shadowOpacity: 0.15
shadowRadius: 8
elevation: 5
```

---

## 🧩 Componentes

### Botones

#### Primary Button

```tsx
backgroundColor: colors.primary (#7C3AED)
color: colors.white
borderRadius: 8-12px
padding: 12-16px vertical
fontWeight: '600'
```

#### Secondary Button

```tsx
backgroundColor: 'transparent';
borderWidth: 2;
borderColor: colors.primary;
color: colors.primary;
```

#### Ghost Button

```tsx
backgroundColor: 'transparent';
color: colors.primary;
// Sin border
```

### Inputs

```tsx
borderWidth: 2
borderColor: colors.primary (#7C3AED)
borderRadius: 5px
padding: 12px
color: colors.textPrimary
fontSize: 16px
```

**Estados:**

- Focus: `borderColor: colors.primary`
- Error: `borderColor: colors.error`
- Disabled: `borderColor: colors.gray300, backgroundColor: colors.gray100`

### Cards

```tsx
backgroundColor: colors.white
borderRadius: 12px
padding: 16px
shadowColor: colors.primary
shadowOpacity: 0.05-0.1
```

### Navigation Tabs

```tsx
activeTintColor: colors.primary (#7C3AED)
inactiveTintColor: colors.gray500 (#6B7280)
backgroundColor: colors.white
```

---

## ✨ Animaciones

### Principios

1. **Duración:** 100-300ms para interacciones, 400-600ms para transiciones
2. **Easing:** Spring para natural feedback, Timing para transiciones lineales
3. **Native Driver:** Siempre usar `useNativeDriver: true` para performance

### Patrones Comunes

#### Spring Scale Animation (Press Feedback)

```tsx
const [scaleAnim] = useState(new Animated.Value(1));

const handlePressIn = () => {
  Animated.spring(scaleAnim, {
    toValue: 0.96,
    useNativeDriver: true,
  }).start();
};

const handlePressOut = () => {
  Animated.spring(scaleAnim, {
    toValue: 1,
    friction: 3,
    tension: 40,
    useNativeDriver: true,
  }).start();
};
```

**Escalas recomendadas:**

- Botones grandes: 0.96
- Botones pequeños: 0.98
- Cards: 0.95
- Elementos delicados: 0.98

#### Fade Animation

```tsx
const [fadeAnim] = useState(new Animated.Value(1));

Animated.timing(fadeAnim, {
  toValue: 0.6,
  duration: 100,
  useNativeDriver: true,
}).start();
```

#### Color Interpolation

```tsx
const bgColorAnim = fadeAnim.interpolate({
  inputRange: [0, 1],
  outputRange: [colors.white, colors.background],
});
```

---

## ✅ Mejores Prácticas

### Uso de Colores

#### ✅ HACER

```tsx
import { colors } from '../theme';

<View style={{ backgroundColor: colors.primary }} />
<Text style={{ color: colors.textPrimary }} />
```

#### ❌ NO HACER

```tsx
<View style={{ backgroundColor: '#7C3AED' }} /> // Hardcoded
<View style={{ backgroundColor: 'blue' }} />    // Color genérico
<View style={{ backgroundColor: 'black' }} />   // Inconsistente con el diseño
```

### Componentes Reutilizables

#### ✅ HACER

- Crear componentes en `src/components/` organizados por categoría
- Usar props para personalización
- Mantener componentes pequeños y enfocados (Single Responsibility)

```tsx
// ✅ Bueno
<Button variant="primary" size="large" onPress={handlePress}>
  Continuar
</Button>

// ❌ Malo
<TouchableOpacity style={[styles.button, { backgroundColor: '#7C3AED' }]}>
  <Text style={{ color: 'white' }}>Continuar</Text>
</TouchableOpacity>
```

### Animaciones

#### ✅ HACER

- Usar animaciones para feedback visual
- Mantener duraciones cortas (100-300ms)
- Usar `useNativeDriver: true` siempre que sea posible

#### ❌ NO HACER

- Animaciones muy largas (>500ms) para interacciones simples
- Múltiples animaciones simultáneas que distraen
- Animaciones sin `useNativeDriver` en propiedades compatibles

### Accesibilidad

#### ✅ HACER

```tsx
<TouchableOpacity
  accessibilityLabel="Agregar al carrito"
  accessibilityRole="button"
  accessibilityState={{ disabled: loading }}
>
  <Text>Agregar</Text>
</TouchableOpacity>
```

- Proporcionar `accessibilityLabel` descriptivos
- Usar `accessibilityRole` apropiado
- Contraste de color mínimo 4.5:1 para texto

### Performance

#### ✅ HACER

- Extraer estilos a StyleSheet.create()
- Usar memo/useMemo para componentes pesados
- Optimizar FlatList con `keyExtractor` y `getItemLayout`

```tsx
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 16,
  },
});
```

---

## 🔄 Mantenimiento

### Cuando agregar nuevos colores:

1. ¿El color es necesario o puedo usar uno existente?
2. ¿Complementa la paleta actual?
3. Agregarlo a `src/theme/colors.ts`
4. Documentarlo aquí

### Cuando crear nuevos componentes:

1. ¿Se usará en más de un lugar?
2. ¿Es suficientemente genérico?
3. Agregarlo a la carpeta apropiada en `src/components/`
4. Exportarlo desde el index.ts correspondiente

### Code Review Checklist:

- [ ] ¿Usa `colors` del theme en lugar de hardcoded?
- [ ] ¿Las animaciones usan `useNativeDriver`?
- [ ] ¿Los componentes son reutilizables?
- [ ] ¿Los estilos están en StyleSheet.create()?
- [ ] ¿Tiene accessibilityLabel cuando es necesario?
- [ ] ¿Es consistente con el resto de la app?

---

## 📚 Recursos

### Archivos Clave

- `src/theme/colors.ts` - Definición de toda la paleta
- `src/theme/spacing.ts` - Sistema de espaciado y sombras
- `src/components/` - Componentes reutilizables
- `src/constants/colors.ts` - Constantes legacy (migrar a theme)

### Herramientas

- [Coolors.co](https://coolors.co) - Paletas de colores
- [Material Design](https://material.io/design/color) - Guía de colores
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verificar contraste

---

**Última actualización:** 24 de octubre de 2025
**Versión:** 1.0.0
