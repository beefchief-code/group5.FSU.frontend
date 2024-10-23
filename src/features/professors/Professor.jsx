import { useParams } from "react-router-dom"
import { useGetProfessorQuery } from "./professorSlice"

export default function Professor() {
    const { id } = useParams();
    const { data: professor, isLoading, error } = useGetProfessorQuery(id);

    if (isLoading) {
        return <p>Loading professor...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    if (!professor) {
        return <p>This professor is either not in our directory, or we ran into an error.</p>;
    }

    return (
        <main>
            <h1>{professor.name}</h1>
            <img src={professor.profileImage} alt="Professor profile picture" />
            <p>{professor.bio}</p>
            <p>Department: {professor.department.name}</p>
            <h3 className="contact-info">Contact Information</h3>
            <p>{professor.email}</p>
            <p>{professor.phoneNumber}</p>
        </main>
    )
}