
export default function DepartmentRow({department, setSelectedDepartmentId}) {
    return(
        <tr onClick={() => {setSelectedDepartmentId(department.id);}}>
            <td>{department.name}</td>
            <td>{department.description}</td>
            <td>{department.email}</td>
            <td>{department.phone}</td>
        </tr>
    );
}
