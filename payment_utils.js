let gpay_payment_data_request;
let applepay_config;
let fastlane;
let fastlane_profile;
let fastlane_identity;
let fastlane_payment_component;
let fastlane_watermark_component;
let fastlane_auth_flow_response;
let fastlane_authentication_state;

function get_client_data() {
    return new Promise(function(resolve, reject) {
        fetch(document_variable_client_data_endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "get_button_client_data"
                })
            })
            .then(function(response) {
                if (!response.ok) {
                    reject(new Error("Network response was not ok"));
                    return;
                }
                return response.json();
            }).then(function(payload) {
                //Store mode in window
                window.paypal_mode = payload.data.mode;
                resolve(payload);
            })
            .catch(function(error) {
                reject(error);
            });
    });
}

function complete_payment_from_order(arguments_object) {
    let order_id = arguments_object.order_id;
    return new Promise((resolve, reject) => {
        fetch(document_variable_complete_payment_endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_id
                })
            })
            .then((res) => {
                if (!res.ok) {
                    reject(new Error(`Network error: ${res.status} ${res.statusText}`));
                    return;
                }
                return res.json();
            })
            .then((response) => {
                remove_all_loading_overlay();
                console.log("Payment completed successfully:", response);
                resolve(response);
            })
            .catch((err) => {
                remove_all_loading_overlay();
                alert("There was an error completing your payment. Please try again later.");
                console.error("Error capturing PayPal order:", err);
                reject(err);
            });
    });
}

