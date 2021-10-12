const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config();

module.exports = {
  mode: "production",
  performance: {
    hints: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "./public/index.html",
      URL: `https://maps.googleapis.com/maps/api/js?key=${process.env.APIKEY}&callback=initMap&map_id=ed5392a3975d62bf&libraries=places&v=weekly&libraries=places`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
