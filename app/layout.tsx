import { Nunito } from "next/font/google"
import './globals.css';

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

                {children}
            </body>
        </html>
    )
}

export default RootLayout;