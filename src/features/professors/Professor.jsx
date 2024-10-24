// React-Router
import { useNavigate, useParams } from "react-router-dom"

// React-Redux
import { useDeleteProfessorMutation, useGetProfessorQuery, useUpdateProfessorMutation } from "./professorSlice"
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";

// Other State Management
import { useEffect, useState } from "react";

// Styling
import "./Professor.css"

export default function Professor() {
    // Initial Rendering
    const { id } = useParams();
    const { data: professor, isLoading: professorLoading, error } = useGetProfessorQuery(id);

    // Edit-Mode Controls
    const token = useSelector(selectToken);
    const [isEditing, setIsEditing] = useState(false);
    
    // Form Input States
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    useEffect(() => {
        setName(professor?.name);
        setProfileImage(professor?.profileImage);
        setBio(professor?.bio);
        setEmail(professor?.email);
        setPhoneNumber(professor?.phoneNumber);
        setDepartmentId(professor?.departmentId);
    }, [professor])

    // Update Methods
    const [updateProfessor] = useUpdateProfessorMutation();
    const [updateError, setUpdateError] = useState("");
    async function sendUpdateProfessor(e) {
        e.preventDefault();

        try {
            const response = await updateProfessor({ 
                id, 
                name,
                profileImage,
                bio,
                email, 
                phoneNumber,
                departmentId,
            });
            if (!response.error) {
                setIsEditing(false);
            } else {
                setUpdateError(response.error);
            }
        } catch (e) {
            setUpdateError(e);
        }
    }

    // Delete Methods
    const [deleteProfessor] = useDeleteProfessorMutation();
    const [deleteError, setDeleteError] = useState("");
    const navigate = useNavigate();
    async function sendDeleteProfessor() {
        try {
            await deleteProfessor(id);
            navigate("/professors");
        } catch (e) {
            setDeleteError(e);
        }
    }

    // Error Message Rendering
    if (professorLoading) {
        return <p>Loading professor...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }
    if (!professor) {
        return <p>This professor is either not in our directory, or we ran into an error.</p>;
    }

    return (
        <main className="professor">
            <h1>{professor.name}</h1>
            <p className="department-name">{professor.department.name}</p>
            <img src={professor.profileImage} alt="Professor profile picture" />
            <h2>Biography:</h2>
            <p>{professor.bio}</p>
            <div className="contact-information">
                <h3>Contact Information</h3>
                <a href={`tel:${professor.phoneNumber}`}>{professor.phoneNumber}</a>
                <a href={`mailto:${professor.email}`}>{professor.email}</a>
            </div>
            {token && 
                <button onClick={() => setIsEditing(!isEditing)}>
                    {!isEditing ? "Edit" : "Hide Editing"}
                </button>
            }
            {isEditing &&
                <>
                    <form onSubmit={sendUpdateProfessor}>
                        <h2>Update Professor Information</h2>
                        <label>Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>Profile Picture:
                            <input
                                type="text"
                                value={profileImage}
                                onChange={(e) => setProfileImage(e.target.value)}
                            />
                        </label>
                        <label>Biography:
                            <input
                                type="text"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </label>
                        <label>Email:
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label>Phone Number:
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </label>
                        <label>Department Id:
                            <input
                                type="number"
                                value={departmentId}
                                onChange={(e) => setDepartmentId(e.target.value)}
                            />
                        </label>
                        <button type="submit">Update Professor</button>
                        {updateError && <p>{updateError.message}</p>}
                    </form>
                    <button className="delete-professor-btn" onClick={sendDeleteProfessor}>Delete Professor from Directory</button>
                    {deleteError && <p>{deleteError.message}</p>}
                </>
            }
        </main>
    )
}