async function handle_apple_pay_click(event) {
    const applepay_instance = paypal.Applepay();
    const shipping_methods_array = JSON.parse(localStorage.getItem('applepay_shipping_array'));
    const mapped_shipping_methods = remap_shipping_for_applepay(shipping_methods_array);
    //applepay_config.merchantCapabilities.supportsDebit = true;
    const payment_request = {
        countryCode: applepay_config.countryCode,
        merchantCapabilities: applepay_config.merchantCapabilities,
        supportedNetworks: applepay_config.supportedNetworks,
        currencyCode: 'USD',
        shippingMethods: mapped_shipping_methods,
        requiredShippingContactFields: ['name', 'phone', 'email', 'postalAddress'],
        requiredBillingContactFields: ['postalAddress'],
        total: {
            label: 'Demo',
            type: 'final',
            amount: get_basket_item_total()
        }
    };
    let apple_pay_session = new ApplePaySession(4, payment_request);

    apple_pay_session.onvalidatemerchant = function(validation_event) {
        applepay_instance.validateMerchant({
                validationUrl: validation_event.validationURL,
                displayName: 'My Store'
            })
            .then(function(merchant_session_result) {
                apple_pay_session.completeMerchantValidation(merchant_session_result.merchantSession);
            })
            .catch(function(validation_error) {
                console.error(validation_error);
                apple_pay_session.abort();
            });
    };

    apple_pay_session.onshippingmethodselected = function(shipping_method_event) {
        let selected_method_identifier = shipping_method_event.shippingMethod.identifier;
        let selected_method_object = null;
        for (let i = 0; i < shipping_methods_array.length; i++) {
            if (shipping_methods_array[i].id === selected_method_identifier) {
                selected_method_object = shipping_methods_array[i];
                break;
            }
        }
        let shipping_cost = parseFloat(selected_method_object.amount);
        let basket_subtotal_amount = parseFloat(get_basket_item_total());
        let updated_total_amount = (basket_subtotal_amount + shipping_cost).toFixed(2);
        let updated_total = {
            label: 'Demo',
            type: 'final',
            amount: updated_total_amount
        };
        let updated_line_items = [{
                label: 'Subtotal',
                amount: basket_subtotal_amount.toFixed(2)
            },
            {
                label: selected_method_object.name,
                amount: shipping_cost.toFixed(2)
            }
        ];
        apple_pay_session.completeShippingMethodSelection({
            newTotal: updated_total,
            newLineItems: updated_line_items
        });
    };

    apple_pay_session.onshippingcontactselected = function(shipping_contact_event) {
        let shipping_contact = shipping_contact_event.shippingContact;
        let country_code = shipping_contact.countryCode;
        if (country_code !== 'US') {
            apple_pay_session.completeShippingContactSelection({
                errors: [{
                    code: 'shippingContactInvalidPostalAddress',
                    contactField: 'postalAddress',
                    message: 'We only ship within the United States'
                }]
            });
        } else {
            apple_pay_session.completeShippingContactSelection({
                newShippingMethods: mapped_shipping_methods,
                newTotal: payment_request.total,
                newLineItems: []
            });
        }
    };

    apple_pay_session.onpaymentauthorized = function(payment_authorization_event) {
        let apple_pay_payment_token_object = payment_authorization_event.payment.token;
        let apple_pay_billing_contact = payment_authorization_event.payment.billingContact;
        let payment_data = {
            shippingContact: payment_authorization_event.payment.shippingContact,
            billingContact: payment_authorization_event.payment.billingContact,
            shippingMethod: payment_authorization_event.payment.shippingMethod
        };
        let apple_pay_mapped = remap_apple_pay_payment_data_to_basket(payment_data);
        update_session_basket({
            type: 'applepay',
            payload: apple_pay_mapped
        });

        fetch(document_variable_create_paypal_order_endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(get_current_session_basket())
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(async (orderId) => {
                //Merge Apple Pay payment data with PayPal's order ID by confirming order
                let apple_pay_confirm_order = await paypal.Applepay().confirmOrder({
                    orderId: orderId,
                    token: apple_pay_payment_token_object,
                    billingContact: apple_pay_billing_contact,
                });
                console.log("Apple Pay confirm order response:", apple_pay_confirm_order);
                apple_pay_session.completePayment({
                    status: window.ApplePaySession.STATUS_SUCCESS,
                });
                init_loading_overlay();
                complete_payment_from_order({
                        order_id: orderId
                    })
                    .then((response) => {
                        console.log("Apple Pay PP Payment completed successfully:", response);
                        //Append card info to transaction info payload
                        append_to_session_basket({
                                transaction_information: response
                            })
                            .then(() => {
                                check_for_declines()
                                    .then(() => {
                                        window.location.href = document_variable_receipt_endpoint + "?session_basket=" + get_current_session_basket_id();
                                    });
                            });
                    });
            })
            .catch(function(err) {
                console.error(err);
                apple_pay_session.completePayment({
                    status: window.ApplePaySession.STATUS_FAILURE,
                });
                alert("There was an error approving your payment. Please try again later.");
            });
    };

    apple_pay_session.begin();
}

async function on_gpay_payment_data_changed(payment_data) {
    let response_update = {};

    if (payment_data.callbackTrigger === 'SHIPPING_OPTION') {
        let selected_option_id = payment_data.shippingOptionData.id;
        let available_options = gpay_payment_data_request.shippingOptionParameters.shippingOptions;
        let selected_option = available_options.find(option => option.id === selected_option_id);
        let shipping_cost = parseFloat(selected_option.label.replace(/[^0-9.]/g, ''));
        let basket_subtotal = parseFloat(get_basket_item_total());
        let combined_total = (basket_subtotal + shipping_cost).toFixed(2);
        let base_transaction_info = build_google_transaction_info(
            gpay_payment_data_request.transactionInfo.countryCode
        );
        base_transaction_info.totalPrice = combined_total;
        base_transaction_info.totalPriceStatus = 'FINAL';
        response_update.newTransactionInfo = base_transaction_info;
        response_update.newShippingOptionParameters = {
            defaultSelectedOptionId: selected_option_id,
            shippingOptions: available_options
        };
    }

    if (payment_data.callbackTrigger === 'SHIPPING_ADDRESS') {
        let country_code = payment_data.shippingAddress.countryCode;
        if (country_code !== 'US') {
            response_update.error = {
                reason: 'SHIPPING_ADDRESS_UNSERVICEABLE',
                message: 'Sorry, we only ship within the U.S.',
                intent: 'SHIPPING_ADDRESS'
            };
        } else {
            let shipping_array = await fetch_shipping_options();
            let remapped_parameters = remap_shipping_for_gpay(shipping_array);
            response_update.newShippingOptionParameters = remapped_parameters;
            let default_option_id = remapped_parameters.defaultSelectedOptionId;
            let default_option = remapped_parameters.shippingOptions.find(option => option.id === default_option_id);
            let shipping_cost = parseFloat(default_option.label.replace(/[^0-9.]/g, ''));
            let basket_subtotal = parseFloat(get_basket_item_total());
            let combined_total = (basket_subtotal + shipping_cost).toFixed(2);
            let base_transaction_info = build_google_transaction_info(
                gpay_payment_data_request.transactionInfo.countryCode
            );
            base_transaction_info.totalPrice = combined_total;
            base_transaction_info.totalPriceStatus = 'FINAL';
            response_update.newTransactionInfo = base_transaction_info;
        }
    }

    return response_update;
}

function onPaymentAuthorized(gpay_payment_data_input) {
    let gpay_remapped = remap_gpay_payment_data_to_basket(gpay_payment_data_input);
    update_session_basket({
        type: "gpay",
        payload: gpay_remapped
    });
    return new Promise(function(resolve, reject) {
        fetch(document_variable_create_paypal_order_endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(get_current_session_basket())
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(async (orderId) => {
                //Merge Google Pay payment data with PayPal's order ID by confirming order
                let gpay_confirm_order_response = await paypal.Googlepay().confirmOrder({
                    orderId: orderId,
                    paymentMethodData: gpay_payment_data_input.paymentMethodData
                });
                if (gpay_confirm_order_response.status === "APPROVED") {
                    resolve({
                        transactionState: 'SUCCESS'
                    });
                    init_loading_overlay();
                    complete_payment_from_order({
                            order_id: orderId
                        })
                        .then((response) => {
                            //Append card info to transaction info payload
                            response.payment_source.last_digits = gpay_confirm_order_response.payment_source.google_pay.card.last_digits;
                            response.payment_source.type = gpay_confirm_order_response.payment_source.google_pay.card.type;
                            append_to_session_basket({
                                    transaction_information: response
                                })
                                .then(() => {
                                    check_for_declines()
                                        .then(() => {
                                            window.location.href = document_variable_receipt_endpoint + "?session_basket=" + get_current_session_basket_id();
                                        });
                                });
                        });
                } else {
                    throw new Error("Payment not approved");
                }
            })
            .catch(function() {
                alert("There was an error approving your payment. Please try again later.");
                resolve({
                    transactionState: 'ERROR'
                });
            });
    });
}

function getGooglePaymentsClient() {
    let google_pay_payments_client = new google.payments.api.PaymentsClient({
        environment: window.paypal_mode === "sandbox" ? "TEST" : "PRODUCTION",
        paymentDataCallbacks: {
            onPaymentAuthorized: onPaymentAuthorized,
            onPaymentDataChanged: on_gpay_payment_data_changed,
        }
    });
    return google_pay_payments_client;
}

function build_google_transaction_info(countryCode) {
    let google_transaction_info_session_basket = get_current_session_basket();
    //Replace with your own basket content
    return {
        displayItems: [{
                label: google_transaction_info_session_basket.basket.items[0].quantity + " of the '2-Liner Shirt': " + google_transaction_info_session_basket.basket.items[0].line1 + " " + google_transaction_info_session_basket.basket.items[0].line2,
                type: "LINE_ITEM",
                price: JSON.parse(localStorage.getItem('2-line-t-shirt-price-data'))[google_transaction_info_session_basket.basket.items[0].size],
            },
            {
                label: "Subtotal",
                type: "SUBTOTAL",
                price: get_basket_item_total(),
            }
        ],
        countryCode: countryCode,
        currencyCode: "USD",
        totalPriceStatus: "FINAL",
        totalPrice: get_basket_item_total(),
        totalPriceLabel: "Total"
    };
}

async function getGooglePaymentDataRequest() {
    let {
        allowedPaymentMethods,
        merchantInfo,
        apiVersion,
        apiVersionMinor,
        countryCode
    } = await paypal.Googlepay().config();
    gpay_payment_data_request = Object.assign({}, {
        apiVersion,
        apiVersionMinor
    });
    gpay_payment_data_request.allowedPaymentMethods = allowedPaymentMethods;
    gpay_payment_data_request.transactionInfo = build_google_transaction_info(countryCode);
    gpay_payment_data_request.shippingOptionRequired = true;
    gpay_payment_data_request.shippingAddressRequired = true;
    gpay_payment_data_request.shippingAddressParameters = {
        allowedCountryCodes: ['US'],
        phoneNumberRequired: true
    };
    let shipping_options_for_gpay = await fetch_shipping_options();
    gpay_payment_data_request.shippingOptionParameters = remap_shipping_for_gpay(shipping_options_for_gpay);
    gpay_payment_data_request.merchantInfo = merchantInfo;
    gpay_payment_data_request.callbackIntents = ["PAYMENT_AUTHORIZATION", "SHIPPING_OPTION", "SHIPPING_ADDRESS"];
    return gpay_payment_data_request;
}

function check_no_items_in_basket() {
    if (get_basket_item_total() === "0.00") {
        document.getElementById("add-to-cart").click();
    }
}

async function onGooglePaymentButtonClicked() {
    check_no_items_in_basket();
    gpay_payment_data_request = await getGooglePaymentDataRequest();
    let google_pay_payments_client = getGooglePaymentsClient();
    google_pay_payments_client.loadPaymentData(gpay_payment_data_request);
}

function render_apple_pay_button(config_object) {
    return new Promise(async (resolve, reject) => {
        let apple_pay_spacer_div = document.createElement('div');
        apple_pay_spacer_div.style.marginTop = '12px';
        document.querySelector(config_object.selector).appendChild(apple_pay_spacer_div);

        let apple_pay_button_node = document.createElement('apple-pay-button');
        apple_pay_button_node.id = "btn-appl";
        apple_pay_button_node.setAttribute('buttonstyle', 'black');
        apple_pay_button_node.setAttribute('type', 'plain');
        apple_pay_button_node.setAttribute('locale', 'en');
        apple_pay_button_node.setAttribute('apple-pay-button', '');
        document.querySelector(config_object.selector).appendChild(apple_pay_button_node);
        let applepay = paypal.Applepay();
        applepay_config = await applepay.config();
        // No "await" in event listener, per Apple Pay guidelines, so saving shipping options to local storage temporarily for Apple Pay only
        localStorage.setItem('applepay_shipping_array', JSON.stringify(await fetch_shipping_options()));
        document.getElementById("btn-appl").addEventListener("click", handle_apple_pay_click);
        resolve();
    });
}

function render_google_pay_button(config_object) {
    return new Promise(async (resolve, reject) => {
        let selector = config_object.selector;
        let google_pay_payments_client = getGooglePaymentsClient();
        let {
            allowedPaymentMethods,
            apiVersion,
            apiVersionMinor
        } = await paypal.Googlepay().config();
        google_pay_payments_client.isReadyToPay({
                allowedPaymentMethods,
                apiVersion,
                apiVersionMinor
            })
            .then(function(response) {
                if (response.result) {
                    let google_pay_button = google_pay_payments_client.createButton({
                        buttonColor: 'white',
                        buttonSizeMode: 'fill',
                        buttonType: 'plain',
                        buttonRadius: 40,
                        onClick: onGooglePaymentButtonClicked
                    });
                    document.querySelectorAll(selector).forEach((node_element) => {
                        let google_pay_spacer_div = document.createElement('div');
                        google_pay_spacer_div.style.marginTop = '8px';
                        node_element.appendChild(google_pay_spacer_div);
                        node_element.appendChild(google_pay_button);
                    });
                    resolve();
                } else {
                    reject(new Error("Google Pay is not ready to pay."));
                }
            })
            .catch(function(err) {
                console.error(err);
                reject(err);
            });
    });
}

function load_script_to_head(sdk_url_string) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement("script");
        script.src = sdk_url_string;
        script.onload = function() {
            resolve();
        };
        script.onerror = function() {
            reject(new Error("Failed to load Script URL: " + sdk_url_string));
        };
        document.head.appendChild(script);
    });
}

