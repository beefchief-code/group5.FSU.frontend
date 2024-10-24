// React-Router
import { Link } from "react-router-dom";

// React-Redux
import { useAddProfessorMutation, useGetProfessorsQuery } from "./professorSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";

// Other State Management
import { useState } from "react";

// Styling
import "./Professors.css";

export default function Professors() {
    // Table Data
    const { data: professors = [], isLoading, error } = useGetProfessorsQuery();
    
    // Edit-Mode Controls
    const [isEditing, setIsEditing] = useState(false);
    const token = useSelector(selectToken);

    // Form Input States
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    const [addProfessor] = useAddProfessorMutation();
    const [addError, setAddError] = useState("");
    async function sendAddProfessor(e) {
        e.preventDefault();

        try {
            const response = await addProfessor({
                name, profileImage, bio, email, phoneNumber, departmentId
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
        return <p>Loading Professors...</p>;
    }
    if (error) {
        return <p>{error.error}: {error.message}</p>;
    }
    if (!professors.length) {
        return <p>There are no professors to display.</p>;
    }

    return (
        <main className="professors">
            <h1>Professors</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {professors.map((professor) => {
                        return (
                            <tr key={professor.id}>
                                <td><Link to={`/professors/${professor.id}`}>{professor.name}</Link></td>
                                <td><Link to={`/departments/${professor.departmentId}`}>{professor.department.name}</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {token &&
                <button onClick={() => setIsEditing(!isEditing)}>{!isEditing ? "Edit Mode" : "View Mode"}</button>
            }
            {isEditing &&
                <form onSubmit={sendAddProfessor}>
                    <h2>Add Professor</h2>
                    <label> Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label> Profile Picture
                        <input
                            type="text"
                            value={profileImage}
                            onChange={(e) => setProfileImage(e.target.value)}
                        />
                    </label>
                    <label> Biography
                        <input
                            type="text"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </label>
                    <label> Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label> Phone Number
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </label>
                    <label> Department Id
                        <input
                            type="number"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(+e.target.value)}
                        />
                    </label>
                    <button type="submit">Add Professor</button>
                    {addError && <p>{addError.message}</p>}
                </form>
            }
        </main>
    )
}