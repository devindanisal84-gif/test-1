/**
 * AGHORA - STREETWEAR STOREFRONT LOGIC
 * Dynamic Cart, Interactive Modals, Custom Cursor, Filtering, & Page Animations
 */

// ==========================================================================
// PRODUCT DATABASE
// ==========================================================================
const PRODUCTS = [
    {
        id: 1,
        name: "Midnight",
        category: "hoodie",
        price: 3200,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
        description: "Heavyweight 450gsm organic French Terry cotton, drop shoulder silhouette, double-lined structural hood, ribbed cuffs, and minimal industrial embroidery detail at the chest.",
        badge: "NEW DROP",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 2,
        name: "Cybernetic Grid Graphic Tee",
        category: "tshirt",
        price: 55.00,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        description: "260gsm premium compact cotton jersey with a custom vintage garment dye wash. High-definition screen printed cyberpunk grid graphic layout across the back.",
        badge: "POPULAR",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 3,
        name: "Tactical Multi-Strap Cargo",
        category: "pants",
        price: 145.00,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
        description: "Water-resistant matte nylon-cotton ripstop blend. Features a 6-pocket layout, integrated quick-release nylon straps, and adjustable metal cinch buckles at the ankles.",
        badge: "TECHWEAR",
        sizes: ["30", "32", "34", "36"]
    },
    {
        id: 4,
        name: "Obsidian Shell Jacket",
        category: "outerwear",
        price: 220.00,
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
        description: "3-layer waterproof laminate shell with fully taped seams. Magnetic storm pocket flaps, dual-way YKK aquaguard zippers, and multi-point toggle hood adjustment.",
        badge: "LIMITED",
        sizes: ["M", "L", "XL"]
    },
    {
        id: 5,
        name: "Acid Acid Logo Tee",
        category: "tshirt",
        price: 48.00,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
        description: "Heavyweight cotton tee with high-contrast acid green heat-transfer branding and structured neck ribbing. Preshrunk to maintain shape.",
        badge: "",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 6,
        name: "French Terry Zip Hoodie",
        category: "hoodie",
        price: 125.00,
        image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80",
        description: "Relaxed fit full zip hoody with heavy customized metal hardware, raw edge seam detailing, and reverse weave thermal panels along the sides.",
        badge: "NEW",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 7,
        name: "Street Soul Sling Bag",
        category: "accessories",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80",
        description: "1000D Cordura ballistic nylon construct. Heavy-duty cobra style quick-release metal buckle, utility pockets, and modular webbing straps.",
        badge: "ESSENTIAL",
        sizes: ["O/S"]
    },
    {
        id: 8,
        name: "Graphite Cargo Shorts",
        category: "pants",
        price: 95.00,
        image: "https://images.unsplash.com/photo-1517445312882-fa99b53d29ee?w=800&q=80",
        description: "Industrial grey wash heavy cotton canvas shorts. Features hand-distressed pocket edges, oversized cargo side-pockets, and internal drawstrings.",
        badge: "",
        sizes: ["30", "32", "34", "36"]
    },
    {
        id: 9,
        name: "Vandalism Knit Beanie",
        category: "accessories",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80",
        description: "Ribbed heavy-gauge acrylic knit construction. Folded cuff styling finished with a contrast AGHORA signature silicone branding patch.",
        badge: "RE-STOCK",
        sizes: ["O/S"]
    }
];

// ==========================================================================
// APPLICATION STATE
// ==========================================================================
let state = {
    cart: JSON.parse(localStorage.getItem('aghora_cart')) || [],
    activeFilter: 'all',
    searchQuery: '',
    selectedSize: 'M',
    quickViewProduct: null
};

