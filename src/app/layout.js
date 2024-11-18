import './styles/tailwind-imports.css';
import './globals.css';

export const metadata = {
  title: 'Network Analysis Module',
  description: 'Advanced Network Diagnostics System',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
