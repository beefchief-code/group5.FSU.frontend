import { useGetProfessorsQuery } from "../professorSlice";

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
                    {professors.map((professor) => (
                        <tr key={professor.id}>
                            <td>{professor.name}</td>
                            <td>{professor.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}