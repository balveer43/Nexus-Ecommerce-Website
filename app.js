/**
 * ==========================================================================
 * NEXUS E-COMMERCE APPLICATION JAVASCRIPT
 * Features: Catalog Filtering, Real-time Search, Wishlist, Offcanvas Cart,
 * Quick View Modal, Checkout Simulation, Theme Switcher & Toast System
 * ==========================================================================
 */

// ----------------- APPLICATION STATE -----------------
const state = {
  products: PRODUCTS || [],
  cart: JSON.parse(localStorage.getItem("nexus_cart")) || [],
  wishlist: JSON.parse(localStorage.getItem("nexus_wishlist")) || [],
  activeCategory: "All",
  searchQuery: "",
  sortBy: "default",
  showWishlistOnly: false,
  appliedPromo: null,
  theme: localStorage.getItem("nexus_theme") || "light"
};

// Available Promo Codes
const VALID_PROMOS = {
  SAVE20: { discount: 0.20, label: "20%" },
  SAVE10: { discount: 0.10, label: "10%" },
  FREESHIP: { freeShipping: true, discount: 0, label: "Free Shipping" }
};

// ----------------- DOM ELEMENTS -----------------
const elements = {
  // Theme
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  
  // Navigation & Badges
  cartHeaderBtn: document.getElementById("cartHeaderBtn"),
  cartCount: document.getElementById("cartCount"),
  cartHeaderTotal: document.getElementById("cartHeaderTotal"),
  wishlistHeaderBtn: document.getElementById("wishlistHeaderBtn"),
  wishlistCount: document.getElementById("wishlistCount"),
  
  // Search
  searchInput: document.getElementById("searchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  
  // Filters & Catalog
  categoryPills: document.getElementById("categoryPills"),
  wishlistFilterBtn: document.getElementById("wishlistFilterBtn"),
  wishlistFilterCount: document.getElementById("wishlistFilterCount"),
  sortSelect: document.getElementById("sortSelect"),
  productsGrid: document.getElementById("productsGrid"),
  emptyCatalog: document.getElementById("emptyCatalog"),
  catalogCount: document.getElementById("catalogCount"),
  resetFiltersBtn: document.getElementById("resetFiltersBtn"),
  
  // Cart Drawer
  cartDrawer: document.getElementById("cartDrawer"),
  cartBackdrop: document.getElementById("cartBackdrop"),
  cartCloseBtn: document.getElementById("cartCloseBtn"),
  cartItemsContainer: document.getElementById("cartItemsContainer"),
  cartEmptyView: document.getElementById("cartEmptyView"),
  cartFooter: document.getElementById("cartFooter"),
  drawerCartCount: document.getElementById("drawerCartCount"),
  continueShoppingBtn: document.getElementById("continueShoppingBtn"),
  clearCartBtn: document.getElementById("clearCartBtn"),
  proceedToCheckoutBtn: document.getElementById("proceedToCheckoutBtn"),
  
  // Shipping & Promo
  shippingBarText: document.getElementById("shippingBarText"),
  shippingBarProgress: document.getElementById("shippingBarProgress"),
  cartCouponInput: document.getElementById("cartCouponInput"),
  applyCouponBtn: document.getElementById("applyCouponBtn"),
  appliedCouponTag: document.getElementById("appliedCouponTag"),
  appliedCouponCode: document.getElementById("appliedCouponCode"),
  appliedDiscountPercent: document.getElementById("appliedDiscountPercent"),
  removeCouponBtn: document.getElementById("removeCouponBtn"),
  
  // Summary Breakdown
  summarySubtotal: document.getElementById("summarySubtotal"),
  summaryDiscountRow: document.getElementById("summaryDiscountRow"),
  summaryDiscount: document.getElementById("summaryDiscount"),
  summaryShipping: document.getElementById("summaryShipping"),
  summaryTotal: document.getElementById("summaryTotal"),
  
  // Quick View Modal
  quickViewBackdrop: document.getElementById("quickViewBackdrop"),
  quickViewModal: document.getElementById("quickViewModal"),
  quickViewCloseBtn: document.getElementById("quickViewCloseBtn"),
  quickViewContent: document.getElementById("quickViewContent"),
  
  // Checkout Modal
  checkoutBackdrop: document.getElementById("checkoutBackdrop"),
  checkoutCloseBtn: document.getElementById("checkoutCloseBtn"),
  checkoutForm: document.getElementById("checkoutForm"),
  checkoutFormStep: document.getElementById("checkoutFormStep"),
  checkoutSuccessStep: document.getElementById("checkoutSuccessStep"),
  checkoutPayableTotal: document.getElementById("checkoutPayableTotal"),
  payNowBtn: document.getElementById("payNowBtn"),
  payNowText: document.getElementById("payNowText"),
  successOrderId: document.getElementById("successOrderId"),
  successDeliveryDate: document.getElementById("successDeliveryDate"),
  successTotalPaid: document.getElementById("successTotalPaid"),
  successCustomerEmail: document.getElementById("successCustomerEmail"),
  successDoneBtn: document.getElementById("successDoneBtn"),
  
  // Extra elements
  copyPromoBtn: document.getElementById("copyPromoBtn"),
  explorePromoBtn: document.getElementById("explorePromoBtn"),
  newsletterForm: document.getElementById("newsletterForm"),
  newsletterEmail: document.getElementById("newsletterEmail"),
  toastContainer: document.getElementById("toastContainer")
};

// ----------------- INITIALIZATION -----------------
function initApp() {
  applyTheme(state.theme);
  setupEventListeners();
  renderProducts();
  updateWishlistUI();
  updateCartUI();
}

// ----------------- THEME MANAGEMENT -----------------
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("nexus_theme", theme);
  
  const icon = elements.themeToggleBtn.querySelector("i");
  if (theme === "dark") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

function toggleTheme() {
  const newTheme = state.theme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  showToast(`Switched to ${newTheme} mode`, "info");
}

// ----------------- PRODUCT FILTERING & SORTING -----------------
function getFilteredProducts() {
  let list = [...state.products];

  // 1. Category Filter
  if (state.activeCategory !== "All") {
    list = list.filter(p => p.category.toLowerCase() === state.activeCategory.toLowerCase());
  }

  // 2. Search Query Filter
  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // 3. Wishlist Filter
  if (state.showWishlistOnly) {
    list = list.filter(p => state.wishlist.includes(p.id));
  }

  // 4. Sorting
  switch (state.sortBy) {
    case "price-low":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      list.sort((a, b) => {
        const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discB - discA;
      });
      break;
    default:
      // Featured / default
      list.sort((a, b) => a.id - b.id);
  }

  return list;
}

// ----------------- RENDER PRODUCT CATALOG -----------------
function renderProducts() {
  const filtered = getFilteredProducts();

  // Update counts
  if (state.showWishlistOnly) {
    elements.catalogCount.textContent = `Showing ${filtered.length} favorite item(s)`;
  } else if (state.searchQuery) {
    elements.catalogCount.textContent = `Found ${filtered.length} result(s) for "${state.searchQuery}"`;
  } else {
    elements.catalogCount.textContent = `Showing ${filtered.length} item(s)`;
  }

  // Empty state handling
  if (filtered.length === 0) {
    elements.productsGrid.innerHTML = "";
    elements.emptyCatalog.style.display = "block";
    return;
  }

  elements.emptyCatalog.style.display = "none";

  // Build Grid HTML
  elements.productsGrid.innerHTML = filtered.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    const badgeClass = getBadgeClass(product.badge);
    
    // Generate Stars
    const fullStars = Math.floor(product.rating);
    const halfStar = product.rating % 1 >= 0.5;
    let starsHtml = "";
    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="fa-solid fa-star"></i>';
    }
    if (halfStar) {
      starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
    }
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += '<i class="fa-regular fa-star"></i>';
    }

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-image-box">
          ${product.badge ? `<span class="product-badge ${badgeClass}">${product.badge}</span>` : ""}
          <div class="card-actions-top">
            <button class="btn-wishlist ${isWishlisted ? "active" : ""}" 
                    onclick="toggleWishlist(${product.id})" 
                    title="${isWishlisted ? "Remove from favorites" : "Add to favorites"}">
              <i class="${isWishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i>
            </button>
          </div>
          <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy" />
          <button class="btn-quick-view" onclick="openQuickView(${product.id})">
            <i class="fa-regular fa-eye"></i> Quick View
          </button>
        </div>

        <div class="product-details">
          <span class="product-category">${product.category}</span>
          <h3 class="product-title" title="${product.title}">${product.title}</h3>
          
          <div class="product-rating">
            <span class="rating-stars">${starsHtml}</span>
            <span class="rating-count">(${product.reviewsCount})</span>
          </div>

          <div class="product-footer">
            <div class="product-pricing">
              <span class="price-current">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="price-old">$${product.originalPrice.toFixed(2)}</span>` : ""}
            </div>
            <button class="btn-card-add" onclick="quickAddToCart(${product.id})">
              <i class="fa-solid fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function getBadgeClass(badge) {
  if (!badge) return "";
  const b = badge.toLowerCase();
  if (b.includes("sale")) return "badge-sale";
  if (b.includes("popular")) return "badge-popular";
  if (b.includes("new")) return "badge-new";
  if (b.includes("trending")) return "badge-trending";
  return "badge-best-seller";
}

// ----------------- WISHLIST FUNCTIONALITY -----------------
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const product = state.products.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed "${product ? product.title : 'item'}" from favorites`, "info");
  } else {
    state.wishlist.push(productId);
    showToast(`Added "${product ? product.title : 'item'}" to favorites!`, "success");
  }

  localStorage.setItem("nexus_wishlist", JSON.stringify(state.wishlist));
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  const count = state.wishlist.length;
  elements.wishlistCount.textContent = count;
  elements.wishlistFilterCount.textContent = count;

  if (state.showWishlistOnly) {
    elements.wishlistFilterBtn.classList.add("active");
  } else {
    elements.wishlistFilterBtn.classList.remove("active");
  }
}

