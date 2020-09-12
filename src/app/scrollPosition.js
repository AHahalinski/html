'use strict'

import throttle from 'lodash/throttle';
import {createContent} from './downloadingItems';

//window.addEventListener('getContent', createContent);
/*window.addEventListener('scroll', throttle(loadMoreItems, 500));


let isScrollingLastPosition = false;
// Add next items.
async function loadMoreItems() {
    if (window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight
        && !isScrollingLastPosition) {
        await createContent();
    }
}

//Feature to return to the last scroll position on the page
/*let prefixName = window.location.pathname;

window.addEventListener('load', async () => {
    isScrollingLastPosition = true;
    let y = localStorage.getItem(`Y-${prefixName}`);
    do {
        await createContent([], '', 0, 20);
        document.documentElement.scrollTop = y;
    } while (document.documentElement.scrollTop < (y - 100))
    isScrollingLastPosition = false;
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem(`Y-${prefixName}`, document.documentElement.scrollTop);
});*/

/*ScrollUp
Get the button */
let scrollButton = document.querySelector('.scrollUp');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
if (scrollButton) {
    let button = document.querySelector('.scrollUp');
    button.addEventListener('click', topFunction);
}