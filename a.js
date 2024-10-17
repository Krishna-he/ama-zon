// User authentication  
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Send request to server to authenticate user  
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // User is authenticated, redirect to dashboard  
                window.location.href = '/dashboard';
            } else {
                // User is not authenticated, display error message  
                document.getElementById('error-message').innerHTML = 'Invalid email or password';
            }
        })
        .catch((error) => console.error(error));
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Send request to server to register user  
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // User is registered, redirect to login page  
                window.location.href = '/login';
            } else {
                // User is not registered, display error message  
                document.getElementById('error-message').innerHTML = 'Error registering user';
            }
        })
        .catch((error) => console.error(error));
});

// Product search  
const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchQuery = document.getElementById('search-query').value;
    // Send request to server to search products  
    fetch('/search', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        params: { query: searchQuery }
    })
        .then((response) => response.json())
        .then((data) => {
            // Display search results  
            const searchResults = document.getElementById('search-results');
            searchResults.innerHTML = '';
            data.products.forEach((product) => {
                const productHTML = `  
      <li>  
       <img src="${product.image}" alt="${product.name}">  
       <h3>${product.name}</h3>  
       <p>$${product.price}</p>  
      </li>  
    `;
                searchResults.innerHTML += productHTML;
            });
        })
        .catch((error) => console.error(error));
});

// Payment gateway integration  
const paymentForm = document.getElementById('payment-form');

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const paymentMethod = document.getElementById('payment-method').value;
    const paymentAmount = document.getElementById('payment-amount').value;
    // Send request to server to process payment  
    fetch('/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentMethod, paymentAmount })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Payment is processed, display success message  
                document.getElementById('payment-message').innerHTML = 'Payment successful!';
            } else {
                // Payment is not processed, display error message  
                document.getElementById('payment-message').innerHTML = 'Error processing payment';
            }
        })
        .catch((error) => console.error(error));
});
