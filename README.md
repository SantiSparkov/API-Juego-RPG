## 🧾 ¿Qué es esta API y cómo funciona el juego?
Esta API implementa el backend de un juego RPG de crafteo. Su objetivo es modelar el ciclo clásico de progresión:

- Recolectar recursos en distintas ubicaciones (Bosque, Mina, Cantera) con resultados aleatorios influenciados por habilidades del jugador.
- Aprender/consultar recetas y craftear objetos consumiendo materiales.
- Gestionar el inventario del jugador y su progreso (nivel, experiencia, habilidades).

## 🚀 Tecnologías
- Node.js, Express.js
- TypeScript
- Jest + ts-jest (unit + e2e con Supertest)
- UUID v4 para IDs

## ✅ Requisitos
- Node.js 18+

## 📦 Instalación
- npm install

## 🧰 Scripts
- npm run build → Compila a `dist/`
- npm run dev → Desarrollo con recarga
- npm start → Ejecuta `dist/index.js`
- NODE_ENV=test npm test → Ejecuta tests unitarios y e2e

### 📁 Estructura detallada y responsabilidades
```
src/
├── controllers/
│   ├── craftController.ts        # Maneja POST /players/:id/craft
│   ├── gatherController.ts       # Maneja POST /players/:id/gather
│   ├── inventoryController.ts    # Maneja GET/DELETE inventario
│   ├── playersController.ts      # Maneja POST/GET/PUT de jugadores
│   └── recipesController.ts      # Maneja GET /recipes y /players/:id/recipes
│
├── middleware/
│   └── errorHandler.ts           # Manejo de errores centralizado (formatea { error })
│
├── models/
│   ├── index.ts                  # Re-exporta interfaces
│   ├── inventory.ts              # Interface InventoryItem
│   ├── location.ts               # Interface Location y yields
│   ├── player.ts                 # Interface Player y PlayerSkills
│   └── recipe.ts                 # Interface Recipe y tipos relacionados
│
├── repositories/
│   ├── playersRepo.ts            # Map en memoria para almacenar Player
│   └── staticData.ts             # Datos fijos: LOCATIONS y RECIPES
│
├── routes/
│   ├── locations.ts              # GET /locations
│   ├── players.ts                # Rutas de jugadores + subrecursos gather/craft/inventory
│   └── recipes.ts                # GET /recipes y GET /recipes/player/:id
│
├── services/
│   ├── craftService.ts           # Lógica de crafteo (verifica materiales, exp, resultado)
│   ├── gatherService.ts          # Lógica de recolección (RNG, skill bonus, exp)
│   └── playersService.ts         # Crear/obtener/actualizar jugadores
│
├── utils/
│   ├── inventory.ts              # add/remove/hasMaterials para inventario
│
└── index.ts                      # App Express: registra middleware y rutas, listen (no en test)

test/
├── e2e/
│   └── rpg.flows.e2e.spec.ts     # Flujo de punta a punta de la API
├── unit/
│   ├── controllers/              # Tests unitarios por controlador
│   ├── middleware/               # Tests de errorHandler
│   ├── repositories/             # Tests de repos
│   ├── services/                 # Tests de servicios (craft/gather/players)
│   └── utils/                    # Tests de utilidades (inventario)
```

### 🔄 Flujo de una petición
- Ruta (`routes/*`) dirige al controlador.
- Controlador valida input básico y delega en servicio.
- Servicio aplica reglas de dominio y usa repositorios/estáticos.
- Respuesta vuelve al controlador y se envía al cliente.
- Errores pasan a `errorHandler` para formato consistente `{ error: string }`.

## 🔑 Modelos principales
- Player: `id`(UUID), `name`, `level`, `experience`, `skills`{mining, woodcutting, crafting}, `inventory`, `createdAt`
- Recipe: `id`, `name`, `materials[]`, `result`, `experienceGain`
- Location: `id`, `name`, `skill`, `yields[]`
- InventoryItem: `itemId`, `name`, `quantity`, `rarity?`

## 🌐 Base URL
- http://localhost:3000

