import { graphql } from 'gatsby';
import PostDetail from '~/components/PostDetail';
import PostHeader from '~/components/PostHeader';
import Layout from '~/layout';
import type { PostDetailQueryResult } from '~/types/graphql.types';

const PostTemplate = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: PostDetailQueryResult) => {
  const {
    node: { html, frontmatter },
  } = edges[0];
  return (
    <Layout>
      <PostHeader {...frontmatter} />
      <PostDetail html={html} />
    </Layout>
  );
};

export default PostTemplate;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
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
