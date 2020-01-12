"use strict";
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const extract_plugin = require("mini-css-extract-plugin");
const htmlWebpack = require("html-webpack-plugin")
module.exports = {
  mode: "development",
  entry: {
    app : "./src/client/client.ts",
    dashboard : "./src/client/dashboard.ts",
    admin : "./src/client/admin.ts"
  },
  target: "web",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    hot: true,
    index: "public/dashboard.html"//"public/index.html",
    //publicPath : "public"
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
  },

  module: {
    rules: [
      {
        test :  /\.s[ac]ss$/i,
        use : [
          extract_plugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test : /\.ts$/,
        use : "ts-loader",
        exclude : /node_modules/,
      },
      {
        exclude : /node_modules/,
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        exclude : /node_modules/,
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          publicPath: "images",
          outputPath: "images/"
        }
      },
      // {
      //    exclude : /node_modules/,
      //    test: /\.js$/,
      //    loader: "babel-loader"
      // },
      {
        test: /\.css$/,
        use: [
          {
            loader: extract_plugin.loader
          },
          "css-loader"
        ]
      },

      {
        test : /\.(png|svg|jpg|gif|jpe?g)$/,
        loader : "url-loader", 
      },
      
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
        options: {
          outputPath: "fonts/"
        }
      }
    ]
  },
//   externals : {
//     "vue": "vue",
//     "vue-router" : "VueRouter"
// },
  resolve: {
    extensions: [".ts", ".js", ".vue", "scss"],

    alias: {
        'vue$': 'vue/dist/vue.runtime.js', //'vue/dist/vue.runtime.min.js', // 'vue/dist/vue.common.js' for webpack 1
        'vue-router$': 'vue-router/dist/vue-router.min.js',
        'vuex$':"vuex/dist/vuex.min.js"
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new extract_plugin({
      filename: "app.css"
    },
    
    new htmlWebpack({
      title : "WAF",
      filename : "src/index.html"
    }))
  ]
};