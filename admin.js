document.addEventListener('DOMContentLoaded', fetchOrdersFromDatabase);

// 1. Fetch active orders from your Node.js backend route
async function fetchOrdersFromDatabase() {
    const tbody = document.getElementById('admin-orders-tbody');
    if (!tbody) return;

    try {
        const response = await fetch('/api/admin/orders'); // Hits your Node.js endpoint
        const orders = await response.json();

        if (orders.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:#777;">No active orders found in database history.</td></tr>`;
            return;
        }

        tbody.innerHTML = ''; // Clear loading screen placeholder text

        orders.forEach(order => {
            const formattedTotal = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(order.grand_total_collected);
            
            const trHTML = `
                <tr>
                    <td style="font-family: monospace; font-size: 0.85rem;"><strong>${order.order_id}</strong></td>
                    <td>${order.full_name}</td>
                    <td>${order.shipping_city}</td>
                    <td style="font-weight: bold;">${formattedTotal}</td>
                    <td><span class="status-badge status-${order.order_status.toLowerCase()}">${order.order_status}</span></td>
                    <td>
                        ${order.order_status === 'Processing' ? 
                            `<button class="btn-ship" onclick="markOrderAsShipped('${order.order_id}')">Mark as Shipped</button>` : 
                            `<span style="color:#2ecc71; font-size:0.9rem;">✓ Dispatched</span>`
                        }
                    </td>
                </tr>`;
            tbody.insertAdjacentHTML('beforeend', trHTML);
        });
    } catch (error) {
        console.error("Error communicating with backend database:", error);
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#e74c3c;">Server connection failure. Ensure your Node.js backend is running.</td></tr>`;
    }
}

// 2. Action Trigger: Update an item state to "Shipped" inside your database
async function markOrderAsShipped(orderId) {
    try {
        const response = await fetch(`/api/admin/orders/${orderId}/ship`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        
        if (result.success) {
            fetchOrdersFromDatabase(); // Instantly refresh table lists without reloading page layout!
        }
    } catch (error) {
        alert("Failed to update execution process status state.");
    }
}
