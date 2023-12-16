import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="min-h-screen bg-white bg-gradient-to-r from-gray-50 to-gray-50/95 dark:bg-gradient-to-r dark:from-custom-bg dark:to-custom-bg/95">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
