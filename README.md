# AutoCheck

## 📝 Descripción

Este proyecto es una plataforma web que conecta **usuarios** con **talleres mecánicos** y es administrada por un **administrador**. Permite gestionar autos, servicios realizados, talleres registrados y un historial completo de mantenimiento.

## 🎯 ¿Qué problema resuelve?

* Facilita que un **usuario** cargue y vea el estado de sus autos y servicios.
* Permite que un **taller** valide servicios realizados sobre los autos.
* Provee al **administrador** herramientas para gestionar talleres y visualizar métricas.

En resumen: organiza y centraliza toda la información del mantenimiento vehicular.

## 🧰 Tecnologías utilizadas

* **React** (Vite)
* **React Router**
* **Context API** 
* **React-Bootstrap**

## ▶️ Cómo correr el proyecto desde GitHub

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tuusuario/tuproyecto.git
   ```
2. Entrar al directorio del proyecto:

   ```bash
   cd tuproyecto
   ```
3. Instalar dependencias:

   ```bash
   npm install
   ```
4. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

## 👥 Ejemplos de usabilidad

### 👤 Usuario

* Se registra o inicia sesión.
* Carga sus autos.
* Agrega servicios realizados.
* Ve qué servicios fueron **validados por el taller**.
* Gestiona su historial automotor de forma simple.

### 🔧 Taller

* Inicia sesión con una cuenta de taller.
* Puede ver autos y servicios cargados por usuarios.
* Valida servicios realizados.
* Mantiene un historial de trabajos realizados.

### 🛠️ Administrador

* Inicia sesión como admin.
* Puede **agregar nuevos talleres**, gestionar los existentes.
* Visualiza **métricas** del sistema:

  * cantidad de usuarios
  * autos cargados
  * talleres activos
  * servicios validados

## 🔑 Usuarios de prueba

| Rol     | Usuario          | Contraseña   |
| ------- | ---------------- | ------------ |
| Admin   | **maxi**         | **zeta**     |
| Usuario | **pepe64**       | **pepe123**  |
| Taller  | **taller_mario** | **mario123** |

