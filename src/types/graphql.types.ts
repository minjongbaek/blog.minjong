export type Frontmatter = {
  title: string;
  summary: string;
  date: string;
  tags: string[];
};

export type PostListQueryResult = {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
      };
    };
    allMarkdownRemark: {
      edges: {
        node: {
          id: string;
          fields: {
            slug: string;
          };
          frontmatter: Frontmatter;
        };
      }[];
    };
  };
};

export type PostDetailQueryResult = {
  data: {
    site: {
      siteMetadata: {
        siteUrl: string;
      };
    };
    allMarkdownRemark: {
      edges: {
        node: {
          html: string;
          frontmatter: Frontmatter;
        };
      }[];
    };
  };
};
