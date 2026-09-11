// ==========================================================================
// CENTRALIZED FRONT-END CHECKOUT SYSTEM INTERACTION ENGINE
// ==========================================================================

let activeCouponRate = 0; 
let selectedDistanceRate = 0; 
let isUserDataValidated = false; // Master memory gate lock
let paypalActionsRef = null; // Stores PayPal SDK operational tokens internally

document.addEventListener('DOMContentLoaded', () => {
    initializeAddressMirrorEvents();
    initializeCouponInteraction();
    initializeExplicitFormSubmission();
    initializeAccountOptInToggle(); // 🚀 ADD THIS LINE TO START UP THE TOGGLE!
    initializePayPalIntegration(); 
    renderCheckoutOrderSummary();
});

// 1. DATA ADDRESS REFLECTION SYNC
function initializeAddressMirrorEvents() {
    const checkbox = document.getElementById('same-as-shipping-checkbox');
    const billingSection = document.getElementById('billing-address-section');
    if (!checkbox) return;

    const fields = ['unit', 'street', 'brgy', 'city', 'zip', 'country'];

    function syncFields() {
        if (!checkbox.checked) return;
        fields.forEach(f => {
            const shipVal = document.getElementById(`ship-${f}`).value;
            const billInput = document.getElementById(`bill-${f}`);
            if (billInput) {
                billInput.value = shipVal;
                billInput.removeAttribute('required');
            }
        });
    }

    fields.forEach(f => {
        document.getElementById(`ship-${f}`).addEventListener('input', syncFields);
    });

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            billingSection.style.display = 'none';
            syncFields();
        } else {
            billingSection.style.display = 'block';
            fields.forEach(f => {
                const billInput = document.getElementById(`bill-${f}`);
                if (billInput) {
                    billInput.value = '';
                    billInput.setAttribute('required', 'true');
                }
            });
        }
    });
}

// 2. PROMO CODE INTERACTION
function initializeCouponInteraction() {
    const btn = document.getElementById('apply-coupon-btn');
    const input = document.getElementById('coupon-code-input');
    const feedback = document.getElementById('coupon-feedback-message');

    if (!btn || !input) return;

    btn.addEventListener('click', () => {
        const code = input.value.trim().toUpperCase();
        if (code === 'WELCOME20') {
            activeCouponRate = 0.20;
            feedback.textContent = "Coupon 'WELCOME20' applied successfully! (20% Off)";
            feedback.style.color = "#2ecc71";
        } else if (code === '') {
            activeCouponRate = 0;
            feedback.textContent = "";
        } else {
            activeCouponRate = 0;
            feedback.textContent = "Invalid coupon code details.";
            feedback.style.color = "#e74c3c";
        }
        renderCheckoutOrderSummary();
    });
}

// 3. CHECKOUT QUANTITY MODIFIERS
window.modifyCheckoutQty = function(index, delta) {
    let currentCart = typeof getFreshCartState === 'function' ? getFreshCartState() : [];
    if (currentCart.length === 0) return;

    currentCart[index].quantity += delta;
    if (currentCart[index].quantity <= 0) {
        currentCart.splice(index, 1);
    }

    localStorage.setItem('user_shopping_cart', JSON.stringify(currentCart));
    
    if (typeof updateGlobalCartBadges === 'function') updateGlobalCartBadges();
    if (typeof renderCartDrawerContents === 'function') renderCartDrawerContents();
    
    renderCheckoutOrderSummary();
};

