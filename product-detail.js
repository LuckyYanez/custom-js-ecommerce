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
    description: "Built to endure severe abrasive wear while maintaining classic street appeal. The Vans Old Skool combines heavy-duty canvas panels with premium suede overlays at high-wear zones. Complete with reinforced toe caps to prevent blowouts during high-impact movement and padded collars for locked-in ankle flexibility, it relies on a vulcanized rubber outsole to deliver exceptional board feel and uncompromising ground grip.",
    slogan: "The original skate icon engineered for structural durability.",
    gallery: [
      { main: "assets/Shoes/shoes-blue1.webp", thumb: "assets/Shoes/shoes-blue%20icon1.webp" },
      { main: "assets/Shoes/shoes-blue2.webp", thumb: "assets/Shoes/shoes-blue%20icon2.webp" },
      { main: "assets/Shoes/shoes-blue3.webp", thumb: "assets/Shoes/shoes-blue%20icon3.webp" },
      { main: "assets/Shoes/shoes-blue4.webp", thumb: "assets/Shoes/shoes-blue%20icon4.webp" }
    ],
    attributes: {
    "Upper": "Premium Suede & Heavy Canvas" ,
    "Outsole": "Vulcanized Signature Waffle Rubber",
    "Foxing": "Reinforced Double-Stitched Rubber Tape",
    "Ankle": "Dual-Layer Padded Support Collar",
    "Best For": "Skateboarding, BMX riding, and casual lifestyle styling"
    },
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
    description: "A highly stabilized footwear system engineered to master variable alpine terrains and urban asphalt alike. The Salomon ACS + OG utilizes a specialized chassis framework to control lateral torsion and optimize energy return. Enveloped in a protective synthetic cage for advanced debris shield defenses and layered over a climate-conscious open mesh matrix, it provides quick-pull security and maximum technical traction across loose surfaces.",
    slogan: "Archival trail heritage meeting progressive technical performance.",
    attributes: {
    "Chassis": "Agile Chassis™ System (ACS)" ,
    "Structure": "Kurim Protective Envelope Layer",
    "Lacing": "Quicklace™ Minimalist Frictionless System",
    "Outsole": "Mud Contagrip® Deep Lug Compound",
    "Best For": "Trail running, technical hiking, and gorpcore outdoor fashion"
  },
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
    description: "Engineered to solve the heavy impact demands of rapid transitions, high-speed sprints, and forceful landings. The New Balance P400 pairs an internal energy-returning core with a surrounding supportive foam carrier. A lightweight internal plate drives snappy, rigid acceleration during sudden cuts, while a flexible structural shell delivers a precise, non-slip lockdown fit.",
    slogan: "Low-profile responsiveness for explosive hardwood court containment.",
    attributes: {
    "Midsole": "EVA Foam Carrier + Fresh Foam X® Core" ,
    "Shank": "Lightweight Snappy Nylon Torsion Plate",
    "Upper": "Molded TPU Synthetic Shell",
    "Ventilation": "Perforated Mesh Outer Layer",
    "Best For": "Indoor/outdoor competitive basketball, tournament play, and agile court training"
    },
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
    description: "Preserving the premium performance architecture that revolutionized court footwear design. The core Air Jordan Retro line features a high-grade full-grain leather shell for heavy-duty lateral containment and personalized structural breakdown. Outfitted with specialized compressed gas capsules embedded in the underfoot chassis, it mitigates severe landing shock while supporting the ankle during hard, sudden pivots.",
    slogan: "Championship-proven heritage built to elite athletic standards.",
    attributes: {
    "Upper": "Full-Grain Premium Leather & Coated Synthetics" ,
    "Cushion": "Encapsulated Air-Sole® Gas Inlay Units",
    "Outsole": "Solid High-Abrasion Concentric Rubber",
    "Fit": "Mid-to-High Top Ankle Stability Support",
    "Best For": "Casual lifestyle collection wear, court training, and street culture fashion"
  },
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
    description: "Modeled directly after the precise technical specifications of Michael Jordan’s first championship footwear. The Air Jordan 6 Retro combines a sculpted, protective synthetic durabuck shell with targeted perforation arrays for optimized heat venting. Featuring an integrated neoprene tongue bootie that conforms tightly to the midfoot and dual-zone gas cushioning, it provides elite rearfoot shock isolation and a secure, non-shifting fit.",
    slogan: "Aerodynamic speed inspired by elite sports-car engineering.",
    attributes: {
    "Upper": "Durabuck Leather with Perforated Ventilation Holes" ,
    "Forefoot": "Encapsulated Low-Profile Air-Sole® Unit",
    "Heel": "Visible High-Volume Air-Sole® Window",
    "Hardware": "Dual-Hole Tongue Pull & Toggle Lace-Lock",
    "Best For": "Competitive basketball play, high-impact athletic training, and sneaker collection curation"
  },
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
    description: "A heritage athletic design optimized for raw durability and zero-drop floor contact. The Chuck Taylor All Star Throwback upgrades the traditional silhouette with a heavy-gauge structural cotton weave and high-gloss rubber sidewall foxing. Its completely flat, un-cushioned vulcanized sole provides direct, unyielding ground feedback, making it a favorite for heavy powerlifting platforms and minimalist lifestyle use alike.",
    slogan: "Vintage athletic minimalism prioritizing flat-soled sensory connection.",
    attributes: {
    "Upper": "Premium Heavy-Weight 12oz Cotton Canvas" ,
    "Footbed": "OrthoLite® Eco-Foam Density Insole",
    "Outsole": "Vulcanized Zero-Drop Flat Rubber",
    "Foxing": "High-Gloss Reinforced Retro Tape Rim",
    "Best For": "Powerlifting (deadlifts/squats), indoor fitness training, and vintage streetwear styling"
  },
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