## 📡 Endpoints
- Jugadores
  - POST /players → Crea jugador. Body: `{ "name": "Alice" }`
  - GET /players/:id → Obtiene jugador
  - PUT /players/:id → Actualiza stats. Body (opcional): `{ level?, experience?, skills? }`
- Recolección
  - GET /locations → Lista ubicaciones
  - POST /players/:id/gather → Body: `{ "locationId": "forest" }`
- Recetas
  - GET /recipes → Lista recetas disponibles
  - GET /players/:id/recipes → Lista recetas aprendibles por el jugador
- Crafteo
  - POST /players/:id/craft → Body: `{ "recipeId": "wood_sword" }`
- Inventario
  - GET /players/:id/inventory → Lista inventario
  - DELETE /players/:id/inventory/:itemId → Body opcional `{ "quantity": 1 }`

Errores: `{ "error": "mensaje" }` con códigos 400/404/500.

## 🧪 Testing
- Unit tests: utilidades y servicios (inventario, players, gather, craft, repos)
- E2E: flujo completo API (crear jugador, gather, recetas, craft, inventario)
- Ejecutar: `NODE_ENV=test npm test`

Cobertura: configurada en `jest.config.js` con `collectCoverage` y `collectCoverageFrom`.

## 🧰 Postman
- Archivo: `Ejercicio-RPG.postman_collection.json`
- Pasos sugeridos:
  1) Importar la colección
  2) POST /players → copiar `id` y setear variable `playerId`
  3) GET /locations
  4) POST /players/:id/gather (repetir si hace falta más madera)
  5) GET /recipes y GET /players/:id/recipes
  6) POST /players/:id/craft (ej. `wood_sword`)
  7) GET /players/:id/inventory y DELETE item

## 💾 Persistencia
- En memoria (Map para jugadores; ubicaciones y recetas estáticas). IDs con UUID v4.

## 🔒 Manejo de errores
- Middleware `errorHandler` centralizado. Mensajes consistentes.

## 🔧 Notas
- `NODE_ENV=test` evita levantar el servidor (no `listen`) durante tests.
- Preparado para reemplazar repos en memoria por BD en el futuro.

### Conceptos del juego
- Jugador: entidad principal con `nivel`, `experiencia`, `habilidades` (mining, woodcutting, crafting) e `inventario`.
- Ubicaciones: definen qué ítems pueden caer, cantidades y probabilidades base; el skill relevante aumenta las chances.
- Recetas: especifican materiales requeridos, resultado y experiencia otorgada al craftear.
- Inventario: lista de ítems con cantidades; craftear consume materiales y agrega el resultado.

### Flujo típico de uso de la API
1) Crear un jugador (POST /players).
2) Consultar ubicaciones (GET /locations) y recolectar (POST /players/:id/gather) hasta juntar materiales.
3) Consultar recetas (GET /recipes o GET /players/:id/recipes).
4) Craftear (POST /players/:id/craft) para fabricar el ítem objetivo.
5) Ver/gestionar inventario (GET/DELETE /players/:id/inventory).

### Diseño de la API
- Principios REST: recursos claros (`players`, `locations`, `recipes`, `inventory`) y verbos HTTP correctos.
- Validación clásica: comprobaciones simples de entrada en controladores; errores consistentes con `{ error: string }`.
- Capas separadas: rutas → controladores → servicios → repositorios/datos.
- Almacenamiento en memoria: rápido para desarrollo y testing; fácilmente reemplazable por una base de datos.

### Experiencia y progresión
- Recolección otorga experiencia proporcional a lo obtenido y puede subir `level` (umbral por nivel) y mejorar habilidades indirectamente.
- Crafteo otorga experiencia específica de la receta y mejora `crafting`.

### Lo que incluye la API
- CRUD básico de jugador (crear, leer, actualizar stats).
- Recolección con RNG y bonus por habilidad.
- Recetas de ejemplo (Espada de Madera, Casco de Hierro, Anillo de Gema).
- Crafteo con verificación de materiales e impacto en inventario/experiencia.
- Gestión de inventario (listar, descartar cantidades).
- Suite de tests unitarios y e2e, y colección Postman para pruebas manuales.




