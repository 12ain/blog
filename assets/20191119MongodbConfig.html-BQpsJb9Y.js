import{_ as o,r as n,o as a,c as t,a as s,b as i}from"./app-B6NiJo-f.js";const c={},l=i(`<p>在Centos上安装完mongodb后用软件连接是连不上的,原因是安全配置的问题，因为mongodb默认是没有设置密码的。 所以如果需要允许外网访问就需要修改一下配置:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">将bindIp：127.0.0.1 修改为 <span class="token number">0.0</span>.0.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>除此之外，如果还是无法连接,还需要将防火墙及安全组配置放行27017端口</p><p>另外,最新版的Navicat已经支持了MongoDB的连接,强烈推荐一波。</p>`,4);function d(r,m){const e=n("Boxx");return a(),t("div",null,[s(e),l])}const p=o(c,[["render",d],["__file","20191119MongodbConfig.html.vue"]]),b=JSON.parse('{"path":"/blogs/technology/20191119MongodbConfig.html","title":"Centos mongodb 允许外网访问","lang":"en-US","frontmatter":{"title":"Centos mongodb 允许外网访问","author":"Rain","tags":["CentOS","Linux"],"categories":["technology"],"date":"2019-11-19 09:25"},"headers":[],"git":{"createdTime":1717432393000,"updatedTime":1717432393000,"contributors":[{"name":"Rain","email":"smalltime153@gmail.com","commits":1}]},"filePathRelative":"blogs/technology/20191119MongodbConfig.md"}');export{p as comp,b as data};