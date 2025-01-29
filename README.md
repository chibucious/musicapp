# React + TypeScript + Vite
npm create vite@latest ./
Select React + Tailwind
npm i

Run => npm show vite version
Vite v6.x requires Node.js 18+.
For Node.js 16.x, use Vite v4.x.

To downgrade vite => npm install vite@4 --save-dev

npm run dev

# Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p (If this show error, do the below, downgrade)
[
  npm install -D tailwindcss@3.3.3 postcss autoprefixer
  npx tailwindcss init -p
]

Go to tailwind.config.js and add
content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
In src/index.css, replace with
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add your custom styles below if needed */

Check if src/index.css is imported in main.tsx:

# Dependencies
npm install @reduxjs/toolkit axios react-icons react-redux react-router-dom swiper

nvm use 18





This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
