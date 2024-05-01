import NavBar from './components/navbar/NavBar';
import Container from './components/Container';
import { Nunito } from "next/font/google"
import './globals.css';
import Modal from './components/modals/Modal';

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
                    <Modal actionLabel='Envoyer' secondaryActionLabel='Annuler' title="Hello" isOpen />
                    <NavBar placeholder="Commencer vos recherches" />
                </Container>
                {children}
            </body>
        </html>
    )
}

export default RootLayout;