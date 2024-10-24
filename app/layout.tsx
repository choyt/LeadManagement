import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "@/components/AuthProvider"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
