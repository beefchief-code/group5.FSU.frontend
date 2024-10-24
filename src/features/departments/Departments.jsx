import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetDepartmentsQuery, useAddDepartmentMutation } from "./departmentSlice"; 
import { selectToken } from "../auth/authSlice";
import './departments.css'
import { useState } from "react";


export default function Departments() { 

    const { data: departments = [], isLoading, error } = useGetDepartmentsQuery(); 

    const token = useSelector(selectToken);

    // Form Input States
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [professorIds, setProfessorIds] = useState([]);

    const [addDepartment] = useAddDepartmentMutation();
    const [addError, setAddError] = useState("");

    async function sendAddDepartment(event) {
        event.preventDefault();

        try {
            const response = await addDepartment({
                name, description, image, email, phoneNumber, professorIds
            });

            if (!response) {
                setAddError(response.error);
            } else {
                setIsEditing(false);
            }
        } catch (e) {
            setAddError(e);
        }
    }

    if (isLoading) {
        return <p>Loading departments...</p>;
    }
    if (error) {
        return <p>{error.error}: {error.message}</p>;
    }
    if (!departments.length) {
        return <p>There are no departments.</p>;
    }

    return (
        <main>
            <header className="departments-component-header">
                <h1>Academic Departments</h1>
                <h3>Connect With Our Academic Departments</h3>
            </header>
            <section className="departments-component-section">
                <ul className="departments-flex-box">
                    {
                        departments.map((department) => (
                            <li key={department.id}>
                                <Link to={`/departments/${department.id}`} >
                                    <img src={department.image} alt={department.name} />
                                    <h2>{department.name}</h2>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </section>
            {token ? (
                        <form className="post-department-form" onSubmit={sendAddDepartment}>
                            <h2>Add New Department</h2>
                            <label>
                                Department Name    
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>

                            <label>
                                Department Description
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>

                            <label>
                                Department Image
                                <input 
                                    type="text" 
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </label>

                            <label>
                                Email   
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>

                            <label>
                                Phone Number 
                                <input 
                                    type="tel" 
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    placeholder="123-456-7890"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </label>
                            <button type="submit">Add Department</button>
                        </form>
                    ) : (
                        <p>You are not authorized to add new departments</p>
                    )
            }
        </main>
    )
}