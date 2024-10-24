import api from "../../store/api"

const departmentApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDepartments: build.query({
            query: () => '/departments',
            providesTags: ['Department'],
        }),
        getDepartment: build.query({
            query: (id) => '/departments/' + id,
            providesTags: ['Department'],
        }),
        addDepartment: build.mutation({
            query: (department) => ({
                url: "/departments",
                method: "POST",
                body: department,
            }),
            invalidatesTags: ["Department"],
        }),
        updateDepartment: build.mutation({
            query: ({ id, name, description, image, email, phoneNumber }) => ({
                url: "/departments/" + id,
                method: "PUT",
                body: { name, description, image, email, phoneNumber },
            }),
            invalidatesTags: ["Department"],
        }),
        deleteDepartment: build.mutation({
            query: (id) => ({
                url: "/departments/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Department"]
        }),
        
    })
});

export const {
    useGetDepartmentsQuery,
    useGetDepartmentQuery,
    useAddDepartmentMutation,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
} = departmentApi;