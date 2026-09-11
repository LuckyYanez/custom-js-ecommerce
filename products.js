const productCatalog = [
  {
    id: "vans-os-01",
    name: "Vans Old Skool sneakers",
    price: 3198.00,
    brand: "Vans",
    rating: 4.5,
    gender: "unisex",
    color: "blue",
    isOnSale: true,
    saleDiscountPercentage: 20,
    saleEndsAt: "2026-12-31T23:59:59Z",
    gallery: [
      { main: "assets/Shoes/shoes-blue1.webp", thumb: "assets/Shoes/shoes-blue%20icon1.webp" },
      { main: "assets/Shoes/shoes-blue2.webp", thumb: "assets/Shoes/shoes-blue%20icon2.webp" },
      { main: "assets/Shoes/shoes-blue3.webp", thumb: "assets/Shoes/shoes-blue%20icon3.webp" },
      { main: "assets/Shoes/shoes-blue4.webp", thumb: "assets/Shoes/shoes-blue%20icon4.webp" }
    ],
    sizes: [
    { "size": "5", "surcharge": 0, "stock": 0 },
    { "size": "5.5", "surcharge": 0, "stock": 3 },
    { "size": "6", "surcharge": 0, "stock": 4 },
    { "size": "6.5", "surcharge": 0, "stock": 5 },
    { "size": "7", "surcharge": 0, "stock": 5 },
    { "size": "7.5", "surcharge": 0, "stock": 5 },
    { "size": "8", "surcharge": 0, "stock": 2 },
    { "size": "8.5", "surcharge": 0, "stock": 3 },
    { "size": "9", "surcharge": 0, "stock": 5 },
    { "size": "9.5", "surcharge": 0, "stock": 1 },
    { "size": "10", "surcharge": 250.00, "stock": 1 },
    { "size": "10.5", "surcharge": 250.00, "stock": 0 },
    { "size": "11", "surcharge": 250.00, "stock": 0 }
    ]
  },
  {
    id: "salomon-acs-02",
    name: "Salomon ACS + OG",
    price: 11990.00,
    brand: "Salomon",
    rating: 3.9,
    gender: "women",
    color: "brown",
    isOnSale: false,
    saleDiscountPercentage: 20,
    saleEndsAt: "",
    gallery: [
      { main: "assets/Shoes/shoes-brown1.webp", thumb: "assets/Shoes/shoes-brown%20icon1.webp" }, // Fixed closing bracket here
      { main: "assets/Shoes/shoes-brown2.webp", thumb: "assets/Shoes/shoes-brown%20icon2.webp" },
      { main: "assets/Shoes/shoes-brown3.webp", thumb: "assets/Shoes/shoes-brown%20icon3.webp" },
      { main: "assets/Shoes/shoes-brown4.webp", thumb: "assets/Shoes/shoes-brown%20icon4.webp" }
    ],
     sizes: [
    { "size": "5", "surcharge": 0, "stock": 0 },
    { "size": "5.5", "surcharge": 0, "stock": 0 },
    { "size": "6", "surcharge": 0, "stock": 0 },
    { "size": "6.5", "surcharge": 0, "stock": 0 },
    { "size": "7", "surcharge": 0, "stock": 5 },
    { "size": "7.5", "surcharge": 0, "stock": 5 },
    { "size": "8", "surcharge": 0, "stock": 2 },
    { "size": "8.5", "surcharge": 0, "stock": 3 },
    { "size": "9", "surcharge": 0, "stock": 5 },
    { "size": "9.5", "surcharge": 0, "stock": 1 },
    { "size": "10", "surcharge": 250.00, "stock": 1 },
    { "size": "10.5", "surcharge": 250.00, "stock": 3 },
    { "size": "11", "surcharge": 250.00, "stock": 3 }
    ]
  },
  {
    id: "nb-p400-03",
    name: "New Balance P400", 
    price: 7795.00,
    brand: "New Balance",
    rating: 3.4,
    gender: "women",
    color: ["black", "maroon"],
    isOnSale: false,
    saleDiscountPercentage: 20,
    saleEndsAt: "",
    gallery: [
      { main: "assets/Shoes/shoes-maroon1.webp", thumb: "assets/Shoes/shoes-maroon%20icon1.webp" },
      { main: "assets/Shoes/shoes-maroon2.webp", thumb: "assets/Shoes/shoes-maroon%20icon2.webp" },
      { main: "assets/Shoes/shoes-maroon3.webp", thumb: "assets/Shoes/shoes-maroon%20icon3.webp" },
      { main: "assets/Shoes/shoes-maroon4.webp", thumb: "assets/Shoes/shoes-maroon%20icon4.webp" }
    ],
     sizes: [
    { "size": "5", "surcharge": 0, "stock": 0 },
    { "size": "5.5", "surcharge": 0, "stock": 0 },
    { "size": "6", "surcharge": 0, "stock": 4 },
    { "size": "6.5", "surcharge": 0, "stock": 0 },
    { "size": "7", "surcharge": 0, "stock": 5 },
    { "size": "7.5", "surcharge": 0, "stock": 0 },
    { "size": "8", "surcharge": 0, "stock": 2 },
    { "size": "8.5", "surcharge": 0, "stock": 0 },
    { "size": "9", "surcharge": 0, "stock": 5 },
    { "size": "9.5", "surcharge": 0, "stock": 0 },
    { "size": "10", "surcharge": 250.00, "stock": 1 },
    { "size": "10.5", "surcharge": 250.00, "stock": 0 },
    { "size": "11", "surcharge": 250.00, "stock": 1 }
    ]
  },
  {
    id: "jordan-j4-04",
    name: "Air Jordan 4 Retro Kids Preschool Basketball Shoes",
    price: 12095.00,
    brand: "Nike",
    rating: 4.7,
    gender: "men",
    color: "red",
    isOnSale: false,
    saleDiscountPercentage: 20,
    saleEndsAt: "",
    gallery: [
      { main: "assets/Shoes/shoes-red1.webp", thumb: "assets/Shoes/shoes-red%20icon1.webp" },
      { main: "assets/Shoes/shoes-red2.webp", thumb: "assets/Shoes/shoes-red%20icon2.webp" },
      { main: "assets/Shoes/shoes-red3.webp", thumb: "assets/Shoes/shoes-red%20icon3.webp" },
      { main: "assets/Shoes/shoes-red4.webp", thumb: "assets/Shoes/shoes-red%20icon4.webp" }
    ],
    "sizes": [
    { "size": "5", "surcharge": 0, "stock": 0 },
    { "size": "5.5", "surcharge": 0, "stock": 0 },
    { "size": "6", "surcharge": 0, "stock": 0 },
    { "size": "6.5", "surcharge": 0, "stock": 0 },
    { "size": "7", "surcharge": 0, "stock": 0 },
    { "size": "7.5", "surcharge": 0, "stock": 0 },
    { "size": "8", "surcharge": 0, "stock": 2 },
    { "size": "8.5", "surcharge": 0, "stock": 3 },
    { "size": "9", "surcharge": 0, "stock": 5 },
    { "size": "9.5", "surcharge": 0, "stock": 1 },
    { "size": "10", "surcharge": 250.00, "stock": 1 },
    { "size": "10.5", "surcharge": 250.00, "stock": 5 },
    { "size": "11", "surcharge": 250.00, "stock": 3 }
    ]
  },
  {
    id: "jordan-j6-retro",
    name: "Air Jordan 6 Retro Mens Basketball Shoes",
    price: 10895.00,
    brand: "Nike",
    color: "black",
    rating: 3.6,
    gender: "men",
    isOnSale: false,
    saleDiscountPercentage: 20,
    saleEndsAt: "",
    gallery: [
      { main: "assets/Shoes/shoes-blackred1.webp", thumb: "assets/Shoes/shoes-blackred%20icon1.webp" },
      { main: "assets/Shoes/shoes-blackred2.webp", thumb: "assets/Shoes/shoes-blackred%20icon2.webp" },
      { main: "assets/Shoes/shoes-blackred3.webp", thumb: "assets/Shoes/shoes-blackred%20icon3.webp" },
      { main: "assets/Shoes/shoes-blackred4.webp", thumb: "assets/Shoes/shoes-blackred%20icon4.webp" }
    ],
     sizes: [
    { "size": "5", "surcharge": 0, "stock": 0 },
    { "size": "5.5", "surcharge": 0, "stock": 0 },
    { "size": "6", "surcharge": 0, "stock": 0 },
    { "size": "6.5", "surcharge": 0, "stock": 0 },
    { "size": "7", "surcharge": 0, "stock": 0 },
    { "size": "7.5", "surcharge": 0, "stock": 0 },
    { "size": "8", "surcharge": 0, "stock": 2 },
    { "size": "8.5", "surcharge": 0, "stock": 3 },
    { "size": "9", "surcharge": 0, "stock": 5 },
    { "size": "9.5", "surcharge": 0, "stock": 0 },
    { "size": "10", "surcharge": 250.00, "stock": 0 },
    { "size": "10.5", "surcharge": 250.00, "stock": 0 },
    { "size": "11", "surcharge": 250.00, "stock": 0 }
    ]
  },
  {
    id: "cta-throwback-01",
    name: "Chuck Taylor All Star Throwback Mens Sneakers",
    price: 4595.00,
    brand: "Converse",
    rating: 4.3,
    gender: "unisex",
    color: "gray",
    isOnSale: true,
    saleDiscountPercentage: 20,
    saleEndsAt: "2026-12-31T23:59:59Z",
    gallery: [
      { main: "assets/Shoes/shoes-gray1.webp", thumb: "assets/Shoes/shoes-gray%20icon1.webp" },
      { main: "assets/Shoes/shoes-gray2.webp", thumb: "assets/Shoes/shoes-gray%20icon2.webp" },
      { main: "assets/Shoes/shoes-gray3.webp", thumb: "assets/Shoes/shoes-gray%20icon3.webp" },
      { main: "assets/Shoes/shoes-gray4.webp", thumb: "assets/Shoes/shoes-gray%20icon4.webp" }
    ],
    sizes: [
    { "size": "5", "surcharge": 0, "stock": 0 },
    { "size": "5.5", "surcharge": 0, "stock": 0 },
    { "size": "6", "surcharge": 0, "stock": 0 },
    { "size": "6.5", "surcharge": 0, "stock": 0 },
    { "size": "7", "surcharge": 0, "stock": 0 },
    { "size": "7.5", "surcharge": 0, "stock": 0 },
    { "size": "8", "surcharge": 0, "stock": 0 },
    { "size": "8.5", "surcharge": 0, "stock": 3 },
    { "size": "9", "surcharge": 0, "stock": 5 },
    { "size": "9.5", "surcharge": 0, "stock": 1 },
    { "size": "10", "surcharge": 250.00, "stock": 1 },
    { "size": "10.5", "surcharge": 250.00, "stock": 3 },
    { "size": "11", "surcharge": 250.00, "stock": 2 }
    ]
  }
];
// Target your empty HTML element containers
const gridContainer = document.getElementById('product-grid');
const totalCountElement = document.querySelector('.total-count');

