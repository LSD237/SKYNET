const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}

const sourceMap = () => {
  if (isDev) {
    return 'source-map'
  }
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  // entry: './index.js',
  entry: {
    index: ['./index.js'],
    second: ['./secondPage.js'],
    // third: ['./thirdPage.js']
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  target: 'web',
  devServer: {
    port: 8080,
    open: true,
    hot: false, //по умолчанию "true" но это ломает liveReload
    compress: true
  },
  devtool: sourceMap(),
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.css$/,
        // loader: 'css-loader',
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      // template: './index.html'
      filename: 'index.html',
      template: './pug/pages/index.pug',
      chunks: ['index']
    }),
    new HTMLWebpackPlugin({
      filename: 'second.html',
      template: './pug/pages/second.pug',
      chunks: ['second']
    }),
    // new HTMLWebpackPlugin({
    //   filename: 'third.html',
    //   template: './pug/pages/third.pug',
    //   chunks: ['third']
    // }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/main/logoRobot.png'),
          to: path.resolve(__dirname, 'dist/assets/Images/main')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/main/scrollDown.png'),
          to: path.resolve(__dirname, 'dist/assets/Images/main')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/icons/iconsHeart.png'),
          to: path.resolve(__dirname, 'dist/assets/Images/icons')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/icons/iconHierarchy.png'),
          to: path.resolve(__dirname, 'dist/assets/Images/icons')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/icons/iconsHield.png'),
          to: path.resolve(__dirname, 'dist/assets/Images/icons')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/idiology/оковы.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/idiology')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/idiology/война.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/idiology')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/idiology/мнения.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/idiology')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/idiology/особоОдаренный.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/idiology')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/icons/iconLern.png'),
          to: path.resolve(__dirname, 'dist/assets/Images/icons')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/icons/iconRoboCreate.png'),
          to: path.resolve(__dirname, 'dist/assets/Images/icons')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/joinUs/phone.png'),
          to: path.resolve(__dirname, 'dist/assets/Images/joinUs')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/bestPrototypes/ns5-2.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/bestPrototypes')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/bestPrototypes/T800-2.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/bestPrototypes')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/bestPrototypes/walle-2.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/bestPrototypes')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/bestPrototypes/200years-2.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/bestPrototypes')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/me.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/АльфредЛеннинг.png'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/МайлзДайсон.png'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/gitler.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/SaddamHussein.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/UsamaBenLaden.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/ElisavetaBatori.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/HeinrichHimmler.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/VladTepes.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/Hirohito.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/IdiAmin.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/SalotSar.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/TalatPasha.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/Baymax.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/Chappie.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/Djeff.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/ns5.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/№5.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/StalnoyGigant.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/T800.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/walle.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/Endry.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
        {
          from: path.resolve(__dirname, 'src/assets/Images/secondPage/myPhoto/Rodny.jpg'),
          to: path.resolve(__dirname, 'dist/assets/Images/secondPage/myPhoto')
        },
      ]
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  // {
                  //   removeViewBox: false,
                  // },
                  {
                    name: 'removeViewBox',
                    active: false
                  },
                ],
              },
            ],
          ],
        },
      },
    })
  ]
}