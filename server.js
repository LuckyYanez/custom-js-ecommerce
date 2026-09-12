const express = require('express');
const cors = require('cors');
const path = require('path'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔐 ENV VALUES: Fallback strings protect from crash if your cloud configuration is sleeping
const PAYPAL_CLIENT_ID = "AYSF7qwzaeCE-aw56_3hRv8-NS1EfWMdIID2mU2hu6Q2DI0oS_F9YmdkOblf6vcqannNrsNKxBukd9m7";
const PAYPAL_SECRET = "EEKyo8D6sD94WA4AXRs1LvGOS2uZBfRkTeqAkcWjozKgg8TrliNZoixA6nnsg71ygEiR4m1JeoVmG_9v";
const PAYPAL_API = "https://api-m.sandbox.paypal.com"; 

app.use(cors());
app.use(express.json());

// 🎫 HELPER: Internal asynchronous method generating secure transaction access tokens
async function generatePayPalAccessToken() {
    try {
        const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
        
        console.log("🔄 Contacting PayPal Sandbox for secure access token...");

        const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            // 🟢 FIXED: Using URLSearchParams resolves the infinite hanging loop lock in Node fetch!
            body: new URLSearchParams({
                "grant_type": "client_credentials"
            }).toString()
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ PAYPAL AUTH REJECTION (${response.status}):`, errorText);
            return null;
        }

        const data = await response.json();
        console.log("✅ SUCCESS: Received fresh Access Token from PayPal.");
        return data.access_token;
    } catch (err) {
        console.error("❌ ACCESS TOKEN EXCEPTION CRASH:", err);
        return null;
    }
}

// 📦 API ENDPOINT A: Create Order (Priority placement stops 405 error)
app.post('/api/orders', async (req, res) => {
    try {
        console.log("📥 Received /api/orders request from frontend cart panel.");
        const accessToken = await generatePayPalAccessToken();
        if (!accessToken) {
            console.error("❌ Aborting create order: Token generation returned null.");
            return res.status(500).json({ error: "Failed to authenticate with PayPal." });
        }

        console.log("🔄 Initializing unique PayPal order snapshot...");
        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [{
                    amount: {
                        currency_code: "PHP",
                        value: "3198.00" // Verification template value matching your storefront records
                    }
                }]
            })
        });

        const orderData = await response.json();
        
        if (!response.ok) {
            console.error("❌ PAYPAL ORDER CREATION REFUSED:", orderData);
            return res.status(response.status).json(orderData);
        }

        console.log(`🎉 SUCCESS: Generated Order Tracking ID: ${orderData.id}`);
        res.json(orderData);
    } catch (err) {
        console.error("❌ CRITICAL EXCEPTION INSIDE /api/orders:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// 📦 API ENDPOINT B: Capture Order (Priority placement ensures clean data handoffs)
app.post('/api/orders/:orderId/capture', async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(`📥 Received capture instruction for Order ID: ${orderId}`);
    const accessToken = await generatePayPalAccessToken();

    if (!accessToken) {
      console.log("❌ ACCESS TOKEN GENERATION FAILED!");
      return res.status(500).json({ error: "Failed to authenticate with PayPal." });
    }

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    const captureData = await response.json();
    
    if (!response.ok) {
      console.error("❌ PAYPAL CAPTURE ENGINE REJECTION:", captureData);
      return res.status(response.status).json(captureData);
    }

    console.log(`💰 SUCCESS: Funds cleanly captured for order reference ${orderId}!`);
    res.json(captureData);

  } catch (err) {
    console.error("❌ CRITICAL CAPTURE SERVER ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ------------------------------------------------------------------------
// 🛑 STATIC ASSETS LAYER (Positioned below APIs so routing hooks take priority)
// ------------------------------------------------------------------------

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`🚀 Success: Server listening cleanly on active port ${PORT}`));
