"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addBooks,
    fetchBooks,
    deleteBook,
    updateBook,
} from "../../lib/features/dbooks/dbooksSlice";
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

export default function BookList() {
    const { toast } = useToast();
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

    const { isLoading, books, isError } = useSelector((state) => state.dbooksR);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const handleSubmit = () => {
        addBook.price = parseFloat(addBook.price);
        addBook.quantity = parseFloat(addBook.quantity);
        dispatch(addBooks(addBook));
        toast({
            variant: "primary",
            title: "Book Added Successfully.",
        });
        setAddOpen(false);
        for (let key in addBook) {
            addBook[key] = "";
        }
    };

    const editHandler = (book) => {
        setSelectedBook(book);
        setOpen(true);
    };

    const finalEdit = () => {
        dispatch(updateBook(selectedBook));
        toast({
            variant: "primary",
            title: "Book Updated Successfully.",
        });
        setOpen(false);
    };

    const deleteHandler = (id) => {
        dispatch(deleteBook(id));
        toast({
            variant: "secondary",
            title: "Book Deleted Successfully.",
        });
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold text-purple-500 mb-5">
                List of Books
            </h2>
            <Button
                variant="primary"
                className="mb-5"
                onClick={() => setAddOpen(true)}
            >
                Add Book
            </Button>

            {/* Conditonal Rendering */}
            {isLoading ? (
                <div className="text-blue-500 font-semibold">
                    Loading books...
                </div>
            ) : isError ? (
                <div className="text-red-500 font-semibold">
                    Something went wrong. Please try again later.
                </div>
            ) : !books || books.length <= 0 ? (
                <div>
                    <h1 className="text-xl text-red-500 font-semibold">
                        No Books Found.
                    </h1>
                </div>
            ) : (
                <div className="overflow-y-auto h-full">
                    <table className="w-full border-collapse">
                        <thead className="text-left">
                            <tr className="bg-gradient-to-br from-[#FFF9F4] to-[#F9DF8A]">
                                <th className="p-2 w-[36%]">Name</th>
                                <th className="p-2 w-[34%]">Author</th>
                                <th className="p-2 w-[10%]">Price</th>
                                <th className="p-2 w-[10%]">Quantity</th>
                                <th className="p-2 w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr
                                    key={book._id}
                                    className="hover:bg-gray-200"
                                >
                                    <td className="border border-gray-500 p-2 border-l-0 border-r-0 border-t-0">
                                        {book.name}
                                    </td>
                                    <td className="border border-gray-500 p-2 border-t-0">
                                        {book.author}
                                    </td>
                                    <td className="border border-gray-500 p-2 border-t-0">
                                        ${book.price}
                                    </td>
                                    <td className="border border-gray-500 p-2 border-t-0">
                                        {book.quantity}
                                    </td>
                                    <td className="border border-gray-500 p-2 border-l-0 border-r-0 border-t-0">
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() =>
                                                    editHandler(book)
                                                }
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    deleteHandler(book._id)
                                                }
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

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
