import { Link } from "react-router-dom";
import { useGetDepartmentsQuery } from "./departmentSlice"; 
import './departments.css'


export default function Departments() { 

    const { data: departments = [], isLoading, error } = useGetDepartmentsQuery(); 

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
        <>
            <header className="departments-component-header">
                <h1>Academic Departments</h1>
                <h3>Connect With Our Academic Departments</h3>
            </header>
            <section className="departments-component-section">
                <ul className="departments-flex-box">
                    {
                        departments.map((department) => (
                            <li>
                                <Link to={`/departments/${department.id}`} >
                                    <img src={department.image} alt={department.name} />
                                    <h2>{department.name}</h2>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </>
    )
}