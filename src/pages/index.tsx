import { graphql } from 'gatsby';
import PostList from '~/components/PostList';
import Layout from '~/layout';
import { PostListQueryResult } from '~/types/graphql.types';

const IndexPage = ({
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
  },
}: PostListQueryResult) => {
  return (
    <Layout title={title} description={description} url={siteUrl}>
      <PostList posts={edges} />
    </Layout>
  );
};

export default IndexPage;

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: ASC } }]
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            tags
          }
        }
      }
    }
  }
`;
