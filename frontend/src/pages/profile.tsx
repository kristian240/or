import { useAuth0 } from '@auth0/auth0-react';
import { Container } from '@chakra-ui/layout';
import { Center, Image, Spinner, Stat, StatLabel, StatNumber, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Navigation } from '../components/Navigation';

const Profile = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) return;

    router.push('/');
  }, []);

  return (
    <>
      <Container maxW='1024px' py={2}>
        <Navigation />
      </Container>
      {isAuthenticated ? (
        <Container maxW='1024px' centerContent py={4}>
          <VStack spacing={4} align='flex-start' w='full'>
            <Image src={user.picture} h='48px' />

            <Stat borderLeft='solid 1px black' pl={2}>
              <StatLabel>Ime</StatLabel>
              <StatNumber>{user.name}</StatNumber>
            </Stat>

            <Stat borderLeft='solid 1px black' pl={2}>
              <StatLabel>Email</StatLabel>
              <StatNumber>{user.email}</StatNumber>
            </Stat>

            <Stat borderLeft='solid 1px black' pl={2}>
              <StatLabel>Nickname</StatLabel>
              <StatNumber>{user.nickname}</StatNumber>
            </Stat>
          </VStack>
        </Container>
      ) : (
        <Center>
          <Spinner />
        </Center>
      )}
    </>
  );
};

export default Profile;
