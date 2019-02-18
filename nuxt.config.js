module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'blog2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    "mavon-editor/dist/css/index.css",
    'assets/main.css'
  ],
  plugins: [  
    { src: "~plugins/vue-markdown.js", ssr: false },
    { src: '~plugins/element-ui'}
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true,
    prefix: '/api', // baseURL
    credentials: true,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8888', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/', //将 /api 替换掉
      },
    },
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