async function render_fastlane_components(arguments_object) {
    return new Promise(async (resolve, reject) => {
        fastlane_options_object = {
            styles: {
                root: {
                    backgroundColor: "white",
                    errorColor: "red",
                    fontFamily: "Arial, sans-serif",
                    textColorBase: "black",
                    fontSizeBase: "16px",
                    padding: "0px",
                    primaryColor: "black",
                },
                input: {
                    backgroundColor: "white",
                    borderRadius: "4px",
                    borderColor: "#e6e6e6",
                    borderWidth: "1px",
                    textColorBase: "black",
                    focusBorderColor: "black",
                }
            },
        };
        let shipping_and_billing_object = remap_shipping_and_billing_for_fastlane();
        if (shipping_and_billing_object !== false) {
            Object.assign(fastlane_options_object, shipping_and_billing_object);
        }
        fastlane_payment_component = await fastlane.FastlaneCardComponent(fastlane_options_object);
        fastlane_payment_component.render(arguments_object.selector);
        resolve();
    });
}

async function bootstrap_fastlane_email_checker(arguments_object) {
    let is_guest_payer = true;
    let email_selector = arguments_object.selector;
    let string_is_an_email = false;
    if (!document.querySelector(email_selector)) {
        return;
    } // Code will stop here if the email selector is not found
    let email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    string_is_an_email = email_regex.test(document.querySelector(email_selector).value.trim());
    if (string_is_an_email === false) {
        return;
    } // Code will stop here if the email is not valid
    render_fastlane_loading_spinner();
    let lookup_response = await fastlane_identity.lookupCustomerByEmail(document.querySelector(email_selector).value.trim());
    document.getElementById('fastlane-loading').innerHTML = "";
    let customer_context_id = lookup_response.customerContextId;
    // User found in fastlane service, but user not authenticated yet
    if (customer_context_id) {
        is_guest_payer = false;
    } else {
        is_guest_payer = true;
    }
    // Lets attempt to authenticate the user
    fastlane_auth_flow_response = await fastlane_identity.triggerAuthenticationFlow(customer_context_id);
    fastlane_authentication_state = fastlane_auth_flow_response.authenticationState;
    fastlane_profile = fastlane_auth_flow_response.profileData;
    // Fastlane OTP auth passed
    if (fastlane_authentication_state === "succeeded") {
        is_guest_payer = false;
    } else {
        // User didn't pass, so back to being a guest payer
        is_guest_payer = true;
    }
    if (is_guest_payer === false) {
        let fastlane_remapped = remap_fastlane_data_to_basket(fastlane_profile);
        update_session_basket({
            type: "fastlane",
            payload: fastlane_remapped
        });
        // BEGIN Functions from checkout.js
        populatePageFromSession();
        validateContactSection();
        validateBillingSection();
        validateShippingInfoSection();
        validateShippingMethodSection();
        // END Functions from checkout.js
        document.getElementById("digital-wallets-container").style.display = "none";
        document.getElementById("or-container").style.display = "none";
        document.getElementById("card-fields-container").style.display = "none";
        render_stored_fastlane_card(fastlane_profile);
        click_on_accordion();
    } else
    if (is_guest_payer === true) {
        document.getElementById("digital-wallets-container").style.display = "block";
        document.getElementById("or-container").style.display = "flex";
        document.getElementById("stored-card-info-container").innerHTML = "";
        document.getElementById("card-fields-container").style.display = "block";
    }

}