window.addEventListener('load', () => {
    const detailContainer = document.getElementById('dynamic-detail-container');
    if (!detailContainer) return;

    // A. Parse incoming product ID parameter from URL address bar query
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        detailContainer.innerHTML = '<div style="padding:50px; text-align:center;">Error: No product selected. <a href="index.html">Return to Shop</a></div>';
        return;
    }

    // B. Resolve product data entry match from local array
    const currentProduct = products.find(p => p.id === productId);

    if (!currentProduct) {
        detailContainer.innerHTML = '<div style="padding:50px; text-align:center;">Product not found. <a href="index.html">Return to Shop</a></div>';
        return;
    }

    // C. Setup currency variables
    const isSale = !!currentProduct.isOnSale;
    const formattedPrice = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(currentProduct.price);
    
    let originalPriceFormatted = '';
    if (isSale) {
        let fallbackOriginal = currentProduct.originalPrice || (currentProduct.price / (1 - ((currentProduct.saleDiscountPercentage || 0) / 100)));
        originalPriceFormatted = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(fallbackOriginal);
    }

    // STACKED IMAGES LOOP: Resolves the missing variable crash!
    let stackedImagesHTML = '';
    if (currentProduct.gallery) {
        currentProduct.gallery.forEach((imgObj, index) => {
            stackedImagesHTML += `<img src="${imgObj.main}" alt="${currentProduct.name} View ${index + 1}">`;
        });
    }

    // D. Extract specifications key-value map nodes
    let attributesHTML = '';
    if (currentProduct.attributes) {
        Object.entries(currentProduct.attributes).forEach(([key, value]) => {
            attributesHTML += `<li><strong>${key}:</strong> ${value}</li>`;
        });
    }

    // E. Generate gallery preview thumb elements
    let thumbnailsHTML = '';
    if (currentProduct.gallery) {
        currentProduct.gallery.forEach((imgObj, index) => {
            const activeClass = index === 0 ? 'active' : '';
            thumbnailsHTML += `
                <button type="button" class="product-gallery_thumbnail ${activeClass}" data-main-target="${imgObj.main}">
                    <img src="${imgObj.thumb}" class="thumb-img" alt="Thumb View">
                </button>
            `;
        });
    }

    // F. Generate standard sizing grid matrix nodes
    let detailSizesHTML = '<div class="detail-size-selector-container">';
    detailSizesHTML += '<span class="size-selector-label">Select Size (US Men/Unisex):</span>';
    detailSizesHTML += '<div class="size-buttons-grid">';

    const masterSizeChart = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];

    masterSizeChart.forEach(standardSize => {
        const sizeObj = currentProduct.sizes && currentProduct.sizes.find(s => parseFloat(s.size) === standardSize);
        const hasStock = sizeObj && sizeObj.stock > 0;
        const surchargeText = sizeObj && sizeObj.surcharge > 0 ? ` (+₱${sizeObj.surcharge})` : '';

        if (hasStock) {
            detailSizesHTML += `
                <button type="button" class="detail-size-btn available-size" data-size="${standardSize}" data-surcharge="${sizeObj.surcharge || 0}">
                    ${standardSize}${surchargeText}
                </button>`;
        } else {
            detailSizesHTML += `
                <button type="button" class="detail-size-btn unavailable-size" disabled>
                    ${standardSize}
                </button>`;
        }
    });
    detailSizesHTML += '</div></div>';

    const defaultImageSrc = currentProduct.gallery && currentProduct.gallery.length > 0 ? currentProduct.gallery[0].main : 'assets/placeholder.webp';

    detailContainer.innerHTML = `
        <nav class="breadcrumbs">
            <a href="index.html" class="breadcrumb-link">Shop</a> 
            <span class="breadcrumb-separator">/</span> 
            <span class="breadcrumb-current">${currentProduct.name}</span>
        </nav>

        <div class="product-detail-layout">
            <div class="main-image-viewport-panel">
                ${stackedImagesHTML}
            </div>

            <div class="product-info-panel">
                ${isSale ? `<span class="sale-badge text-badge">Sale</span>` : ''}
                
                <h4 class="detail-brand-tag">${currentProduct.brand}</h4>
                <h3 class="product-title">${currentProduct.name}</h3>
                <h5 class="product-slogan">"${currentProduct.slogan || ''}"</h5>
                
                <div class="price-container">
                    <span id="detail-current-price" class="sale-price ${isSale ? 'discounted' : ''}">${formattedPrice}</span>
                    ${isSale ? `<span class="regular-price">${originalPriceFormatted}</span>` : ''}
                </div>

                <p class="product-description">${currentProduct.description}</p>
                
                <!-- MOVED UP HERE: Specifications now fill the middle profile space beautifully! -->
                <h4 class="specs-heading">Product Specifications:</h4>
                <ul class="product-specifications-list">
                    ${attributesHTML}
                </ul>

                <!-- Size matrix selections -->
                ${detailSizesHTML}

                <!-- Quantity selectors and checkout triggers -->
                <div class="purchase-controls-wrapper">
                    <div class="quantity-selector-container">
                        <span class="qty-label">Quantity:</span>
                        <div class="qty-stepper-box">
                            <button type="button" id="qty-minus-btn" class="qty-btn">−</button>
                            <input type="number" id="qty-input-value" value="1" min="1" max="99" readonly>
                            <button type="button" id="qty-plus-btn" class="qty-btn">+</button>
                        </div>
                    </div>

                    <div class="action-buttons-container">
                        <button type="button" id="add-to-cart-btn" class="btn-secondary">Add to Cart</button>
                        <button type="button" id="buy-now-btn" class="btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // =========================================================================
    // 3. INTERACTIVE BINDINGS & LOGIC REGISTRATION
    // =========================================================================

    const sizeButtons = detailContainer.querySelectorAll('.detail-size-btn.available-size');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(b => b.classList.remove('selected-size'));
            this.classList.add('selected-size');
        });
    });

    // Quantity Plus Minus Logic bindings
    const qtyMinusBtn = document.getElementById('qty-minus-btn');
    const qtyPlusBtn = document.getElementById('qty-plus-btn');
    const qtyInput = document.getElementById('qty-input-value');

    if (qtyMinusBtn && qtyPlusBtn && qtyInput) {
        qtyMinusBtn.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value) || 1;
            if (currentValue > 1) qtyInput.value = currentValue - 1;
        });

        qtyPlusBtn.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value) || 1;
            if (currentValue < 99) qtyInput.value = currentValue + 1;
        });
    }

    // Cart actions checkout event controllers
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');

    // Central local sizing helper function
    function getSelectedSize() {
        const activeSizeBtn = detailContainer.querySelector('.detail-size-btn.available-size.selected-size');
        if (!activeSizeBtn) {
            alert("Please select a shoe size variation option before proceeding.");
            return null;
        }
        return activeSizeBtn.getAttribute('data-size');
    }

    // 1. CLEAN ADD TO CART INTERACTION HANDLER
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const size = getSelectedSize();
            if (!size) return; // Exit early if validation fails
            
            const chosenQty = parseInt(qtyInput.value) || 1;

            // Hand data over safely to our centralized cart storage engine
            if (typeof addItemToCart === 'function') {
                addItemToCart(productId, size, chosenQty);
                
                // Re-render and open your drawer view smoothly
                if (typeof renderCartDrawerContents === 'function') renderCartDrawerContents();
                if (typeof toggleCartDrawer === 'function') toggleCartDrawer(true);
                if (typeof showModernToast === 'function') showModernToast(`Added ${chosenQty} item(s) to cart!`);
            } else {
                console.error("Cart system script (cart.js) could not be resolved on this page.");
            }
        });
    }

    // 2. CLEAN BUY NOW INTERACTION HANDLER
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const size = getSelectedSize();
            if (!size) return;

            const chosenQty = parseInt(qtyInput.value) || 1;

            if (typeof addItemToCart === 'function') {
                addItemToCart(productId, size, chosenQty);
                // Skips opening the drawer visual panel and jumps directly to checkout route
                window.location.href = 'checkout.html';
            }
        });
    }

        if (typeof updateGlobalCartBadges === 'function') {
        updateGlobalCartBadges();
    }
});



