"use client";

import "./globals.css";
import { Provider } from "react-redux";
import store from "../lib/store";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
    return (
        <Provider store={store}>
            <html>
                <head>
                    <title>Redux Project with RTK</title>
                </head>
                <body>
                    {children}
                    <Toaster />
                </body>
            </html>
        </Provider>
    );
}