async function handle_fastlane_button_click(event) {
    if (event.target.classList.contains("use-new-address")) {
        let {
            selectedAddress,
            selectionChanged
        } = await fastlane.profile.showShippingAddressSelector();
        if (selectionChanged) {
            console.log("Shipping address changed:", selectedAddress);
            fastlane_profile.shippingAddress = selectedAddress;
            let fastlane_remapped = remap_fastlane_data_to_basket(fastlane_profile);
            update_session_basket({
                type: "fastlane",
                payload: fastlane_remapped
            });
            // BEGIN Functions from checkout.js
            populatePageFromSession();
            validateContactSection();
            validateBillingSection();
            validateShippingInfoSection();
            validateShippingMethodSection();
            // END Functions from checkout.js
        }
    } else
    if (event.target.classList.contains("use-new-card")) {
        let {
            selectedCard,
            selectionChanged
        } = await fastlane.profile.showCardSelector();
        if (selectedCard) {
            console.log("Card used changed:", selectedCard);
            let card_token_id = selectedCard.id;
            fastlane_profile.card.paymentSource = selectedCard.paymentSource;
            fastlane_profile.card.id = card_token_id;
            render_stored_fastlane_card(fastlane_profile);
        }
    }
}

function bootstrap_fastlane(selector_json_object) {
    return new Promise(async (resolve, reject) => {
        let email_selector = selector_json_object.email_selector;
        let watermark_selector = selector_json_object.watermark_selector;
        fastlane = await window.paypal.Fastlane({});
        fastlane.setLocale("en_us");
        fastlane_profile = fastlane.profile;
        fastlane_payment_component = fastlane.FastlanePaymentComponent;
        fastlane_identity = fastlane.identity;
        // Fastlane watermark component
        fastlane_watermark_component = await fastlane.FastlaneWatermarkComponent({
            includeAdditionalInfo: true
        });
        fastlane_watermark_component.render(watermark_selector);
        document.addEventListener("input", function(event) {
            if (event.target.matches(email_selector)) {
                bootstrap_fastlane_email_checker({
                    selector: email_selector
                });
            }
        });
        bootstrap_fastlane_email_checker({
            selector: email_selector
        });
        document.addEventListener("click", handle_fastlane_button_click);
        resolve();
    });
}

