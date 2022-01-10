import { useAuth0 } from '@auth0/auth0-react';
import { Button, Flex, Heading, HStack, Link, StackDivider } from '@chakra-ui/react';
import React, { FC } from 'react';
import getConfig from 'next/config';
import NextLink from 'next/link';

const { publicRuntimeConfig } = getConfig();

interface INavigationProps {}

export const Navigation: FC<INavigationProps> = ({ ...rest }) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Flex as='nav' {...rest}>
      <Heading flex={1}>OR - lab4</Heading>

      {isAuthenticated ? (
        <HStack mr={4} divider={<StackDivider />}>
          <NextLink href='/profile' passHref>
            <Link>Korisnički profil</Link>
          </NextLink>

          <NextLink href='/refresh' passHref>
            <Link>Osvježi preslike</Link>
          </NextLink>

          <Button onClick={() => logout({ returnTo: publicRuntimeConfig.APP_DOMAIN })}>
            Odjava
          </Button>
        </HStack>
      ) : (
        <>
          <Button onClick={() => loginWithRedirect()} mr={4}>
            Prijava
          </Button>
        </>
      )}
    </Flex>
  );
};
