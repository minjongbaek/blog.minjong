import { graphql } from 'gatsby';
import PostList from '~/components/PostList';
import Layout from '~/layout';
import { PostListQueryResult } from '~/types/graphql.types';

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: PostListQueryResult) => {
  return (
    <Layout>
      <PostList posts={edges} />
    </Layout>
  );
};

export default IndexPage;

export const getPostList = graphql`
  query getPostList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
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
