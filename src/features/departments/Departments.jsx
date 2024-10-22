import { useGetDepartmentsQuery } from "../departmentsSlice"; // not sure if its me who needs to make the slice.
import DepartmentRow from "./DepartmentRow";


// setSelectedDepartmentId is most likely going to change after we setup store...
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
                        departments.map((department) => ( <ContactRow key={department.id} contact={department} setSelectedDepartmentId={setSelectedDepartmentId} /> )) // some kind of map here after the back-end is done... 
                    }
                </tbody>
            </table>
        </>
    )
}