# 🛒 Nexus Modern E-Commerce Web Application

A fully responsive, high-performance, and feature-rich E-Commerce web application built using standard **HTML5**, **CSS3**, and **Vanilla JavaScript** (no external framework dependencies).

---

## 🚀 Key Features

### 1. 🔍 Real-Time Search & Multi-Level Filtering
- **Instant Search**: Filters by product name, category, or description as you type.
- **Category Filter Pills**: Quick category switching (All, Audio, Wearables, Footwear, Electronics, Accessories).
- **Sort Engine**: Sort by Featured, Price (Low to High), Price (High to Low), Highest Rating, or Biggest Discount.
- **Wishlist Filter**: Quick toggle to show only favorited items.
- **Reset Filters**: One-click restore to default view with an empty-state screen if zero items match.

### 2. 🛍️ Interactive Offcanvas Shopping Cart Drawer
- **Flyout Side Drawer**: Smooth slide-over animation with backdrop blur.
- **Quantity Steppers**: Increment (`+`), decrement (`-`), or remove (`trash`) items dynamically.
- **Dynamic Shipping Progress Bar**: Visual progress indicator towards the **$50.00 Free Shipping** threshold.
- **Coupon / Promo Code Engine**:
  - `SAVE20`: 20% discount on entire subtotal
  - `SAVE10`: 10% discount on entire subtotal
  - `FREESHIP`: 100% discount on shipping
- **Persistent State**: Cart contents and quantities are preserved across browser refreshes via `localStorage`.

### 3. 👁️ Product Quick View Modal
- Detailed view with high-resolution product imagery.
- Star ratings and total review counts.
- Bullet points detailing hardware/material specifications.
- Quantity selector and direct "Add to Cart" button.

### 4. ❤️ Wishlist / Favorites System
- Heart toggle button on every product card with active pulse animation.
- Wishlist counter pill in the navigation bar.
- Saved persistently in `localStorage`.

### 5. 💳 Checkout & Order Simulation Modal
- Multi-step modal workflow:
  - **Shipping details form**: Name, Email, Address, City, Postal Code.
  - **Payment method selector**: Credit Card, PayPal, Cash on Delivery.
  - **Simulated Card Inputs**: Auto-formatting for 16-digit card number and MM/YY expiry dates.
  - **Order Confirmation**: Displays unique order number (`#NX-XXXXXX`), estimated delivery date, total paid, and customer receipt email.

### 6. 🌓 Dark / Light Mode Switcher
- Full CSS Custom Properties (Variables) architecture.
- Seamless one-click switch between sleek Dark Mode and crisp Light Mode with state saved in `localStorage`.

### 7. 🔔 Toast Notification System
- Non-blocking snackbar notifications for actions (e.g. Added to Cart, Promo Code Applied, Wishlist updated).

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Structure** | **HTML5** | Semantic tags (`<header>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<dialog>/modals`) |
| **Styling** | **CSS3** | Flexbox, CSS Grid, Custom Variables, Glassmorphism, Responsive Media Queries |
| **Logic** | **JavaScript (ES6+)** | State management, DOM manipulation, `localStorage` persistence, event delegation |
| **Icons & Fonts** | FontAwesome 6 & Google Fonts | `Plus Jakarta Sans` typography and FontAwesome SVG icons |

---

## 📂 File Directory

```text
ecommerce-website/
├── index.html       # Semantic single-page structure & modal templates
├── style.css        # Modern design system, themes, and animations
├── products.js     # Mock product catalog dataset
├── app.js           # Core state management, filtering, and event handlers
└── README.md        # Documentation and walkthrough
```

---

## ⚡ How to Run

1. Simply double-click `index.html` in your file explorer to open it in Google Chrome, Microsoft Edge, Firefox, or any modern web browser.
2. Alternatively, serve it locally using a lightweight server:
   ```powershell
   npx serve "C:\Users\ACER\.gemini\antigravity\scratch\ecommerce-website"
   ```
   or with Python:
   ```powershell
   python -m http.server 8000 --directory "C:\Users\ACER\.gemini\antigravity\scratch\ecommerce-website"
   ```