// 4. INTELLIGENT GEOGRAPHIC SHIPPING PROCESSOR MOCK
function computeGeographicShippingRate(cityInputString) {
    const cleanCityStr = cityInputString.toLowerCase().trim();
    
    if (!isUserDataValidated || cleanCityStr === "") {
        return { rate: 0, text: "Submit account details to calculate...", minFree: 999999 };
    }

    if (cleanCityStr.includes("manila") || cleanCityStr.includes("pasig") || cleanCityStr.includes("quezon") || cleanCityStr.includes("makati") || cleanCityStr.includes("rizal") || cleanCityStr.includes("taguig") || cleanCityStr.includes("mandaluyong")) {
        return { rate: 100, text: "₱100.00 (Metro Manila Rate)", minFree: 3000 };
    } else if (cleanCityStr.includes("cebu") || cleanCityStr.includes("iloilo") || cleanCityStr.includes("bacolod") || cleanCityStr.includes("leyte") || cleanCityStr.includes("bohol")) {
        return { rate: 250, text: "₱250.00 (Visayas Logistics Freight)", minFree: 5000 };
    } else if (cleanCityStr.includes("davao") || cleanCityStr.includes("cagayan") || cleanCityStr.includes("zamboanga") || cleanCityStr.includes("general santos") || cleanCityStr.includes("cotabato")) {
        return { rate: 300, text: "₱300.00 (Mindanao Remote Cargo Freight)", minFree: 6000 };
    } else {
        return { rate: 180, text: "₱180.00 (Standard Luzon Province Rate)", minFree: 4000 };
    }
}
// ==========================================================================
// 5. MASTER RENDERING GENERATOR
// ==========================================================================
function renderCheckoutOrderSummary() {
    const targetSummaryContainer = document.getElementById('checkout-items-list');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const discountWrapper = document.getElementById('coupon-discount-wrapper');
    const discountEl = document.getElementById('checkout-discount');
    const shippingEl = document.getElementById('checkout-shipping');
    const grandTotalEl = document.getElementById('checkout-grand-total');

    if (!targetSummaryContainer) return;

    const currentCart = typeof getFreshCartState === 'function' ? getFreshCartState() : [];
    targetSummaryContainer.innerHTML = '';
    let runningSubtotal = 0;

    if (currentCart.length === 0) {
        targetSummaryContainer.innerHTML = 
            '<p style="padding:40px; color:#666; text-align:center; border: 1px dashed #ccc; border-radius: 6px;">' +
            'Your checkout queue is empty. <a href="index.html" style="color: #000; font-weight: bold;">Return to Store</a>' +
            '</p>';
        if (subtotalEl) subtotalEl.textContent = '₱0.00';
        if (shippingEl) shippingEl.textContent = '₱0.00';
        if (grandTotalEl) grandTotalEl.textContent = '₱0.00';
        return;
    }

    // A. Loop through cart items to generate item card nodes dynamically
    currentCart.forEach((item, index) => {
        const itemCostTotal = item.price * item.quantity;
        runningSubtotal += itemCostTotal;

        const formattedPrice = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(itemCostTotal);

        targetSummaryContainer.insertAdjacentHTML('beforeend', 
            '<div class="checkout-item-card" style="display: flex; gap: 16px; padding: 12px 0; border-bottom: 1px solid #eee; align-items: center;">' +
                '<img src="' + item.image + '" alt="' + item.name + '" style="width: 55px; height: 55px; object-fit: cover; border-radius: 6px; border: 1px solid #ddd;">' +
                '<div style="flex-grow: 1;">' +
                    '<h4 style="margin: 0 0 2px; font-size: 0.9rem; color: #111;">' + item.name + '</h4>' +
                    '<p style="margin: 0 0 4px; font-size: 0.75rem; color: #666;">Size: US ' + item.size + '</p>' +
                    '<div class="checkout-qty-control" style="display:flex; align-items:center; gap:8px;">' +
                        '<button type="button" onclick="modifyCheckoutQty(' + index + ', -1)">-</button>' +
                        '<span style="font-size:0.8rem; font-weight:bold;">' + item.quantity + '</span>' +
                        '<button type="button" onclick="modifyCheckoutQty(' + index + ', 1)">+</button>' +
                    '</div>' +
                '</div>' +
                '<div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">' +
                    '<button type="button" onclick="modifyCheckoutQty(' + index + ', -' + item.quantity + ')" class="checkout-item-delete-btn" aria-label="Delete item">&times;</button>' +
                    '<span style="font-weight:600; font-size:0.9rem;">' + formattedPrice + '</span>' +
                '</div>' +
            '</div>'
        );
    });

    // B. Calculate Dynamic Geographic Shipping Costs based on form city string value
    const cityInputText = document.getElementById('ship-city')?.value || "";
    const freightConfig = computeGeographicShippingRate(cityInputText);
    selectedDistanceRate = freightConfig.rate;

    const discountSum = runningSubtotal * activeCouponRate;
    const qualifiesForFreeShipping = isUserDataValidated && (runningSubtotal >= freightConfig.minFree);
    const finalShippingFee = qualifiesForFreeShipping ? 0 : selectedDistanceRate;
    const grandTotalSum = (runningSubtotal - discountSum) + finalShippingFee;

    const pesoFormatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });

    if (subtotalEl) subtotalEl.textContent = pesoFormatter.format(runningSubtotal);
    
    if (activeCouponRate > 0 && discountWrapper && discountEl) {
        document.getElementById('active-coupon-label').textContent = (activeCouponRate * 100) + "%";
        discountEl.textContent = "-" + pesoFormatter.format(discountSum);
        discountWrapper.style.display = 'flex';
    } else if (discountWrapper) {
        discountWrapper.style.display = 'none';
    }

    if (shippingEl) {
        if (!isUserDataValidated) {
            shippingEl.textContent = freightConfig.text;
            shippingEl.style.color = "#e67e22";
        } else {
            shippingEl.textContent = finalShippingFee === 0 ? "Free Shipping (Passed ₱" + freightConfig.minFree + ")" : pesoFormatter.format(finalShippingFee);
            shippingEl.style.color = "#333";
        }
    }
    if (grandTotalEl) grandTotalEl.textContent = pesoFormatter.format(grandTotalSum);

    // Continuous safety verification recheck to toggle locks on every mutation loop
    togglePayPalButtonContainerState();
}
window.renderCheckoutOrderSummary = renderCheckoutOrderSummary;