// ----------------- CART FUNCTIONALITY -----------------
function quickAddToCart(productId, qty = 1) {
  addToCart(productId, qty);
}

function addToCart(productId, quantity = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    state.cart.push({ id: productId, quantity: quantity });
  }

  saveCart();
  updateCartUI();
  showToast(`Added ${quantity > 1 ? quantity + "x " : ""}"${product.title}" to cart!`, "success");
}

function updateCartQuantity(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  const product = state.products.find(p => p.id === productId);
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast(`Removed "${product ? product.title : 'item'}" from cart`, "info");
}

function clearCart() {
  if (state.cart.length === 0) return;
  state.cart = [];
  state.appliedPromo = null;
  saveCart();
  updateCartUI();
  showToast("Your cart has been cleared", "info");
}

function saveCart() {
  localStorage.setItem("nexus_cart", JSON.stringify(state.cart));
}

function updateCartUI() {
  const totalItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  // Update Badges
  elements.cartCount.textContent = totalItemCount;
  elements.drawerCartCount.textContent = `(${totalItemCount})`;

  // Calculate Subtotal
  let subtotal = 0;
  const cartDetailedItems = state.cart.map(item => {
    const product = state.products.find(p => p.id === item.id);
    const lineTotal = product ? product.price * item.quantity : 0;
    subtotal += lineTotal;
    return { ...item, product, lineTotal };
  }).filter(item => item.product !== undefined);

  // Free Shipping Calculation ($50 threshold)
  const freeShippingThreshold = 50.0;
  let shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.99;
  
  if (state.appliedPromo && state.appliedPromo.freeShipping) {
    shippingFee = 0;
  }

  // Update Free Shipping Progress
  if (subtotal >= freeShippingThreshold) {
    elements.shippingBarText.innerHTML = `🎉 <strong>Congratulations!</strong> You get FREE Shipping!`;
    elements.shippingBarProgress.style.width = "100%";
  } else {
    const remaining = (freeShippingThreshold - subtotal).toFixed(2);
    const percent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
    elements.shippingBarText.innerHTML = `Add <strong>$${remaining}</strong> more for Free Shipping!`;
    elements.shippingBarProgress.style.width = `${percent}%`;
  }

  // Calculate Discount
  let discountAmount = 0;
  if (state.appliedPromo && state.appliedPromo.discount) {
    discountAmount = subtotal * state.appliedPromo.discount;
    elements.summaryDiscountRow.style.display = "flex";
    elements.summaryDiscount.textContent = `-$${discountAmount.toFixed(2)}`;
    elements.appliedCouponTag.style.display = "flex";
    elements.appliedCouponCode.textContent = state.appliedPromo.code;
    elements.appliedDiscountPercent.textContent = state.appliedPromo.label;
  } else {
    elements.summaryDiscountRow.style.display = "none";
    elements.appliedCouponTag.style.display = "none";
  }

  // Total
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Update Text Elements
  elements.cartHeaderTotal.textContent = `$${grandTotal.toFixed(2)}`;
  elements.summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
  elements.summaryShipping.textContent = shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`;
  elements.summaryTotal.textContent = `$${grandTotal.toFixed(2)}`;
  elements.checkoutPayableTotal.textContent = `$${grandTotal.toFixed(2)}`;

  // Toggle Empty State vs Items List
  if (cartDetailedItems.length === 0) {
    elements.cartItemsContainer.style.display = "none";
    elements.cartFooter.style.display = "none";
    elements.cartEmptyView.style.display = "flex";
    elements.cartItemsContainer.innerHTML = "";
  } else {
    elements.cartItemsContainer.style.display = "flex";
    elements.cartFooter.style.display = "flex";
    elements.cartEmptyView.style.display = "none";

    elements.cartItemsContainer.innerHTML = cartDetailedItems.map(item => `
      <div class="cart-item-row" data-id="${item.id}">
        <img src="${item.product.image}" alt="${item.product.title}" class="cart-item-img" />
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.product.title}</h4>
          <div class="cart-item-price">$${item.product.price.toFixed(2)}</div>
          <div class="cart-item-controls">
            <div class="qty-counter">
              <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)" aria-label="Decrease quantity">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="qty-display">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)" aria-label="Increase quantity">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <button class="btn-remove-item" onclick="removeFromCart(${item.id})" title="Remove item">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }
}