function init_paypal_sdk(payload) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js" +
            "?client-id=" + payload.data.client_id +
            "&components=" + payload.components +
            "&enable-funding=venmo" +
            "&currency=USD&intent=capture";
        if (payload.data.sdk_client_token) {
            script.setAttribute("data-sdk-client-token", payload.data.sdk_client_token);
        }
        script.onload = function() {
            resolve();
        };
        script.onerror = function() {
            reject(new Error("Failed to load PayPal SDK script"));
        };
        document.head.appendChild(script);
    });
}

function update_paypal_messages_amount(selector_json_object) {
    let messages_node_list = selector_json_object.selector_node_list;
    if (messages_node_list && messages_node_list.length > 0) {
        for (let i = 0; i < messages_node_list.length; i++) {
            messages_node_list[i].setAttribute("data-pp-amount", get_basket_item_total());
        }
    }
}

function bootstrap_card_submit_buttons(selector_json_object) {
    return new Promise((resolve) => {
        let submit_button_selector = selector_json_object.selector;
        let card_field_instance = selector_json_object.card_field_instance;
        let buttons = document.querySelectorAll(submit_button_selector);
        buttons.forEach(function(button) {
            button.addEventListener("click", function(event) {
                init_loading_overlay();
                let session_basket_card_billing = get_current_session_basket();
                let card_billing_object = {};
                if (
                    session_basket_card_billing &&
                    session_basket_card_billing.billing_information &&
                    session_basket_card_billing.billing_information.address &&
                    session_basket_card_billing.billing_information.address.address_line_1 &&
                    session_basket_card_billing.billing_information.address.admin_area_2 &&
                    session_basket_card_billing.billing_information.address.postal_code
                ) {
                    card_billing_object = {
                        billingAddress: {
                            addressLine1: session_basket_card_billing.billing_information.address.address_line_1,
                            addressLine2: session_basket_card_billing.billing_information.address.address_line_2,
                            adminArea1: session_basket_card_billing.billing_information.address.admin_area_1,
                            adminArea2: session_basket_card_billing.billing_information.address.admin_area_2,
                            countryCode: "US", // Change if needed
                            postalCode: session_basket_card_billing.billing_information.address.postal_code
                        }
                    };
                }
                card_field_instance.submit(card_billing_object).catch(function(error) {
                    alert("There was an error submitting your card details. Please try again later.");
                    console.error("Error submitting card fields:", error);
                    remove_all_loading_overlay();
                });
            });
        });
        resolve();
    });
}

