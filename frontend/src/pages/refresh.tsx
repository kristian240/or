import { useAuth0 } from '@auth0/auth0-react';
import { Container, HStack } from '@chakra-ui/layout';
import { Button, Center, Spinner, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Navigation } from '../components/Navigation';

const RefreshPage = () => {
  const toast = useToast();
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) return;

    toast({
      title: 'Niste prijavljeni',
      description: 'Morate biti prijavljeni kako biste posjetili stranicu za osvježavanje',
      status: 'error',
      isClosable: true,
    });
    router.push('/');
  }, [isLoading, isAuthenticated, router, toast]);

  return (
    <>
      <Container maxW='1024px' py={2}>
        <Navigation />
      </Container>
      {isAuthenticated ? (
        <Container maxW='1024px' centerContent py={4}>
          <Text mb='4' fontSize='xl'>
            Preuzmi podatke
          </Text>
          <HStack>
            <Button as='a' href='/api/zastupnici' download='zastupnici.csv'>
              CSV
            </Button>
            <Button as='a' href='/api/zastupnici' download='zastupnici.json'>
              JSON
            </Button>
          </HStack>
        </Container>
      ) : (
        <Center>
          <Spinner />
        </Center>
      )}
    </>
  );
};

export default RefreshPage;