// ==========================================================================
// DOM ELEMENTS
// ==========================================================================
const DOM = {
    loader: document.getElementById('loader'),
    header: document.getElementById('mainHeader'),
    scrollProgress: document.getElementById('scrollProgress'),
    
    // Cursor
    cursor: document.getElementById('custom-cursor'),
    cursorRing: document.getElementById('custom-cursor-ring'),
    
    // Product Grid & Filters
    shopGrid: document.getElementById('productsShopGrid'),
    filterBtns: document.querySelectorAll('.filter-tab-btn'),
    totalProductsCount: document.getElementById('totalProductsCount'),
    displayedProductsCount: document.getElementById('displayedProductsCount'),
    collectionCategoryLinks: document.querySelectorAll('.collection-link'),
    
    // Search elements
    searchToggleBtn: document.getElementById('searchToggleBtn'),
    searchOverlayBar: document.getElementById('searchOverlayBar'),
    searchInput: document.getElementById('searchInput'),
    searchCloseBtn: document.getElementById('searchCloseBtn'),
    
    // Mobile Drawer
    mobileMenuDrawer: document.getElementById('mobileMenuDrawer'),
    mobileMenuToggleBtn: document.getElementById('mobileMenuToggleBtn'),
    mobileMenuCloseBtn: document.getElementById('mobileMenuCloseBtn'),
    
    // Cart elements
    cartSidebarDrawer: document.getElementById('cartSidebarDrawer'),
    cartToggleBtn: document.getElementById('cartToggleBtn'),
    cartDrawerCloseBtn: document.getElementById('cartDrawerCloseBtn'),
    cartDrawerItemsList: document.getElementById('cartDrawerItemsList'),
    cartSubtotalAmount: document.getElementById('cartSubtotalAmount'),
    cartIndicatorCount: document.getElementById('cartIndicatorCount'),
    cartBackdropShield: document.getElementById('cartBackdropShield'),
    cartCheckoutBtn: document.getElementById('cartCheckoutBtn'),
    
    // Quick View Modal
    quickViewModal: document.getElementById('quickViewModal'),
    quickViewCloseBtn: document.getElementById('quickViewCloseBtn'),
    quickViewBackdrop: document.getElementById('quickViewBackdrop'),
    modalProductImage: document.getElementById('modalProductImage'),
    modalProductCategory: document.getElementById('modalProductCategory'),
    modalProductName: document.getElementById('modalProductName'),
    modalProductPrice: document.getElementById('modalProductPrice'),
    modalProductDesc: document.getElementById('modalProductDesc'),
    modalAddToCartBtn: document.getElementById('modalAddToCartBtn'),
    sizeOptionBtns: document.querySelectorAll('.size-option-btn'),
    
    // Newsletter
    newsletterForm: document.getElementById('newsletterRegisterForm'),
    newsletterEmail: document.getElementById('newsletterEmailInput'),
    newsletterSuccess: document.getElementById('newsSuccessToast'),
    
    // Toast Container
    toastWrapper: document.getElementById('toast-wrapper')
};

// ==========================================================================
// INTRO & PAGE LIFECYCLE
// ==========================================================================
window.addEventListener('load', () => {
    // Small timeout to allow css and assets to lock in, enhancing perceived loader flow
    setTimeout(() => {
        if (DOM.loader) {
            DOM.loader.classList.add('hidden');
        }
    }, 1800);
    
    initApp();
});

function initApp() {
    renderProductsGrid();
    updateCartDOM();
    setupCursorEvent();
    setupIntersectionObserver();
    bindEvents();
}

// ==========================================================================
// INTERACTIVE CUSTOM CURSOR
// ==========================================================================
function setupCursorEvent() {
    if (!DOM.cursor || !DOM.cursorRing) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate tracking for primary dot
        DOM.cursor.style.left = `${mouseX}px`;
        DOM.cursor.style.top = `${mouseY}px`;
    });

    // RequestAnimationFrame loop for lagged, magnetic ring tracking
    function updateRing() {
        // Linear interpolation for smooth delay follow effect
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        DOM.cursorRing.style.left = `${ringX}px`;
        DOM.cursorRing.style.top = `${ringY}px`;
        
        requestAnimationFrame(updateRing);
    }
    updateRing();

    // Attach hover listener triggers on interactive elements
    const hoverSelectors = 'a, button, input, .product-card, .collection-banner, .lookbook-item, .social-link, i';
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverSelectors)) {
            document.body.classList.add('cursor-hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (!e.target.closest(hoverSelectors)) {
            document.body.classList.remove('cursor-hover');
        }
    });
}

