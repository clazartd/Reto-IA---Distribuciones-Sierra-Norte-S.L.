# Active Context

## Funcionalidad: Gestión de navegación y roles (Nueva)

### Objetivo
Implementar un sistema de navegación frontend seguro y escalable que:

- Proteja rutas según autenticación y rol (usando guards especializados)
- Permita navegación coherente y restringida por perfil de usuario
- Realice redirecciones automáticas a vistas válidas y seguras
- Oculte en el menú (UI) las opciones no autorizadas al perfil activo
- Sirva como base para módulos funcionales futuros (mínima lógica hardcoded)

### Roles (definidos en `core/constants/roles.constants.ts`)
- DIRECCION
- COMERCIAL
- ALMACEN
- REPARTO
- ADMINISTRACION

### Componentes y Elementos Implementados/Por Implementar

#### 1. Guards de navegación

- **AuthGuard**: Verifica sesión activa, redirige a `/login` si no existe.
- **RoleGuard**: Revisa si el usuario autenticado (obtenido vía `SessionService`) tiene acceso según `route.data.roles`.
  - Si no está autorizado: redirige a una vista segura (ej. home por rol o `/login`).
  - Sin lógica de negocio, solo chequeo de rol y acceso.

#### 2. Routing protegido y lazy-loaded

- Todas las rutas/procesos sensibles protegidas con:
  - `canActivate: [AuthGuard, RoleGuard]`
  - `data: { roles: ['ROL1', 'ROL2'] }`
- Lazy loading obligatorio para los módulos por feature.
- Rutas de login sin restricciones.

#### 3. Acceso por rol (tabla de permisos)

| Rol         | Puede acceder                    | No puede acceder               |
|-------------|----------------------------------|-------------------------------|
| DIRECCION   | Consulta global, Histórico       | Acciones operativas           |
| COMERCIAL   | Consulta/Registro/Modif. pedidos | Preparación, Reparto, Histórico|
| ALMACEN     | Pendientes/Preparación pedidos   | Registro/Edición, Reparto     |
| REPARTO     | Pedidos en reparto, Confirmación | Registro/Preparación, Histórico|
| ADMINISTRACION | Consulta/Historico pedidos    | Acciones operativas           |

#### 4. Menú de navegación dinámico

- Construido con base en el rol (SessionService)
- Solo muestra links permitidos al perfil activo (nunca muestra links deshabilitados)
- Textos claros, estructura simple, reacción instantánea ante login/logout

#### 5. Redirecciones automáticas

- Tras login: Según rol inicial asignar ruta base permitida (primera opción válida).
- Error acceso: Si el usuario intenta acceder a una ruta no permitida, se redirige automáticamente a una ruta segura relevante a su perfil o a login.

#### 6. Base técnica

- Guards y sistema de menús desacoplados de lógica de negocio, listos para conectar con módulos futuros.
- No redefinir roles; ampliar `roles.constants.ts` solo si nace un nuevo perfil global.
- Toda gestión de sesión/rol via `SessionService`.

---

> Este contexto se irá refinando según se desarrollen guards, menús y ajustes en la navegación. Las reglas de acceso arriba citadas deben ser invariables para el control seguro de la aplicación.
