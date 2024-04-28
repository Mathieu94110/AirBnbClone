import Home from './pages';
import NavBar from './components/navbar/NavBar';
import Container from './components/Container';

const Page = () => {
    return (
        <>
            {/*Container below is user in order to set navbar height and home margin top depending on scroll*/}
            <Container type='navbar'>
                <NavBar placeholder="Commencer vos recherches" />
            </Container>
            <Container type='page'>
                <Home />
            </Container>

        </>
    )
}

export default Page
