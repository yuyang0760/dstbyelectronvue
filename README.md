# dstbyelectronvue

> An electron-vue project

不会做的原因:

做到读取mod的configuration_options部分,发现用luaparse读取,如果 configuration_options 有在外面定义的东西 会读取不出来

这样导致有一些mod的 configuration_options 不能正常显示了

还没有学会其他读取lua的方法!!!

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[7c4e3e9](https://github.com/SimulatedGREG/electron-vue/tree/7c4e3e90a772bd4c27d2dd4790f61f09bae0fcef) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