function bootstrap_fastlane_submit_buttons(selector_json_object) {
    return new Promise((resolve) => {
        let submit_button_selector = selector_json_object.selector;
        let buttons = document.querySelectorAll(submit_button_selector);
        buttons.forEach(function(button) {
            button.addEventListener("click", async function(event) {
                init_loading_overlay();
                let session_basket_card_billing = get_current_session_basket();
                let fastlane_billing_object = {};
                if (
                    session_basket_card_billing &&
                    session_basket_card_billing.billing_information &&
                    session_basket_card_billing.billing_information.address &&
                    session_basket_card_billing.billing_information.address.address_line_1 &&
                    session_basket_card_billing.billing_information.address.admin_area_2 &&
                    session_basket_card_billing.billing_information.address.postal_code
                ) {
                    fastlane_billing_object = {
                        billingAddress: {
                            addressLine1: session_basket_card_billing.billing_information.address.address_line_1,
                            addressLine2: session_basket_card_billing.billing_information.address.address_line_2 || "",
                            adminArea1: session_basket_card_billing.billing_information.address.admin_area_1,
                            adminArea2: session_basket_card_billing.billing_information.address.admin_area_2,
                            countryCode: "US",
                            postalCode: session_basket_card_billing.billing_information.address.postal_code,
                            phone: {
                                nationalNumber: session_basket_card_billing.contact_information.phone,
                                countryCode: "US",
                            }
                        }
                    };
                }
				let fastlane_token;
				// If there is no profile (Fastlane guest checkout)
				if (!fastlane_profile?.card || !fastlane_profile?.card?.id) {
					fastlane_token = await fastlane_payment_component.getPaymentToken(fastlane_billing_object).catch(function(error) {
						console.error("Error getting Fastlane payment token:", error);
						remove_all_loading_overlay();
					});
					console.log("Fastlane token fetched:", fastlane_token);
				}
                await append_to_session_basket({
                    fastlane_token: fastlane_profile?.card?.id || fastlane_token.id
                });
				// Use PayPal's create order to finalize fastlane
				// payment (It will be the final API Call)
                fetch(document_variable_create_paypal_order_endpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(get_current_session_basket())
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    }).then((json_response) => {
                        append_to_session_basket({
                                transaction_information: json_response
                            })
                            .then(() => {
                                check_for_declines()
                                    .then(() => {
                                        window.location.href = document_variable_receipt_endpoint + "?session_basket=" + get_current_session_basket_id();
                                    });
                            });
                    });
            });
        });
        resolve();
    });
}

