var proxy = require("http-proxy-middleware");

module.exports = {
  siteMetadata: {
    title: "Better DVC Resale 🏰",
    message:
      "An Easier Way to Buy and Sell Disney Vacation Club Memberships.<br>No Reduced Benefits and No Right of First Refusal.<br>Making Dreams Come True 👸",
    pattern: "Starry night",
    color: "#a8a8a8",
    titleFont: "Mouse Memoirs",
    messageFont: "Roboto",
    newsletter: "Find out how this works by joining the newsletter",
    social: [""]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Better DVC Resale",
        short_name: "Better DVC",
        start_url: "/",
        background_color: "#a8a8a8",
        theme_color: "#a8a8a8",
        display: "standalone",
        icon: "src/images/icon.png"
      }
    },
    "gatsby-plugin-offline"
  ],
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": ""
        }
      })
    );
  }
};