// ----------------- CART DRAWER OPEN / CLOSE -----------------
function openCartDrawer() {
  elements.cartDrawer.classList.add("open");
  elements.cartBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  elements.cartDrawer.classList.remove("open");
  elements.cartBackdrop.classList.remove("open");
  document.body.style.overflow = "";
}

// ----------------- PROMO CODE LOGIC -----------------
function applyPromoCode() {
  const code = elements.cartCouponInput.value.trim().toUpperCase();
  if (!code) {
    showToast("Please enter a coupon code", "error");
    return;
  }

  if (VALID_PROMOS[code]) {
    state.appliedPromo = { code, ...VALID_PROMOS[code] };
    elements.cartCouponInput.value = "";
    updateCartUI();
    showToast(`Promo code "${code}" applied successfully!`, "success");
  } else {
    showToast(`Invalid promo code "${code}". Try SAVE20`, "error");
  }
}

function removePromoCode() {
  state.appliedPromo = null;
  updateCartUI();
  showToast("Promo code removed", "info");
}

// ----------------- QUICK VIEW MODAL -----------------
let quickViewActiveQty = 1;

function openQuickView(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  quickViewActiveQty = 1;
  const isWishlisted = state.wishlist.includes(product.id);

  const featuresList = (product.features || []).map(f => `
    <li><i class="fa-solid fa-circle-check"></i> ${f}</li>
  `).join("");

  elements.quickViewContent.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="quick-view-img" />
    <div class="quick-view-details">
      <span class="qv-category">${product.category}</span>
      <h2 class="qv-title">${product.title}</h2>
      
      <div class="qv-pricing">
        <span class="current">$${product.price.toFixed(2)}</span>
        ${product.originalPrice ? `<span class="old">$${product.originalPrice.toFixed(2)}</span>` : ""}
        ${product.originalPrice ? `<span class="discount-tag">Save ${(100 - (product.price / product.originalPrice * 100)).toFixed(0)}%</span>` : ""}
      </div>

      <p class="qv-description">${product.description}</p>

      <ul class="qv-features">
        ${featuresList}
      </ul>

      <div class="qv-actions">
        <div class="qv-qty">
          <button type="button" onclick="changeQuickViewQty(-1)"><i class="fa-solid fa-minus"></i></button>
          <span id="qvQtyDisplay">1</span>
          <button type="button" onclick="changeQuickViewQty(1)"><i class="fa-solid fa-plus"></i></button>
        </div>

        <button class="btn btn-primary" style="flex: 1;" onclick="addQuickViewToCart(${product.id})">
          <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </button>

        <button class="action-btn ${isWishlisted ? "active" : ""}" onclick="toggleWishlist(${product.id}); openQuickView(${product.id});" title="Wishlist">
          <i class="${isWishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i>
        </button>
      </div>
    </div>
  `;

  elements.quickViewBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function changeQuickViewQty(delta) {
  quickViewActiveQty = Math.max(1, quickViewActiveQty + delta);
  const display = document.getElementById("qvQtyDisplay");
  if (display) display.textContent = quickViewActiveQty;
}

function addQuickViewToCart(productId) {
  addToCart(productId, quickViewActiveQty);
  closeQuickView();
  openCartDrawer();
}

function closeQuickView() {
  elements.quickViewBackdrop.classList.remove("open");
  document.body.style.overflow = "";
}

// ----------------- CHECKOUT FLOW & MODAL -----------------
function openCheckout() {
  if (state.cart.length === 0) {
    showToast("Your cart is empty! Add items to checkout.", "error");
    return;
  }

  closeCartDrawer();
  elements.checkoutFormStep.style.display = "block";
  elements.checkoutSuccessStep.style.display = "none";
  elements.checkoutBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  elements.checkoutBackdrop.classList.remove("open");
  document.body.style.overflow = "";
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  // Validate fields
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();

  // Simulate payment processing
  elements.payNowBtn.disabled = true;
  elements.payNowText.textContent = "Processing Order...";

  setTimeout(() => {
    // Generate order ID
    const randomOrderId = "#NX-" + Math.floor(100000 + Math.random() * 900000);
    const paidTotal = elements.checkoutPayableTotal.textContent;

    // Delivery date calculation (4 days ahead)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const dateFormatted = deliveryDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    // Populate success screen
    elements.successOrderId.textContent = randomOrderId;
    elements.successCustomerEmail.textContent = email || "customer@example.com";
    elements.successDeliveryDate.textContent = dateFormatted;
    elements.successTotalPaid.textContent = paidTotal;

    // Transition view
    elements.checkoutFormStep.style.display = "none";
    elements.checkoutSuccessStep.style.display = "block";

    // Reset checkout button
    elements.payNowBtn.disabled = false;
    elements.payNowText.textContent = "Pay & Place Order";

    // Clear cart
    state.cart = [];
    state.appliedPromo = null;
    saveCart();
    updateCartUI();

    showToast("Order placed successfully! Confirmation sent.", "success");
  }, 1200);
}

// ----------------- TOAST NOTIFICATION UTILITY -----------------
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let iconClass = "fa-solid fa-circle-info";
  if (type === "success") iconClass = "fa-solid fa-circle-check";
  if (type === "error") iconClass = "fa-solid fa-triangle-exclamation";

  toast.innerHTML = `
    <i class="${iconClass}"></i>
    <span>${message}</span>
  `;

  elements.toastContainer.appendChild(toast);

  // Auto dismiss after 3.2s
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 350);
  }, 3200);

  // Dismiss on click
  toast.addEventListener("click", () => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 350);
  });
}

// ----------------- EVENT LISTENERS SETUP -----------------
function setupEventListeners() {
  // Theme Toggle
  elements.themeToggleBtn.addEventListener("click", toggleTheme);

  // Live Search
  elements.searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    elements.clearSearchBtn.style.display = state.searchQuery ? "flex" : "none";
    renderProducts();
  });

  elements.clearSearchBtn.addEventListener("click", () => {
    elements.searchInput.value = "";
    state.searchQuery = "";
    elements.clearSearchBtn.style.display = "none";
    elements.searchInput.focus();
    renderProducts();
  });

  // Category Pills
  elements.categoryPills.addEventListener("click", (e) => {
    if (!e.target.classList.contains("category-pill")) return;
    document.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
    e.target.classList.add("active");
    state.activeCategory = e.target.dataset.category;
    renderProducts();
  });

  // Wishlist Filter Toggle
  elements.wishlistFilterBtn.addEventListener("click", () => {
    state.showWishlistOnly = !state.showWishlistOnly;
    updateWishlistUI();
    renderProducts();
  });

  // Wishlist Header Button (Scroll to catalog & show favorites)
  elements.wishlistHeaderBtn.addEventListener("click", () => {
    state.showWishlistOnly = true;
    updateWishlistUI();
    renderProducts();
    document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
  });

  // Sorting
  elements.sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // Reset Filters Button
  elements.resetFiltersBtn.addEventListener("click", () => {
    state.activeCategory = "All";
    state.searchQuery = "";
    state.showWishlistOnly = false;
    state.sortBy = "default";
    elements.searchInput.value = "";
    elements.clearSearchBtn.style.display = "none";
    elements.sortSelect.value = "default";
    document.querySelectorAll(".category-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.category === "All");
    });
    updateWishlistUI();
    renderProducts();
  });

  // Cart Drawer Events
  elements.cartHeaderBtn.addEventListener("click", openCartDrawer);
  elements.cartCloseBtn.addEventListener("click", closeCartDrawer);
  elements.cartBackdrop.addEventListener("click", closeCartDrawer);
  elements.continueShoppingBtn.addEventListener("click", closeCartDrawer);
  elements.clearCartBtn.addEventListener("click", clearCart);

  // Promo Code Events
  elements.applyCouponBtn.addEventListener("click", applyPromoCode);
  elements.cartCouponInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyPromoCode();
    }
  });
  elements.removeCouponBtn.addEventListener("click", removePromoCode);

  // Checkout Events
  elements.proceedToCheckoutBtn.addEventListener("click", openCheckout);
  elements.checkoutCloseBtn.addEventListener("click", closeCheckout);
  elements.checkoutBackdrop.addEventListener("click", (e) => {
    if (e.target === elements.checkoutBackdrop) closeCheckout();
  });
  elements.checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  elements.successDoneBtn.addEventListener("click", closeCheckout);

  // Payment Option radio styling
  document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      document.querySelectorAll(".payment-option").forEach(opt => opt.classList.remove("active"));
      e.target.closest(".payment-option").classList.add("active");
      const cardFields = document.getElementById("cardFields");
      if (cardFields) {
        cardFields.style.display = e.target.value === "card" ? "block" : "none";
      }
    });
  });

  // Card input auto-formatters
  const cardNumberInput = document.getElementById("cardNumber");
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 16);
      val = val.match(/.{1,4}/g)?.join(" ") || val;
      e.target.value = val;
    });
  }

  const cardExpInput = document.getElementById("cardExp");
  if (cardExpInput) {
    cardExpInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 4);
      if (val.length >= 2) val = val.substring(0, 2) + "/" + val.substring(2);
      e.target.value = val;
    });
  }

  // Quick View Modal Backdrop close
  elements.quickViewCloseBtn.addEventListener("click", closeQuickView);
  elements.quickViewBackdrop.addEventListener("click", (e) => {
    if (e.target === elements.quickViewBackdrop) closeQuickView();
  });

  // Copy Promo Code Button
  if (elements.copyPromoBtn) {
    elements.copyPromoBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("SAVE20").then(() => {
        showToast("Coupon 'SAVE20' copied to clipboard!", "success");
      }).catch(() => {
        showToast("Use code: SAVE20", "info");
      });
    });
  }

  if (elements.explorePromoBtn) {
    elements.explorePromoBtn.addEventListener("click", () => {
      openCartDrawer();
      elements.cartCouponInput.value = "SAVE20";
      applyPromoCode();
    });
  }

  // Newsletter Form
  if (elements.newsletterForm) {
    elements.newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = elements.newsletterEmail.value.trim();
      if (email) {
        showToast(`Thank you for subscribing, ${email}! Check your inbox.`, "success");
        elements.newsletterEmail.value = "";
      }
    });
  }

  // Escape key closes modals and cart drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeQuickView();
      closeCheckout();
    }
  });
}

// Global helper for footer category link
function filterByCategory(categoryName) {
  state.activeCategory = categoryName;
  state.showWishlistOnly = false;
  document.querySelectorAll(".category-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.category.toLowerCase() === categoryName.toLowerCase());
  });
  renderProducts();
}

// Kickstart application on DOM ready
document.addEventListener("DOMContentLoaded", initApp);
