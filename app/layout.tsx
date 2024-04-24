import NavBar from "./components/navbar/NavBar";
import { Nunito } from "next/font/google"
import './globals.css';

const font = Nunito({
    subsets: ["latin"]
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={font.className}>
                <NavBar placeholder="Commencer vos recherches" />
                {children}
            </body>
        </html>
    )
}