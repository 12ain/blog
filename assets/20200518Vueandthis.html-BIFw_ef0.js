import{_ as n,r as a,o as e,c as i,a as l,b as c}from"./app-B6NiJo-f.js";const d={},r=c(`<h2 id="问题产生" tabindex="-1"><a class="header-anchor" href="#问题产生"><span>问题产生</span></a></h2><p>在methods中定义方法时，使用到了箭头函数，导致了this指向全局window对象而不是Vue实例。</p><h3 id="问题代码" tabindex="-1"><a class="header-anchor" href="#问题代码"><span>问题代码</span></a></h3><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript" data-title="JavaScript"><pre class="language-JavaScript"><code><span class="line">get: () =&gt; {</span>
<span class="line">  axios</span>
<span class="line">    .get(&#39;../package.json&#39;, {</span>
<span class="line">      params: {</span>
<span class="line">        userId: &#39;999&#39;,</span>
<span class="line">      },</span>
<span class="line">      headers: {</span>
<span class="line">        token: &#39;jack&#39;,</span>
<span class="line">      },</span>
<span class="line">      before: () =&gt; {</span>
<span class="line">        console.log(&#39;before init.&#39;);</span>
<span class="line">      },</span>
<span class="line">    })</span>
<span class="line">    .then((res) =&gt; {</span>
<span class="line">      console.log(res.data);</span>
<span class="line">      this.msg = res.data.name;</span>
<span class="line">    })</span>
<span class="line">    .catch((error) =&gt; {</span>
<span class="line">      console.log(&#39;error init&#39;);</span>
<span class="line">    });</span>
<span class="line">},</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决后代码" tabindex="-1"><a class="header-anchor" href="#解决后代码"><span>解决后代码:</span></a></h3><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript" data-title="JavaScript"><pre class="language-JavaScript"><code><span class="line">get() {</span>
<span class="line">  axios</span>
<span class="line">    .get(&#39;../package.json&#39;, {</span>
<span class="line">      params: {</span>
<span class="line">        userId: &#39;999&#39;,</span>
<span class="line">      },</span>
<span class="line">      headers: {</span>
<span class="line">        token: &#39;jack&#39;,</span>
<span class="line">      },</span>
<span class="line">      before: () =&gt; {</span>
<span class="line">        console.log(&#39;before init.&#39;);</span>
<span class="line">      },</span>
<span class="line">    })</span>
<span class="line">    .then((res) =&gt; {</span>
<span class="line">      console.log(res.data);</span>
<span class="line">      this.msg = res.data.name;</span>
<span class="line">    })</span>
<span class="line">    .catch((error) =&gt; {</span>
<span class="line">      console.log(&#39;error init&#39;);</span>
<span class="line">    });</span>
<span class="line">},</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="问题原因" tabindex="-1"><a class="header-anchor" href="#问题原因"><span>问题原因</span></a></h2><p>ES6中的 箭头函数 “=&gt;” 内部的this是词法作用域，由上下文确定（也就是由外层调用者Vue来确定）。</p>`,8);function p(t,v){const s=a("Boxx");return e(),i("div",null,[l(s),r])}const m=n(d,[["render",p],["__file","20200518Vueandthis.html.vue"]]),u=JSON.parse('{"path":"/blogs/web/20200518Vueandthis.html","title":"Vue中的this指向问题","lang":"en-US","frontmatter":{"title":"Vue中的this指向问题","author":"Rain","date":"2020-05-18 12:20","categories":["web"],"tags":["Vue","ES6"],"keys":["e10adc3949ba59abbe56e057f20f883e"]},"headers":[{"level":2,"title":"问题产生","slug":"问题产生","link":"#问题产生","children":[{"level":3,"title":"问题代码","slug":"问题代码","link":"#问题代码","children":[]},{"level":3,"title":"解决后代码:","slug":"解决后代码","link":"#解决后代码","children":[]}]},{"level":2,"title":"问题原因","slug":"问题原因","link":"#问题原因","children":[]}],"git":{"createdTime":1717432393000,"updatedTime":1717432393000,"contributors":[{"name":"Rain","email":"smalltime153@gmail.com","commits":1}]},"filePathRelative":"blogs/web/20200518Vueandthis.md"}');export{m as comp,u as data};
