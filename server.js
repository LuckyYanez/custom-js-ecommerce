const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Update these variables with your actual dashboard credentials for validation testing
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || "YOUR_PAYPAL_SANDBOX_CLIENT_ID";
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || "YOUR_PAYPAL_SANDBOX_SECRET_KEY";
const PAYPAL_API = "https://paypal.com";

app.use(cors());
app.use(express.json());

// Instruct Node to securely deliver your front-end pages
app.use(express.static('public'));

// Helper endpoint function to generate an internal OAuth2 verification key
async function generatePayPalAccessToken() {
    try {
        const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
        const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        const data = await response.json();
        return data.access_token;
    } catch (err) {
        console.error("Access Token Request Error:", err);
        return null;
    }
}

// 📦 API ENDPOINT A: Create Order (Fires ruriartejr's client-side hooks)
app.post('/api/orders', async (req, res) => {
    try {
        const accessToken = await generatePayPalAccessToken();
        if (!accessToken) return res.status(500).json({ error: "Failed to authenticate with PayPal." });

        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [{
                    amount: {
                        currency_code: "PHP",
                        value: "3198.00" // Verification mock value testing shoes total matching logs
                    }
                }]
            })
        });

        const orderData = await response.json();
        res.json(orderData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📦 API ENDPOINT B: Capture Order 
app.post('/api/orders/:orderId/capture', async (req, res) => {
    try {
        const { orderId } = req.params;
        const accessToken = await generatePayPalAccessToken();
        
        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        const captureData = await response.json();
        res.json(captureData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`🚀 Success: Server listening directly on live local port ${PORT}`));
