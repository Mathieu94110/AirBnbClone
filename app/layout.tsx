import NavBar from './components/navbar/NavBar';
import Container from './components/Container';
import { Nunito } from "next/font/google"
import './globals.css';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import ToastProvider from './providers/ToastProvider';

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
                {/*Container below is user in order to set navbar height and home margin top depending on scroll*/}
                <Container type='navbar'>
                    <ClientOnly>
                        <ToastProvider />
                        <RegisterModal />
                        <NavBar placeholder="Commencer vos recherches" />
                    </ClientOnly>

                </Container>
                {children}
            </body>
        </html>
    )
}

export default RootLayout;