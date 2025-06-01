# artale helper

## Dev
1. install dependencies
```
bun install
```

2. run dev
```
bun dev
```

## Docker
### Build image
```
just build-image {{version}}
```

### Run container
```
docker rm -f artale-helper
docker rmi -f bg308222/artale-helper:latest
docker run -d --name artale-helper -p 3000:3000 -e SESSION_TOKEN=<your credential> bg308222/artale-helper:latest
```

## Plugin
### [artale drop](https://a2983456456.github.io/artale-drop/) plugin
1. Install tampermonkey on you browser
2. Add new userscript
```
// ==UserScript==
// @name         artale-helper
// @author       bg308222
// @match        https://a2983456456.github.io/artale-drop/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const script = document.createElement("script");
    script.src = "http://localhost:3000/public/plugin";
    document.body.appendChild(script);
})();
```