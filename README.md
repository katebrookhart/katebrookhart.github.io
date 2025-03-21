# goldenbearstudios.co.uk

The static site for Golden Bear Studios, compiled using the [nunjucks]() build system and served via Github pages.

## Prerequisites

Your system needs to have node and npm installed. The best way to do this is via homebrew for MacOS:

```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```

Then install node:
```brew install node```

Then finally install all of the build requirements:
```npm install```

## Building

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
