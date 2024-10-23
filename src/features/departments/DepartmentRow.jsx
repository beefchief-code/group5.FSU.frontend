
export default function DepartmentRow({ department }) {
    return(
        <tr onClick={() => {}}>
            <td>{department.name}</td>
            <td>{department.description}</td>
            <td>{department.email}</td>
            <td>{department.phoneNumber}</td>
        </tr>
    );
}
