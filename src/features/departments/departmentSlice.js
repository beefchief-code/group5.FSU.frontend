import api from "../../store/api"

const departmentApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDepartments: build.query({
            query: () => '/departments',
            transformResponse: (response) => response.departments,
            providesTags: ['department'],
        }),
        getDepartment: build.query({
            query: (id) => '/departments/' + id,
            transformResponse: (response) => response.department,
            providesTags: ['department'],
        })
    })
});

export const {
    useGetDepartmentsQuery,
    useGetDepartmentQuery,
} = departmentApi;