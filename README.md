# ShopHub - E-Commerce Web Application

A modern, fully-functional e-commerce web application built with **HTML5**, **CSS3**, **Bootstrap 5**, and **JavaScript**. This is a Minimum Viable Product (MVP) that demonstrates a complete shopping experience without backend dependencies.

## 🚀 Features

### Core Functionality
- ✅ **Product Listing** - Display 12+ products with images, prices, ratings, and descriptions
- ✅ **Product Search** - Real-time search across product names and descriptions
- ✅ **Category Filtering** - Filter products by Electronics, Fashion, Home & Garden, Sports
- ✅ **Price Filtering** - Filter by price ranges ($0-50, $50-100, $100-500, $500+)
- ✅ **Shopping Cart** - Add/remove products, adjust quantities
- ✅ **Cart Persistence** - Cart data saved to browser's localStorage
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Smooth Animations** - Professional transitions and hover effects

### User Experience
- 🎨 **Modern UI Design** - Gradient backgrounds, card-based layout, smooth animations
- ⭐ **Product Ratings** - 5-star rating system with review counts
- 🏷️ **Discount Badges** - Display discount percentages on products
- 💬 **Toast Notifications** - Visual feedback for user actions
- 🛒 **Cart Counter** - Real-time cart item count in navigation
- 📱 **Mobile Optimized** - Touch-friendly interface and responsive layout

### E-Commerce Features
- 💳 **Checkout Process** - Form for customer information and payment details
- 📊 **Order Summary** - Automatic calculation of subtotal, tax (10%), shipping ($10), and total
- 🎯 **Price Display** - Current price and original price with strikethrough
- 🌟 **Product Reviews** - Display ratings and number of reviews per product

## 📁 Project Structure

```
ecommerce-web-application/
├── index.html              # Home page with product listing
├── cart.html               # Shopping cart page
├── css/
│   └── style.css          # All styling and animations
├── js/
│   ├── app.js             # Main application logic
│   └── products-data.json # Mock product data
└── README.md              # This file
```

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, flexbox, and animations
- **Bootstrap 5** - Responsive grid system and components
- **JavaScript (ES6+)** - Dynamic functionality and state management
- **JSON** - Mock product data storage
- **Font Awesome 6** - Icons and symbols
- **Unsplash API** - High-quality product images

## 📦 Installation & Setup

### Option 1: Local File System
1. Extract the project files
2. Open `index.html` in your web browser
3. Start shopping!

### Option 2: Local Server (Recommended)
To properly load the JSON data and avoid CORS issues, run a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if installed)
npx http-server
```

Then visit: `http://localhost:8000`

## 🎮 How to Use

### Browse Products
1. The home page displays all 12 featured products
2. Scroll through the product grid to see all items
3. Each product card shows:
   - Product image
   - Category tag
   - Product name and description
   - 5-star rating with review count
   - Current and original price
   - Discount percentage

### Search & Filter
1. **Search**: Type in the search box to find products by name or description
2. **Category**: Select a category from the dropdown (Electronics, Fashion, Home, Sports)
3. **Price Range**: Choose a price range to filter products
4. All filters work together for precise product discovery

### Shopping Cart
1. Click "Add to Cart" button on any product
2. A toast notification confirms the addition
3. The cart count in the navigation bar updates automatically
4. Click the cart icon to view your cart

### Cart Management
1. View all items in your cart with images and prices
2. Adjust quantities using +/- buttons
3. Remove items with the "Remove" button
4. See real-time totals: subtotal, shipping, tax, and total

### Checkout
1. Click "Proceed to Checkout" button
2. Fill in your information:
   - Full Name
   - Email
   - Address
   - Phone Number
   - Payment Card (test: 4111 1111 1111 1111)
3. Click "Complete Purchase"
4. Your cart clears and you return to the home page

## 📊 Mock Product Data

The application includes 12 sample products with:
- High-quality images from Unsplash
- Realistic prices with discounts
- 5-star ratings and review counts
- Detailed descriptions
- Category classifications

**Sample Products:**
- Wireless Bluetooth Headphones ($129.99)
- Smart Watch Pro ($299.99)
- Camera Backpack ($79.99)
- Premium Running Shoes ($149.99)
- Elegant Leather Jacket ($249.99)
- Portable Power Bank ($49.99)
- And more!

## 🎨 Design Highlights

### Color Scheme
- **Primary Gradient**: Purple (#667eea) to Blue (#764ba2)
- **Success Green**: #10b981
- **Danger Red**: #ef4444
- **Neutral Grays**: Professional and clean

### Responsive Breakpoints
- **Desktop**: Full 4-column product grid
- **Tablet**: 2-column grid with optimized layouts
- **Mobile**: 1-column grid with touch-friendly buttons

### Animations
- Smooth fade-in on page load
- Product cards lift on hover
- Toast notifications slide in
- Smooth scrolling between sections

## 💾 Data Storage

- **Cart Data**: Stored in browser's localStorage
- **Product Data**: Loaded from `products-data.json`
- **User Sessions**: Cart persists between page refreshes

## 🔧 Customization

### Add More Products
Edit `js/products-data.json` and add new product objects:
```json
{
  "id": 13,
  "name": "Your Product",
  "category": "Category",
  "price": 99.99,
  "originalPrice": 149.99,
  "rating": 4.5,
  "reviews": 100,
  "description": "Description",
  "image": "image-url",
  "discount": 33
}
```

### Modify Colors
Edit CSS variables at the top of `css/style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... other colors ... */
}
```

### Add Categories
1. Add new option to `<select id="category-filter">` in `index.html`
2. Update product category values in `products-data.json`

## 🚫 Limitations & Future Enhancements

**Current Limitations (MVP):**
- No backend server or database
- No payment gateway integration (demo only)
- No user authentication or accounts
- No order history
- No product reviews submission
- Images from external API (Unsplash)

**Future Enhancements:**
- Backend API integration (Node.js, Python, etc.)
- Database for products and orders
- User authentication and profiles
- Real payment processing (Stripe, PayPal)
- Admin panel for product management
- Wishlist functionality
- Product recommendations
- Customer reviews and ratings
- Order tracking
- Email notifications

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and free to use for personal and commercial purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📞 Support

For issues or questions, please check the code comments in:
- `js/app.js` - Application logic
- `css/style.css` - Styling explanation

---

**Made with ❤️ - ShopHub E-Commerce MVP 2026**

Enjoy building and customizing your e-commerce platform!
