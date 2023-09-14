<p style="text-align: center; font-size: 32px; font-weight: bold;">
<a href="https://ghezdev.github.io/challenge-metafar/">Challenge Metafar</a></p>

## Pasos para instalar el proyecto

Clonar el repositorio con **git clone {link del repo}**

Ejecutar el comando **npm i**

Crear un archivo .env con el atributo VITE_APIKEY y ponerle la API KEY que te proporciona la página https://twelvedata.com/account/api-keys. Debe crearse una cuenta para poder tener un API KEY.
El archivo .env debería verse como el archivo .env.example

Ejecutar el comando **npm run dev**

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
