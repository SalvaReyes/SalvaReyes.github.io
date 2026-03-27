# Portfolio estático para GitHub Pages

Este proyecto ya no usa Apps Script, ni Spreadsheet, ni Drive en tiempo de ejecución.

## Estructura

- `index.html`: estructura base
- `styles.css`: estilos
- `app.js`: renderizado en el navegador
- `data.js`: contenido del portfolio
- `assets/images/`: imágenes locales
- `assets/cv/`: CV local

## Qué tienes que cambiar

### 1. Foto principal
Sustituye:

- `./assets/images/portrait-placeholder.svg`

por tu foto real, por ejemplo:

- `./assets/images/portrait.png`

Y en `data.js` cambia:

```js
portraitImageUrl: "./assets/images/portrait.png"
```

### 2. Imágenes de experiencia
Sustituye estos placeholders por tus capturas reales:

- `assets/images/iction-placeholder.svg`
- `assets/images/axes-placeholder.svg`
- `assets/images/atexis-placeholder.svg`

Puedes mantener los mismos nombres o cambiar las rutas dentro de `data.js`.

### 3. GitHub y CV
En `data.js` rellena:

```js
githubUrl: "https://github.com/TU_USUARIO",
cvUrl: "./assets/cv/Salvador-Reyes-CV.pdf"
```

Y mete tu PDF dentro de `assets/cv/`.

## Cómo publicarlo en GitHub Pages

### Opción recomendada
Crea un repositorio llamado exactamente:

```text
TU_USUARIO.github.io
```

Ejemplo:

```text
salvareyes.github.io
```

### Pasos

1. Sube todos estos archivos al repositorio.
2. Ve a **Settings > Pages**.
3. En **Build and deployment** selecciona:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Guarda.

Tu web quedará publicada en:

```text
https://TU_USUARIO.github.io/
```

## Edición futura

Cuando quieras cambiar textos, experiencia o enlaces, edita `data.js`.
Cuando quieras cambiar imágenes, reemplaza archivos en `assets/images/`.