function generateStarsHTML(rating) {
    let starsHTML = '<div class="star-rating-wrapper" style="display:flex; gap:3px; padding:10px 0 2px 20px;">';
    const checkedRating = rating || 0;
    for (let i = 1; i <= 5; i++) {
        let fillWidth = 0;
        if (checkedRating >= i) { fillWidth = 100; }
        else if (checkedRating > i - 1) { fillWidth = (checkedRating - (i - 1)) * 100; }

        starsHTML += `
            <div class="star-container" style="position:relative; width:16px; height:15px;">
                <svg class="star-svg star-empty" viewBox="0 0 25 24" style="display:block; width:100%; height:100%; fill:#EDEDE9;">
                    <polygon points="25 9.12 15.5669599 9.12 12.512219 0 9.40860215 9.12 0 9.12 7.55131965 14.856 4.47214076 24 12.512219 18.216 20.5522972 24 17.4731183 14.856"></polygon>
                </svg>
                <div class="star-filled-clip" style="position:absolute; top:0; left:0; height:100%; overflow:hidden; width:${fillWidth}%;">
                    <svg class="star-svg star-filled" viewBox="0 0 25 24" style="display:block; width:16px; height:15px; fill:#0FFFFF;">
                        <polygon points="25 9.12 15.5669599 9.12 12.512219 0 9.40860215 9.12 0 9.12 7.55131965 14.856 4.47214076 24 12.512219 18.216 20.5522972 24 17.4731183 14.856"></polygon>
                    </svg>
                </div>
            </div>`;
    }
    starsHTML += '</div>';
    return starsHTML;
}

