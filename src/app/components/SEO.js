import Head from 'next/head';

export default function SEO() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Network Analysis Module - AI-Powered Speed Test',
    applicationCategory: 'NetworkSpeedTest',
    operatingSystem: 'Any',
    description:
      'Advanced AI-powered network speed test and analysis tool. Get detailed insights about your internet connection with artificial intelligence.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Real-time speed testing',
      'AI-powered network analysis',
      'Multiple AI provider support (OpenAI, Claude, Mistral, Gemini)',
      'Detailed performance metrics',
      'Gaming and streaming optimization recommendations',
    ],
  };

  return (
    <Head>
      <title>
        AI Network Speed Test & Analysis | Free Internet Speed Test Tool
      </title>
      <meta
        name='description'
        content='Free AI-powered internet speed test. Get instant download/upload speeds, latency metrics, and AI analysis. Advanced network diagnostics for gaming, streaming & more.'
      />

      {/* Primary Meta Tags */}
      <meta
        name='title'
        content='AI Network Speed Test & Analysis | Free Internet Speed Test Tool'
      />
      <meta
        name='keywords'
        content='speed test, internet speed test, network speed test, AI speed test, bandwidth test, internet speed checker, network analysis, AI network analysis, connection speed test, broadband speed test, wifi speed test, internet performance test'
      />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://rawspeedtest.netlify.app/' />
      <meta
        property='og:title'
        content='AI-Powered Network Speed Test & Analysis'
      />
      <meta
        property='og:description'
        content='Advanced AI network speed test with real-time analysis. Test download speed, upload speed, latency, and get AI-powered recommendations.'
      />
      <meta
        property='og:image'
        content='https://rawspeedtest.netlify.app/og-image.png'
      />

      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta
        property='twitter:url'
        content='https://rawspeedtest.netlify.app/'
      />
      <meta
        property='twitter:title'
        content='AI Network Speed Test & Analysis'
      />
      <meta
        property='twitter:description'
        content='Advanced AI network speed test with real-time analysis. Test download speed, upload speed, latency, and get AI-powered recommendations.'
      />
      <meta
        property='twitter:image'
        content='https://rawspeedtest.netlify.app/og-image.png'
      />

      {/* Structured Data */}
      <script type='application/ld+json'>{JSON.stringify(schema)}</script>

      {/* Canonical URL */}
      <link rel='canonical' href='https://rawspeedtest.netlify.app/' />

      {/* Alternative Languages */}
      <link
        rel='alternate'
        href='https://rawspeedtest.netlify.app/'
        hrefLang='x-default'
      />
      <link
        rel='alternate'
        href='https://rawspeedtest.netlify.app/'
        hrefLang='en'
      />
    </Head>
  );
}
