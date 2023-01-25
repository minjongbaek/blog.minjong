export type Frontmatter = {
  title: string;
  summary: string;
  date: string;
  tags: string[];
};

export type PostListQueryResult = {
  data: {
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
