# Lógica de la app Eventos

Este documento explica cómo está armada la app, cómo navega entre vistas y, sobre todo, cómo se crea un evento paso a paso.

## 1. Idea general

La app es una demo frontend hecha con React + Vite + React Router. Trabaja con datos mockeados en memoria, así que no hay backend real ni persistencia.

Eso significa que:

- Los eventos, invitados, mesas y fotos vienen desde archivos `mock`.
- Algunas pantallas crean datos nuevos solo en estado local.
- Si recargas la página, esos cambios se pierden.

## 2. Entrada de la app

El arranque pasa por estos archivos:

- [src/main.tsx](src/main.tsx)
- [src/App.tsx](src/App.tsx)
- [src/routes/AppRouter.tsx](src/routes/AppRouter.tsx)

### Qué hace cada uno

- `main.tsx` monta la app en el DOM.
- `App.tsx` solo renderiza el router.
- `AppRouter.tsx` define todas las rutas.

## 3. Rutas principales

Las rutas están definidas así:

- `/` -> Landing
- `/dashboard` -> Dashboard
- `/guests` -> Invitados sin evento específico
- `/tables` -> Mesas sin evento específico
- `/qr` -> QR sin evento específico
- `/pdf` -> PDFs
- `/event/:eventId/guests` -> Invitados de un evento
- `/event/:eventId/tables` -> Mesas de un evento
- `/login` -> Login mock

La navegación principal vive dentro de [src/presentation/layouts/MainLayout.tsx](src/presentation/layouts/MainLayout.tsx), que muestra el menú superior y un `<Outlet />` para la vista activa.

## 4. Landing Page

Archivo: [src/presentation/pages/LandingPage.tsx](src/presentation/pages/LandingPage.tsx)

### Qué hace

La landing solo presenta la app y empuja al usuario al dashboard.

### Flujo

1. Muestra hero, features y CTA.
2. Los botones principales apuntan a `/dashboard`.
3. No crea datos ni modifica estado.

### Importante

La landing es solo presentación. No participa en la lógica de negocio.

## 5. Cómo se crea un evento

Archivo clave: [src/presentation/pages/DashboardPage.tsx](src/presentation/pages/DashboardPage.tsx)

### Paso a paso real

#### Paso 1: se cargan los eventos mock

El dashboard importa `events` desde [src/infrastructure/mocks/event.mock.ts](src/infrastructure/mocks/event.mock.ts).

Luego el hook local `useEvents()` crea un estado con esos eventos:

- `allEvents`
- `addEvent(event)`

#### Paso 2: se abre el modal de creación

Al pulsar el botón “Nuevo evento”, se abre un modal con el formulario.

#### Paso 3: se capturan los datos

El formulario guarda:

- nombre
- fecha
- ubicación
- descripción
- imagen de portada
- cantidad de mesas

#### Paso 4: se valida

Antes de guardar, la app exige:

- nombre
- fecha
- lugar

Si falta algo, aparece un mensaje de error y no se guarda nada.

#### Paso 5: se procesa la imagen

Si el usuario sube una imagen:

- se usa `FileReader`
- se genera un preview en base64
- esa imagen sustituye la portada por defecto

Si no sube imagen, usa la portada base del mock.

#### Paso 6: se crea el objeto evento

Cuando todo está correcto, se construye un nuevo evento con:

- `id`: generado con `Date.now()`
- `name`
- `date`
- `location`
- `description`
- `coverImage`
- `tablesCount`

#### Paso 7: se agrega al estado local

La función `addEvent(...)` hace un `setAllEvents([...prev, event])`.

Eso significa que el evento nuevo solo existe en memoria dentro de ese componente.

#### Paso 8: feedback visual

La UI:

- muestra estado de carga
- luego marca éxito
- cierra el modal
- limpia el formulario
- borra la imagen temporal

## 6. Qué pasa después de crear un evento

Aquí está el punto más importante:

- El evento nuevo aparece en el listado del dashboard.
- Pero no se guarda en un store global.
- Tampoco se persiste en backend.
- Tampoco se sincroniza con `GuestsPage`, `TablesPage` o `QRPage`.

O sea: el evento existe mientras estás en esa pantalla y mientras no recargues.

## 7. Cómo se abre el flujo de invitados desde un evento

Desde el dashboard, cada tarjeta de evento ejecuta:

- `navigate(`/event/${event.id}/guests`)`

Entonces la ruta cambia a la vista de invitados con el `eventId` en la URL.

## 8. Guests Page

Archivo: [src/presentation/pages/GuestsPage.tsx](src/presentation/pages/GuestsPage.tsx)

### Qué hace

Esta vista muestra invitados filtrados por evento y permite agregar más invitados.

### Cómo obtiene el evento activo

Usa `useParams()` para leer `eventId` desde la ruta.

### Cómo carga los invitados

Hace esto:

- toma `guests` desde [src/infrastructure/mocks/guests.mock.ts](src/infrastructure/mocks/guests.mock.ts)
- filtra los invitados cuyo `eventId` coincide con el de la URL

### Cómo se agregan invitados

1. Se abre un modal.
2. Se llena nombre, email, RSVP y mesa.
3. Se valida que nombre y email existan.
4. Se crea un nuevo invitado con `Date.now()`.
5. Se llama `addGuest(...)`.

