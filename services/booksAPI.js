import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    tagTypes: ["Book"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: (search = "") => `books?search=${search}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({
                              type: "Book",
                              id: _id,
                          })),
                          { type: "Book", id: "LIST" },
                      ]
                    : [{ type: "Book", id: "LIST" }],
        }),
        deleteBooks: builder.mutation({
            query: (_id) => ({
                url: `books/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, _id) => [
                { type: "Book", id: _id },
            ],
        }),
        addBooks: builder.mutation({
            query: (body) => ({
                url: "books/",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Book", id: "LIST" }],
        }),
        updateBooks: builder.mutation({
            query: (body) => ({
                url: `books/${body._id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: [{ type: "Book", id: "LIST" }],
        }),
    }),
});

export const {
    useGetBooksQuery,
    useDeleteBooksMutation,
    useAddBooksMutation,
    useUpdateBooksMutation,
} = booksApi;
