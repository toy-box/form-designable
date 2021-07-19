import * as fs from 'fs';
import externalGlobals from 'rollup-plugin-external-globals';

const basicPkgs = [
  'form-designable-react',
  'form-settings',
  'form-setters',
  'form-designable',
];
const packages = fs
  .readdirSync('./packages')
  .filter((pkg) => !basicPkgs.includes(pkg));

export default {
  disableTypeCheck: true,
  pkgs: basicPkgs.concat(packages),
  esm: {
    type: 'babel',
    importLibToEs: true,
  },
  cjs: {
    type: 'babel',
    lazy: true,
  },
  extraRollupPlugins: [
    externalGlobals({
      '@toy-box/meta-schema': 'Toybox.MetaSchema',
    }),
  ],
  extraExternals: [],
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'es', style: true },
      'antd',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@toy-box/meta-components',
        libraryDirectory: 'es',
        style: true,
      },
      '@toy-box/meta-components',
    ],
  ],
};
