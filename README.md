# goldenbearstudios.co.uk

The static site for Golden Bear Studios, compiled using the [nunjucks]() build system and served via Github pages.

To build:

```
npm install
node build.js
npx tailwindcss -i css/styles.css -o css/styles2.css
html-validate docs/*.html
```
