const SUPABASE_URL = 'https://qzbuinrzubpqzmfjpkyv.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6YnVpbnJ6dWJwcXptZmpwa3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1Njg4MzUsImV4cCI6MjEwNTE0NDgzNX0.DczWM_AINJHqCXKuczWW0hAicT7-txmgxh0N8Ijft2I';

const { createClient } = window.supabase;

const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


// ========================================
// CHECK CURRENT SESSION
// ========================================

async function checkCurrentUser() {

    const {
        data: { session },
        error
    } = await supabaseClient.auth.getSession();

    if (error) {
        console.error('Unable to get current session:', error);
        showLoggedOutState();
        return;
    }

    if (!session) {
        showLoggedOutState();
        return;
    }

    console.log('Logged-in user:', session.user.email);

    showLoggedInState(session.user);
}


// ========================================
// SHOW LOGGED-OUT STATE
// ========================================

function showLoggedOutState() {

    const loggedOutSection =
        document.getElementById('logged-out-section');

    const loggedInSection =
        document.getElementById('logged-in-section');

    if (loggedOutSection) {
        loggedOutSection.style.display = 'block';
    }

    if (loggedInSection) {
        loggedInSection.style.display = 'none';
    }
}


// ========================================
// SHOW LOGGED-IN STATE
// ========================================

function showLoggedInState(user) {

    const loggedOutSection =
        document.getElementById('logged-out-section');

    const loggedInSection =
        document.getElementById('logged-in-section');

    if (loggedOutSection) {
        loggedOutSection.style.display = 'none';
    }

    if (loggedInSection) {
        loggedInSection.style.display = 'block';
    }


    // Email
    const emailElement =
        document.getElementById('account-email');

    if (emailElement) {
        emailElement.textContent = user.email || '';
    }


    // First name
    const firstName =
        user.user_metadata?.first_name || '';

    const lastName =
        user.user_metadata?.last_name || '';


    // Full name
    const fullName =
        `${firstName} ${lastName}`.trim();

    const nameElement =
        document.getElementById('account-name');

    if (nameElement) {
        nameElement.textContent =
            fullName || 'Not provided';
    }


    // Welcome message
    const welcomeElement =
        document.getElementById('account-welcome');

    if (welcomeElement) {

        if (firstName) {
            welcomeElement.textContent =
                `Welcome, ${firstName}!`;
        } else {
            welcomeElement.textContent =
                'Welcome back!';
        }
    }
}


// ========================================
// LOGIN
// ========================================

async function handleLogin(event) {

    event.preventDefault();

    const emailInput =
        document.getElementById('login-email');

    const passwordInput =
        document.getElementById('login-password');

    const loginButton =
        document.getElementById('login-btn');

    const message =
        document.getElementById('login-message');


    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


    message.textContent = '';

    loginButton.disabled = true;
    loginButton.textContent = 'Signing In...';


    const {
        data,
        error
    } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });


    if (error) {

        console.error('Login error:', error);

        message.textContent =
            error.message;

        loginButton.disabled = false;
        loginButton.textContent = 'Sign In';

        return;
    }


    console.log(
        'Successfully signed in:',
        data.user.email
    );


    showLoggedInState(data.user);

    loginButton.disabled = false;
    loginButton.textContent = 'Sign In';
}


// ========================================
// CREATE ACCOUNT
// ========================================

async function handleSignup(event) {

    event.preventDefault();

    const firstNameInput =
        document.getElementById('signup-first-name');

    const lastNameInput =
        document.getElementById('signup-last-name');

    const emailInput =
        document.getElementById('signup-email');

    const passwordInput =
        document.getElementById('signup-password');

    const marketingCheckbox =
        document.getElementById('marketing-opt-in');

    const signupButton =
        document.getElementById('signup-btn');

    const message =
        document.getElementById('signup-message');


    const firstName =
        firstNameInput.value.trim();

    const lastName =
        lastNameInput.value.trim();

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;

    const marketingOptIn =
        marketingCheckbox.checked;


    message.textContent = '';

    signupButton.disabled = true;
    signupButton.textContent = 'Creating Account...';


    const {
        data,
        error
    } = await supabaseClient.auth.signUp({

        email,
        password,

        options: {

            data: {
                first_name: firstName,
                last_name: lastName,
                marketing_opt_in: marketingOptIn
            }

        }

    });


    if (error) {

        console.error('Signup error:', error);

        message.textContent =
            error.message;

        signupButton.disabled = false;
        signupButton.textContent = 'Create Account';

        return;
    }


    console.log(
        'Account created:',
        data.user
    );


    /*
     * Supabase normally requires email confirmation
     * when that setting is enabled.
     */

    if (data.session) {

        // User was automatically signed in.
        showLoggedInState(data.user);

    } else {

        message.textContent =
            'Account created successfully. Please check your email to confirm your account.';

    }


    signupButton.disabled = false;
    signupButton.textContent = 'Create Account';
}


// ========================================
// LOGOUT
// ========================================

async function handleLogout() {

    const logoutButton =
        document.getElementById('logout-btn');

    const message =
        document.getElementById('logout-message');


    logoutButton.disabled = true;
    logoutButton.textContent = 'Signing Out...';


    const { error } =
        await supabaseClient.auth.signOut();


    if (error) {

        console.error(
            'Logout error:',
            error
        );

        message.textContent =
            'Unable to sign out. Please try again.';

        logoutButton.disabled = false;
        logoutButton.textContent = 'Sign Out';

        return;
    }


    console.log('User signed out.');

    showLoggedOutState();

    logoutButton.disabled = false;
    logoutButton.textContent = 'Sign Out';
}


// ========================================
// PASSWORD SHOW / HIDE
// ========================================

function setupPasswordToggle(
    inputId,
    buttonId
) {

    const passwordInput =
        document.getElementById(inputId);

    const toggleButton =
        document.getElementById(buttonId);


    if (!passwordInput || !toggleButton) {
        return;
    }


    toggleButton.addEventListener(
        'click',
        () => {

            if (
                passwordInput.type ===
                'password'
            ) {

                passwordInput.type =
                    'text';

                toggleButton.textContent =
                    'Hide';

            } else {

                passwordInput.type =
                    'password';

                toggleButton.textContent =
                    'Show';
            }

        }
    );
}


// ========================================
// AUTH STATE LISTENER
// ========================================

function initializeAuthListener() {

    supabaseClient.auth.onAuthStateChange(
        (event, session) => {

            console.log(
                'Auth state changed:',
                event
            );


            if (session) {

                showLoggedInState(
                    session.user
                );

            } else {

                showLoggedOutState();

            }

        }
    );
}


// ========================================
// PAGE INITIALIZATION
// ========================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        // Login form
        const loginForm =
            document.getElementById('login-form');

        if (loginForm) {

            loginForm.addEventListener(
                'submit',
                handleLogin
            );

        }


        // Signup form
        const signupForm =
            document.getElementById('signup-form');

        if (signupForm) {

            signupForm.addEventListener(
                'submit',
                handleSignup
            );

        }


        // Logout
        const logoutButton =
            document.getElementById('logout-btn');

        if (logoutButton) {

            logoutButton.addEventListener(
                'click',
                handleLogout
            );

        }


        // Password toggles
        setupPasswordToggle(
            'login-password',
            'login-password-toggle'
        );

        setupPasswordToggle(
            'signup-password',
            'signup-password-toggle'
        );


        // Check existing Supabase session
        checkCurrentUser();


        // Listen for login/logout/session changes
        initializeAuthListener();

    }
);