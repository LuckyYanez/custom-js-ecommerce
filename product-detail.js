// js/product-detail.js

document.addEventListener("DOMContentLoaded", () => {
    // Only run this logic if we are actually looking at the product template view
    if (!document.getElementById('js-product-name')) return;
    
    loadProductPageDetails();
});

async function loadProductPageDetails() {
    try {
        // 1. Fetch your mock JSON database payload asynchronously
        const response = await fetch('./products.json');
        if (!response.ok) throw new Error("Failed to load store database");
        const productsCatalog = await response.json();

        // 2. Extract the item id from the browser URL address string
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        // 3. Match the product data from the array
        const product = productsCatalog.find(p => p.id === productId);
        if (!product) {
            document.getElementById('js-product-name').textContent = "Shoe Model Not Found";
            return;
        }

        // 4. Render Basic Information & Call Calculators
        renderProductBasics(product);
        renderGalleryComponent(product.images, product.name);
        setupSizeSelector(product);
        
        if (product.isOnSale) {
            initializeSaleCountdown(product.saleEndsAt);
        }

    } catch (error) {
        console.error("Initialization Error:", error);
    }
}

function renderProductBasics(product) {
    document.getElementById('js-product-brand').textContent = product.brand;
    document.getElementById('js-product-name').textContent = product.name;
    document.getElementById('js-product-desc').textContent = product.description;

    // Show discount tags or original configurations based on data flag fields
    const priceContainer = document.getElementById('js-product-price');
    if (product.isOnSale) {
        let originalPrice = product.sizes[0].surcharge + product.sizes[0].surcharge; // base example
        let discountMultiplier = (100 - product.saleDiscountPercentage) / 100;
        let finalSalePrice = (product.sizes[0].surcharge + 5000) * discountMultiplier; // placeholder calculation context
        
        // This will be calculated fluidly relative to size clicks next
    }
}

function setupSizeSelector(product) {
    const sizeContainer = document.getElementById('js-size-buttons-container');
    const priceDisplay = document.getElementById('js-product-price');
    
    sizeContainer.innerHTML = product.sizes.map(sizeObj => {
        const disabled = sizeObj.inStock ? '' : 'disabled';
        const styleClass = sizeObj.inStock ? 'size-btn' : 'size-btn disabled';
        return `
            <button class="${styleClass}" ${disabled} data-size="${sizeObj.size}" data-surcharge="${sizeObj.surcharge}">
                US ${sizeObj.size}
            </button>
        `;
    }).join('');

    // Event Delegation: Listen for individual size button selections
    sizeContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('size-btn')) return;

        // Visual Active States Toggle
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Calculate Pricing Complex Combinations
        const sizeSurcharge = parseFloat(e.target.dataset.surcharge);
        let currentItemPrice = 5000 + sizeSurcharge; // Say base shoe is ₱5,000.00

        if (product.isOnSale) {
            const savings = currentItemPrice * (product.saleDiscountPercentage / 100);
            const calculatedPrice = currentItemPrice - savings;
            
            priceDisplay.innerHTML = `
                <span class="sale-price">₱${calculatedPrice.toLocaleString('en-PH', {minimumFractionDigits: 2})}</span>
                <span class="original-price" style="text-decoration: line-through; color: #888; font-size: 1.1rem; margin-left: 10px;">
                    ₱${currentItemPrice.toLocaleString('en-PH', {minimumFractionDigits: 2})}
                </span>
                <span class="discount-badge" style="color: red; font-size: 1rem; margin-left: 5px;">(${product.saleDiscountPercentage}% OFF)</span>
            `;
        } else {
            priceDisplay.textContent = `₱${currentItemPrice.toLocaleString('en-PH', {minimumFractionDigits: 2})}`;
        }
    });
}

function renderGalleryComponent(images, productName) {
    const mainImg = document.getElementById('js-main-image');
    const thumbContainer = document.getElementById('js-thumbnail-container');
    
    mainImg.src = images.main;
    
    thumbContainer.innerHTML = Object.values(images).map(url => `
        <img class="gallery-thumbnail" src="${url}" alt="${productName} preview" style="width: 70px; border: 1px solid #ddd; cursor: pointer;">
    `).join('');

    thumbContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('gallery-thumbnail')) {
            mainImg.src = e.target.src;
        }
    });
}

function initializeSaleCountdown(endTimeString) {
    // Creates an element wrapper container if it doesn't exist dynamically
    const infoColumn = document.querySelector('.product-info-column');
    const timerElement = document.createElement('div');
    timerElement.className = 'sale-countdown-timer';
    timerElement.style = "background: #fff0f0; border: 1px solid #ffcccc; padding: 10px; margin-bottom: 20px; font-weight: bold; color: red;";
    infoColumn.insertBefore(timerElement, document.getElementById('js-product-price'));

    const targetTime = new Date(endTimeString).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetTime - now;

        if (difference <= 0) {
            clearInterval(interval);
            timerElement.textContent = "PROMOTION EXPIRED";
            return;
        }

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        timerElement.textContent = `⚡ FLASH SALE ENDS IN: ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}
