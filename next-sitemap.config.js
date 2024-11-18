/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://rawspeedtest.netlify.app',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 1.0,
  exclude: ['/404'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://rawspeedtest.netlify.app/sitemap.xml'],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
  },
};
