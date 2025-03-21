# goldenbearstudios.co.uk

The static site for Golden Bear Studios, compiled using the [nunjucks]() build system and served via Github pages.

To build:

Install all of the build requirementsL
```npm install```

Compile the tailwind css:
```npx tailwindcss -i css/styles.css -o css/styles2.css```

Build the site:
```node build.js```

Validate the HTML:
```html-validate docs/*.html```

Push to github:
```
git add -A
git commit -m "Update description here"
git push
```
