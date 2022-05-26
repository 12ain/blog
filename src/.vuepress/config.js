module.exports = {
  title: 'Rain的心情杂货铺',
  description: 'You cannot see the moon due to the rainy day.',
  dest: 'public',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }, ],
    ['meta', {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no'
    }, ],
  ],
  theme: 'reco',
  themeConfig: {
    nav: [{
      text: '首页',
      link: '/',
      icon: 'reco-home'
    }, {
      text: '归档',
      link: '/timeline/',
      icon: 'reco-date'
    }, {
      text: 'GitHub',
      link: 'https://github.com/12ain',
      icon: 'reco-github'
    }],
    type: 'blog',
    blogConfig: {
      category: {
        location: 2,
        text: '分类'
      },
      tag: {
        location: 3,
        text: '标签'
      },
    },
    friendLink: [{
      title: '团队领袖培养计划',
      desc: '对于工作上应该做什么事，如果你没有自己的想法，而是完全听主管的，很危险。多数的主管不会在乎你的成长，也不会把公司的利益摆第一位，他们最在乎的是自己的工作绩效，而他们的工作绩效是要靠你们去达成的。完全听他们的任务布置去做，没有自己的主张，东一榔头，西一棒槌，几年下来就变打杂的了。 ——蔡学镛',
      email: 'willin@willin.org',
      link: 'https://leader.js.cool/'
    }, {
      title: '午后南杂',
      desc: 'Enjoy when you can, and endure when you must.',
      email: '1156743527@qq.com',
      link: 'https://www.recoluan.com'
    }, {
      title: 'vuepress-theme-reco',
      desc: 'A simple and beautiful vuepress Blog & Doc theme.',
      avatar: 'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
      link: 'https://vuepress-theme-reco.recoluan.com'
    }, 
    {
      title: '卡拉云低代码工具',
      desc: '卡拉云是一个用来开发后台系统的平台，它可以帮助你快速开发在公司内部使用的后台系统。',
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDE4QzAgOC4wNzMyMyA4LjA3MzIzIDAgMTggMEMyNy45MjY4IDAgMzYgOC4wNzMyMyAzNiAxOEMzNiAyNC40NjY4IDMyLjU0IDMwLjE1MSAyNy4zNTAxIDMzLjQwNUwyMi41MzA5IDIyLjk4NEwyNC40MjU2IDIyLjY1NDVDMjcuOTI2OCAyMi4wNzc4IDMwLjYwNDEgMTkuMTk0NSAzMC45MzM2IDE1LjY1MjJMMzEuMjYzMiAxMi4xNTFDMzEuMjYzMiAxMS43MzkxIDMxLjA5ODQgMTEuNDA5NiAzMC44NTEzIDExLjEyMTNDMzAuNjA0MSAxMC44MzMgMzAuMTkyMiAxMC43MDk0IDI5LjgyMTUgMTAuNzkxOEwxNi42ODE5IDEzLjA1NzJMMTIuMDI3NSA3LjI0OTQzQzExLjY5NzkgNi44Mzc1MyAxMS4yMDM3IDYuNjcyNzcgMTAuNzA5NCA2LjgzNzUzQzEwLjI1NjMgNy4wMDIyOSA5Ljg4NTU4IDcuNDE0MTkgOS44NDQzOSA3LjkwODQ3TDcuNDU1MzggMzIuNTgxMkMyLjkyNDQ5IDI5LjMyNzIgMCAyNC4wMTM3IDAgMThaTTE5LjY4ODggMjEuMzc3N0MxOS40ODI5IDIxLjc0ODQgMTkuNDgyOSAyMi4xNjAzIDE5LjY0NzYgMjIuNDg5OEwyNS4yNDk1IDM0LjQzNDlDMjMuMDI1MiAzNS40MjM1IDIwLjU5NSAzNS45NTg5IDE4LjA0MTIgMzUuOTU4OUMxNS4wNzU1IDM1Ljk1ODkgMTIuMjc0NiAzNS4yNTg3IDkuODAzMjIgMzMuOTgxOEM5Ljg0NDQxIDMzLjg5OTQgOS44ODU2IDMzLjgxNzEgOS44ODU2IDMzLjY5MzVMMTIuMDY4NyAxMS4xNjI2TDE1LjI4MTUgMTUuMTU4QzE1LjUyODYgMTUuNTI4NyAxNS45ODE3IDE1LjY5MzUgMTYuNDM0OCAxNS42MTExTDI1LjkwODUgMTMuOTYzNUMyNS45MDg1IDE0LjAwNDcgMjUuOTE4OCAxNC4wMzU2IDI1LjkyOTEgMTQuMDY2NUMyNS45Mzk0IDE0LjA5NzQgMjUuOTQ5NyAxNC4xMjgzIDI1Ljk0OTcgMTQuMTY5NUMyNi4yMzggMTUuMTU4IDI3LjQ3MzcgMTUuNTY5OSAyOC41MDM1IDE1LjY5MzVDMjguMTMyNyAxNy45NTg5IDI2LjM2MTYgMTkuNzcxMyAyNC4wOTYxIDIwLjE0MkwyMC41OTUgMjAuNzE4N0MyMC4xODMxIDIwLjgwMSAxOS44NTM2IDIxLjA0ODIgMTkuNjg4OCAyMS4zNzc3Wk0xMy41OTI3IDE4LjI0NzNDMTMuNjMzOSAxOC45MDYzIDE0LjIxMDUgMTkuNDQxOCAxNC44Njk2IDE5LjQwMDZDMTUuNTY5OCAxOS40MDA2IDE2LjA2NDEgMTguODIzOSAxNi4wMjI5IDE4LjEyMzdDMTUuOTgxNyAxNy40NjQ3IDE1LjQwNTEgMTYuOTI5MiAxNC43NDYgMTYuOTcwNEMxNC4wODcgMTcuMDExNiAxMy41NTE1IDE3LjU4ODIgMTMuNTkyNyAxOC4yNDczWiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4K',
      link: 'https://kalacloud.com'
    }],
    logo: '/logo.png',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated',
    author: 'Rain',
    authorAvatar: '/avatar.png',
    record: '鲁ICP备19004912号',
    recordLink: 'http://beian.miit.gov.cn/',
    startYear: '2018',
    subSidebar: 'auto',
    valineConfig: {
      appId: process.env.COMMENT_APPID,
      appKey: process.env.COMMENT_SECRET,
    },
    markdown: {
      lineNumbers: true
    },
    plugins: {
      "@vuepress-reco/vuepress-plugin-kan-ban-niang": {
        theme: ['haruto', 'miku', 'blackCat', 'whiteCat', 'haru1', 'haru2', 'koharu', 'izumi', 'shizuku', 'wanko', 'z16', ],
        width: 150,
        height: 220
      },
      "@vuepress/google-analytics": {
        ga: 'UA-134751179-1'
      },
      "dynamic-title": {
        showIcon: '/favicon.ico',
        showText: '(/≧▽≦/)咦！又好了！',
        hideIcon: '/favicon.ico',
        hideText: '(●—●)喔哟，崩溃啦！',
        recoverTime: 2000
      },
      "vuepress-plugin-boxx": {},
      "sitemap": {
        hostname: 'https://blog.abplan.top'
      },
      "@vuepress-reco/vuepress-plugin-rss": {
        site_url: 'https://blog.abplan.top'
      }
    }
  }
}