
// const resolve = require('@rollup/plugin-node-resolve').default

const mount = {
  src: {url: "/_dist_"},
  public: {url: "/", static: true, resolve: true}
};

const proxy = {};

const plugins = [
  ["@snowpack/plugin-babel"],
  [
    "snowpack-plugin-rollup-bundle",
    {
      emitHtmlFiles: true,
      preserveSourceFiles: true,
      entrypoints: "build/_dist_/index.js"
    },
  ],
];

const installOptions = {
  NODE_ENV: true,
  rollup: {
    plugins: [
      // resolve(),
    ]
  }
};

const alias = {};

const devOptions = {
  out: "build",
  open: "none",
  bundle: true,
};

const buildOptions = {
  clean: true,
};

module.exports = {
  mount,
  alias,
  proxy,
  plugins,
  installOptions,
  devOptions,
  buildOptions,
};
