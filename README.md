# Talaria Links Web

Frontend de **Talaria Links**, un acortador de enlaces con cuentas de usuario, roles y registro de clics. Permite acortar enlaces, administrarlos desde un panel personal, explorar los enlaces públicos de la comunidad y, con rol de administrador, gestionar usuarios y moderar todos los enlaces.

La API se encuentra en el repositorio [talaria-links-api](https://github.com/ArmandoReyes105/talaria-links-api).

## Stack

- Next.js 16 (App Router)
- React 19 y TypeScript
- Tailwind CSS v4
- shadcn/ui (sobre Base UI)
- Recharts para gráficas
- Lucide para íconos

## Requisitos

- Node.js 20.9 o superior
- npm
- La [API de Talaria Links](https://github.com/ArmandoReyes105/talaria-links-api) en ejecución

## Configuración

1. Instala las dependencias:

```bash
npm install
```

2. Crea el archivo de variables de entorno a partir del ejemplo:

```bash
cp .env.example .env.local
```

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base de la API | `https://localhost:7151` |

La API debe incluir `http://localhost:3000` en `Cors:AllowedOrigins` para aceptar las peticiones del frontend.

## Ejecución

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

## Scripts

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción |
| `npm run start` | Ejecuta la versión de producción |
| `npm run lint` | Analiza el código con ESLint |
| `npm run typecheck` | Verifica los tipos con TypeScript |
| `npm run format` | Formatea el código con Prettier |

## Funcionalidades

### Invitado

- Ver los enlaces públicos de la comunidad, ordenados por más clicados o más recientes.
- Paginación de los enlaces públicos y copia del enlace corto.
- Registro e inicio de sesión.

### Usuario

- Acortar enlaces desde la página de inicio o desde su panel.
- Listar sus enlaces con filtro por visibilidad (todos, públicos o privados) y paginación.
- Editar el destino, el título y la visibilidad de sus enlaces.
- Eliminar enlaces con confirmación.
- Ver el número de clics de cada enlace.

### Administrador

- Todo lo que puede hacer un usuario.
- Buscar usuarios por nombre de usuario o email.
- Asignar o quitar el rol de administrador a otros usuarios.
- Buscar todos los enlaces de la plataforma por código o por dueño, incluidos los privados.
- Eliminar cualquier enlace.

## Estructura del proyecto

```
talaria-links-web/
├── app/             # Rutas de la aplicación (App Router)
│   ├── _components/ # Secciones de la página de inicio
│   ├── admin/       # Panel de administración (usuarios y enlaces)
│   ├── dashboard/   # Panel del usuario (mis enlaces)
│   ├── login/       # Inicio de sesión
│   └── register/    # Registro
├── components/      # Componentes compartidos (sidebar, navbar, botones)
│   └── ui/          # Componentes de shadcn/ui
├── hooks/           # Hooks de datos (listados, búsqueda y paginación)
├── lib/             # Cliente HTTP, navegación y utilidades
├── providers/       # Contexto de autenticación
├── services/        # Funciones de acceso a la API
└── types/           # Tipos de TypeScript de la API
```

## Decisiones técnicas

- **Capas separadas:** los componentes no llaman a la API directamente. Los `services/` encapsulan las peticiones, los `hooks/` manejan el estado (carga, errores, paginación y búsqueda) y los componentes solo muestran la información.
- **Contenedor y presentación:** las páginas obtienen los datos con los hooks y los componentes de tabla y tarjeta reciben todo por props.
- **Autenticación con cookie `httpOnly`:** el token nunca se expone a JavaScript, lo que lo protege frente a ataques XSS. El estado de la sesión se obtiene consultando `/api/auth/me`.
- **Protección de rutas por rol:** el panel y la administración redirigen a quien no tiene sesión o permisos. La autorización real se aplica en la API.
- **Navegación por rol:** el menú lateral se genera a partir de una configuración que define qué secciones ve cada tipo de usuario.
- **Búsqueda con debounce:** las búsquedas esperan a que el usuario deje de escribir para no enviar una petición por cada tecla.
- **Diseño adaptable:** la interfaz se ajusta a distintos tamaños de pantalla; en dispositivos móviles el menú lateral se muestra como panel desplegable.
