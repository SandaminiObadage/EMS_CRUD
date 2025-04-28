Employee Management System (EMS)
A full-stack Employee Management System built with React (frontend) and Django REST Framework (backend). This application allows users to efficiently manage employee data, including adding, editing, deleting, and searching employees. It also includes a contact form for user inquiries.

Features
1. CRUD Operations
Create: Add new employees with details like name, department, and role.
Read: View a list of all employees in a tabular format.
Update: Edit employee details directly from the table.
Delete: Remove employees from the system with a confirmation prompt.

2. Sorting
Sort employee data by columns such as Name, Department, and Role using React Table.

4. Pagination
View employee data in pages with navigation controls (First, Previous, Next, Last).
Default page size is set to 5 employees per page.

6. Search
Search employees by name, department, or role using a global search bar.

8. Contact Form
A dedicated contact form allows users to submit inquiries, which are handled by the backend.

Project Structure
EMS_CRUD/
├── employee_frontend/       # React frontend
│   ├── public/              # Static assets
│   ├── src/                 # React source code
│   │   ├── App.css          # Global styles
│   │   ├── App.jsx          # Main React component
│   │   ├── index.css        # Additional styles
│   │   ├── main.jsx         # React entry point
│   │   ├── assets/          # Images and other assets
│   │   │   └── employ_img.webp
│   │   ├── components/      # Reusable components
│   │       ├── AboutPage.jsx
│   │       ├── ContactPage.jsx
│   │       ├── Footer.jsx
│   │       ├── Navbar.jsx
│   │       ├── AboutPage.css
│   │       ├── ContactPage.css
│   │       ├── Footer.css
│   │       └── Navbar.css
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── employee_management_sys/ # Django backend
│   ├── manage.py            # Django entry point
│   ├── api/                 # API app
│   │   ├── models.py        # Database models
│   │   ├── serializers.py   # DRF serializers
│   │   ├── views.py         # API views
│   │   ├── urls.py          # API routes
│   │   ├── admin.py         # Admin configurations
│   │   ├── apps.py          # App configuration
│   │   └── migrations/      # Database migrations
│   └── employee_management_sys/
│       ├── settings.py      # Django settings
│       ├── urls.py          # Project routes
│       ├── asgi.py          # ASGI configuration
│       └── wsgi.py          # WSGI configuration
├── README.md                # Project documentation
└── requirements.txt         # Backend dependencies

Installation:
Prerequisites:-
Node.js (v16 or higher)
Python (v3.9 or higher)
MySQL database

Backend Setup:
1.Navigate to the backend directory:
cd employee_management_sys

2.Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

3.Install dependencies:
pip install -r requirements.txt

4.Configure the database in settings.py:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'emp_crud',
        'USER': 'root',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

5.Apply migrations:
python manage.py migrate

6.Start the backend server:
python manage.py runserver

Frontend Setup:
1.Navigate to the frontend directory:
cd employee_frontend

2.Install dependencies:
npm install

3.Start the development server:
npm run dev

Usage:
1.Open the frontend in your browser at http://localhost:5173.
2.Use the Employee Management System to:
2.Add, edit, delete, and search employees.
3.Submit inquiries via the contact form.
4.Access the backend API at http://127.0.0.1:8000/api/employees.

API Endpoints:
Employee Endpoints
1.GET /api/employees/ - Retrieve all employees.
2.POST /api/employees/ - Add a new employee.
3.PUT /api/employees/<id>/ - Update an existing employee.
4.DELETE /api/employees/<id>/ - Delete an employee.

Contact Form Endpoint:
POST /api/contact/ - Submit a contact form.

Technologies Used:

Frontend
1.React (with Vite)
2.React Router
3.React Table
4.React Toastify
5.Axios

Backend
1.Django REST Framework
2.MySQL
3.CORS Headers

License
This project is licensed under the MIT License. See the LICENSE file for details.

Author
Sandamini Obadage -https://github.com/SandaminiObadage

Acknowledgments
1.React Table Documentation
2.Django REST Framework Documentation
3.React Toastify Documentation






