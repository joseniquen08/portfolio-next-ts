import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: false,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.className} font-poppins`}>
      <Component {...pageProps} />
    </main>
  );
}

export default appWithTranslation(App);
