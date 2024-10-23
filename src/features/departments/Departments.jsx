import { useGetDepartmentsQuery } from "./departmentSlice"; 
import DepartmentRow from "./DepartmentRow";


export default function Departments({setSelectedDepartmentId}) { 

    const { data: departments = [], isLoading, error } = useGetDepartmentsQuery(); 

    if (isLoading) {
        return <p>Loading Departments...</p>;
    }
    if (error) {
        return <p>{error.error}: {error.message}</p>;
    }
    if (!books.length) {
        return <p>There are no Departments.</p>;
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th><h2>Contact List</h2></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Departments Name</th>
                        <th>Description</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                    {
                        departments.map((department) => ( <DepartmentRow key={department.id} contact={department} setSelectedDepartmentId={setSelectedDepartmentId} /> )) 
                    }
                </tbody>
            </table>
        </>
    )
}