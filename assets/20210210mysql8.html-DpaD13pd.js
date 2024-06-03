import{_ as s,o as n,c as a,b as e}from"./app-B6NiJo-f.js";const l={},i=e(`<h2 id="卸载" tabindex="-1"><a class="header-anchor" href="#卸载"><span>卸载</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment"># 运行卸载</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> remove mysql-common mysql-server-8.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在终端中查看MySQL的依赖项</span></span>
<span class="line">dpkg --list<span class="token operator">|</span><span class="token function">grep</span> mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 卸载相关依赖项</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> autoremove <span class="token parameter variable">--purge</span> mysql-server-8.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清除残留数据</span></span>
<span class="line">dpkg -l<span class="token operator">|</span><span class="token function">grep</span> ^rc<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print$2}&#39;</span><span class="token operator">|</span><span class="token function">sudo</span> <span class="token function">xargs</span> dpkg <span class="token parameter variable">-P</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 再次查看MySQL的剩余依赖项，如有，则继续卸载</span></span>
<span class="line">dpkg --list<span class="token operator">|</span><span class="token function">grep</span> mysql</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重新安装并修改默认密码" tabindex="-1"><a class="header-anchor" href="#重新安装并修改默认密码"><span>重新安装并修改默认密码</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment"># 更新源并安装mysql8.0</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> mysql-server</span>
<span class="line"></span>
<span class="line"><span class="token comment">#安装成功后停止服务</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">service</span> mysql stop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动服务</span></span>
<span class="line">mysqld_safe <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql --skip-grant-tables --skip-networking <span class="token operator">&amp;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用root登录</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> root mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 为了解决 The MySQL server is running with the --skip-grant-tables option so it cannot execute this statement 这个错误 先刷新一下权限表</span></span>
<span class="line">flush privileges<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改root用户密码</span></span>
<span class="line">ALTER <span class="token environment constant">USER</span> <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;localhost&#39;</span> IDENTIFIED WITH mysql_native_password BY <span class="token string">&#39;123456&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改绑定IP，方便Navicat连接</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">vim</span> /etc/mysql/mysql.conf.d/mysqld.cnf</span>
<span class="line">修改 bind-address <span class="token operator">=</span> <span class="token number">0.0</span>.0.0</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),p=[i];function c(t,o){return n(),a("div",null,p)}const d=s(l,[["render",c],["__file","20210210mysql8.html.vue"]]),m=JSON.parse('{"path":"/blogs/technology/20210210mysql8.html","title":"Ubuntu20.04彻底卸载并重装MySQL 8.0数据库","lang":"en-US","frontmatter":{"title":"Ubuntu20.04彻底卸载并重装MySQL 8.0数据库","author":"Rain","tags":["Linux","MySQL"],"categories":["technology"],"date":"2021-02-10 14:20"},"headers":[{"level":2,"title":"卸载","slug":"卸载","link":"#卸载","children":[]},{"level":2,"title":"重新安装并修改默认密码","slug":"重新安装并修改默认密码","link":"#重新安装并修改默认密码","children":[]}],"git":{"createdTime":1717432393000,"updatedTime":1717432393000,"contributors":[{"name":"Rain","email":"smalltime153@gmail.com","commits":1}]},"filePathRelative":"blogs/technology/20210210mysql8.md"}');export{d as comp,m as data};
