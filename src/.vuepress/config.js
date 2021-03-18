module.exports = {
  title: "Rain的心情杂货铺",
  description: "认真吃饭，认真学习，在不经意间惊艳所有人！",
  dest: "public",
  head: [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  theme: "reco",
  themeConfig: {
    nav: [
      {
        "text": "首页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "归档",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "联系我们",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/FearwareX",
            "icon": "reco-github"
          }
        ]
      }
    ],
    type: "blog",
    blogConfig: {
      category: {
        location: 2,
        text: "分类"
      },
      tag: {
        location: 3,
        text: "标签"
      }
    },
    friendLink: [
      {
        title: "团队领袖培养计划",
        desc: "对于工作上应该做什么事，如果你没有自己的想法，而是完全听主管的，很危险。多数的主管不会在乎你的成长，也不会把公司的利益摆第一位，他们最在乎的是自己的工作绩效，而他们的工作绩效是要靠你们去达成的。完全听他们的任务布置去做，没有自己的主张，东一榔头，西一棒槌，几年下来就变打杂的了。 ——蔡学镛",
        email: "willin@willin.org",
        link: "https://leader.js.cool/"
      },
      {
        title: "午后南杂",
        desc: "Enjoy when you can, and endure when you must.",
        email: "1156743527@qq.com",
        link: "https://www.recoluan.com"
      },
      {
        title: "vuepress-theme-reco",
        desc: "A simple and beautiful vuepress Blog & Doc theme.",
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "Rain",
    authorAvatar: "/avatar.png",
    record: "鲁ICP备19004912号",
    recordLink: "http://beian.miit.gov.cn/",
    startYear: "2018",
    subSidebar: 'auto',
    vssueConfig: {
      platform: 'github',
      owner: 'FearwareX',
      repo: 'xiaoshiguang123.github.io',
      clientId: 'd99286a9bd5285b3af02',
      clientSecret: '475885ce5b8b079ed089f5b5b74426d2870ca71a',
    }
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        "theme": [
          "haruto",
          "miku",
          "blackCat",
          "whiteCat",
          "haru1",
          "haru2",         
          "koharu",
          "izumi",
          "shizuku",
          "wanko",
          "z16"
        ],
        "width": 150,
        "height": 220
      }
    ],
    [
      "@vuepress/google-analytics",
      {
        "ga": "UA-134751179-1"
      }
    ],
    ["dynamic-title",
      {
        "showIcon": "/favicon.ico",
        "showText": "(/≧▽≦/)咦！又好了！",
        "hideIcon": "/favicon.ico",
        "hideText": "(●—●)喔哟，崩溃啦！",
        "recoverTime": 2000
      }
    ],
    [
      "vuepress-plugin-boxx",{}
    ],
    ["sitemap",
      {
        hostname:'https://blog.abplan.top'
      }
    ]
  ]
}