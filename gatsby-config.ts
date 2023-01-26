import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  jsxRuntime: 'automatic',
  trailingSlash: 'never',
  siteMetadata: {
    title: `Blog.minjongdev`,
    description: `minjong's dev blog`,
    author: `minjong`,
    siteUrl: `https://blog.minjongdev.com`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ['auto'],
          quality: 100,
          placeholder: 'blurred',
        },
      },
    },
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: `Monokai`,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
          {
            resolve: 'gatsby-remark-embedder',
          },
        ],
      },
    },
  ],
};

export default config;
