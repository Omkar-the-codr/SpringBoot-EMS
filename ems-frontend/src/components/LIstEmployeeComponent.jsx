import React,{useEffect,useState} from 'react'
import { listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee } from '../services/EmployeeService';
const LIstEmployeeComponent = () => {

    const [employees, setEmployees]=useState([])
    useEffect(() => {
        getAllEmployees();
    }, []);
    function getAllEmployees() {
      listEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
            });
          }
        
    const navigator = useNavigate();
    function addNewEmployee() {
        navigator('/add-employee');
    }
    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }
    function removeEmployee(id) {
      deleteEmployee(id)
        .then((response) => {
          getAllEmployees();
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }


  return (
    <div>
      <h2 className='text-center'>List of Employees</h2>
      <button className='btn btn-primary' onClick={addNewEmployee}>Add Employee</button>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {employees.map((employee) => (
                <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update</button>
                </td>
                <td>
                  <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)}>Delete</button>
                </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default LIstEmployeeComponent