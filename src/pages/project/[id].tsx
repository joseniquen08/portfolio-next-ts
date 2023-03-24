import { ProjectComponent } from '@/components/Project';
import { Navbar } from '@/components/Project/Navbar';
import { Footer } from '@/components/Shared/Footer';
import { dataProjectType } from '@/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Poppins } from 'next/font/google';
import Head from 'next/head';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: false,
});

export default function Project({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>José Ñiquen</title>
        <meta
          name="description"
          content="My name is José Ñiquen and this is my web portfolio."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${poppins.variable} font-poppins`}>
        <div className="h-6"></div>
        <Navbar />
        <ProjectComponent data={data} />
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}api/projects/${context.params?.id}`
  );
  const data: dataProjectType = await response.json();

  return {
    props: {
      data,
      ...(await serverSideTranslations(`${context?.locale}`, [])),
    },
  };
};
