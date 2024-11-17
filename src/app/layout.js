import localFont from 'next/font/local';
import './styles/tailwind-imports.css';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Network Analysis Module',
  description: 'Advanced Network Diagnostics System',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <meta name='grammarly-disable-editor' content='true' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
