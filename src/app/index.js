'use strict'


import './scrollPosition';
import './searchByName'
/*
const nameTag = "tag-include";
let isRegisterNewTag = false;
class TagInc extends HTMLElement {
    constructor() {
        super();
        if (!isRegisterNewTag) {
            isRegisterNewTag = true;
            this.loadCustomHtmlElement(nameTag);

            let getContent = new Event('getContent');
            window.dispatchEvent(getContent);
        }
    }

    async loadCustomHtmlElement(nameTag) {
        const tags = document.querySelectorAll(nameTag);
        let count = 0;
        tags.forEach(async tag => {
            let src = tag.getAttribute("src");
            if (!src) {
                throw new Error("Don't have attribute");
            }
            let response = await fetch(src);
            if (response.status !== 200) {
                throw new Error('Sources wasnt loaded: ' + src);
            }
            let element = await response.text();
            document.querySelectorAll(nameTag)[count++].innerHTML = element;
        });
    }
}

//register custom tag
customElements.define(nameTag, TagInc);
*/