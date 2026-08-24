// ==========================================================================
// CENTRALIZED FRONT-END CART STORAGE ENGINE
// ==========================================================================

// Master DOM Interface Pointers
const cartDrawer = document.getElementById('side-cart-drawer');
const cartCloseBtn = document.getElementById('cart-drawer-close');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotalDisplay = document.getElementById('cart-subtotal-display');

// Global Multi-page Nav Intercept Selectors
const generalCartTriggers = document.querySelectorAll('.cart-trigger-anchor, #cart-icon');

// Helper function to extract 100% live database arrays from local storage memory
function getFreshCartState() {
    return JSON.parse(localStorage.getItem('user_shopping_cart')) || [];
}

// 1. OPEN / CLOSE INTERACTION MECHANICS
function toggleCartDrawer(openState) {
    if (openState) {
        document.body.classList.add('side-cart-active');
        renderCartDrawerContents();
    } else {
        document.body.classList.remove('side-cart-active');
    }
}

// Bind Global Navigation Bar Handles
generalCartTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCartDrawer(true);
    });
});

if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', () => toggleCartDrawer(false));
}

// 2. CORE UTILITY DATA ACTIONS
function addItemToCart(productId, size, quantity = 1) {
    // Assumes your global 'products' array from products.js is loaded on page
    const matchedProduct = products.find(p => p.id === productId);
    if (!matchedProduct) return;

    let currentCart = getFreshCartState();
    const existingIndex = currentCart.findIndex(item => item.id === productId && item.size === size);

    if (existingIndex > -1) {
        currentCart[existingIndex].quantity += quantity;
    } else {
        // Fix: Use the first item from gallery array structure safely
        const productImage = (matchedProduct.gallery && matchedProduct.gallery.length > 0) 
            ? matchedProduct.gallery[0].main 
            : 'assets/placeholder.webp';

        currentCart.push({
            id: productId,
            name: matchedProduct.name,
            price: matchedProduct.price,
            size: size,
            image: productImage,
            quantity: quantity
        });
    }

    localStorage.setItem('user_shopping_cart', JSON.stringify(currentCart));
    
    // Instantly sync the count and slide open panel view
    updateGlobalCartBadges(); 
    toggleCartDrawer(true);
}

// 3. INTERNAL DRAWER MARKUP TEMPLATE PRINTER
function renderCartDrawerContents() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    let runningSubtotal = 0;

    const currentCart = getFreshCartState();

    if (currentCart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg" style="text-align:center; padding:40px; color:#888;">Your cart is empty.</div>';
        if (cartSubtotalDisplay) cartSubtotalDisplay.textContent = '₱0.00';
        return;
    }

    currentCart.forEach((item, index) => {
        const itemCostTotal = item.price * item.quantity;
        runningSubtotal += itemCostTotal;

        const formattedPrice = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(itemCostTotal);

        const itemHTML = `
            <div class="cart-item-row" style="display:flex; gap:12px; margin-bottom:15px; border-bottom:1px solid #f5f5f5; padding-bottom:15px; position: relative;">
                <img src="${item.image}" alt="${item.name}" style="width:60px; height:60px; object-fit:cover; border-radius:4px;">
                <div class="cart-item-details" style="flex-grow:1; padding-right: 25px;">
                    <h5 style="margin:0 0 4px; font-size:0.9rem; padding-right: 15px;">${item.name}</h5>
                    <p style="margin:0 0 6px; font-size:0.8rem; color:#666;">Size: US ${item.size}</p>
                    <div class="cart-qty-control" style="display:flex; align-items:center; gap:8px;">
                        <button onclick="modifyCartQty(${index}, -1)" style="padding:2px 6px; cursor:pointer;">-</button>
                        <span style="font-size:0.85rem; font-weight:bold;">${item.quantity}</span>
                        <button onclick="modifyCartQty(${index}, 1)" style="padding:2px 6px; cursor:pointer;">+</button>
                        <span style="margin-left:auto; font-size:0.85rem; font-weight:bold;">${formattedPrice}</span>
                    </div>
                </div>
                <button onclick="deleteCartItem(${index})" class="cart-item-delete-btn" aria-label="Delete item" style="position: absolute; top: 0; right: 0; background: none; border: none; color: #cc0000; font-size: 1.2rem; cursor: pointer; padding: 2px 5px; font-weight: bold; line-height: 1;">
                    &times;
                </button>
            </div>`;
        
        cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    if (cartSubtotalDisplay) {
        cartSubtotalDisplay.textContent = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(runningSubtotal);
    }
}

// 4. UPGRADED COUNTER SYNC ACTION
function updateGlobalCartBadges() {
    const activeCart = getFreshCartState();
    const totalCount = activeCart.reduce((sum, item) => sum + item.quantity, 0);
    
    const counterElements = document.querySelectorAll('.cart-counter');
    counterElements.forEach(el => {
        el.textContent = totalCount;
        el.style.display = 'inline-block'; 
    });
}

// 5. GLOBAL SCOPE REGISTER ATTACHMENTS
window.modifyCartQty = function(index, delta) {
    let currentCart = getFreshCartState();
    currentCart[index].quantity += delta;
    
    if (currentCart[index].quantity <= 0) {
        currentCart.splice(index, 1);
    }
    
    localStorage.setItem('user_shopping_cart', JSON.stringify(currentCart));
    updateGlobalCartBadges(); 
    renderCartDrawerContents();
};

window.deleteCartItem = function(index) {
    let currentCart = getFreshCartState();
    currentCart.splice(index, 1); 
    
    localStorage.setItem('user_shopping_cart', JSON.stringify(currentCart)); 
    updateGlobalCartBadges();
    renderCartDrawerContents();
    
    // Safely refresh checkout calculations if user is actively on checkout.html page scope
    if (typeof renderCheckoutOrderSummary === 'function') {
        renderCheckoutOrderSummary();
    }
};

// Bind function pointers explicitly to window so that product-detail.js can call them instantly
window.addItemToCart = addItemToCart;
window.updateGlobalCartBadges = updateGlobalCartBadges;
window.renderCartDrawerContents = renderCartDrawerContents;
window.toggleCartDrawer = toggleCartDrawer;

// Run immediate execution to render accurate counters the moment the script runs
updateGlobalCartBadges();
