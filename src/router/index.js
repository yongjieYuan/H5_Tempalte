import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/index/index.vue')
  },
  {
    path: '/index',
    name: 'index',
    redirect: '/'
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import('@/views/guide/index.vue'),
    children: [
      {
        path: '',
        redirect: '/guide/about'
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/guide/about.vue')
      },
      {
        path: 'services',
        name: 'services',
        component: () => import('@/views/guide/services.vue')
      },
      {
        path: 'rate',
        name: 'rate',
        component: () => import('@/views/guide/rate.vue')
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/views/guide/contact-us.vue')
      }
    ]
  },
  {
    /// 关于我们的文章
    path: '/about/article',
    name: 'article',
    redirect: '/guide/about'
  },
  {
    /// 关于我们的文章
    path: '/about/article/:id',
    name: 'aboutArticle',
    component: () => import('@/views/article/about-article.vue')
  },
  {
    path: '/service/article/:id',
    name: 'serviceArticle',
    component: () => import('@/views/article/service-article.vue')
  },
  /// 新闻资讯
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/news/index.vue')
  },
  /// 新闻资讯文章
  {
    path: '/news/:type/article/:id',
    name: 'newsArticle',
    component: () => import('@/views/article/news-article.vue')
  },
  /// 汇率计算
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import('@/views/rate/rate-calculator.vue')
  },
  /// 在线开户
  {
    path: '/remittance',
    name: 'remittance',
    component: () => import('@/views/services/remittance-form.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
