'use strict'

import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

let page = 0;
const prefixName = window.location.pathname;
let isScrollingLastPosition = false;

window.addEventListener('load', async () => {
    isScrollingLastPosition = true;
    let y = localStorage.getItem(`Y-${prefixName}`);
    do {
        await createContent([], '', 0);
        document.documentElement.scrollTop = y;
    } while (document.documentElement.scrollTop < (y - 100))
    isScrollingLastPosition = false;
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem(`Y-${prefixName}`, document.documentElement.scrollTop);
});

window.addEventListener('scroll', throttle(loadMoreItems, 500));

// Add next items.
async function loadMoreItems() {
    if (window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight
        && !isScrollingLastPosition) {
        await createContent();
    }
}

export async function createContent() {
    const certificates = await loadItems(page, 20);
    if (certificates.length) {
        certificates.forEach(certificate => {
            addItemCard(certificate)
        });
        page++;
    } else {
        writeErrMesage('Certificates weren\'t found');
    }
}


async function loadItems(page, size) {
    let search = document.querySelector('.field-search').value || '';
    let nameTag = document.querySelector('.select').value || [];
    const uri = `http://localhost:8080/rest/certificates?page=${page}&size=${size}&nameTag=${nameTag}&search=${search}&sortBy=ASC`;
    let response = await fetch(uri);
    if (response.ok) {
        let data = await response.json();
        return data.listDto.content;
    } else {
        throw new Error(`Sources wasnt loaded: ${uri}`);
    }
}


const parentElement = document.querySelector('.container');
let temp = 1;
async function addItemCard(certificate) {
    let tagNames = [];
    certificate.tags.forEach(tag => tagNames.push(tag.name));
    parentElement.insertAdjacentHTML('beforeend',
        `<div class="cell">
            <div class="card">
                <a class="img-card" href="details.certificate.html">
                    <span class="iconify" data-icon="mdi:certificate-outline" data-inline="false"></span>
                </a>
                <div class="item-info">
                    <div class="top-row">
                        <div class="item-name">${certificate.name}</div>
                        <div class="wish-list">
                            <a href="#">
                                <i class="iconify" data-icon="mdi:cards-heart" data-inline="false"></i>
                            </a>
                        </div>
                    </div>
                    <div class="midle-row">
                        <div class="item-tag-name">${tagNames.join(', ')}</div>
                        <div class="item-extra-info">${certificate.durationDays.replace('_', ' ').toLowerCase()}</div>

                    </div>
                    <div class="botton-row">
                        <div class="item-price">$ ${certificate.price}</div>
                        <div class="btn-add-cart">
                            <button class="btn-add-item">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`);
    const allAddedElements = document.getElementsByClassName('cell');
    const lastAddedElement = allAddedElements[allAddedElements.length - 1];
    await showAnimationCard(lastAddedElement);
}

async function showAnimationCard(element) {
    setTimeout(
        function () {
            element.style.opacity = 1;
        },
        500);
}

//Search
const searchElement = document.querySelector('.search-block');

let searchByName = debounce(() => {
    page = 0;
    removeContent();
    createContent();
}, 500);

searchElement.addEventListener('input', searchByName);

function removeContent() {
    parentElement.innerHTML = '';
}

//Message
function writeErrMesage(message) {
    removeContent();
    parentElement.insertAdjacentHTML('afterbegin', `<h3> ${message} </h3>`);
}