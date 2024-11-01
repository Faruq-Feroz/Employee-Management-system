import  { useState } from 'react';


const App = () => {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        salary: '',
        dob: '',
        imageUrl: '',
    });

    const addEmployee = (event) => {
        event.preventDefault();
        if (!employee.firstName || !employee.lastName || !employee.email) return;

        const newEmployee = {
            ...employee,
            id: employees.length + 1,
        };

        setEmployees([...employees, newEmployee]);
        resetForm();
    };

    const resetForm = () => {
        setEmployee({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            contactNumber: '',
            salary: '',
            dob: '',
            imageUrl: '',
        });
    };

    const editEmployee = (id) => {
        const empToEdit = employees.find(emp => emp.id === id);
        setEmployee(empToEdit);
    };

    const removeEmployee = (id) => {
        const updatedEmployees = employees.filter(emp => emp.id !== id);
        setEmployees(updatedEmployees);
    };

    const saveEmployee = (event) => {
        const updatedEmployees = employees.map(emp =>
            emp.id === employee.id ? employee : emp
        );
        setEmployees(updatedEmployees);
        resetForm();
    };

    const searchEmployees = (event) => {
        const searchInput = event.target.value.toLowerCase();
        const filteredEmployees = employees.filter(emp =>
            emp.firstName.toLowerCase().includes(searchInput) ||
            emp.lastName.toLowerCase().includes(searchInput) ||
            emp.email.toLowerCase().includes(searchInput)
        );
        return filteredEmployees;
    };

    return (
        <div>
            <h1>Employee Management System</h1>
            <form id="employeeForm" onSubmit={addEmployee}>
                <input type="hidden" value={employee.id} />
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    value={employee.firstName}
                    onChange={e => setEmployee({ ...employee, firstName: e.target.value })}
                    required
                />
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    value={employee.lastName}
                    onChange={e => setEmployee({ ...employee, lastName: e.target.value })}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    value={employee.email}
                    onChange={e => setEmployee({ ...employee, email: e.target.value })}
                    required
                />
                <label htmlFor="contactNumber">Contact Number:</label>
                <input
                    type="text"
                    value={employee.contactNumber}
                    onChange={e => setEmployee({ ...employee, contactNumber: e.target.value })}
                    required
                />
                <label htmlFor="salary">Salary:</label>
                <input
                    type="number"
                    value={employee.salary}
                    onChange={e => setEmployee({ ...employee, salary: e.target.value })}
                    required
                />
                <label htmlFor="dob">Date of Birth:</label>
                <input
                    type="date"
                    value={employee.dob}
                    onChange={e => setEmployee({ ...employee, dob: e.target.value })}
                    required
                />
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    type="text"
                    value={employee.imageUrl}
                    onChange={e => setEmployee({ ...employee, imageUrl: e.target.value })}
                    required
                />
                <button type="submit">Add Employee</button>
                <button type="button" onClick={saveEmployee}>Save Changes</button>
            </form>

            <input type="text" id="search" onChange={searchEmployees} placeholder="Search Employees.." />

            <div className="table-container">
                <table id="employeeTable">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Salary</th>
                            <th>Date of Birth</th>
                            <th>ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp.id}>
                                <td><img src={emp.imageUrl} alt="Employee" /></td>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>{emp.contactNumber}</td>
                                <td>{emp.salary}</td>
                                <td>{emp.dob}</td>
                                <td>{emp.id}</td>
                                <td>
                                    <button onClick={() => editEmployee(emp.id)}>Edit</button>
                                    <button onClick={() => removeEmployee(emp.id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
