const path = require('path')

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/themes/common/var.scss";
        `
      }
    }
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
