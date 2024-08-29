"use client"
import theme from "./pages/theme"
import { ChakraProvider } from "@chakra-ui/react"

export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
