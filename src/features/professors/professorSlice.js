import api from "../../store/api";

const professorApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProfessors: build.query({
            query: () => "/professors",
            providesTags: ["Professor"],
        }),
        getProfessor: build.query({
            query: (id) => "/professors/" + id,
            providesTags: ["Professor"],
        }),
        updateProfessor: build.mutation({
            query: ({ id, name, bio, profileImage, email, phoneNumber, departmentId }) => ({
                url: "/professors/" + id,
                method: "PATCH",
                body: { name, bio, profileImage, email, phoneNumber, departmentId },
            }),
            invalidatesTags: ["Professor"],
        }),
        deleteProfessor: build.mutation({
            query: (id) => ({
                url: "/professors/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Professor"]
        }),
        addProfessor: build.mutation({
            query: (professor) => ({
                url: "/professors",
                method: "POST",
                body: professor,
            }),
            invalidatesTags: ["Professor"],
        }),
    }),
});

export const {
    useGetProfessorsQuery,
    useGetProfessorQuery,
    useUpdateProfessorMutation,
    useDeleteProfessorMutation,
    useAddProfessorMutation,
} = professorApi;