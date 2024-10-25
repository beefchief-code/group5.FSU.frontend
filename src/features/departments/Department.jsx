import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetDepartmentQuery, useUpdateDepartmentMutation, useDeleteDepartmentMutation, } from "./departmentSlice";
import { selectToken } from "../auth/authSlice";

export default function Department() {
    const { id } = useParams();
    const { data: department, isLoading, error } = useGetDepartmentQuery(id);
    const [updateDepartment] = useUpdateDepartmentMutation();
    const [deleteDepartment] = useDeleteDepartmentMutation();
    const token = useSelector(selectToken);
    const navigate = useNavigate();

    const [updateError, setUpdateError] = useState("");
    const [deleteError, setDeleteError] = useState("");

    // Form Input States
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [professorIds, setProfessorIds] = useState([]);
    useEffect(() => {
        if (department) {
        setName(department.name);
        setDescription(department.description);
        setImage(department.image);
        setEmail(department.email);
        setPhoneNumber(department.phoneNumber);
        }
    }, [department]);

    async function sendUpdateDepartment() {
        try {
        const response = await updateDepartment({
            id,
            name,
            description,
            image,
            email,
            phoneNumber,
            professorIds,
        });

        if (!response.error) {
            setUpdateError("");
        } else {
            setUpdateError(response.error);
        }
        } catch (e) {
        setUpdateError(e.message || "Failed to update department");
        }
    }

    async function sendDeleteDepartment() {
        try {
            await deleteDepartment(id);
            navigate("/departments");
        } catch (e) {
            setDeleteError(e.message || "Failed to delete department");
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
            input = input.slice(0, 3) + "-" + input.slice(3, 6) + "-" + input.slice(6, 10);
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
        return <p>Loading department...</p>;
    }

    if (error) {
        return (
            <p>
                {error.error}: {error.message}
            </p>
        );
    }

    return (
        <main className="department-component-main">
        <article className="department-article">
            {department ? (
            <section className="department-section-flex-box">
                <img src={department.image} alt={department.name} />
                <h2>{department.name}</h2>
                <p>{department.description}</p>
                <a href={`tel:${department.phoneNumber}`}>
                {department.phoneNumber}
                </a>
                <a href={`mailto:${department.email}`}>{department.email}</a>
                {token && (
                <button onClick={sendDeleteDepartment}>
                    Delete Department from Directory
                </button>
                )}
                {deleteError && <p className="error">{deleteError}</p>}
            </section>
            ) : (
                <p>There is no selected department.</p>
            )}
        </article>

        <section className="departments-list-professors-section">
            <h1>Meet our faculty and staff</h1>
            <ul className="departments-flex-box">
            {department?.professors?.length > 0 ? (
                department.professors.map((p) => (
                    <li key={p.id}>
                        <Link to={`/professors/${p.id}`}>
                            <img src={p.profileImage} alt={p.name} />
                            <h2>{p.name}</h2>
                            <p>{p.bio}</p>
                        </Link>
                    </li>
                ))
            ) : (
                <p>No professors found for this department.</p>
            )}
            </ul>
        </section>

        {token ? (
            <form className="post-department-form" onSubmit={(e) => {e.preventDefault(); sendUpdateDepartment();}}>
            <h2>Edit Department</h2>
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
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="1-123-123-1234 or 123-123-1234"
                    maxLength="14"
                />
            </label>
            <button type="submit">Update Department</button>
            {updateError && <p className="error">{updateError}</p>}
            </form>
        ) : (
            <p className="auth-message">You are not authorized to edit this department</p>
        )}
        </main>
    );
}
