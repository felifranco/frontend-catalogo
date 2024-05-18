# EJECUCIÓN

## Archivo de variables

Antes de ejecutar el proyecto es importante asegurarse de tener el archivo `.env` en la raíz con las variables de entorno. Ejemplo:

```
VITE_APP_PORT=5000
VITE_BACKEND_CATALOGO=http://localhost:3000
```

Más información en la sección [Variables de entorno y modos](#variables-de-entorno-y-modos).

## Instalar dependencias

Instalar todas las dependencias agregadas en `package.json`

```shell
npm install
```

## Ejecución del proyecto

```shell
npm run dev
```

Luego de iniciado el proyecto se podrá visualizar el login de la aplicación en

```
http://localhost:5000/
```

Es importante registrarse primero para poder utilizar la aplicación.

# Acerca del proyecto

## Tabla de contenido

- [Crear el proyecto](#crear-el-proyecto)
- [Instalar paquetes](#instalar-paquetes)
- [Variables de entorno y modos](#variables-de-entorno-y-modos)
  - [Archivo `.env`](#archivo-env)
  - [Prefijo predeterminado](#prefijo-predeterminado)
    - [Modificar prefijo predeterminado](#modificar-prefijo-predeterminado)
  - [Archivo `configurations.js`](#archivo-configurationsjs)
- [Prettier](#prettier)
- [ReduxJS y MaterialUI](#reduxjs-y-materialui)
- [React Router Dom](#react-router-dom)
- [Importación y carga de datos](#importación-y-carga-de-datos)

## Crear el proyecto

```shell
$ npm init vite@latest
Need to install the following packages:
create-vite@5.2.0
Ok to proceed? (y) y
✔ Project name: … frontend-catalogo
✔ Select a framework: › React
✔ Select a variant: › JavaScript + SWC
```

## Instalar paquetes

```shell
cd frontend-catalogo
npm install
```

## Variables de entorno y modos

Según la [documentación](https://vitejs.dev/guide/env-and-mode), Vite posee una forma de exponer las variables de entorno, lo hace a través del objeto especial `import.meta.env`. En ese objeto se puede encontrar el _modo_ en que está corriendo la aplicación, _development_ o _production_, la base desde la que se sirve la aplicación, y otros valores importantes.

### Archivo `.env`

De manera inicial podemos generar un archivo `.env` en la raíz del proyecto y ahí colocar nuestras primeras variables. Creamos un archivo de ejemplo para parametrizar el puerto:

```shell
echo VITE_APP_PORT=5000 >> .env
```

Agregamos la referencia al backend

```shell
echo VITE_BACKEND_CATALOGO=http://localhost:3000 >> .env
```

En este momento el puerto no ha sido modificado, solo hemos creado una nueva variable con el dato que ya puede ser accedido desde cualquier componente de React.

### Prefijo predeterminado

Notar que la variable tiene un [prefijo predefinido](https://vitejs.dev/config/shared-options#envprefix), el valor predeterminado para el uso de las variables es `VITE_` seguido del nombre de la variable.

### Archivo `configurations.js`

Si las variables de entorno se utilizan de forma regada, no podremos tener visible **_todas_** las variables de entorno que tiene el proyecto, esto porque el archivo `.env` no se encuentra en el repositorio. Lo que haremos es crear un archivo _intermedio_ que importará todas las variables de entorno y desde ahí si se podrán exportar al código fuente, éste archivo servirá como referencia para generar nuestro propio `.env`de forma local.
Crear la carpeta de configuración

```shell
cd src
mkdir config
```

Creamos el archivo `configurations.js` en la carpeta _config_

```shell
touch config/configurations.js
```

Se utiliza la sintaxis de los módulos ES para exportar los valores
El contenido inicial del archivo será:

```js
export default {
  APP_PORT: import.meta.env.VITE_APP_PORT,
  BACKEND_CATALOGO: import.meta.env.VITE_BACKEND_CATALOGO,
};
```

Para definir otro **puerto** de publicación es necesario agregarlo en el archivo de configuración [vite.config.js](vite.config.js). La configuración quedará así:

```js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [react()],
    server: {
      port: parseInt(process.env.VITE_APP_PORT),
    },
  };
});
```

## Prettier

Agregaremos el paquete [`Prettier`](https://www.npmjs.com/package/prettier) para mantener formateado el código fuente.

```shell
npm install prettier
```

Al archivo [`package.json`](package.json) agregamos los scripts para la verificación y el formateo del código.

```json
{
  ...
  "scripts": {
    "format": "prettier --write \"src/**/*.js\" \"src/**/*.jsx\"",
    "format:check": "prettier --check \"src/**/*.js\" \"src/**/*.jsx\"",
    ...
  }
}
```

Los scripts se ejecutan de la siguiente forma:

```shell
npm run format
npm run format:check
```

## ReduxJS y MaterialUI

Instalamos ReduxJS y Material UI:

```shell
npm install @reduxjs/toolkit react-redux @mui/icons-material @mui/material @emotion/styled @emotion/react
```

Utilizaremos los estados de la aplicación principalmente en Redux, el hook de react `useState` también se podría utilizar pero por orden y centralización se prefirió Redux. Y se utiliza `@reduxjs/toolkit` por la [simplicidad](https://redux-toolkit.js.org/introduction/getting-started). También se utilizarán los componentes de [Material UI](https://mui.com/material-ui/) e iconos.

### Configuración de ReduxJS

Crear la carpeta `store` que contendrá la configuración y estados de la aplicación:

```shell
cd src
mkdir store
```

Creamos el archivo `index.js` en la carpeta _store_

```shell
touch store/index.js
```

El contenido inicial del archivo será:

```js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({});
```

La versión final del archivo se encuentra en [src/store/index.js](src/store/index.js).

Asociamos el `store` a la raíz del proyecto, eso quiere decir que se crea un nuevo componente raíz, `<Provider />`, en la estructura principal definida en el archivo [`main.jsx`](./react_vite_frontend/src/main.jsx).

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/index.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

Las llamadas hacia el API RESTful y el manejo de estados de _usuarios_ y _productos_ se hará en los archivos [src/store/Users/index.js](src/store/Users/index.js) y [src/store/Products/index.js](src/store/Products/index.js).

Los estados de la aplicación tienen la siguiente estructura:

```
.
├── store
│   ├── Alert
│   │   └── index.js
│   ├── Auth
│   │   └── index.js
│   ├── index.js
│   ├── Products
│   │   └── index.js
│   └── Users
│       └── index.js
```

### Componentes

Crear la carpeta de componentes

```shell
cd src
mkdir components
```

Dentro de la carpeta `components` se encontrarán los componentes ordenados de acuerdo a los módulos que requiera la aplicación. Para este caso se tendrán la carpeta `Users` y `Products` con los módulos del negocio, los otros son de uso común en una aplicación web.

```shell
cd components
mkdir Users
mkdir Products
```

Los componentes que se utilizarán en este proyecto estarán distribuidos de la siguiente forma:

```
.
├── components
│   ├── Auth
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Common
│   │   └── CustomModal.jsx
│   ├── Import
│   │   └── ImportExcel.jsx
│   ├── Principal
│   │   └── Principal.jsx
│   ├── Products
│   │   ├── ProductForm.jsx
│   │   └── ProductList.jsx
│   └── Users
│       ├── UserForm.jsx
│       └── UserList.jsx
```

## React Router Dom

Instalación

```shell
npm install react-router-dom
```

Se utilizará react-router-dom para el manejo de paths y navegación del proyecto

```js
const router = createBrowserRouter([
  {
    path: "/",
    element: <Principal />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
```

Más detalles en [src/App.jsx](src/App.jsx)

## Importación y carga de datos

Para la carga de datos se creó el módulo de importación, este se puede visualizar en el menú principal del Drawer.

Instalación del paquete que se utilizará para la lectura del archivo de excel:

```shell
npm install xlsx
```

El componente encargada de esta función es [src/components/Import/ImportExcel.jsx](src/components/Import/ImportExcel.jsx)
