# H5 template(H5 开发模版)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Components 文件夹

放置项目公共组件，较为重要的组件.

例如项目的的固定**头部导航栏**或者**Footer 区域**.

在对应的页面文件夹下创建**cpn**文件夹，在此文件中放置页面中的小部分组件

### h5 适配

rem 适配方案：

开发时依赖：postcss-pxtorem

生产依赖：amfe-flexible

postcss.config.js：h5 适配配置信息

### 多语言使用

项目集成 vue-i18n

已注入到全局中，可通过 this.$i18n或者this.$t 访问多语言实例 来获取多语言信息

模版文件中使用 $t("key") 进行多语言翻译，key 为多语言文件（i18n/locales/zh_CN）中对应的 key

状态管理的 state.locale 属性，可以获取当前的语言信息，如：zh_CN, en_US

### 其他配置文件

.browserslistrc: 适配市面上大部分浏览器

.editorconfig: 控制编辑文本时的规范

.eslintrc: 语法检测，可以在 rules 中进行配置，如果某个规则不想受到限制，配置对应的规则 key，设为“off”,如：关闭未使用的组件提示：

```
'vue/no-unused-components': 'off'
```

vue.config.js: webpack 配置

### 代码格式化

主要搭配 prettier 插件使用

.prettierrc: 代码格式化配置信息

.prettierignore: 哪些文件忽略格式化

### 事件总线

Vue3 推荐使用 mitt 替代 Vue 2.x event_bus

npm: [mitt](https://www.npmjs.com/package/mitt)
