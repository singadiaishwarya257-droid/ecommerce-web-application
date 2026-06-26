// ==========================================
// Global Variables
// ==========================================
let allProducts = [];
let cart = [];
let filteredProducts = [];

// ==========================================
// Initialize App
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initializeEventListeners();
    loadCartFromLocalStorage();
    updateCartCount();
    displayCart();
});

// ==========================================
// Load Products from JSON
// ==========================================
async function loadProducts() {
    try {
        const response = await fetch('js/products-data.json');
        const data = await response.json();
        allProducts = data.products;
        filteredProducts = allProducts;
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('products-grid').innerHTML = `
            <div class="alert alert-danger w-100">
                Failed to load products. Please refresh the page.
            </div>
        `;
    }
}

// ==========================================
// Display Products
// ==========================================
function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h3 class="text-muted">No products found</h3>
                <p class="text-muted">Try adjusting your filters</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <span class="product-badge">-${product.discount}%</span>
                </div>
                <div class="product-card-body">
                    <div class="product-category">${product.category}</div>
                    <h5 class="product-name">${product.name}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        ${generateStarRating(product.rating)}
                        <span class="text-muted">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    </div>
                    <div class="product-footer">
                        <button class="btn btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="btn btn-wishlist" onclick="addToWishlist(${product.id})">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ==========================================
// Generate Star Rating
// ==========================================
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - rating < 1) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// ==========================================
// Initialize Event Listeners
// ==========================================
function initializeEventListeners() {
    // Search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    // Category Filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }

    // Price Filter
    const priceFilter = document.getElementById('price-filter');
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }

    // Checkout Button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Cart is empty', 'danger');
                return;
            }
            const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
            modal.show();
        });
    }

    // Confirm Checkout
    const confirmCheckout = document.getElementById('confirm-checkout');
    if (confirmCheckout) {
        confirmCheckout.addEventListener('click', completeCheckout);
    }
}

// ==========================================
// Filter Products
// ==========================================
function filterProducts() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const category = document.getElementById('category-filter')?.value || '';
    const priceRange = document.getElementById('price-filter')?.value || '';

    filteredProducts = allProducts.filter(product => {
        // Search filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;

        // Category filter
        if (category && product.category !== category) return false;

        // Price filter
        if (priceRange) {
            const [minPrice, maxPrice] = getPriceRange(priceRange);
            if (product.price < minPrice || product.price > maxPrice) return false;
        }

        return true;
    });

    displayProducts(filteredProducts);
}

// ==========================================
// Get Price Range
// ==========================================
function getPriceRange(range) {
    const ranges = {
        '0-50': [0, 50],
        '50-100': [50, 100],
        '100-500': [100, 500],
        '500+': [500, Infinity]
    };
    return ranges[range] || [0, Infinity];
}

// ==========================================
// Add to Cart
// ==========================================
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCartToLocalStorage();
    updateCartCount();
    showNotification(`${product.name} added to cart!`, 'success');
}

// ==========================================
// Remove from Cart
// ==========================================
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    updateCartCount();
    displayCart();
    showNotification('Product removed from cart', 'success');
}

// ==========================================
// Update Cart Item Quantity
// ==========================================
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCartToLocalStorage();
            displayCart();
        }
    }
}

// ==========================================
// Update Cart Count
// ==========================================
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// ==========================================
// Display Cart
// ==========================================
function displayCart() {
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');
    const cartItemsList = document.getElementById('cart-items-list');

    if (!emptyCart || !cartContent) return;

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartContent.style.display = 'block';

    // Display cart items
    cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="quantity-selector">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" readonly>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="text-end">
                <div class="mb-3">
                    <span class="fw-bold" style="font-size: 1.3rem; color: var(--primary-color);">
                        $${(item.price * item.quantity).toFixed(2)}
                    </span>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `).join('');

    // Update totals
    updateCartTotals();
}

// ==========================================
// Update Cart Totals
// ==========================================
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// ==========================================
// Complete Checkout
// ==========================================
function completeCheckout() {
    const form = document.getElementById('checkout-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    modal.hide();

    // Clear cart
    cart = [];
    saveCartToLocalStorage();
    updateCartCount();

    // Show success message
    showNotification('Order placed successfully! Thank you for your purchase.', 'success');

    // Reset and redirect
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// ==========================================
// Add to Wishlist
// ==========================================
function addToWishlist(productId) {
    showNotification('Added to wishlist!', 'success');
    // In a real app, this would save to backend or localStorage
}

// ==========================================
// Local Storage Functions
// ==========================================
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// ==========================================
// Notification System
// ==========================================
function showNotification(message, type = 'success') {
    const toast = document.getElementById('notification-toast');
    const toastMessage = document.getElementById('toast-message');

    if (!toast) return;

    // Update toast styling based on type
    toast.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
    if (type === 'success') {
        toast.classList.add('bg-success');
    } else if (type === 'danger') {
        toast.classList.add('bg-danger');
    } else if (type === 'warning') {
        toast.classList.add('bg-warning');
    } else {
        toast.classList.add('bg-info');
    }

    toastMessage.textContent = message;

    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

// ==========================================
// Smooth Scrolling
// ==========================================
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        const target = e.target.getAttribute('href');
        if (target === '#') return;
        e.preventDefault();
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
