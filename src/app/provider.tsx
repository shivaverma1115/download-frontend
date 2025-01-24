"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { ToastContainer } from "react-toastify"
import AppProvider from "@/contextApi/AppProvider"

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <>
            <AppProvider>
                <ToastContainer autoClose={1000} />
                <ChakraProvider value={defaultSystem}>
                    <ThemeProvider attribute="class" disableTransitionOnChange>
                        {props.children}
                    </ThemeProvider>
                </ChakraProvider>
            </AppProvider>
        </>
    )
}