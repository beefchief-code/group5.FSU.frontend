import { useParams } from "react-router-dom"
import { useGetProfessorQuery } from "../professorSlice"
import { useGetDepartmentQuery } from "../departments/departmentSlice"

export default function Professor() {
    const { id } = useParams();
    const {data: professor, isLoading: professorLoading, error: professorError } = useGetProfessorQuery(id);
    const departmentId = professor.departmentId;
    const { data: department, isLoading: departmentLoading } = useGetDepartmentQuery(departmentId);

    if (professorLoading || departmentLoading) {
        return <p>Loading professor...</p>;
    }

    if (professorError) {
        return <p>{professorError.error}: {professor.Error.message}</p>;
    }

    if (!professor) {
        return <p>This professor is either not in our directory, or we ran into an error.</p>;
    }

    return (
        <main>
            <h1>{professor.name}</h1>
            <img src={professor.profileImage} alt="Professor profile picture" />
            <p>{professor.bio}</p>
            <p>{department?.name}</p>
            <h3 className="contact-info">Contact Information</h3>
            <p>{professor.email}</p>
            <p>{professor.phoneNumber}</p>
        </main>
    )
}