import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { GatsbyNode } from 'gatsby';

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
