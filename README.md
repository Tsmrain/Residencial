# 🏢 Residencial Management Web App

Bienvenido al sistema de gestión residencial. Este proyecto utiliza una arquitectura **MVC** con un backend en **Spring Boot** y un frontend moderno con **React + TypeScript**, todo orquestado mediante **Docker**.

## 🚀 Inicio Rápido

Para ejecutar todo el entorno de desarrollo (Base de datos, Backend y Frontend), solo necesitas tener **Docker** y **Docker Compose** instalados.

```bash
docker compose up --build
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:8080](http://localhost:8080)
- **SQL Server:** `localhost:1433` (SA / Password123!)

---

## 🛠️ Stack Tecnológico

- **Backend:** Java 17, Spring Boot 3.4.3, Spring Data JPA, Hibernate, Lombok.
- **Frontend:** React 18, TypeScript, Vite.
- **Database:** Microsoft SQL Server 2022.
- **Infrastructure:** Docker & Docker Compose.

---

## 💻 Guía para Desarrolladores

### 💎 JetBrains (IntelliJ IDEA)
1. Abre el proyecto desde la carpeta raíz.
2. Asegúrate de tener instalado el plugin de **Lombok**.
3. IntelliJ detectará el archivo `pom.xml` en la carpeta `backend/`. Haz clic derecho y selecciona **"Add as Maven Project"** si no lo hace automáticamente.
4. Puedes ejecutar el backend directamente usando la clase `ResidencialApplication` si tienes el SDK 17 configurado, pero recuerda que **la base de datos debe estar corriendo en Docker**.

### 🔹 Visual Studio Code
1. Abre la carpeta raíz en VS Code.
2. Instala el **"Extension Pack for Java"** y el plugin de **Lombok**.
3. VS Code detectará las carpetas `backend` y `frontend`.
4. Para debugear el backend fuera de Docker (opcional), asegúrate de apuntar a `localhost` en `application.properties` (Docker usa el nombre del servicio `db`).

### 🔄 Ciclo de Desarrollo (Guía para tu compañero)

Si tu compañero usa IntelliJ o WebStorm, este es el flujo que debe seguir:

1. **Editar Código:** No necesita guardar manualmente (JetBrains lo hace solo), pero si añade dependencias en `pom.xml`, debe hacer clic en el icono de **"Load Maven Changes"** que aparece arriba a la derecha.
2. **Actualizar Docker:** Si modifica el código del backend o frontend, debe refrescar los contenedores desde la terminal (o la pestaña Services de IntelliJ):
   ```bash
   docker compose up --build [servicio] # Ejemplo: backend o frontend
   ```
3. **Guardar en Git:** 
   - **Commit:** `Ctrl + K`. Seleccionar todos los archivos (código, Docker y Git meta).
   - **Push:** `Ctrl + Shift + K`. Esto sube los cambios a GitHub para que tú los veas.

---

## 📂 Estructura del Proyecto

```text
Residencial/
├── backend/            # Código fuente Spring Boot
│   ├── src/            # Entidades, Servicios, Controladores
│   └── Dockerfile      # Build multi-stage para Java
├── frontend/           # Código fuente React + TS
│   ├── src/            # Componentes, Hooks, Estilos
│   └── Dockerfile      # Configurado con Node 20
└── docker-compose.yml  # Orquestación de servicios
```

---

## 🚦 Comandos Útiles

- **Bajar servicios:** `docker compose down`
- **Ver logs:** `docker compose logs -f`
- **Reconstruir backend:** `docker compose up --build backend`
- **Acceso a DB desde local:** Usa Azure Data Studio o DBeaver conectando a `localhost:1433` con usuario `sa` y password `Password123!`. El nombre de la base de datos es `residencial_db`.
