import { defineConfig } from 'vitepress'
import { getThemeConfig } from '@sugarat/theme/node'
import type { Theme } from '@sugarat/theme'

const baseUrl = 'https://blog.abplan.top'

const RSS: Theme.RSSOptions = {
  title: "Rain's Space",
  baseUrl,
  description: "You can't see the moon due to the rainy day.",
  language: 'zh-cn',
  favicon: `${baseUrl}/favicon.svg`,
  copyright: 'MIT License | Rain'
}

const blogTheme = getThemeConfig({
  author: 'Rain',
  authorList: [
    {
      nickname: 'Rain',
      url: 'https://github.com/12ain',
      des: "You can't see the moon due to the rainy day."
    }
  ],
  blog: {
    pagesData: (data) => data
  },
  timeline: true,
  groupIcon: {},
  tabs: true,
  RSS,
  themeColor: 'vp-green',
  homeTags: {
    title: '🏷 Tags',
    showCount: true
  },
  imagePreview: {
    showProgress: true,
    infinite: true,
    hideOnClickModal: true
  },
  formatShowDate: {
    justNow: '刚刚',
    secondsAgo: '秒前',
    minutesAgo: '分钟前',
    hoursAgo: '小时前',
    daysAgo: '天前',
    weeksAgo: '周前'
  },
  comment: {
    type: 'valine',
    options: {
      appId: process.env.COMMENT_APPID,
      appKey: process.env.COMMENT_SECRET
    }
  },
  footer: {
    copyright: 'MIT License | Rain',
    icpRecord: {
      name: '苏ICP备2023025403号-1',
      link: 'http://beian.miit.gov.cn'
    }
  },
  recommend: {
    showSelf: false,
    nextText: '下一篇'
  },
  popover: {
    title: '👋 Hi there!',
    body: [
      { type: 'text', content: '有问题或建议？欢迎评论区留言，一起交流！' },
      { type: 'text', content: '觉得不错的话，订阅 RSS 获取最新更新 📡' }
    ],
    duration: -1
  }
})

export default defineConfig({
  extends: blogTheme,
  lang: 'zh-CN',
  title: "Rain's Space",
  description: "You can't see the moon due to the rainy day.",
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  srcExclude: ['**/template/**'],
  sitemap: {
    hostname: baseUrl
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '分类', link: '/blogs/' },
      { text: '归档', link: '/archives/' },
      { text: '关于', link: '/about' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/12ain' }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文章', buttonAriaLabel: '搜索文章' },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除',
            backButtonTitle: '返回',
            noResultsText: '无法找到相关结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    editLink: {
      pattern: 'https://github.com/12ain/blog/edit/vue-press/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: {
      level: [2, 3],
      label: '目录'
    },
    lastUpdatedText: '上次更新',
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部'
  }
})