function renderProductCards(productsArray) {
    if (!gridContainer) return;

    if (totalCountElement) {
        totalCountElement.innerHTML = `Showing <strong>${productsArray.length}</strong> Results`;
    }

    gridContainer.innerHTML = '';

    if (productsArray.length === 0) {
        gridContainer.innerHTML = '<div class="no-results-msg" style="padding:40px; grid-column:1/-1; text-align:center; color:#666;">No products match your active filter criteria.</div>';
        return;
    }

    productsArray.forEach(product => {
        const mainImageSrc = product.gallery && product.gallery.length > 0 
            ? product.gallery[0].main 
            : 'assets/placeholder.webp';

        const starsHTML = generateStarsHTML(product.rating);
        const isFavorited = ''; 

        // ==========================================================================
        // UPGRADED SIZE MATRIX ENGINE (Hides out of stock sizes when filter is on)
        // ==========================================================================
        const masterSizeChart = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];
        let sizesHTML = '<div class="product-card-sizes-display">';

        
        masterSizeChart.forEach(standardSize => {
            const stockData = product.sizes && product.sizes.find(s => parseFloat(s.size) === standardSize);
            const isAvailable = stockData && stockData.stock > 0;

            // NEW: If "Show only available options" is active, skip rendering completely if out of stock
            if (filterState.onlyAvailable && !isAvailable) {
                return; // Skips this size iteration loop
            }

            sizesHTML += `<span class="size-tag ${isAvailable ? 'size-available' : 'size-unavailable'}">${standardSize}</span>`;
        });
        sizesHTML += '</div>';

        // PRICE ENGINE & COMPILER
        const isSale = product.isOnSale ? true : false;
        const displayPrice = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(product.price);
        
        let rawOriginalPrice = product.price;
        if (isSale && product.saleDiscountPercentage) {
            rawOriginalPrice = product.price / (1 - (product.saleDiscountPercentage / 100));
        }
        const originalPriceFormatted = isSale ? new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(rawOriginalPrice) : '';

        // ASSEMBLER MARKUP STRING TEMPLATE
        const cardHTML = `
            <div class="product-item" data-id="${product.id}">
                <div class="product-image-wrapper" style="position:relative;">
                    ${isSale ? `<span class="sale-badge" style="position:absolute; top:10px; left:10px; background:#e74c3c; color:#fff; padding:4px 8px; font-size:0.75rem; font-weight:bold; border-radius:3px; z-index:2;">SALE</span>` : ''}
                    <button class="wishlist-btn ${isFavorited}" aria-label="Add to wishlist">
                        <img src="assets/logo%20and%20icons/heart.svg" class="wishlist-icon-img" alt="Heart Icon">
                    </button>
                    <img class="product-main-img" src="${mainImageSrc}" alt="${product.name}">
                </div>
                ${starsHTML}
                <div class="product-info">
                    <span class="product-brand-tag">${product.brand}</span>
                    <h4 class="product-title">${product.name}</h4>
                    ${sizesHTML}
                    <div class="product-price-container">
                        ${isSale ? `
                            <span class="price-current sale-price">${displayPrice}</span>
                            <span class="price-original" style="text-decoration:line-through; color:#999; margin-left:8px; font-size:0.9rem;">${originalPriceFormatted}</span>
                        ` : `
                            <span class="price-current">${displayPrice}</span>
                        `}
                    </div>
                </div>
            </div>`;

        gridContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}


// 1. UNIFIED FILTER STATE ENGINE & DOM SELECTORS
// ==========================================================================

let activeSelectedSize = null; 
const sortSelectDropdown = document.getElementById('sorter');
let activeSortMode = "position";
const filterState = {
    onlyAvailable: false,
    genders: [],
    brand: [],
    colors: [],
    priceMin: 2000,
    priceMax: 15000
};

// Target Selector Element Matrix
const availabilitySwitch = document.getElementById('switch-label');

// Price Sliders & Number Input Pairs
const minSlider = document.getElementById('price-min-input');
const maxSlider = document.getElementById('price-max-input');
const minNumberInput = document.getElementById('price-min-number');
const maxNumberInput = document.getElementById('price-max-number');

// Other Categorization Selectors
const genderCheckboxes = document.querySelectorAll('.gender-filter input[type="checkbox"]');
const brandCheckboxes = document.querySelectorAll('.brand-filter input[type="checkbox"]');
const colorCheckboxes = document.querySelectorAll('.color-swatch-grid input[type="checkbox"]');
const sizeLinks = document.querySelectorAll('.size-filter .item a');


// ==========================================================================
// 2. MASTER FILTER EXECUTION PIPELINE
// ==========================================================================
function applyActiveSidebarFilters() {
    const filteredProducts = productCatalog.filter(product => {
        
        // A. Availability Check
        if (filterState.onlyAvailable) {
            const hasStock = product.sizes && product.sizes.some(s => s.stock > 0);
            if (!hasStock) return false;
        }

        // B. Gender Filter
        if (filterState.genders.length > 0) {
            const productGender = product.gender ? product.gender.toLowerCase() : '';
            if (!filterState.genders.includes(productGender)) return false;
        }

        // C. Brand Filter
        if (filterState.brand.length > 0) {
            const productBrand = product.brand ? product.brand.toLowerCase().replace(/\s+/g, '') : '';
            if (!filterState.brand.includes(productBrand)) return false;
        }

        // D. Color Filter (DEFENSIVE FIXED: Handles arrays, strings, numbers safely)
        if (filterState.colors.length > 0) {
            if (!product.color) return false; // Skip if product has no color property defined

            // Case 1: If product.color is a standard array [ "blue", "black" ]
            if (Array.isArray(product.color)) {
                const hasMatchingColor = product.color.some(c => 
                    filterState.colors.includes(String(c).toLowerCase().trim())
                );
                if (!hasMatchingColor) return false;
            } 
            // Case 2: If product.color is a single string or number "blue"
             else {
                const productColorString = String(product.color).toLowerCase().trim();
                if (!filterState.colors.includes(productColorString)) return false;
            }
        }

        // E. Size Filter
        if (activeSelectedSize) {
            const matchingSize = product.sizes && product.sizes.find(s => parseFloat(s.size) === parseFloat(activeSelectedSize));
            if (!matchingSize || matchingSize.stock === 0) return false;
        }

        // F. Price Bounds Check
        const currentPrice = product.price || 0;
        if (currentPrice < filterState.priceMin || currentPrice > filterState.priceMax) return false;

        return true;
    });

    // ==========================================================================
    // INSERTED: MULTI-MODE SORTING MATRIX PIPELINE ENGINE
    // ==========================================================================
    if (activeSortMode === "price_low_to_high") {
        filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
    } 
    else if (activeSortMode === "price_high_to_low") {
        filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    // If activeSortMode is "position" (Relevance), it does nothing and skips this entirely!

    // Re-render display results immediately using your card template printer
    renderProductCards(filteredProducts);
}

// ==========================================================================
// 3. EVENT LISTENERS ASSIGNMENT
// ==========================================================================

// Availability Toggle Listener
if (availabilitySwitch) {
    availabilitySwitch.addEventListener('change', (e) => {
        filterState.onlyAvailable = e.target.checked;
        applyActiveSidebarFilters();
    });
}

// Checkbox Array Aggregation Utility Engine
function syncCheckboxGroup(elementsArray, stateTargetProperty) {
    elementsArray.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const collectedValues = [];
            elementsArray.forEach(box => {
                if (box.checked) collectedValues.push(box.value.toLowerCase());
            });
            filterState[stateTargetProperty] = collectedValues;
            applyActiveSidebarFilters();
        });
    });
}
syncCheckboxGroup(genderCheckboxes, 'genders');
syncCheckboxGroup(brandCheckboxes, 'brand');
syncCheckboxGroup(colorCheckboxes, 'colors');

