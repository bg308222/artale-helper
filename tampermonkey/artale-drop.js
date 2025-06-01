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