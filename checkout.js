function renderCheckoutOrderSummary() {
    const targetSummaryContainer = document.getElementById('checkout-items-list');
    const billSubtotalElement = document.getElementById('checkout-subtotal');
    const billShippingElement = document.getElementById('checkout-shipping');
    const billGrandTotalElement = document.getElementById('checkout-grand-total');

    // Prevent internal tracking errors if running script components on a page without a checkout layout
    if (!targetSummaryContainer) return; 

    targetSummaryContainer.innerHTML = '';
    let runningSubtotal = 0;

    // 1. Loop through tracking states to generate itemized card nodes
    cartState.forEach(item => {
        const itemCostTotal = item.price * item.quantity;
        runningSubtotal += itemCostTotal;

        const baseUnitFormatted = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(item.price);
        const totalLineItemFormatted = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(itemCostTotal);

        const summaryCardHTML = `
            <div class="checkout-item-card" style="display: flex; gap: 16px; padding: 15px 0; border-bottom: 1px solid #eaeaea; align-items: center;">
                <div style="position: relative;">
                    <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 6px; border: 1px solid #ddd;">
                    <span style="position: absolute; top: -8px; right: -8px; background: #333; color: #fff; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold;">
                        ${item.quantity}
                    </span>
                </div>
                <div style="flex-grow: 1;">
                    <h4 style="margin: 0 0 4px; font-size: 0.95rem; color: #111;">${item.name}</h4>
                    <p style="margin: 0; font-size: 0.8rem; color: #666;">Size: US ${item.size}</p>
                    <p style="margin: 4px 0 0; font-size: 0.8rem; color: #888;">Unit Price: ${baseUnitFormatted}</p>
                </div>
                <div style="font-weight: bold; font-size: 0.95rem; color: #222;">
                    ${totalLineItemFormatted}
                </div>
            </div>`;
        
        targetSummaryContainer.insertAdjacentHTML('beforeend', summaryCardHTML);
    });

    // 2. Base Calculation Framework (With upcoming Shipping hooks ready to activate)
    // Modify shippingCost logic conditions here later (e.g., free shipping targets above ₱5000)
    let shippingCost = 0; 
    let grandTotalSum = runningSubtotal + shippingCost;

    // 3. Format Currency Visual String Displays
    const pesoFormatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });

    if (billSubtotalElement) billSubtotalElement.textContent = pesoFormatter.format(runningSubtotal);
    if (billShippingElement) billShippingElement.textContent = shippingCost === 0 ? "Free Shipping" : pesoFormatter.format(shippingCost);
    if (billGrandTotalElement) billGrandTotalElement.textContent = pesoFormatter.format(grandTotalSum);
}

// Ensure the engine automatically calls the checkout template writer whenever any script instance hits a checkout page viewport
document.addEventListener('DOMContentLoaded', renderCheckoutOrderSummary);
