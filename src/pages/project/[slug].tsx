import { ProjectComponent } from '@/components/Project';
import { Navbar } from '@/components/Project/Navbar';
import { Footer } from '@/components/Shared/Footer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function Project({
  slug,
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
        <ProjectComponent slug={slug} />
        <Footer />
      </>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      slug: context.params?.slug,
      ...(await serverSideTranslations(`${context?.locale}`, [])),
    },
  };
};
