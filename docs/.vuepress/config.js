module.exports = {
  title: "惬意的小时光",
  description: "时光和你都很美",
  dest: "public",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  theme: "reco",
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/",
        icon: "reco-home"
      },
      {
        text: "归档",
        link: "/timeline/",
        icon: "reco-date"
      },
      {
        text: "联系我们",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/xiaoshiguang123",
            icon: "reco-github"
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
        title: "午后南杂",
        desc: "Enjoy when you can, and endure when you must.",
        email: "1156743527@qq.com",
        link: "https://www.recoluan.com"
      },
      {
        title: "vuepress-theme-reco",
        desc: "A simple and beautiful vuepress Blog & Doc theme.",
        avatar:
          "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    sidebar: "auto",
    lastUpdated: "Last Updated",
    author: "惬意的小时光",
    authorAvatar: "/avatar.png",
    record: "鲁ICP备19004912号",
    recordLink: "http://beian.miit.gov.cn/",
    startYear: "2019"
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    "seo",
    {
      siteTitle: (_, $site) => $site.title,
      title: $page => $page.title,
      description: $page => $page.frontmatter.description,
      author: (_, $site) => $site.themeConfig.author,
      tags: $page => $page.frontmatter.tags,
      twitterCard: _ => "summary_large_image",
      type: $page =>
        ["articles", "posts", "blog"].some(folder =>
          $page.regularPath.startsWith("/" + folder)
        )
          ? "article"
          : "website",
      url: (_, $site, path) => ($site.themeConfig.domain || "") + path,
      image: ($page, $site) =>
        $page.frontmatter.image &&
        ($site.themeConfig.domain || "") + $page.frontmatter.image,
      publishedAt: $page =>
        $page.frontmatter.date && new Date($page.frontmatter.date),
      modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated)
    },
    "robots",
    {
      /**
       * @host
       * Mandatory, You have to provide the host URL
       */

      host: "https://abplan.top",
      /**
       * @disallowAll
       * Optional: if it's true, all others options are ignored and exclude all robots from the entire server
       */
      disallowAll: false,
      /**
       * @allowAll
       * Optional: if it's true and @disallowAll is false, all others options are ignored and allow all robots complete access
       */
      allowAll: true,
      /**
       * @sitemap
       * Optional, by default: sitemap.xml
       */

      sitemap: "/sitemap.xml",
      /**
       * @policies
       * Optional, by default: null
       */

      policies: [
        {
          userAgent: "*",
          disallow: ["/admin", "/login"],
          allow: [
            // Optional: Allowed paths.
            "products",
            "blog",
            "view"
          ]
        }
      ]
    },
    "sitemap",
    {
      hostname: "https://abplan.top"
    },
    "@vuepress-reco/vuepress-plugin-kan-ban-niang",
    {
      theme: [
        "blackCat",
        "whiteCat",
        "haru1",
        "haru2",
        "haruto",
        "koharu",
        "izumi",
        "shizuku",
        "wanko",
        "miku",
        "z16"
      ],
      width: 150,
      height: 220
    },
    "@vuepress/google-analytics",
    {
      ga: "UA-134751179-1" // UA-00000000-0
    },
    "dynamic-title",
    {
      showIcon: "/favicon.ico",
      showText: "(/≧▽≦/)咦！又好了！",
      hideIcon: "/favicon.ico",
      hideText: "(●—●)喔哟，崩溃啦！",
      recoverTime: 2000
    }
  ]
};