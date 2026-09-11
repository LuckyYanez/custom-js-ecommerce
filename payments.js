// payments.js
let basket_session_payments = (typeof get_current_session_basket === 'function') 
    ? get_current_session_basket() 
    : { basket: { items: JSON.parse(localStorage.getItem('user_shopping_cart')) || [] } };

let theBasketHasItems = basket_session_payments?.basket?.items?.length > 0;

// Fallback path evaluation hooks matching your local pages
let document_variable_product_page_relative_url = "product-detail";
let document_variable_checkout_page_relative_url = "checkout";

let thisIsTheProductPage = window.location.pathname.endsWith("/" + document_variable_product_page_relative_url) || window.location.pathname.endsWith("/" + document_variable_product_page_relative_url + ".html") || window.location.pathname === "/";
let thisIsTheCheckoutPage = window.location.pathname.endsWith("/" + document_variable_checkout_page_relative_url) || window.location.pathname.endsWith("/" + document_variable_checkout_page_relative_url + ".html");

let components_array = [];
let url_params = new URLSearchParams(window.location.search);
let disable_fastlane = url_params.get('debug') === 'disablefl';

let can_apple_pay_load = false;
if (typeof ApplePaySession !== 'undefined' && ApplePaySession.supportsVersion(4) && ApplePaySession.canMakePayments()) {
    can_apple_pay_load = true;
}

// 🔥 FIX: Wrap his initialization logic inside a safe globally accessible function
window.startPayPalSDKOrchestration = function() {
    if (!(theBasketHasItems || thisIsTheProductPage)) return;

    // BEGIN LOADING SPINNER
    init_loading_overlay();

    // FIRST OBTAIN THE CREDENTIALS USED FOR THE CLIENT
    get_client_data()
    .then((client_creds_object) => {
        components_array = ["buttons", "messages", "fastlane", "card-fields", "googlepay", "applepay"];
        if (!can_apple_pay_load && components_array.includes("applepay")) {
            components_array.splice(components_array.indexOf("applepay"), 1);
        }
        let components_string = components_array.join(",");
        client_creds_object.components = components_string;
        return init_paypal_sdk(client_creds_object);
    })
    .then(() => {
      if (components_array.includes("buttons")) {
        // Targets your template container class
        return render_buttons_on_page({ selector: ".digital-wallet-buttons-container" });
      } else { return Promise.resolve(); }
    })
    .then(() => {
      if (components_array.includes("messages")) {
        return update_paypal_messages_amount({ selector_node_list: document.querySelectorAll("[data-pp-message]") });
      } else { return Promise.resolve(); }
    })
    .then(() => {
        if ((thisIsTheCheckoutPage && !("Fastlane" in window.paypal)) || (thisIsTheCheckoutPage && disable_fastlane)) {
          return render_card_fields_on_page({
              number_field_selector: "#card-number",
              expiry_field_selector: "#card-expiry",
              cvv_field_selector: "#card-cvv"
          });
        } else { return Promise.resolve(); }
    }).then((card_field_instance) => {
        if ((thisIsTheCheckoutPage && !("Fastlane" in window.paypal)) || (thisIsTheCheckoutPage && disable_fastlane)) {
          return bootstrap_card_submit_buttons({ selector: "#place-order-final-btn", card_field_instance: card_field_instance });
        } else { return Promise.resolve(); }
    })
    .then(() => {
      if (components_array.includes("googlepay")) return load_script_to_head("https://pay.google.com/gp/p/js/pay.js");
      else { return Promise.resolve(); }
    })
    .then(() => {
      if (components_array.includes("googlepay")) return render_google_pay_button({ selector: ".digital-wallet-buttons-container" });
      else { return Promise.resolve(); }
    })
    .then(() => {
      if (can_apple_pay_load === true && components_array.includes("applepay")) return load_script_to_head("https://cdn-apple.com");
      else { return Promise.resolve(); }
    })
    .then(() => {
      if (can_apple_pay_load === true && components_array.includes("applepay")) return render_apple_pay_button({ selector: ".digital-wallet-buttons-container" });
      else { return Promise.resolve(); }
    })
    .then(() => {
      if (document.getElementById('contact-email') && components_array.includes("fastlane") && (disable_fastlane === false)) {
        return bootstrap_fastlane({ email_selector: "#contact-email", watermark_selector: "#fastlane-watermark" });
      } else { return Promise.resolve(); }
    }).then(() => {
      if (thisIsTheCheckoutPage && components_array.includes("fastlane") && (disable_fastlane === false)) return render_fastlane_components({ selector: "#card-fields-container" });
      else { return Promise.resolve(); }
    }).then(() => {
      if (thisIsTheCheckoutPage && components_array.includes("fastlane") && (disable_fastlane === false)) return bootstrap_fastlane_submit_buttons({ selector: "#place-order-final-btn" });
      else { return Promise.resolve(); }
    })
    .then(() => { 
        remove_all_loading_overlay(); 
        if (thisIsTheCheckoutPage && typeof initializeFormLayoutTakeover === 'function') {
            initializeFormLayoutTakeover();
        }
    })
    .catch((error) => { remove_all_loading_overlay(); console.error("Error initializing PayPal:", error); });
};

// If on checkout page, execute instantly since HTML elements exist natively on load
document.addEventListener('DOMContentLoaded', () => {
    if (thisIsTheCheckoutPage) {
        window.startPayPalSDKOrchestration();
    }
});