function render_card_fields_on_page(selector_json_object) {
    return new Promise((resolve, reject) => {
        let expiry_field_selector = selector_json_object.expiry_field_selector;
        let cvv_field_selector = selector_json_object.cvv_field_selector;
        let number_field_selector = selector_json_object.number_field_selector;
        let cardField = paypal.CardFields({
            style: {
                'input': {
                    'font-size': '15px',
                    'font-family': 'Helvetica, sans-serif',
                    'color': 'black',
                },
                '.invalid': {
                    'color': 'red',
                },
            },
            createOrder: async (data, actions) => {
                return fetch(document_variable_card_payment_endpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(get_current_session_basket())
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then(orderId => orderId);
            },
            onError: (error) => {
                remove_all_loading_overlay();
                console.error("Error in card fields:", error);
            },
            onApprove: (data, actions) => {
                let order_id = data.orderID;
                console.log("Order ID:", order_id);
                complete_payment_from_order({
                        order_id: order_id
                    })
                    .then((response) => {
                        append_to_session_basket({
                                transaction_information: response
                            })
                            .then(() => {
                                check_for_declines()
                                    .then(() => {
                                        window.location.href = document_variable_receipt_endpoint + "?session_basket=" + get_current_session_basket_id();
                                    });
                            });
                    });
            },
        });
        Promise.all([
                cardField.NumberField().render(number_field_selector),
                cardField.ExpiryField().render(expiry_field_selector),
                cardField.CVVField().render(cvv_field_selector)
            ])
            .then(() => {
                resolve(cardField);
            })
            .catch((error) => {
                remove_all_loading_overlay();
                reject(error);
            });
    });
}

function check_for_declines() {
    return new Promise((resolve, reject) => {
        let session_basket = get_current_session_basket();
        if (session_basket && session_basket.transaction_information && session_basket.transaction_information.purchase_units && session_basket.transaction_information.purchase_units[0] && session_basket.transaction_information.purchase_units[0].payments && session_basket.transaction_information.purchase_units[0].payments.captures && session_basket.transaction_information.purchase_units[0].payments.captures[0] && session_basket.transaction_information.purchase_units[0].payments.captures[0].status === "DECLINED") {
            window.location.href = document_variable_decline_page_relative_url + "?session_basket=" + get_current_session_basket_id();
        } else if (session_basket && session_basket.transaction_information && session_basket.transaction_information.purchase_units && session_basket.transaction_information.purchase_units[0] && session_basket.transaction_information.purchase_units[0].payments && session_basket.transaction_information.purchase_units[0].payments.authorizations && session_basket.transaction_information.purchase_units[0].payments.authorizations[0] && session_basket.transaction_information.purchase_units[0].payments.authorizations[0].status === "DECLINED") {
            window.location.href = document_variable_decline_page_relative_url + "?session_basket=" + get_current_session_basket_id();
        }
        //add an else if to check if the session_basket.transaction_information.status exists and says DECLINED then also do the redirect
        else if (session_basket && session_basket.transaction_information && session_basket.transaction_information.status && session_basket.transaction_information.status === "DECLINED") {
            window.location.href = document_variable_decline_page_relative_url + "?session_basket=" + get_current_session_basket_id();
        } else {
            resolve();
        }
    });
}

function render_buttons_on_page(selector_json_object) {
    let buttons_selector = selector_json_object.selector;
    return new Promise(function(resolve, reject) {
        let paypal_buttons = paypal.Buttons({
            appSwitchWhenAvailable: true,
            style: {
                layout: "vertical",
                color: "gold",
                shape: "pill",
                label: "paypal",
                height: 40
            },
            onClick() {
                check_no_items_in_basket();
            },
            createOrder: (data, actions) => {
                return fetch(document_variable_create_paypal_order_endpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(get_current_session_basket())
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then(orderId => {
                        return orderId;
                    });
            },
            onError: (error) => {
                alert("There was an error completing your payment. Please try again later.");
                remove_all_loading_overlay();
                console.error("Error in card fields:", error);
            },
            onApprove: (data, actions) => {
                console.log("PayPal order approved:", data);
                console.log("PayPal actions:", actions);
                fetch(`${document_variable_get_order_details_endpoint}?order_id=${data.orderID}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Network error: ${response.status} ${response.statusText}`);
                        }
                        return response.json();
                    })
                    .then((order_data) => {
                        console.log("Order data:", order_data);
                        update_session_basket({
                            type: "paypal",
                            payload: order_data
                        });
                        init_loading_overlay();
                        complete_payment_from_order({
                                order_id: data.orderID
                            })
                            .then((response) => {
                                append_to_session_basket({
                                        transaction_information: response
                                    })
                                    .then(() => {
                                        check_for_declines()
                                            .then(() => {
                                                window.location.href = document_variable_receipt_endpoint + "?session_basket=" + get_current_session_basket_id();
                                            });
                                    });
                            });
                    });
            }
        });
        if (paypal_buttons.hasReturned()) {
            paypal_buttons.resume();
        } else {
            paypal_buttons.render(buttons_selector)
                .then(function() {
                    resolve();
                })
                .catch(function(error) {
                    reject(error);
                });
        }
    });
}

if (typeof get_current_session_basket === 'function') {
    window.get_current_session_basket = get_current_session_basket;
}
if (typeof get_client_data === 'function') {
    window.get_client_data = get_client_data;
}
if (typeof init_paypal_sdk === 'function') {
    window.init_paypal_sdk = init_paypal_sdk;
}
if (typeof render_buttons_on_page === 'function') {
    window.render_buttons_on_page = render_buttons_on_page;
}
if (typeof update_paypal_messages_amount === 'function') {
    window.update_paypal_messages_amount = update_paypal_messages_amount;
}