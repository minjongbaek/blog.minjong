import { graphql } from 'gatsby';
import PostDetail from '~/components/PostDetail';
import { PostDetailQueryResult } from '~/types/graphql.types';

const PostTemplate = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: PostDetailQueryResult) => {
  const {
    node: { html },
  } = edges[0];
  return <PostDetail html={html} />;
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
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`;
