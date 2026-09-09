const products = [
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

// =========================================================================
// VECTOR STAR GENERATOR RENDER ENGINE
// =========================================================================
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
                    <svg class="star-svg star-filled" viewBox="0 0 25 24" style="display:block; width:16px; height:15px; fill:#FFC107;">
                        <polygon points="25 9.12 15.5669599 9.12 12.512219 0 9.40860215 9.12 0 9.12 7.55131965 14.856 4.47214076 24 12.512219 18.216 20.5522972 24 17.4731183 14.856"></polygon>
                    </svg>
                </div>
            </div>`;
    }
    starsHTML += '</div>';
    return starsHTML;
}

// =========================================================================
// MAIN FRONT STOREFRONT DISPLAY ENGINE
// =========================================================================
function renderProductCards(productsArray) {
    if (!gridContainer) return;

    // 1. DYNAMIC COUNT COUNTER: Automatically updates the results display indicator
    if (totalCountElement) {
        totalCountElement.innerHTML = `Showing <strong>${productsArray.length}</strong> Results`;
    }

    // Clear previous elements entirely
    gridContainer.innerHTML = '';

    if (productsArray.length === 0) {
        gridContainer.innerHTML = '<div class="no-results-msg" style="padding:40px; grid-column:1/-1; text-align:center; color:#666;">No products match your active filter criteria.</div>';
        return;
    }

    productsArray.forEach(product => {
        // Resolved Image Array check
        const mainImageSrc = product.gallery && product.gallery.length > 0 
            ? product.gallery[0].main 
            : 'assets/placeholder.webp';

        const starsHTML = generateStarsHTML(product.rating);
        
        // Wishlist tracking placeholder (Will be fully wired in Step 4)
        const isFavorited = ''; 

        // SIZE MATRIX ENGINE: Checks nested size stock configuration objects cleanly
        const masterSizeChart = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];
        let sizesHTML = '<div class="product-card-sizes-display">';
        
        masterSizeChart.forEach(standardSize => {
            // Find object match inside your array structure and explicitly treat sizes as string keys
            const stockData = product.sizes && product.sizes.find(s => parseFloat(s.size) === standardSize);
            const isAvailable = stockData && stockData.stock > 0;

            sizesHTML += `<span class="size-tag ${isAvailable ? 'size-available' : 'size-unavailable'}">${standardSize}</span>`;
        });
        sizesHTML += '</div>';

        // PRICE ENGINE & COMPILER
        const isSale = product.isOnSale ? true : false;
        const displayPrice = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(product.price);
        
        // Dynamic calculating original prices via inverse discount calculation if raw original price key is missing
        let rawOriginalPrice = product.price;
        if (isSale && product.saleDiscountPercentage) {
            rawOriginalPrice = product.price / (1 - (product.saleDiscountPercentage / 100));
        }
        const originalPriceFormatted = isSale ? new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(rawOriginalPrice) : '';

        // STRING TEMPLATE ASM
        const cardHTML = `
            <div class="product-item" data-id="${product.id}">
                <div class="product-image-wrapper" style="position:relative;">
                    <!-- SALE BADGE GENERATOR -->
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
            </div>
        `;

        gridContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Initial direct rendering invocation loop pass execution line
renderProductCards(products);
