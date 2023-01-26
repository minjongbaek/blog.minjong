import { graphql } from 'gatsby';
import PostDetail from '~/components/PostDetail';
import PostHeader from '~/components/PostHeader';
import Layout from '~/layout';
import type { PostDetailQueryResult } from '~/types/graphql.types';

type PostTemplateProps = {
  location: { href: string };
};

const PostTemplate = ({
  data: {
    allMarkdownRemark: { edges },
    site: {
      siteMetadata: { siteUrl },
    },
  },
  location: { href },
}: PostTemplateProps & PostDetailQueryResult) => {
  const {
    node: {
      html,
      frontmatter: { title, summary, date, tags },
    },
  } = edges[0];
  return (
    <Layout title={title} description={summary} url={href}>
      <PostHeader title={title} date={date} tags={tags} />
      <PostDetail html={html} />
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
