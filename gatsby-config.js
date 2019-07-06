module.exports = {
  siteMetadata: {
    title: "Better DVC Resale 🏰",
    message: "Coming Soon - An Easier Way to Buy and Sell Disney Vacation Club Memberships.\n No Reduced Benefits and No Right of First Refusal - Making Dreams Come True 👸",
    pattern: "Starry night",
    color: "#4c4c4c",
    titleFont: "Mouse+Memoirs",
    messageFont: "Roboto",
    social: [],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "gatsby-starter-under-construction",
        short_name: "Under Construction",
        start_url: "/",
        background_color: "#4c4c4c",
        theme_color: "#4c4c4c",
        display: "standalone",
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-offline"
  ],
}
