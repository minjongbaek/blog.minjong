import type { IGatsbyImageData } from 'gatsby-plugin-image';

export type Post = {
  node: {
    id: string;
    frontmatter: {
      title: string;
      summary: string;
      date: string;
      tags: string[];
      thumbnail: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    };
  };
};