// Size List Anchor Trap Handler
sizeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const parentListItem = link.parentElement;
        const targetSizeValue = link.textContent.trim();

        if (parentListItem.classList.contains('active')) {
            parentListItem.classList.remove('active');
            activeSelectedSize = null;
        } else {
            sizeLinks.forEach(l => l.parentElement.classList.remove('active'));
            parentListItem.classList.add('active');
            activeSelectedSize = targetSizeValue;
        }
        applyActiveSidebarFilters();
    });
});
// ==========================================================================
// 4. TWO-WAY REAL TIME PRICE INTERLOCK SYSTEM (FIXED FOR TYPING)
// ==========================================================================
if (minSlider && maxSlider && minNumberInput && maxNumberInput) {
    const PRICE_STEP = 100;
    const MIN_LIMIT = 2000;
    const MAX_LIMIT = 15000;

    function updateUnifiedPriceValues(newMin, newMax, triggerSource) {
        let minVal = parseInt(newMin);
        let maxVal = parseInt(newMax);

        // If an input is empty or invalid during typing, fallback to limits temporarily
        if (isNaN(minVal)) minVal = MIN_LIMIT;
        if (isNaN(maxVal)) maxVal = MAX_LIMIT;

        // Hard Boundary Validation Checks (Cap value overflow typing)
        if (minVal < MIN_LIMIT) minVal = MIN_LIMIT;
        if (maxVal > MAX_LIMIT) maxVal = MAX_LIMIT;

        // Force limits logic boundaries rule: Min can never exceed or match Max
        if (minVal >= maxVal) {
            if (triggerSource === 'minNum' || triggerSource === 'minSlider') {
                minVal = maxVal - PRICE_STEP;
            } else if (triggerSource === 'maxNum' || triggerSource === 'maxSlider') {
                maxVal = minVal + PRICE_STEP;
            }
        }

        // Sync values to global active object
        filterState.priceMin = minVal;
        filterState.priceMax = maxVal;

        // Update all UI elements synchronously to lock values together
        minSlider.value = minVal;
        maxSlider.value = maxVal;
        minNumberInput.value = minVal;
        maxNumberInput.value = maxVal;

        // Run filtering query calculations
        applyActiveSidebarFilters();
    }

    // SLIDERS: Use 'input' event for instant real-time drag synchronization
    minSlider.addEventListener('input', () => {
        updateUnifiedPriceValues(minSlider.value, maxSlider.value, 'minSlider');
    });

    maxSlider.addEventListener('input', () => {
        updateUnifiedPriceValues(minSlider.value, maxSlider.value, 'maxSlider');
    });

    // NUMBER BOXES: Use 'change' event so you can backspace and type without interruption
    minNumberInput.addEventListener('change', () => {
        updateUnifiedPriceValues(minNumberInput.value, maxNumberInput.value, 'minNum');
    });

    maxNumberInput.addEventListener('change', () => {
        updateUnifiedPriceValues(minNumberInput.value, maxNumberInput.value, 'maxNum');
    });
}



if (gridContainer) {
    gridContainer.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-item');
        if (productCard && !e.target.closest('.wishlist-btn')) {
            const productId = productCard.getAttribute('data-id');
            window.location.href = `product-detail.html?id=${productId}`;
        }
    });
}

if (sortSelectDropdown) {
    sortSelectDropdown.addEventListener('change', (e) => {
        activeSortMode = e.target.value;
        applyActiveSidebarFilters();
    });
}

renderProductCards(productCatalog);