// ==========================================================================
// 🚀 MOVED: ACCOUNT PRIVACY SELECTION ANIMATOR LISTENER
// ==========================================================================
// This code must be hooked into your main startup stack to handle checkboxes cleanly
function initializeAccountOptInToggle() {
    const accountCheckbox = document.getElementById('save-info-account-checkbox');
    const passwordBox = document.getElementById('password-creation-box');
    const passwordInput = document.getElementById('reg-password');

    if (accountCheckbox && passwordBox && passwordInput) {
        accountCheckbox.addEventListener('change', () => {
            if (accountCheckbox.checked) {
                passwordBox.style.display = 'block';
                passwordInput.setAttribute('required', 'true'); // Enforce input requirements if opting in
            } else {
                passwordBox.style.display = 'none';
                passwordInput.removeAttribute('required');
                passwordInput.value = ''; // Flush data fields clean out of memory if deselected
            }
        });
    }
}


// 6. EXPLICIT INTERCEPT ACCOUNT CREATION TRIGGER LISTENER (Fixed)
// ==========================================================================
function initializeExplicitFormSubmission() {
    const form = document.getElementById('checkout-registration-form');
    const saveBtn = document.getElementById('save-profile-details-btn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        if (form.checkValidity()) {
            isUserDataValidated = true; 
            
            renderCheckoutOrderSummary(); 

            if (paypalActionsRef) {
                paypalActionsRef.enable(); 
            }

            // Clean button feedback only
            if (saveBtn) {
                saveBtn.textContent = "✓ DETAILS VERIFIED";
                saveBtn.style.background = "#27ae60";
            }

            // 🔥 FIX: Run the toggle to hide the form/instruction and show payment
            togglePayPalButtonContainerState();
        }
    });

    form.addEventListener('input', () => {
        if (isUserDataValidated) {
            isUserDataValidated = false;
            if (paypalActionsRef) paypalActionsRef.disable(); 
            if (saveBtn) {
                saveBtn.textContent = "RE-VERIFY UPDATED DETAILS";
                saveBtn.style.background = "#d35400";
            }
            renderCheckoutOrderSummary();

            // 🔥 FIX: Run the toggle to hide payment and bring back form instructions
            togglePayPalButtonContainerState();
        }
    });
}

function togglePayPalButtonContainerState() {
    const form = document.getElementById('checkout-registration-form'); // Your registration form container
    const container = document.getElementById('paypal-button-container');
    const cardForm = document.getElementById('paypal-card-form');
    const lockText = document.getElementById('paypal-lock-instruction-text');
    
    if (!form) return;

    if (form.checkValidity() && isUserDataValidated) {
        // 1. COMPLETELY HIDE the registration form wrapper & warning text
        form.style.display = "none";
        if (lockText) lockText.style.display = "none";

        // 2. SHOW the payment blocks by removing the hidden class
        if (container) container.classList.remove('payment-hidden');
        if (cardForm) cardForm.classList.remove('payment-hidden');
        
        if (paypalActionsRef) paypalActionsRef.enable();
    } else {
        // 1. RE-SHOW the form layout if edited or validation breaks
        form.style.display = "block";
        if (lockText) {
            lockText.style.display = "block";
            lockText.textContent = "⚠️ Complete and submit the Registration Form to authorize payment.";
        }

        // 2. RE-HIDE the payment panels completely
        if (container) container.classList.add('payment-hidden');
        if (cardForm) container.classList.add('payment-hidden');
        
        if (paypalActionsRef) paypalActionsRef.disable();
    }
}

