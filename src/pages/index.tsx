import { About } from '@/components/Home/About';
import { Header } from '@/components/Home/Header';
import { Navbar } from '@/components/Home/Navbar';
import { Projects } from '@/components/Home/Projects';
import { Skills } from '@/components/Home/Skills';
import { Footer } from '@/components/Shared/Footer';
import { getStaticPropsTranslations } from '@/utils/i18n';
import { Poppins } from 'next/font/google';
import Head from 'next/head';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>José Ñiquen</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${poppins.variable} font-poppins`}>
        <div className="h-6"></div>
        <Navbar />
        <Header />
        <About />
        <Projects />
        <Skills />
        <Footer />
      </main>
    </>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
    },
  };
}
