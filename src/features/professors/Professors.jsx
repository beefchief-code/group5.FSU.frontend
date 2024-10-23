import { useGetProfessorsQuery } from "./professorSlice";
import { useGetDepartmentsQuery } from "../departments/departmentSlice";

export default function Professors() {
    const { data: professors = [], isLoading, error } = useGetProfessorsQuery();
    const { data: departments = [] } = useGetDepartmentsQuery();

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
        <main>
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
                        const department = departments.find((department) => department.id === professor.departmentId);
                        return (
                            <tr key={professor.id}>
                                <td>{professor.name}</td>
                                <td>{department.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </main>
    )
}