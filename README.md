# ITX Front-End Test

Mini aplicación SPA para comprar dispositivos móviles, desarrollada con React y TypeScript.
Basado en la prueba de Front para ITX


## Stack tecnológico

- React 19 + TypeScript
- React Router DOM v6
- Framer Motion para animaciones
- CSS puro (sin frameworks)


## Requisitos previos

- Node.js >= 16
- npm >= 8



## Instalación

- Clonar repositorio

```bash
npm install
```

## Funcionamiento

Levantar el Backend accediendo a https://itx-frontend-test.onrender.com/api/product
Está alojado en Render por lo que tarda en iniciar unos 30 segundos

Las variables de entorno se gestionan mediante archivos `.env` y `.env.production`.

Iniciar React, se abrirá una ventana de navegador en modo desarrollo
```bash
npm start
```



## Scripts

Modo desarrollo:
```bash
npm start
```

Modo Build para producción, gestión automática del API URL con archivos ENV
```bash
npm run build
```

Modo test, forzado en script para testear todos los archivos, testea las siguientes funcionalidades

```bash
npm test
```

| Archivo | Componente/Servicio | Funcionalidades testeadas |
|---------|-------------------|--------------------------|
| `cacheService.test.ts` | cacheService | Guardado en localStorage, recuperación de datos válidos, expiración a 1h, limpieza de entradas expiradas |
| `useProducts.test.ts` | useProducts | Listado completo, filtrado por marca, filtrado por modelo, filtrado case-insensitive, manejo de error |
| `useCart.test.ts` | useCart | Inicialización del contador, recuperación desde localStorage, incremento al añadir, persistencia, manejo de error |
| `Header.test.tsx` | Header | Renderizado del título, contador del carrito, breadcrumb en ruta principal, breadcrumb en detalle |
| `ProductCard.test.tsx` | ProductCard | Renderizado de marca, modelo y precio, evento onClick con id correcto |


Lint CHECK de codigo
```bash
npm run lint
```

## Arquitectura

- `src/models/` — Estructura de datos
- `src/services/` — API y gestión de cache
- `src/hooks/` — Logica de negocio compartida
- `src/components/` — Componentes de paginas
- `src/pages/` — Paginas PLP y PDP
- `src/context/` — Contexto global


## Observaciones

- Los datos en cache se guardan en `localStorage` durante 1 hora para evitar peticiones innecesarias a la API
- El servidor de la API está en Render y puede tardar hasta 30 segundos en responder la primera vez por cold start
- El contador del carrito se persiste en `localStorage` entre sesiones