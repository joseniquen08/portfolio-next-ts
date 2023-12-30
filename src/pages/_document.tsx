import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="min-h-screen bg-white bg-gradient-to-r from-custom-ligth-bg to-custom-ligth-bg/95 dark:bg-gradient-to-r dark:from-custom-dark-bg dark:to-custom-dark-bg/95">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
