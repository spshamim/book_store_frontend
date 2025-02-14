"use client";

import { useState } from "react";
import {
    useGetBooksQuery,
    useAddBooksMutation,
    useUpdateBooksMutation,
    useDeleteBooksMutation,
} from "@/services/booksAPI";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function BookRTK() {
    const { toast } = useToast();

    // Search Book
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // Fetch Book
    const { data, isLoading, isError } = useGetBooksQuery(search);

    // Add Book
    const [addBooks] = useAddBooksMutation();
    const [addOpen, setAddOpen] = useState(false);
    const [addBook, setaddBook] = useState({
        name: "",
        author: "",
        price: "",
        quantity: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setaddBook((prevBook) => {
            return {
                ...prevBook,
                [name]: value,
            };
        });
    };
    const handleSubmit = async () => {
        addBook.price = parseFloat(addBook.price);
        addBook.quantity = parseFloat(addBook.quantity);
        await addBooks(addBook);
        toast({
            variant: "primary",
            title: "Book Added Successfully.",
        });
        setAddOpen(false);
        for (let key in addBook) {
            addBook[key] = "";
        }
    };

    // Edit Book
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [updateBooks] = useUpdateBooksMutation();
    const editHandler = (book) => {
        setSelectedBook(book);
        setOpen(true);
    };
    const finalEdit = () => {
        updateBooks(selectedBook);
        toast({
            variant: "primary",
            title: "Book Updated Successfully.",
        });
        setOpen(false);
    };

    // Delete Book
    const [deleteBooks] = useDeleteBooksMutation();
    const deleteHandler = async (id) => {
        await deleteBooks(id);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-purple-600">
                Book Management
            </h1>
            <p className="text-xs font-bold text-black mb-4 md:mb-8">
                Technology Used ➜ Redux Toolkit with RTK Query
            </p>

            <div className="flex flex-col md:flex-row justify-start items-start gap-4 mb-4 md:mb-8">
                <button
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded-md cursor-pointer"
                    onClick={() => setAddOpen(true)}
                >
                    Add Book
                </button>
                <input
                    type="text"
                    name="search"
                    placeholder="Search by Book Name"
                    value={search}
                    onChange={handleSearch}
                    className="text-sm text-black p-2 focus:outline-purple-600 bg-white rounded-lg"
                />
            </div>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {isError}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {data &&
                    data.map((book) => (
                        <div
                            key={book._id}
                            className="mb-4 bg-white p-4 rounded-lg"
                        >
                            <h2 className="text-lg font-bold text-purple-600 mb-2">
                                Book Name ➜ {book.name}
                            </h2>
                            <p className="text-sm text-gray-600 mb-2">
                                Written by ➜ {book.author}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                Price ➜ ${book.price}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                Quantity ➜ {book.quantity} pieces
                            </p>
                            <button
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded-md cursor-pointer"
                                onClick={() => editHandler(book)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md ml-4 cursor-pointer"
                                onClick={() => deleteHandler(book._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
            </div>

            {/* Add Dialog Box */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Book</DialogTitle>
                        <DialogDescription>
                            Write information to add the book. Click save when
                            you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                name="name"
                                id="name"
                                type="text"
                                value={addBook.name}
                                className="col-span-3"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="author" className="text-right">
                                Author
                            </Label>
                            <Input
                                name="author"
                                id="author"
                                type="text"
                                value={addBook.author}
                                className="col-span-3"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input
                                name="price"
                                id="price"
                                type="number"
                                value={addBook.price}
                                className="col-span-3"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                                Quantity
                            </Label>
                            <Input
                                name="quantity"
                                id="quantity"
                                type="number"
                                value={addBook.quantity}
                                className="col-span-3"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={handleSubmit}
                        >
                            Add Book
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog Box */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Book</DialogTitle>
                        <DialogDescription>
                            Make changes to the book here. Click save when
                            you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={selectedBook?.name || ""}
                                className="col-span-3"
                                onChange={(e) =>
                                    setSelectedBook({
                                        ...selectedBook,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="author" className="text-right">
                                Author
                            </Label>
                            <Input
                                id="author"
                                type="text"
                                value={selectedBook?.author || ""}
                                className="col-span-3"
                                onChange={(e) =>
                                    setSelectedBook({
                                        ...selectedBook,
                                        author: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={selectedBook?.price || ""}
                                className="col-span-3"
                                onChange={(e) =>
                                    setSelectedBook({
                                        ...selectedBook,
                                        price: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                                Quantity
                            </Label>
                            <Input
                                id="quantity"
                                type="number"
                                value={selectedBook?.quantity || ""}
                                className="col-span-3"
                                onChange={(e) =>
                                    setSelectedBook({
                                        ...selectedBook,
                                        quantity: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={finalEdit}
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