// ==========================================================================
// SHOP PRODUCT GRID & FILTER LOGIC
// ==========================================================================
function renderProductsGrid() {
    if (!DOM.shopGrid) return;
    
    // Filter product listings based on search term & category filter tab
    const filtered = PRODUCTS.filter(prod => {
        const matchesCategory = state.activeFilter === 'all' || prod.category === state.activeFilter;
        const matchesSearch = prod.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                              prod.category.toLowerCase().includes(state.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Update counts in DOM
    if (DOM.totalProductsCount) DOM.totalProductsCount.textContent = PRODUCTS.length;
    if (DOM.displayedProductsCount) DOM.displayedProductsCount.textContent = filtered.length;

    if (filtered.length === 0) {
        DOM.shopGrid.innerHTML = `
            <div class="no-results-placeholder reveal-element revealed">
                <i class="fas fa-search-minus"></i>
                <h3>NO PRODUCTS FOUND</h3>
                <p>Try searching for a different keyword or adjusting your category filter.</p>
            </div>
        `;
        return;
    }

    DOM.shopGrid.innerHTML = filtered.map(prod => {
        return `
            <div class="product-card reveal-element revealed" data-id="${prod.id}">
                <div class="product-image-container">
                    ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
                    <img src="${prod.image}" alt="${prod.name}" loading="lazy">
                    
                    <div class="product-actions-bar">
                        <button class="quick-add-btn" onclick="handleQuickAdd(${prod.id})">QUICK ADD (M)</button>
                        <button class="quick-view-trigger" onclick="openQuickView(${prod.id})" aria-label="Quick View product details">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-details">
                    <span class="product-meta">${prod.category} // AGY-${prod.id}00</span>
                    <h3 class="product-name">${prod.name}</h3>
                    <span class="product-price">$${prod.price.toFixed(2)}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Global quick add handler directly on cards
window.handleQuickAdd = function(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;
    
    // Default size for quick card click is "M"
    // (or O/S if accessories)
    const size = prod.category === 'accessories' ? 'O/S' : 'M';
    addItemToCart(prod, size);
};

// Global Quick View Trigger
window.openQuickView = function(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    state.quickViewProduct = prod;
    state.selectedSize = prod.category === 'accessories' ? 'O/S' : 'M';

    // Populate DOM Elements inside Quick View Modal
    if (DOM.modalProductImage) DOM.modalProductImage.src = prod.image;
    if (DOM.modalProductImage) DOM.modalProductImage.alt = prod.name;
    if (DOM.modalProductCategory) DOM.modalProductCategory.textContent = `${prod.category} // AGY-0${prod.id}`;
    if (DOM.modalProductName) DOM.modalProductName.textContent = prod.name;
    if (DOM.modalProductPrice) DOM.modalProductPrice.textContent = `$${prod.price.toFixed(2)}`;
    if (DOM.modalProductDesc) DOM.modalProductDesc.textContent = prod.description;

    // Render Sizing buttons matching product categories
    const sizeSelectContainer = document.querySelector('.size-select-grid');
    if (sizeSelectContainer) {
        sizeSelectContainer.innerHTML = prod.sizes.map(sz => {
            const activeClass = sz === state.selectedSize ? 'active' : '';
            return `<button class="size-option-btn ${activeClass}" onclick="handleModalSizeSelect('${sz}')">${sz}</button>`;
        }).join('');
    }

    if (DOM.quickViewModal) DOM.quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
};

window.handleModalSizeSelect = function(size) {
    state.selectedSize = size;
    // Re-render sizes selection highlights
    const btns = document.querySelectorAll('.size-option-btn');
    btns.forEach(btn => {
        if (btn.textContent.trim() === size) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

// Close Quickview Modal
function closeQuickView() {
    if (DOM.quickViewModal) {
        DOM.quickViewModal.classList.remove('active');
    }
    document.body.style.overflow = ''; // Restore scroll
    state.quickViewProduct = null;
}

// ==========================================================================
// CORE CART STATE & EVENT MANAGEMENT
// ==========================================================================
function addItemToCart(product, size) {
    // Check if item of same ID and Size is already in cart
    const existing = state.cart.find(item => item.id === product.id && item.size === size);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        state.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            size: size,
            quantity: 1
        });
    }

    // Save cart state
    saveCartState();
    updateCartDOM();
    
    // Trigger animations and alerts
    showToast(`ADDED <span>${product.name} (${size})</span> TO BAG.`);
    openCartSidebar();
}

function updateCartQuantity(id, size, delta) {
    const item = state.cart.find(it => it.id === id && it.size === size);
    if (!item) return;
    
    item.quantity += delta;
    
    if (item.quantity <= 0) {
        // Remove item if quantity goes to 0 or below
        state.cart = state.cart.filter(it => !(it.id === id && it.size === size));
        showToast(`REMOVED <span>${item.name}</span> FROM BAG.`, 'remove');
    }

    saveCartState();
    updateCartDOM();
}

function removeCartItem(id, size) {
    const item = state.cart.find(it => it.id === id && it.size === size);
    if (item) {
        state.cart = state.cart.filter(it => !(it.id === id && it.size === size));
        showToast(`REMOVED <span>${item.name}</span> FROM BAG.`, 'remove');
        saveCartState();
        updateCartDOM();
    }
}

function saveCartState() {
    localStorage.setItem('aghora_cart', JSON.stringify(state.cart));
}

function updateCartDOM() {
    if (!DOM.cartDrawerItemsList || !DOM.cartSubtotalAmount || !DOM.cartIndicatorCount) return;
    
    // Update navigation indicator badge
    const totalCount = state.cart.reduce((accum, curr) => accum + curr.quantity, 0);
    DOM.cartIndicatorCount.textContent = totalCount;

    if (state.cart.length === 0) {
        DOM.cartDrawerItemsList.innerHTML = `
            <div class="cart-drawer-empty-state">
                <i class="fas fa-shopping-bag"></i>
                <p>YOUR BAG IS CURRENTLY EMPTY.</p>
            </div>
        `;
        DOM.cartSubtotalAmount.textContent = "$0.00";
        return;
    }

    // Render cart items lists
    DOM.cartDrawerItemsList.innerHTML = state.cart.map(item => {
        return `
            <div class="cart-drawer-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <span class="cart-item-variant">Size: ${item.size}</span>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    
                    <div class="cart-item-qty-selector">
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, '${item.size}', -1)">-</button>
                        <span class="cart-qty-value">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, '${item.size}', 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove-btn" onclick="removeCartItem(${item.id}, '${item.size}')" aria-label="Remove item">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    }).join('');

    // Update Subtotal block
    const subtotal = state.cart.reduce((accum, curr) => accum + (curr.price * curr.quantity), 0);
    DOM.cartSubtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
}

// Slide-out Drawer Actions
function openCartSidebar() {
    if (DOM.cartSidebarDrawer && DOM.cartBackdropShield) {
        DOM.cartSidebarDrawer.classList.add('open');
        DOM.cartBackdropShield.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCartSidebar() {
    if (DOM.cartSidebarDrawer && DOM.cartBackdropShield) {
        DOM.cartSidebarDrawer.classList.remove('open');
        DOM.cartBackdropShield.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==========================================================================
// DYNAMIC TOAST ALERTS
// ==========================================================================
function showToast(message, type = 'add') {
    if (!DOM.toastWrapper) return;
    
    // Create element
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type === 'remove' ? 'toast-remove' : ''}`;
    
    toast.innerHTML = `
        <div class="toast-message-body">
            <i class="fas ${type === 'remove' ? 'fa-minus-circle' : 'fa-check-circle'}" style="color: ${type === 'remove' ? 'var(--accent-crimson)' : 'var(--accent-lime)'};"></i>
            ${message}
        </div>
        <button class="toast-close-trigger"><i class="fas fa-times"></i></button>
    `;
    
    DOM.toastWrapper.appendChild(toast);
    
    // Reflow trigger for slide animation
    setTimeout(() => toast.classList.add('show'), 50);
    
    // Auto remove timing
    const autoCloseTimer = setTimeout(() => {
        dismissToast(toast);
    }, 3500);

    // Close button trigger
    toast.querySelector('.toast-close-trigger').addEventListener('click', () => {
        clearTimeout(autoCloseTimer);
        dismissToast(toast);
    });
}

function dismissToast(toast) {
    toast.classList.remove('show');
    // Wait for transition ends
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 400);
}

// ==========================================================================
// SCROLL TRIGGERS & REVEALS (INTERSECTION OBSERVER)
// ==========================================================================
function setupIntersectionObserver() {
    // Setup Scroll reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing once triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-element');
    revealElements.forEach(el => revealObserver.observe(el));
}

// ==========================================================================
// EVENT LISTENERS & ROUTING BINDINGS
// ==========================================================================
function bindEvents() {
    // Scroll events: Header shrink & Progress Bar Width
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Progress tracker width
        if (DOM.scrollProgress && totalHeight > 0) {
            const pct = (scrollY / totalHeight) * 100;
            DOM.scrollProgress.style.width = `${pct}%`;
        }

        // Header shrinking overlay toggle
        if (DOM.header) {
            if (scrollY > 30) {
                DOM.header.classList.add('scrolled');
            } else {
                DOM.header.classList.remove('scrolled');
            }
        }
    });

    // Inline navigation Search Bar show/close triggers
    if (DOM.searchToggleBtn) {
        DOM.searchToggleBtn.addEventListener('click', () => {
            if (DOM.searchOverlayBar) {
                DOM.searchOverlayBar.classList.add('active');
                if (DOM.searchInput) {
                    DOM.searchInput.value = '';
                    DOM.searchInput.focus();
                }
            }
        });
    }

    if (DOM.searchCloseBtn) {
        DOM.searchCloseBtn.addEventListener('click', () => {
            if (DOM.searchOverlayBar) {
                DOM.searchOverlayBar.classList.remove('active');
            }
            state.searchQuery = '';
            renderProductsGrid();
        });
    }

    if (DOM.searchInput) {
        DOM.searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderProductsGrid();
        });
    }

    // Filter Buttons clicking logic
    DOM.filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            DOM.filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            state.activeFilter = e.target.dataset.filter;
            renderProductsGrid();
        });
    });

    // Category Links in Collection banners route directly to Shop with filters activated
    DOM.collectionCategoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const filterCat = e.target.closest('.collection-link').dataset.filterCategory;
            
            // Activate filter button highlight matching category
            DOM.filterBtns.forEach(btn => {
                if (btn.dataset.filter === filterCat) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            state.activeFilter = filterCat;
            renderProductsGrid();
        });
    });

    // Cart opening and closing triggers
    if (DOM.cartToggleBtn) DOM.cartToggleBtn.addEventListener('click', openCartSidebar);
    if (DOM.cartDrawerCloseBtn) DOM.cartDrawerCloseBtn.addEventListener('click', closeCartSidebar);
    if (DOM.cartBackdropShield) DOM.cartBackdropShield.addEventListener('click', closeCartSidebar);
    
    // Fake checkout action alert
    if (DOM.cartCheckoutBtn) {
        DOM.cartCheckoutBtn.addEventListener('click', () => {
            if (state.cart.length === 0) return;
            showToast("ORDER PLACED. DEMO CHECKOUT SUCCESSFUL.");
            state.cart = [];
            saveCartState();
            updateCartDOM();
            setTimeout(closeCartSidebar, 1500);
        });
    }

    // Modal quick-add trigger button action
    if (DOM.modalAddToCartBtn) {
        DOM.modalAddToCartBtn.addEventListener('click', () => {
            if (state.quickViewProduct) {
                addItemToCart(state.quickViewProduct, state.selectedSize);
                closeQuickView();
            }
        });
    }

    // Close Modals
    if (DOM.quickViewCloseBtn) DOM.quickViewCloseBtn.addEventListener('click', closeQuickView);
    if (DOM.quickViewBackdrop) DOM.quickViewBackdrop.addEventListener('click', closeQuickView);

    // Mobile Hamburger Menu Triggers
    if (DOM.mobileMenuToggleBtn) {
        DOM.mobileMenuToggleBtn.addEventListener('click', () => {
            if (DOM.mobileMenuDrawer) DOM.mobileMenuDrawer.classList.add('open');
            if (DOM.cartBackdropShield) DOM.cartBackdropShield.classList.add('active');
        });
    }

    const closeMobileMenu = () => {
        if (DOM.mobileMenuDrawer) DOM.mobileMenuDrawer.classList.remove('open');
        if (DOM.cartBackdropShield) DOM.cartBackdropShield.classList.remove('active');
    };

    if (DOM.mobileMenuCloseBtn) DOM.mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    
    // Close mobile menu on clicking any navigation drawer links
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
    mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    // Newsletter Register form handler
    if (DOM.newsletterForm) {
        DOM.newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = DOM.newsletterEmail ? DOM.newsletterEmail.value : '';
            if (email) {
                if (DOM.newsletterSuccess) {
                    DOM.newsletterSuccess.classList.add('active');
                    DOM.newsletterForm.reset();
                    setTimeout(() => {
                        DOM.newsletterSuccess.classList.remove('active');
                    }, 4000);
                }
            }
        });
    }
}
