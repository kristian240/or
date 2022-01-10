import { Container } from '@chakra-ui/layout';
import { Navigation } from '../components/Navigation';

const Index = () => {
  return (
    <>
      <Container maxW='1024px' py={2}>
        <Navigation />
      </Container>
    </>
  );
};

export default Index;
