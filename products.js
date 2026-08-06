const products = [
  {
    id: "vans-os-01",
    name: "Vans Old Skool sneakers",
    price: 3198.00,
    brand: "Vans",
    rating: 4.5,
    stock: 14,
    gallery: [
      { main: "assets/Shoes/shoes-blue1.webp", thumb: "assets/Shoes/shoes-blue%20icon1.webp" },
      { main: "assets/Shoes/shoes-blue2.webp", thumb: "assets/Shoes/shoes-blue%20icon2.webp" },
      { main: "assets/Shoes/shoes-blue3.webp", thumb: "assets/Shoes/shoes-blue%20icon3.webp" },
      { main: "assets/Shoes/shoes-blue4.webp", thumb: "assets/Shoes/shoes-blue%20icon4.webp" }
    ],
    sizes: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
  },
  {
    id: "salomon-acs-02",
    name: "Salomon ACS + OG",
    price: 11990.00,
    brand: "Salomon",
    rating: 3.9,
    stock: 5,
    gallery: [
      { main: "assets/Shoes/shoes-brown1.webp", thumb: "assets/Shoes/shoes-brown%20icon1.webp" }, // Fixed closing bracket here
      { main: "assets/Shoes/shoes-brown2.webp", thumb: "assets/Shoes/shoes-brown%20icon2.webp" },
      { main: "assets/Shoes/shoes-brown3.webp", thumb: "assets/Shoes/shoes-brown%20icon3.webp" },
      { main: "assets/Shoes/shoes-brown4.webp", thumb: "assets/Shoes/shoes-brown%20icon4.webp" }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11]
  },
  {
    id: "nb-p400-03",
    name: "New Balance P400", 
    price: 7795.00,
    brand: "New Balance",
    rating: 3.4,
    stock: 9,
    gallery: [
      { main: "assets/Shoes/shoes-maroon1.webp", thumb: "assets/Shoes/shoes-maroon%20icon1.webp" },
      { main: "assets/Shoes/shoes-maroon2.webp", thumb: "assets/Shoes/shoes-maroon%20icon2.webp" },
      { main: "assets/Shoes/shoes-maroon3.webp", thumb: "assets/Shoes/shoes-maroon%20icon3.webp" },
      { main: "assets/Shoes/shoes-maroon4.webp", thumb: "assets/Shoes/shoes-maroon%20icon4.webp" }
    ],
    sizes: [6, 7, 8, 9, 10, 11]
  },
  {
    id: "jordan-j4-04",
    name: "Air Jordan 4 Retro Men's Basketball Shoes",
    price: 12095.00,
    brand: "Nike",
    rating: 4.7,
    stock: 3,
    gallery: [
      { main: "assets/Shoes/shoes-red1.webp", thumb: "assets/Shoes/shoes-red%20icon1.webp" },
      { main: "assets/Shoes/shoes-red2.webp", thumb: "assets/Shoes/shoes-red%20icon2.webp" },
      { main: "assets/Shoes/shoes-red3.webp", thumb: "assets/Shoes/shoes-red%20icon3.webp" },
      { main: "assets/Shoes/shoes-red4.webp", thumb: "assets/Shoes/shoes-red%20icon4.webp" }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12]
  },
  {
    id: "jordan-j6-retro",
    name: "Air Jordan 4 Retro Mens Basketball Shoes",
    price: 10895.00,
    brand: "Nike",
    rating: 3.6,
    stock: 5,
    gallery: [
      { main: "assets/Shoes/shoes-blackred1.webp", thumb: "assets/Shoes/shoes-blackred%20icon1.webp" },
      { main: "assets/Shoes/shoes-blackred2.webp", thumb: "assets/Shoes/shoes-blackred%20icon2.webp" },
      { main: "assets/Shoes/shoes-blackred3.webp", thumb: "assets/Shoes/shoes-blackred%20icon3.webp" },
      { main: "assets/Shoes/shoes-blackred4.webp", thumb: "assets/Shoes/shoes-blackred%20icon4.webp" }
    ],
    sizes: [8, 8.5, 9]
  },
  {
    id: "cta-throwback-01",
    name: "Chuck Taylor All Star Throwback Mens Sneakers",
    price: 4595.00,
    brand: "Converse",
    rating: 4.3,
    stock: 12,
    gallery: [
      { main: "assets/Shoes/shoes-gray1.webp", thumb: "assets/Shoes/shoes-gray%20icon1.webp" },
      { main: "assets/Shoes/shoes-gray2.webp", thumb: "assets/Shoes/shoes-gray%20icon2.webp" },
      { main: "assets/Shoes/shoes-gray3.webp", thumb: "assets/Shoes/shoes-gray%20icon3.webp" },
      { main: "assets/Shoes/shoes-gray4.webp", thumb: "assets/Shoes/shoes-gray%20icon4.webp" }
    ],
    sizes: [8.5, 9, 9.5, 10, 10.5, 11]
  }
];

