import { useAuth0 } from '@auth0/auth0-react';
import { Container, HStack } from '@chakra-ui/layout';
import { Button, Center, Spinner, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Navigation } from '../components/Navigation';

function downloadFile(content: Blob, fileName: string) {
  const file = new Blob([content], { type: 'text/plain' });

  const element = document.createElement('a');
  element.href = URL.createObjectURL(file);
  element.download = fileName;
  element.click();
}

const handleDownloadCSV = () =>
  fetch('/api/zastupnici', { headers: { accept: 'text/csv' } })
    .then((res) => res.blob())
    .then((blob) => downloadFile(blob, 'zastupnici.csv'));

const handleDownloadJSON = () =>
  fetch('/api/zastupnici', { headers: { accept: 'application/json' } })
    .then((res) => res.blob())
    .then((blob) => downloadFile(blob, 'zastupnici.json'));

const RefreshPage = () => {
  const toast = useToast();
  const { isAuthenticated, user, isLoading } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) return;

    toast({
      title: 'Niste prijavljeni',
      description: 'Morate biti prijavljeni kako biste posjetili svoj korisnički račun',
      status: 'error',
      isClosable: true,
    });
    router.push('/');
  }, []);

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
            <Button onClick={handleDownloadCSV}>CSV</Button>
            <Button onClick={handleDownloadJSON}>JSON</Button>
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
