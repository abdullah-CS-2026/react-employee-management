import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ShowDetails.css";
import { IoSearchSharp } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";


export const ShowDetails = () => {
    const [employees, setEmployees] = useState([]);
    const [visible, setVisible] = useState(10);
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    // Load all employees from localStorage
    useEffect(() => {
        const all = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));
            if (value && value.id) {
                all.push(value);
            }
        }
        setEmployees(all);
    }, []);

    //Delete Employees
    const handleDelete = (id) => {
        localStorage.removeItem(id);
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        toast.success("Employee Record deleted!", { position: "top-center" });
    };

    //filter Employees
    const filteredEmployees = employees.filter(emp => emp.first_name.toLowerCase().includes(searchValue.toLowerCase()) || emp.last_name.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <div className="showdetails-bg">
            <Toaster />
            <div className="showdetails-container">
                <h2 className="text-dark text-center mb-4">Employee Details</h2>

                {employees.length === 0 ? (
                    <p className="text-center text-dark">No employees found.</p>
                ) : (
                    <>
                        {/* Search BOX */}
                        <div className="search_box d-flex mb-2 justify-content-center justify-content-md-end w-auto ">
                            <input type="search " onChange={handleSearch} value={searchValue} className=" ps-3 border-0 rounded-start-3" placeholder="Search by Name" />
                            <div className="search_icon bg-light fs-xs-2 fs-sm-3 fs-lg-5 p-2 cursor-pointer rounded-end-3"> <IoSearchSharp /></div>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Id</th>
                                        <th>First</th>
                                        <th className="d-none d-sm-table-cell">Last</th>
                                        <th>Age</th>
                                        <th className="d-none d-sm-table-cell">Gender</th>
                                        <th className="d-none d-sm-table-cell">Email</th>
                                        <th className="d-none d-sm-table-cell">Contact</th>
                                        <th>Department</th>
                                        <th>Job Title</th>
                                        <th className="d-none d-sm-table-cell">Nationality</th>
                                        <th className="actions-col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmployees.length > 0 ?
                                        filteredEmployees.slice(0, visible).map((emp) => (
                                            <tr key={emp.id} >
                                                <td className="pt-3">{emp.id}</td>
                                                <td className="pt-3">{emp.first_name}</td>
                                                <td className="pt-3 d-none d-sm-table-cell">{emp.last_name}</td>
                                                <td className="pt-3">{emp.age}</td>
                                                <td className="pt-3 d-none d-sm-table-cell">{emp.gender}</td>
                                                <td className="pt-3 d-none d-sm-table-cell">{emp.email}</td>
                                                <td className="pt-3 d-none d-sm-table-cell">{emp.contact}</td>
                                                <td className="pt-3">{emp.department}</td>
                                                <td className="pt-3">{emp.job_title}</td>
                                                <td className="pt-3 d-none d-sm-table-cell">{emp.nationality}</td>
                                                <td className=" text-align-center" >
                                                    <div className="d-flex justify-content-center">
                                                        <button className="btn action-btn btn-sm me-2 fs-4 " onClick={() => navigate(`/form/${emp.id}`)}>
                                                            <RxUpdate />
                                                        </button>

                                                        <button className="btn action-btn btn-sm fs-4 " onClick={() => handleDelete(emp.id)}>
                                                            <MdDelete />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) :
                                        (
                                            <tr>
                                                <td colSpan="11" className="text-center text-dark fw-bold">
                                                    No match found
                                                </td>
                                            </tr>
                                        )
  
                                 }
                                </tbody>
                            </table>
                        </div>
                    </>
                )
                }
                <div className="button_show_more text-center">
                    <button className="btn btn-primary" onClick={() => {
                        if (visible < employees.length) {
                            setVisible(prev => prev + 10);
                        } else {
                            setVisible(prev => prev - 10);
                        }
                    }}>{visible >= employees.length ? "Show Less" : "Show More"} </button>
                </div>
                <div className="text-center mt-3">
                    <button
                        className="btn btn-success"
                        onClick={() => navigate("/")}
                    >
                        Add New Employee
                    </button>
                </div>
            </div>
        </div>
    );
}
