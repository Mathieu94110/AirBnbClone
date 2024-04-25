import { Nunito } from "next/font/google"
import './globals.css';
import NavBarProvider from "./components/NavBarProvider";

const font = Nunito({
    subsets: ["latin"]
})

const RootLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <html lang="en">
            <body className={font.className}>

                <NavBarProvider>{children}</NavBarProvider>
            </body>
        </html>
    )
}

export default RootLayout;