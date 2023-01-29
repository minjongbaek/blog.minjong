import { graphql } from 'gatsby';
import Comment from '~/components/Comment';
import PostDetail from '~/components/PostDetail';
import PostHeader from '~/components/PostHeader';
import Seo from '~/components/Seo';
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
      <Comment />
    </Layout>
  );
};

export default PostTemplate;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
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

type HeadProps = {
  location: { href: string };
};

export const Head = ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
}: HeadProps & PostDetailQueryResult) => {
  const {
    node: {
      frontmatter: { title, summary },
    },
  } = edges[0];
  return <Seo title={title} description={summary} url={href} />;
};
