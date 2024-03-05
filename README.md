# sistemaDocente

``` mermaid
graph TD;
    A[Autenticación] --> B[Gestión de Roles]
    B --> C[Gestión de Temas]
    C --> D[Registro de Actividades]
    C --> E[Registro de Calificaciones]
    C --> F[CRUD de Tareas]
    F --> G[Marcar como impartida]
    F --> H[Indicar actividad pendiente]
    F --> I[Registrar observaciones]
    C --> J[Reporte en PDF]
    C --> K[Interfaz de Usuario]
    D --> K
    E --> K
    F --> K
    J --> K
    K --> L[Agregar, editar y eliminar temas]
    K --> M[Registrar actividades]
    K --> N[Gestionar tareas]
    N --> O[Marcar como realizada]
    N --> P[Nueva actividad]
    K --> Q[Generar reporte en PDF]
  ```

# Funcionalidades:

## Autenticación:

Permite que los docentes se registren en el sistema para acceder a las funciones.

## Gestión de Roles (opcional):

Permite la gestión de roles como Docente y Estudiante para una mejor organización (opcional).

## Gestión de Temas:

Permite a los docentes ingresar los temas del curso, especificando el título y objetivo de cada uno.

## Registro de Actividades:

Permite registrar las actividades, para cada tema del curso.:

    ✅ Realizadas
    ❓ Pendientes

## Registro de Calificaciones (opcional):

Permite a los docentes asignar calificaciones a las actividades realizadas por los estudiantes en cada tema.
CRUD de Tareas:

## Proporciona un CRUD para gestionar las tareas de cada tema, incluyendo:

1.  Marcar si se impartió la clase sobre un tema.
2.  Indicar si está pendiente la actividad relacionada con el tema.
3.  Registrar observaciones adicionales sobre el tema o actividad.

## Reporte en PDF:

Genera un reporte en formato PDF que resume el progreso del curso, incluyendo temas impartidos, actividades realizadas, calificaciones asignadas y estado de las tareas.

# Interfaz de Usuario:

La interfaz proporciona un entorno fácil de usar para que los docentes realicen las siguientes acciones:

1.  Agregar, editar y eliminar temas del curso.
2.  Registrar actividades realizadas para cada tema.
3.  Gestionar las tareas relacionadas con cada tema (marcar como realizada, nueva actividad).
4.  Generar un reporte en PDF del avance del curso.

# Reporte en PDF:

El reporte en PDF presenta un resumen claro del progreso del curso, con una tabla que incluye temas, objetivos, actividades, calificaciones y estado de las tareas. Además, puede contener gráficos o estadísticas para ofrecer un resumen visual del rendimiento del curso.

Con este sistema, los docentes pueden mantener un registro detallado del avance del curso, lo que facilita la planificación, seguimiento y evaluación del progreso de los estudiantes.