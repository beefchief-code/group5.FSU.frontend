import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetDepartmentsQuery, useAddDepartmentMutation } from "./departmentSlice"; 
import { selectToken } from "../auth/authSlice";
import './departments.css'
import { useState, useEffect } from "react";

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
    
    const phonePattern = (input) => {
        input = input.replace(/\D/g, "");
        
        if (input.length > 1 && input[0] === "1") {
            if (input.length <= 4) {
                input = input.slice(0, 1) + "-" + input.slice(1);
            } else if (input.length <= 7) {
                input = input.slice(0, 1) + "-" + input.slice(1, 4) + "-" + input.slice(4);
            } else {
                input = input.slice(0, 1) + "-" + input.slice(1, 4) + "-" + input.slice(4, 7) + "-" + input.slice(7, 11);
            }
        } else if (input.length <= 6) {
          input = input.slice(0, 3) + "-" + input.slice(3);
        } else {
          input =
            input.slice(0, 3) + "-" + input.slice(3, 6) + "-" + input.slice(6, 10);
        }
        return input;
      };
    
      useEffect(() => {
        const formattedPhone = phonePattern(phoneNumber);
        if (formattedPhone !== phoneNumber) {
          setPhoneNumber(formattedPhone);
        }
      }, [phoneNumber]);

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
                                    placeholder="1-123-123-1234 or 123-123-1234"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    maxLength="14"
                                />
                            </label>
                            <button type="submit">Add Department</button>
                        </form>
                    ) : (
                        <p className="auth-message">You are not authorized to add new departments</p>
                    )
            }
        </main>
    )
}


