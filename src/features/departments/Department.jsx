import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useGetDepartmentQuery } from "./departmentSlice";
import { selectToken } from "../auth/authSlice";

export default function Department() {

    const { id } = useParams();
    const { data: department, isLoading, error } = useGetDepartmentQuery(id);
    const token = useSelector(selectToken);

    if (isLoading) {
        return <p>Loading department...</p>;
    }

    if (error) {
        return <p>{error.error}: {error.message}</p>;
    }

    return (
        <>
            <main className="department-component-main">
                <article className="department-article">
                    {department ? (
                        <section className="department-section-flex-box">
                            <img src={department.image} alt={department.name}/>
                            <h2>{department.name}</h2>
                            <p>{department.description}</p>
                            <a href={`tel:${department.phoneNumber}`}>{department.phoneNumber}</a>
                            <a href={`mailto:${department.email}`}>{department.email}</a>
                        </section>
                    ) : (
                        <p>There is no selected department.</p>
                    )

                    }
                </article>

                <section >
                    <h1>Meet our faculty and staff</h1>
                    <ul className="departments-flex-box">
                        {
                            department.professors.map((p) => (
                                <li>
                                    <Link to={`/professors/${p.id}`} >
                                        <img src={p.profileImage} alt={p.name}/>
                                        <h2>{p.name}</h2>
                                        <p>{p.bio}</p>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </main>            
        </>
    )
}