import NavBar from './components/navbar/NavBar';
import Container from './components/Container';
import { Nunito } from "next/font/google"
import './globals.css';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import ToastProvider from './providers/ToastProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';

const font = Nunito({
    subsets: ["latin"]
})

const RootLayout = async ({
    children,
}: {
    children: React.ReactNode
}) => {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={font.className}>
                {/*Container below is user in order to set navbar height and home margin top depending on scroll*/}
                <Container type='navbar'>
                    <ClientOnly>
                        <ToastProvider />
                        <LoginModal />
                        <RegisterModal />
                        <RentModal />
                        <NavBar placeholder="Commencer vos recherches" currentUser={currentUser} />
                    </ClientOnly>

                </Container>
                {children}
            </body>
        </html>
    )
}

export default RootLayout;