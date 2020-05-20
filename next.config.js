const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");

module.exports = withPlugins([withSass], {
  env: {
    API_KEY: "7a04903dd10406dcda3e3998b3095e96a5dc9a61",
  },
});
