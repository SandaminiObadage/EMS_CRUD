
import { useState } from 'react';
import './App.css';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import * as React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './components/Navbar.css';
import './components/Footer.css';
import employ_img from './assets/employ_img.webp';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [emp, setEmps] = useState([]);
  const [empData, setEmpData] = useState({
    name: '',
    department: '',
    role: ''
  });
  

  const [showCancel, setShowCancel] = useState(false);
  const [departments, setDepartments] = useState(["HR", "Finance", "IT", "Marketing", "Sales", "Other"]);
  const [roles, setRoles] = useState(["Manager", "Team Lead", "Software Engineer", "Data Analyst", "Intern", "Other"]);
  const [showModal, setShowModal] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [modalType, setModalType] = useState('');

  const columns = React.useMemo(
    () => [
      {
        Header: 'Emp_Id',
        accessor: 'id'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Department',
        accessor: 'department'
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      {
        Header: 'Edit',
        id: 'edit',
        accessor: 'edit',
        Cell: props => (
          <button
            className='edit_button'
            onClick={() => populateEmpData(props.cell.row.original)}
          >
            Edit
          </button>
        )
      },
      {
        Header: 'Delete',
        id: 'delete',
        accessor: 'delete',
        Cell: props => (
          <button
            className='delete_button'
            onClick={() => handleDelete(props.cell.row.original)}
          >
            Delete
          </button>
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const data = React.useMemo(() => emp, [emp]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    state,
    pageCount,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage
  } = useTable({ columns, data, initialState: { pageSize: 5 } }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex } = state;

  const getEmp = () => {
    axios
      .get('http://127.0.0.1:8000/api/employees/')
      .then(response => {
        console.log(response.data);
        setEmps(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  React.useEffect(() => {
    getEmp();
  }, []);

  const setChangedValue = e => {
    setEmpData({ ...empData, [e.target.name]: e.target.value });
    console.log('empData::', empData);
  };

  const populateEmpData = emp => {
    setEmpData(emp);
    setShowCancel(true);
  };

  const handleAdd_EditEmployee = async e => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (!empData.name || !empData.department || !empData.role) {
      toast.error("Please fill in all fields before adding an employee.");
      return;
    }

    try {
      if (empData.id) {
        // Update employee
        const response = await axios.put(`http://127.0.0.1:8000/api/employees/${empData.id}/`, empData);
        console.log("Employee updated:", response.data);
        toast.success("Employee updated successfully!");
      } else {
        // Add new employee
        const response = await axios.post('http://127.0.0.1:8000/api/employees/', empData);
        console.log("Employee added:", response.data);
        toast.success("Employee added successfully!");
      }

      // Clear form and refresh employee list
      clearAll();
      getEmp();
    } catch (error) {
      console.error("Error adding/updating employee:", error);
      toast.error("An error occurred while adding/updating the employee. Please try again.");
    }
  };

  const handleDelete = async emp => {
    const isConfirmed = window.confirm('Are you sure you want to delete this employee?');
    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/employees/${emp.id}/`);
        console.log("Employee deleted:", response.data);
        toast.success("Employee deleted successfully!");
        getEmp();
      } catch (error) {
        console.error('Error deleting employee:', error);
        toast.error("An error occurred while deleting the employee. Please try again.");
      }
    }
  };

  const clearAll = () => {
    setEmpData({
      name: '',
      department: '',
      role: ''
    });
    setShowCancel(false);
  };

  const handle_Cancel = () => {
    clearAll();
  };

  const handleSaveCustomInput = type => {
    if (type === 'Department') {
      setEmpData({ ...empData, department: customInput });
      setDepartments([...departments, customInput]);
    } else if (type === 'Role') {
      setEmpData({ ...empData, role: customInput });
      setRoles([...roles, customInput]);
    }
    setShowModal(false);
    setCustomInput('');
  };

  return (
    <>
    <Router>
    <Navbar />
    <Routes>
       {/* Route for the About page */}
       <Route path="/about" element={<AboutPage />} />
       <Route path="/contact" element={<ContactPage />} />
       
        <Route
          path=""
          element={
            <div className="empdiv">
              <h1>Employee Management System</h1>
      
           
           
        <div className="add_edit_panel">
          <div className="panel_details">
            <label htmlFor="name"> Name </label>
            <br />
            <input
              className="details"
              value={empData.name}
              onChange={setChangedValue}
              type="text"
              name="name"
              id="name"
            />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
          </div>
          

          <div className="panel_details">
            <label htmlFor="department"> Department </label>
            <br />
            <select
              className="details"
              value={empData.department}
              onChange={e => {
                if (e.target.value === 'Other') {
                  setModalType('Department');
                  setShowModal(true);
                } else {
                  setChangedValue(e);
                }
              }}
              name="department"
              id="department"
            >
                <option value="">--Select--</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="panel_details">
            <label htmlFor="role"> Role </label>
            <br />
            <select
              className="details"
              value={empData.role}
              onChange={e => {
                if (e.target.value === 'Other') {
                  setModalType('Role');
                  setShowModal(true);
                } else {
                  setChangedValue(e);
                }
              }}
              name="role"
              id="role"
            >
                <option value="">--Select--</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <button className="add_button" onClick={handleAdd_EditEmployee}>
            {empData.id ? 'Update' : 'Add'}
          </button>
          <button className="cancel_button" disabled={!showCancel} onClick={handle_Cancel}>
            Cancel
          </button>
        </div>

        <div className="search-container">
        <i className="search-icon">&#128269;</i>
        <input
          className="search"
          value={globalFilter || ''}
          onChange={e => setGlobalFilter(e.target.value)}
          type="search"
          name="search"
          id="search"
          placeholder="Search Employee Here"
        />
        </div>

        <table className="emp_table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} key={cell.column.id}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination">
          <button className="pagination_btn" disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
            First
          </button>
          <button className="pagination_btn" disabled={!canPreviousPage} onClick={previousPage}>
            Previous
          </button>
          <span className="idx">
            {pageIndex + 1} of {pageCount}
          </span>
          <button className="pagination_btn" disabled={!canNextPage} onClick={nextPage}>
            Next
          </button>
          <button className="pagination_btn" disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
            Last
          </button>
        </div>
      </div>
          }
 />
  </Routes>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Custom {modalType}</h3>
            <input
              type="text"
              placeholder={`Enter ${modalType}`}
              onChange={e => setCustomInput(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={() => handleSaveCustomInput(modalType)}>Save</button>
            </div>
          </div>
        </div>
       
      )}
       <img src={employ_img} alt="Employee" className="corner-image" />

    
  
      <Footer/>
      </Router>
    </>
  );
}

export default App;