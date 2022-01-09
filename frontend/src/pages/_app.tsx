import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { AppProps } from 'next/app';
import { Auth0Provider } from '@auth0/auth0-react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Auth0Provider
        domain={publicRuntimeConfig.AUTH0_DOMAIN}
        clientId={publicRuntimeConfig.AUTH0_CLIENT}
        redirectUri={publicRuntimeConfig.APP_DOMAIN}
      >
        <Component {...pageProps} />
      </Auth0Provider>
    </ChakraProvider>
  );
}

export default MyApp;
