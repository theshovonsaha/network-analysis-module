import './styles/tailwind-imports.css';
import './globals.css';
import SEO from './components/SEO';

export const metadata = {
  metadataBase: new URL('https://rawspeedtest.netlify.app'),
  title: {
    default: 'AI Network Speed Test & Analysis | Free Internet Speed Test Tool',
    template: '%s | AI Network Speed Test',
  },
  description:
    'Free AI-powered internet speed test. Get instant download/upload speeds, latency metrics, and AI analysis. Advanced network diagnostics for gaming, streaming & more.',
  keywords: [
    'speed test',
    'internet speed test',
    'network speed test',
    'AI speed test',
    'bandwidth test',
    'internet speed checker',
    'network analysis',
    'AI network analysis',
    'connection speed test',
    'broadband speed test',
    'wifi speed test',
    'internet performance test',
  ],
  authors: [{ name: 'Network Analysis Module' }],
  creator: 'Network Analysis Module',
  publisher: 'Network Analysis Module',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <SEO />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