// Ensure the window map remains intact across scripting files
window.togglePayPalButtonContainerState = togglePayPalButtonContainerState;
// ==========================================================================
// 7. SECURE MULTI-OPTION PAYPAL ENGINE (BUTTONS & INTEGRATED INPUT FIELDS)
// ==========================================================================
function initializePayPalIntegration() {
    if (!window.paypal) {
        console.error("PayPal Javascript SDK Engine failed parsing step.");
        return;
    }

    // A. CALCULATE DYNAMIC VALUES ENGINE
    function getCheckoutCalculationsInUsd() {
        const grandTotalText = document.getElementById('checkout-grand-total')?.textContent || "0";
        const cleanGrandTotal = parseFloat(grandTotalText.replace(/[^0-9.]/g, '')) || 0;
        // Convert to USD for sandbox configuration compatibility (1 USD = 56 PHP)
        return (cleanGrandTotal / 56).toFixed(2);
    }

    // B. OPTION 1: THE STANDARD PAYPAL BUTTONS
    window.paypal.Buttons({
        onInit: function(data, actions) {
            paypalActionsRef = actions;
            // Verify structural state right on kickoff loop execution runs
            const form = document.getElementById('checkout-registration-form');
            if (form && form.checkValidity() && isUserDataValidated) {
                paypalActionsRef.enable();
                document.getElementById('paypal-card-form')?.classList.remove('paypal-buttons-disabled');
            } else {
                paypalActionsRef.disable();
            }
        },
        createOrder: function(data, actions) {
            const calculatedTotalUsd = getCheckoutCalculationsInUsd();
            if (parseFloat(calculatedTotalUsd) <= 0) {
                alert("Cart is empty. Payment creation halted.");
                return actions.reject();
            }
            return actions.order.create({
                purchase_units: [{ amount: { currency_code: 'USD', value: calculatedTotalUsd } }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                localStorage.removeItem('user_shopping_cart');
                alert(`Transaction approved! Thank you, ${details.payer.name.given_name}.`);
                window.location.href = 'index.html';
            });
        }
    }).render('#paypal-button-container');

    // C. OPTION 2: THE HOSTED INTEGRATED CREDIT CARD FIELDS
    if (window.paypal.HostedFields.isEligible()) {
        window.paypal.HostedFields.render({
            styles: {
                'input': { 'font-size': '14px', 'font-family': 'sans-serif', 'color': '#333' },
                ':focus': { 'color': '#0070ba' }
            },
            fields: {
                number: { selector: '#card-number', placeholder: '4111 1111 1111 1111' },
                cvv: { selector: '#card-cvv', placeholder: '123' },
                expiry: { selector: '#card-expiry', placeholder: 'MM/YY' }
            }
        }).then(function(hostedFieldsInstance) {
            const payButton = document.getElementById('card-pay-btn');
            if (!payButton) return;

            payButton.addEventListener('click', function() {
                const totalUsd = getCheckoutCalculationsInUsd();
                
                // Triggers safe checkout directly inside your custom form boxes
                hostedFieldsInstance.submit({
                    cardholderName: document.getElementById('reg-full-name')?.value || 'Guest Shopper',
                    billingAddress: {
                        postalCode: document.getElementById('bill-zip')?.value || '1600'
                    }
                }).then(function(payload) {
                    localStorage.removeItem('user_shopping_cart');
                    alert("Credit Card transaction approved successfully by Sandbox engine!");
                    window.location.href = 'index.html';
                }).catch(function(err) {
                    console.error("Card Submission Runtime Error:", err);
                    alert("Card validation failure details: " + err.message);
                });
            });
        });
    }
}

// D. UPGRADE THE STATE GATE SWITCHING FUNCTION TO TOGGLE THE HOUSING BOX
function togglePayPalButtonContainerState() {
    const form = document.getElementById('checkout-registration-form');
    const container = document.getElementById('paypal-button-container');
    const cardForm = document.getElementById('paypal-card-form');
    const lockText = document.getElementById('paypal-lock-instruction-text');
    if (!form) return;

    if (form.checkValidity() && isUserDataValidated) {
        if (container) container.classList.remove('paypal-buttons-disabled');
        if (cardForm) cardForm.classList.remove('paypal-buttons-disabled');
        if (lockText) {
            lockText.textContent = "✓ Delivery address verified & Account configured. PayPal checkout unlocked.";
            lockText.style.color = "#2ecc71";
        }
    } else {
        if (container) container.classList.add('paypal-buttons-disabled');
        if (cardForm) cardForm.classList.add('paypal-buttons-disabled');
        if (lockText) {
            lockText.textContent = "⚠️ Click 'VERIFY DELIVERY INFO & CREATE ACCOUNT' on the right to process shipping costs.";
            lockText.style.color = "#e67e22";
        }
    }
}
// Overwrite window functions cleanly
window.togglePayPalButtonContainerState = togglePayPalButtonContainerState;

