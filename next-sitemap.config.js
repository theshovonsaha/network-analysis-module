/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://rawspeedtest.netlify.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'out',
};
