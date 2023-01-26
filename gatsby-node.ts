import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { createFilePath } from 'gatsby-source-filesystem';
import type { GatsbyNode } from 'gatsby';

type CreatePagesQuery = {
  allMarkdownRemark: {
    edges: {
      node: {
        fields: {
          slug: 'string';
        };
      };
    }[];
  };
};

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  getConfig,
  actions,
}) => {
  const output = getConfig().output || {};

  actions.setWebpackConfig({
    output,
    resolve: {
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(process.cwd(), 'tsconfig.json'),
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        }),
      ],
    },
  });
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });

    createNodeField({ node, name: 'slug', value: slug });
  }
};

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  // Get All Markdown File For Paging
  const result = await graphql<CreatePagesQuery>(`
    query getSlugs {
      allMarkdownRemark(
        sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: ASC } }]
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running query`);
    return;
  }

  const PostTemplate = path.resolve(
    __dirname,
    'src/templates/PostTemplate.tsx'
  );

  result.data?.allMarkdownRemark.edges.forEach(
    ({
      node: {
        fields: { slug },
      },
    }) =>
      createPage({
        path: slug,
        component: PostTemplate,
        context: { slug },
      })
  );
};
