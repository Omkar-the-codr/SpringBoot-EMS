import React,{useEffect, useState} from 'react'
import { createEmployee, getEmployee,updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstName, setFirstName]=useState('')
    const [lastName, setLastName]=useState('')
    const [email, setEmail]=useState('') 
    const [errors,setErrors]=useState({
        firstName:'',
        lastName:'',
        email:''
    })
    const {id}= useParams();
    useEffect(() => {
        if (id) {
            // Fetch employee data from the API using the ID
            getEmployee(id).then((response) => {
                const employee = response.data;
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setEmail(employee.email);
            }).catch((error) => {
                console.error("Error fetching employee:", error);
            });
        }
      }, [id]);
    function validateForm() {
      let isValid = true;
      const errorsCopy = { ...errors };
      if (firstName.trim()) {
        errorsCopy.firstName = "";
      } else {
        errorsCopy.firstName = "First Name is required";
        isValid = false;
      }
      if (lastName.trim()) {
        errorsCopy.lastName = "";
      } else {
        errorsCopy.lastName = "Last Name is required";
        isValid = false;
      }
      if (email.trim()) {
        errorsCopy.email = "";
      } else {
        errorsCopy.email = " Email is required";
        isValid = false;
      }
      setErrors(errorsCopy);
      return isValid;
    }
    function handleSubmit(event) {
      event.preventDefault();
      if (validateForm()) {
        saveOrUpdateEmployee();
      }
    }
    const navigator = useNavigate();
    function saveOrUpdateEmployee(){
        const employee = {firstName,lastName,email}
        console.log(employee);
        if(id){
          // Update employee data
          updateEmployee(id, employee).then((response) => {
            console.log("Employee updated successfully:", response.data);
            navigator('/employees');
          }
          ).catch((error) => {
            console.error("Error updating employee:", error);
          });
          } else {
            // Create new employee data
              createEmployee(employee)
              .then((response) => {
                  console.log("Employee created successfully:", response.data);
                navigator('/employees');
                }).catch((error) => {
                  console.error("Error creating employee:", error);
                }
              );
              }

    }
    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }
  return (
    <div className="container">
      <div className="row">
        <div className="card">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value = {firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email"
                  name="Email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeComponent