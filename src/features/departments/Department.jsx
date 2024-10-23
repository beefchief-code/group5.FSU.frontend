import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetDepartmentQuery } from "./departmentSlice";

export default function Department() {

    const { id } = useParams();
    const { data: department, isLoading, error } = useGetDepartmentQuery(id);
    const token = useSelector(selectToken);

    if (isLoading) {
        return <p>Loading book...</p>;
    }

    if (error) {
        return <p>{error.error}: {error.message}</p>;
    }

    return (
        <>
            <article>
                <h2>{department.name}</h2>
                <p>{department.description}</p>
                <img src={department.image} alt={department.name}/>
                <p>{department.phoneNumber}</p>
                <p>{department.email}</p>
            </article>
        </>
    )
}