function renderProductCards(productsArray) {
    const gridContainer = document.getElementById('product-grid');
    gridContainer.innerHTML = ''; // Clear container completely

    productsArray.forEach(product => {
        // 1. FIXED PATH: Target the first object in the gallery array safely
        const mainImageSrc = product.gallery && product.gallery[0] ? product.gallery[0].main : '';

        // 2. FIXED STARS ENGINE: Precision decimal clip generator
        const rating = product.rating || 0;
        let starsHTML = '<div class="star-rating-wrapper">';
        for (let i = 1; i <= 5; i++) {
            let fillPercent = 0;
            if (rating >= i) {
                fillPercent = 100;
            } else if (rating > i - 1 && rating < i) {
                fillPercent = (rating - (i - 1)) * 100;
            }

            starsHTML += `
                <div class="star-container">
                    <svg class="star-svg star-empty" viewBox="0 0 25 24" xmlns="http://w3.org/2000/svg">
                        <polygon points="25 9.12 15.57 9.12 12.51 0 9.41 9.12 0 9.12 7.55 14.86 4.47 24 12.51 18.22 20.55 24 17.47 14.86"></polygon>
                    </svg>
                    <div class="star-filled-clip" style="width: ${fillPercent}%">
                        <svg class="star-svg star-filled" viewBox="0 0 25 24" xmlns="http://w3.org/2000/svg">
                            <polygon points="25 9.12 15.57 9.12 12.51 0 9.41 9.12 0 9.12 7.55 14.86 4.47 24 12.51 18.22 20.55 24 17.47 14.86"></polygon>
                        </svg>
                    </div>
                </div>
            `;
        }
        starsHTML += '</div>';

        // 3. WISHLIST CONTROL: Toggles an .active class based on data properties
        const isFavorited = product.isWishlisted ? 'active' : '';

        // 4. SIZE MATRIX ENGINE: Maps current product stock against global variations
        const masterSizeChart = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];
        let sizesHTML = '<div class="product-card-sizes-display">';
        
        masterSizeChart.forEach(standardSize => {
            // Check if the current shoe actually includes this size option in its array
            const isAvailable = product.sizes && product.sizes.includes(standardSize);
            
            if (isAvailable) {
                sizesHTML += `<span class="size-tag size-available">${standardSize}</span>`;
            } else {
                sizesHTML += `<span class="size-tag size-unavailable">${standardSize}</span>`;
            }
        });
        sizesHTML += '</div>';

        // 5. PRICE COMPILER
        const isSale = product.salePrice ? true : false;
        const displayPrice = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(product.price);
        const originalPriceFormatted = isSale ? new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(product.originalPrice) : '';

        // 6. ASSEMBLE PRODUCT MARKUP BLOCK
        const cardHTML = `
            <div class="product-item" data-id="${product.id}">
                <div class="product-image-wrapper">
                    ${isSale ? `<span class="sale-badge">SALE</span>` : ''}
                    
                    <!-- Wishlist button pins to top right corner securely -->
                    <button class="wishlist-btn ${isFavorited}" aria-label="Add to wishlist">
                        <img src="assets/logo%20and%20icons/heart.svg" class="wishlist-icon-img" alt="Heart Icon">
                    </button>

                    <img class="product-main-img" src="${mainImageSrc}" alt="${product.name}">
                </div>

                <!-- Star Rating Display Row -->
                ${starsHTML}

                <div class="product-info">
                    <span class="product-brand-tag">${product.brand}</span>
                    <h4 class="product-title">${product.name}</h4>
                    
                    <!-- Static Informational Size Chart Structure -->
                    ${sizesHTML}
                    
                    <div class="product-price-container">
                        ${isSale ? `
                            <span class="price-current sale-price">${displayPrice}</span>
                            <span class="price-original">${originalPriceFormatted}</span>
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


renderProductCards(products);

