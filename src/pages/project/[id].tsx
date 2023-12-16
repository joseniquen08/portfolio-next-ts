import { ProjectComponent } from '@/components/Project';
import { Navbar } from '@/components/Project/Navbar';
import { Footer } from '@/components/Shared/Footer';
import { DataProjectType } from '@/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

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
      <>
        <div className="h-6"></div>
        <Navbar />
        <ProjectComponent data={data} />
        <Footer />
      </>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}api/projects/${context.params?.id}`
  );
  const data: DataProjectType = await response.json();

  return {
    props: {
      data,
      ...(await serverSideTranslations(`${context?.locale}`, [])),
    },
  };
};
