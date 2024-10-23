import { useParams } from "react-router-dom"

// React-Redux
import { useGetProfessorQuery } from "./professorSlice"
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";

// Styling
import "./Professor.css"
import { useState } from "react";

export default function Professor() {
    const { id } = useParams();
    const { data: professor, isLoading, error } = useGetProfessorQuery(id);
    const [isEditing, setIsEditing] = useState(false);

    const token = useSelector(selectToken);

    if (isLoading) {
        return <p>Loading professor...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    if (!professor) {
        return <p>This professor is either not in our directory, or we ran into an error.</p>;
    }

    if (isEditing) {
        return (
            <main className="professor">
                <form>
                    <label> Name
                        <input type="text" />
                    </label>
                    <label> Profile Picture
                        <input type="text" />
                    </label>
                    <label> Biography
                        <input type="text" />
                    </label>
                    <label> Email
                        <input type="email" />
                    </label>
                    <label> Phone Number
                        <input type="tel" />
                    </label>
                </form>
            </main>
        )
    }

    return (
        <main className="professor">
            <h1>{professor.name}</h1>
            <p className="department-name">{professor.department.name}</p>
            <img src={professor.profileImage} alt="Professor profile picture" />
            <h2>Biography:</h2>
            <p>{professor.bio}</p>
            <h3 className="contact-info">Contact Information</h3>
            <p>{professor.email}</p>
            <p>{professor.phoneNumber}</p>
        </main>
    )
}