### Limitación

Igual que en el dashboard, ese invitado solo vive en el estado local de la pantalla.

### Extra

La vista también:

- cuenta confirmados
- cuenta pendientes
- cuenta rechazados
- muestra mesas asociadas al evento

## 9. Tables Page

Archivo: [src/presentation/pages/TablesPage.tsx](src/presentation/pages/TablesPage.tsx)

### Qué hace

Permite elegir un evento y después ver sus mesas.

### Flujo

1. Primero muestra una grilla de eventos.
2. El usuario selecciona uno.
3. La vista filtra mesas e invitados por ese evento.
4. Después muestra las mesas.
5. Al hacer click en una mesa, aparece un modal con detalle.

### Qué datos usa

- eventos desde `event.mock`
- mesas desde `tables.mock`
- invitados desde `guests.mock`

### Lógica interna

- `selectedEvent` guarda el evento activo.
- `selectedTable` guarda la mesa activa.
- `filteredTables` contiene las mesas del evento.
- `filteredGuests` contiene los invitados del evento.

## 10. QR Page

Archivo: [src/presentation/pages/QRPage.tsx](src/presentation/pages/QRPage.tsx)

### Qué hace

Funciona parecido a Tables Page, pero enfocado en QR y galería de fotos.

### Flujo

1. El usuario elige un evento.
2. Se muestran sus mesas.
3. Cada mesa genera un QR con `QRCodeCanvas`.
4. Al abrir una mesa, aparece un modal con:
   - QR grande
   - identificador de la mesa
   - galería de fotos asociadas

### Cómo filtra las fotos

Las fotos vienen desde [src/infrastructure/mocks/photos.mock.ts](src/infrastructure/mocks/photos.mock.ts).

Se filtran por `tableId`.

### Limitación

El QR y la galería son mock visuales. No hay subida real de fotos ni backend de almacenamiento.

## 11. PDF Page

Archivo: [src/presentation/pages/PDFPage.tsx](src/presentation/pages/PDFPage.tsx)

### Qué hace

Lista todos los invitados mockeados y permite descargar un PDF por cada uno.

### Lógica

- Recorre `guests`.
- Muestra el nombre de cada invitado.
- Genera un QR visual.
- Usa `PDFDownloadLink` para descargar un PDF por invitado.

### Importante

El PDF está armado como demo. Usa el evento `event` de compatibilidad desde el mock, no un evento seleccionado dinámicamente.

## 12. Login Page

Archivo: [src/presentation/pages/LoginPage.tsx](src/presentation/pages/LoginPage.tsx)

### Qué hace

Es un login falso, solo para interfaz.

### Lógica

1. Escribes un email.
2. Envías el formulario.
3. Se activa `logged = true`.
4. La vista cambia a “Bienvenido”.

### Limitación

No hay autenticación real, tokens ni backend.

## 13. Modelos de datos

### Event

Definido en [src/domain/Event.ts](src/domain/Event.ts):

- `id`
- `name`
- `date`
- `location`
- `description`
- `coverImage`

### Guest

Definido en [src/domain/Guest.ts](src/domain/Guest.ts):

- `id`
- `name`
- `email`
- `tableId`
- `rsvp`
- `eventId`

### Table

Definido en [src/domain/Table.ts](src/domain/Table.ts):

- `id`
- `name`
- `guests`
- `qrCode`
- `eventId`

### Photo

Definido en [src/domain/Photo.ts](src/domain/Photo.ts):

- `id`
- `url`
- `tableId`
- `uploadedAt`

## 14. Mocks

### Eventos

Archivo: [src/infrastructure/mocks/event.mock.ts](src/infrastructure/mocks/event.mock.ts)

Contiene una lista fija de eventos. El primero también se exporta como `event` para compatibilidad.

### Invitados

Archivo: [src/infrastructure/mocks/guests.mock.ts](src/infrastructure/mocks/guests.mock.ts)

Contiene invitados de distintos eventos con estados RSVP variados.

### Mesas

Archivo: [src/infrastructure/mocks/tables.mock.ts](src/infrastructure/mocks/tables.mock.ts)

Define mesas con relación a invitados y evento.

### Fotos

Archivo: [src/infrastructure/mocks/photos.mock.ts](src/infrastructure/mocks/photos.mock.ts)

Asocia fotos a mesas específicas.

## 15. Resumen final del flujo

El flujo principal real es este:

1. Entras por la landing.
2. Vas al dashboard.
3. Creas un evento en un modal.
4. El evento se agrega al estado local del dashboard.
5. Haces click en ese evento.
6. Te lleva a la vista de invitados de ese `eventId`.
7. Desde ahí puedes ver invitados y agregar nuevos.
8. Mesas y QR funcionan por selección de evento y filtrado de mocks.

## 16. Limitación principal de la app

La app no comparte un estado global entre pantallas.

Por eso:

- crear un evento no lo registra automáticamente en todas las vistas,
- agregar un invitado no impacta en otras páginas,
- no hay persistencia real,
- todo depende de memoria local y datos estáticos.

Si quieres, el siguiente paso lógico sería refactorizarla para que eventos, invitados y mesas vivan en un store global o en un backend real.