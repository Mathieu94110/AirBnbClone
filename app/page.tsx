import HomeCards from '@/components/HomeCards';
import Container from '@/components/Container';

const Home = () => {
    return (
        <>
            {/*Container below is user in order to set navbar height and home margin top depending on scroll*/}
            <Container type='page'>
                <HomeCards />
            </Container>

        </>
    )
}

export default Home
