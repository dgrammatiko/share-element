
// const resolve = require('@rollup/plugin-node-resolve').default

const mount = {
  src: {url: "/_dist_"},
  public: {url: "/", static: true, resolve: true}
};

const proxy = {};

const plugins = [
];

const installOptions = {
  NODE_ENV: true,
};

const alias = {};

const devOptions = {
  out: "build",
  open: "none",
  bundle: true,
};

const buildOptions = {
  clean: false,
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
