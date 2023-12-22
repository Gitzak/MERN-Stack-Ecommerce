# Moroccan Handmade E-Commerce Application

Welcome to Moroccan Handmade, a full-stack MERN (MongoDB, Express.js, React, Node.js) e-commerce application designed to showcase and promote traditional Moroccan products globally. This project embraces the MVC (Model-View-Controller) architecture to maintain a clear separation of concerns and ensure a well-structured codebase.

## Backend Architecture

In the backend, we follow the MVC model for organization, emphasizing the importance of modular components. The flow involves Controllers for handling requests, Services for business logic, and Repositories for communication with the MongoDB database. This structure ensures maintainability and scalability of our application.

### Communication with MongoDB

Our application leverages MongoDB as the database of choice. The backend utilizes Controllers to interact with Services, which in turn communicate with Repositories for seamless data retrieval and storage. This approach ensures efficient data management and retrieval, making the application robust and responsive.

## Frontend Experience

### Admin Dashboard with Vite.js

We employ Vite.js in the frontend to create a dynamic and responsive dashboard for administrators and managers. This dashboard allows them to effortlessly add products, manage categories, and oversee incoming orders. The intuitive design ensures a smooth experience for users with administrative roles.

<img width="874" alt="Screenshot 2023-12-22 at 12 25 46" src="https://github.com/Gitzak/MERN-Stack-Ecommerce/assets/140097523/fb2f8ca7-19a7-4993-ac5d-8f9c33caa36b">


### User-Friendly Shopping Experience

For customers, we've crafted an immersive shopping experience. Users can effortlessly explore diverse product categories, browse through unique Moroccan handmade products, and place orders seamlessly. Our goal is to provide a user-friendly interface that enhances the overall shopping journey.

![screencapture-127-0-0-1-3000-shop-2023-12-13-09_48_21](https://github.com/Gitzak/MERN-Stack-Ecommerce/assets/140097523/f628bec5-fb3d-4f7e-b85a-162e007d3569)


## Secure Authentication

Security is a top priority in Moroccan Handmade. We've implemented robust authentication mechanisms to safeguard both the admin dashboard and the customer shopping experience. Every piece of data passed to the backend is thoroughly sanitized and protected by various middlewares, ensuring the integrity and confidentiality of user information.

## Additional Features

To enrich the user experience, we've incorporated features that go beyond the basics. Our commitment is not just to build an e-commerce platform but to showcase and promote Moroccan culture globally. Expect regular updates and enhancements to keep the platform dynamic and engaging.

## Get Started

To run the Moroccan Handmade e-commerce application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Gitzak/MERN-Stack-Ecommerce`
2. Install dependencies: `npm install` (for both frontend and backend)
3. Set up the MongoDB database connection
4. Run the application: `npm start`
