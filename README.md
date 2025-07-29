# sad-frontend
Super Admin Dashboard - Frontend application with react, tailwind css and typescript

Site Url: http://localhost:3000


âœ… React CMS Setup and Run Guide

ðŸ”¹ 1. Clone the Project from GitHub
Open a terminal and run:
git clone https://github.com/SheikGH/sad-frontend.git
Example:
git clone https://github.com/SheikGH/sad-frontend.git

ðŸ”¹ 2. Navigate to the Project Folder
cd sad-frontend

ðŸ”¹ 3. Create and Configure .env File
In the root of the project (inside sad-frontend /), create a file named .env if it doesnâ€™t already exist.

Add the following line to .env:
REACT_APP_API_URL=https://localhost:7067/api

This will make sure your React app communicates with the correct backend API.
________________________________________
ðŸ”¹ 4. Install Node.js (if not already installed)
Make sure you have Node.js (v14+ or v16+) and npm installed.
To check:
node -v
npm -v
To install: https://nodejs.org/
________________________________________
ðŸ”¹ 5. Install Project Dependencies
npm install

This will install all required packages listed in package.json.
________________________________________
ðŸ”¹ 6. Start the React Development Server
npm start

This will start your React app at:
http://localhost:3000
________________________________________
ðŸ”¹ 7. Make Sure Backend Is Running

Ensure your Django project is running at:
https://localhost:8000/api

If you're using Visual Studio:
â€¢	Set the API project as Startup Project
â€¢	Press F5 or click Start Debugging
________________________________________
ðŸ”¹ 8. Common Pages and Actions
Page	Path	Description
Register Page	/register	Add new customer (registers user)
Login Page	/login	Login with JWT token, saved in localStorage
Customer List Page	/customers	View, Edit, Delete customer records
Logout	-	Clears token, redirects to Login page
________________________________________
ðŸ› ï¸ Troubleshooting Tips
â€¢	If you get CORS errors, make sure your .NET backend has CORS enabled:
services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

app.UseCors("AllowAll");

API End points:
Login => Get: https://localhost:7067/api/Auth/login
Register => Post: https://localhost:7067/api/Auth/register

Customers:
Get all customers => Get:https://localhost:7067/api/Customers
Get a customer => GetByID:https://localhost:7067/api/Customers/2
Add a customer => PUT:https://localhost:7067/api/Customers/7
Delete a customer => Delete: https://localhost:7067/api/Customers/7

â€¢	If .env changes are not reflected, restart the server after editing the .env file.

