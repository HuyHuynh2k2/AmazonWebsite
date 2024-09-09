# AmazonWebsite
Project Overview

The project is a web-based shopping platform that mimics the key features of an e-commerce site, such as Amazon. It allows users to browse products, manage their cart, update product quantities, choose delivery options, and proceed through a streamlined checkout process. The project involves dynamic JavaScript for interactive functionality, CSS for styling, and JavaScript modules for handling product data and user actions like adding, updating, and removing items from the cart.

Key Features
1. Product Catalog and Display
Dynamic Product Display: Products are loaded dynamically using fetch and displayed to users. Each product includes essential details like the name, price, and image.
Product Data Management: Product data, including availability, pricing, and images, is fetched from an external source or a local data file, making the site flexible and scalable.
2. Shopping Cart Management
Add to Cart Functionality: Users can select products to add to their cart. The cart data is stored and updated, allowing users to maintain their selection as they browse.
Cart Summary Display: The cart section displays all added products, including quantity, price, and delivery options. The cart is dynamically updated to reflect any changes, such as adding or removing items.
Remove from Cart: Users can remove individual items from the cart. This action updates both the user interface and the internal data structure.
Update Quantity: Users can modify the quantity of each product in the cart. The UI allows them to increase or decrease quantities with appropriate validation (e.g., preventing negative values or very high quantities).
3. Checkout and Order Summary
Order Summary Display: The order summary is dynamically generated, providing users with a detailed overview of their selected products, total price, and delivery options before proceeding to payment.
Currency Formatting: Prices are consistently displayed in the proper currency format to ensure clarity and professionalism.
4. Delivery Options
Dynamic Delivery Options: Users can choose from multiple delivery options (e.g., free shipping, expedited delivery), with each option showing an estimated delivery date and cost.
Pre-selection of Delivery Options: Delivery options are preselected based on user preferences or previous choices, and the site ensures that the correct option is checked when a user revisits their cart.
5. Data Persistence
Cart Persistence (Local Storage): The cart state (products, quantities, selected delivery options) is saved in the browser's local storage, allowing users to reload the page without losing their cart items.
Efficient Memory Management: Operations on the cart, such as removing products or updating quantities, are handled efficiently by ensuring that updates are reflected both in the local storage and the UI.
6. Responsive Design
Mobile-Friendly Interface: The layout and design adapt to different screen sizes, ensuring a smooth user experience on both desktop and mobile devices.
7. Unit Testing
Jasmine Testing Framework: The project incorporates Jasmine tests to verify the functionality of various shopping cart actions. This ensures that features such as adding/removing items from the cart and updating quantities work as expected.

Technologies Used
JavaScript (ES6+): Core language for dynamic functionality, including DOM manipulation, event handling, and integration of various features like cart management and delivery options.
Day.js: A lightweight JavaScript library for date manipulation, used to calculate delivery dates dynamically.
CSS: Custom styles for product displays, the shopping cart, and responsive layouts.
Local Storage: Used for persisting cart data between sessions.
Jasmine: A JavaScript testing framework to ensure reliability and correct behavior of the application.
Modular Design: Separation of concerns is maintained by using JavaScript modules to handle different parts of the project (e.g., products, cart, and utilities).



