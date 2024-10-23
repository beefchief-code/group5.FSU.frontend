import { useGetProfessorsQuery } from "./professorSlice";
import { NavLink } from "react-router-dom";
import "./Professors.css";

export default function Professors() {
    const { data: professors = [], isLoading, error } = useGetProfessorsQuery();

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
                                <td><NavLink to={`/professors/${professor.id}`}>{professor.name}</NavLink></td>
                                <td>{professor.department.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </main>
    )
}