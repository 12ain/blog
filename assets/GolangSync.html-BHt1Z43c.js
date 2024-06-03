import{_ as n,o as s,c as a,b as p}from"./app-B6NiJo-f.js";const l={},e=p(`<p>Go中可以使用一个<code>go</code>关键字让程序异步执行</p><p>一个比较常见的场景：逐个异步调用多个函数，或者循环中异步调用</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token function">do1</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token function">do2</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token function">do3</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 或者</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token function">do</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果了解Go并发机制，就知道<code>main</code>在其他goroutine运行完成之前就已经结束了，所以上面代码的运行结果是不符合预期的。我们需要使用一种叫做并发控制的手段，来保证程序正确运行</p><p>举个例子：</p><p>已知有一个现成的函数<code>search</code>，能够按照关键词执行搜索</p><p>期望实现一个新的函数<code>coSearch</code>能够进行批量</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;context&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;errors&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;sync&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">search</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> word <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> word <span class="token operator">==</span> <span class="token string">&quot;Go&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;error: Go&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 模拟结果</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;result: %s&quot;</span><span class="token punctuation">,</span> word<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span> <span class="token comment">// 模拟结果</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">coSearch</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> words <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>results <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//tbd</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">words <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;Go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Rust&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PHP&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;JavaScript&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">results<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">coSearch</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> words<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>results<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="并发控制基础" tabindex="-1"><a class="header-anchor" href="#并发控制基础"><span><strong>并发控制基础</strong></span></a></h2><p><code>sync.WaitGroup</code>是Go标准库中用来控制并发的结构，这里放一个使用<code>WaitGroup</code>实现<code>coSearch</code>的示例</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;context&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;errors&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;sync&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">search</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> word <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> word <span class="token operator">==</span> <span class="token string">&quot;Go&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;error: Go&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 模拟结果</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;result: %s&quot;</span><span class="token punctuation">,</span> word<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span> <span class="token comment">// 模拟结果</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">coSearch</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> words <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> <span class="token punctuation">(</span></span>
<span class="line"></span>
<span class="line">wg <span class="token operator">=</span> sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">once <span class="token operator">=</span> sync<span class="token punctuation">.</span>Once<span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">results <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>words<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">err <span class="token builtin">error</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> word <span class="token operator">:=</span> <span class="token keyword">range</span> words <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>word <span class="token builtin">string</span><span class="token punctuation">,</span> i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">result<span class="token punctuation">,</span> e <span class="token operator">:=</span> <span class="token function">search</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> word<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> e <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">err <span class="token operator">=</span> e</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">results<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> result</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> results<span class="token punctuation">,</span> err</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">words <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;Go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Rust&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PHP&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;JavaScript&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">results<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">coSearch</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> words<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>results<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中有非常多的细节，来逐个聊一聊</p><h3 id="sync-waitgroup-并发控制" tabindex="-1"><a class="header-anchor" href="#sync-waitgroup-并发控制"><span><code>sync.WaitGroup{}</code>并发控制</span></a></h3><p><code>sync.WaitGroup{}</code>的用法非常简洁</p><ul><li><p>当新运行一个goroutine时，我们需要调用<code>wg.Add(1)</code></p></li><li><p>当一个goroutine运行完成的时候，我们需要调用<code>wg.Done()</code></p></li><li><p><code>wg.Wait()</code>让程序阻塞在此处，直到所有的goroutine运行完毕。</p></li></ul><p>对于<code>coSearch</code>来说，等待所有goroutine运行完成，也就完成了函数的任务，返回最终的结果</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">var</span> <span class="token punctuation">(</span></span>
<span class="line"></span>
<span class="line">wg <span class="token operator">=</span> sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//...省略其他代码</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> word <span class="token operator">:=</span> <span class="token keyword">range</span> words <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>word <span class="token builtin">string</span><span class="token punctuation">,</span> i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//...省略其他代码</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="for循环中的goroutine" tabindex="-1"><a class="header-anchor" href="#for循环中的goroutine"><span><code>for</code>循环中的goroutine</span></a></h3><p>这是一个Go经典错误，如果goroutine中使用了<code>for</code>迭代的变量，所有goroutine都会获得最后一次循环的值。例如下面的示例，并不会输出&quot;a&quot;, &quot;b&quot;, &quot;c&quot; 而是输出 &quot;c&quot;, &quot;c&quot;, &quot;c&quot;</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">done <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">values <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> values <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">done <span class="token operator">&lt;-</span> <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">// wait for all goroutines to complete before exiting</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> <span class="token boolean">_</span> <span class="token operator">=</span> <span class="token keyword">range</span> values <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token operator">&lt;-</span>done</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正确的做法就是像上文示例一样，将迭代的变量赋值给函数参数，或者赋值给新的变量</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> word <span class="token operator">:=</span> <span class="token keyword">range</span> words <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// ...</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>word <span class="token builtin">string</span><span class="token punctuation">,</span> i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// fmt.Println(word, i)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> word <span class="token operator">:=</span> <span class="token keyword">range</span> words <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">i<span class="token punctuation">,</span> word <span class="token operator">:=</span> i<span class="token punctuation">,</span> word</span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// fmt.Println(word, i)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>由于这个错误实在太常见，从Go 1.22开始Go已经修正了这个经典的错误：Fixing For Loops in Go 1.22。 不过Go 1.22默认不会开启修正，需要设置环境变量<code>GOEXPERIMENT=loopvar</code>才会 开启</p></blockquote><h3 id="并发安全" tabindex="-1"><a class="header-anchor" href="#并发安全"><span>并发安全</span></a></h3><p>简单理解：当多个goroutine对同一个内存区域进行读写时，就会产生并发安全的问题，它会导致程序运行的结果不符合预期</p><p>上面的示例把最终的结果放入了<code>results = make([]string, len(words))</code>中。虽然我们在goroutine中并发的对于<code>results</code>变量进行写入，但因为每一个goroutine都写在了独立的位置，且没有任何读取的操作，因此<code>results[i] = result</code>是并发安全的</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line"></span>
<span class="line">results = [ xxxxxxxx, xxxxxxxx, xxxxxxxx, .... ]</span>
<span class="line"></span>
<span class="line">^ ^ ^</span>
<span class="line"></span>
<span class="line">| | |</span>
<span class="line"></span>
<span class="line">goroutine1 goroutine2 goroutine3</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这也意味着如果使用<code>results = append(results, result)</code>的方式并发赋值，因为会涉及到slice的扩容等操作，所以并不是并发安全的，需要利用<code>sync.Mutex{}</code>进行加锁</p><p>如果想尽可能的提高程序的并发性能，推荐使用 <code>results[i] = result</code>这种方式赋值</p><h3 id="sync-once-单次赋值" tabindex="-1"><a class="header-anchor" href="#sync-once-单次赋值"><span><code>sync.Once{}</code>单次赋值</span></a></h3><p>示例<code>coSearch</code>中，会返回第一个出错的<code>search</code>的<code>error</code>。<code>err</code>是一个全局变量，在并发goroutine中赋值是并发不安全的操作</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token comment">//...省略其他代码</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>word <span class="token builtin">string</span><span class="token punctuation">,</span> i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">result<span class="token punctuation">,</span> e <span class="token operator">:=</span> <span class="token function">search</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> word<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> e <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">err <span class="token operator">=</span> e</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">results<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> result</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//...省略其他代码</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于全局变量的赋值比较常规做法就是利用<code>sync.Mutex{}</code>进行加锁。但示例的逻辑为单次赋值，我们刚好可以利用同在<code>sync</code>库的<code>sync.Once{}</code>来简化代码</p><p><code>sync.Once{}</code>功能如其名，将我们要执行的逻辑放到它的<code>Do()</code>方法中，无论多少并发都只会执行一次</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token comment">//...省略其他代码</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>word <span class="token builtin">string</span><span class="token punctuation">,</span> i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">result<span class="token punctuation">,</span> e <span class="token operator">:=</span> <span class="token function">search</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> word<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> e <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">err <span class="token operator">=</span> e</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">results<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> result</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//...省略其他代码</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="goroutine数量控制" tabindex="-1"><a class="header-anchor" href="#goroutine数量控制"><span>goroutine数量控制</span></a></h3><p><code>coSearch</code>入参的数组可能非常大，如果不加以控制可能导致我们的服务器资源耗尽，我们需要控制并发的数量</p><p>利用带缓冲channel可以实现</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line">tokens <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> word <span class="token operator">:=</span> <span class="token keyword">range</span> words <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">tokens <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 新增</span></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>word <span class="token builtin">string</span><span class="token punctuation">,</span> i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token operator">&lt;-</span>tokens <span class="token comment">// 新增</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">result<span class="token punctuation">,</span> e <span class="token operator">:=</span> <span class="token function">search</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> word<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> e <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">err <span class="token operator">=</span> e</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">results<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> result</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上，代码中创建了10个缓冲区的channel，当channel被填满时，继续写入会被阻塞；当goroutine运行完成之后，除了原有的<code>wg.Done()</code>，我们需要从channel读取走一个数据，来允许新的goroutine运行</p><p>通过这种方式，我们控制了<code>coSearch</code>最多只能运行10个goroutine，当超过10个时需要等待前面运行的goroutine结束</p><h3 id="context-context" tabindex="-1"><a class="header-anchor" href="#context-context"><span>context.Context</span></a></h3><p>并发执行的goroutine只要有一个出错，其他goroutine就可以停止，没有必要继续执行下去了。如何把取消的事件传导到其他goroutine呢？<code>context.Context</code>就是用来传递类似上下文信息的结构</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line">ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancelCause</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span> <span class="token comment">// 新增</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">defer</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span> <span class="token comment">// 新增</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> word <span class="token operator">:=</span> <span class="token keyword">range</span> words <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">tokens <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>word <span class="token builtin">string</span><span class="token punctuation">,</span> i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token operator">&lt;-</span>tokens</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">result<span class="token punctuation">,</span> e <span class="token operator">:=</span> <span class="token function">search</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> word<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> e <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">err <span class="token operator">=</span> e</span>
<span class="line"></span>
<span class="line"><span class="token function">cancel</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token comment">// 新增</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">results<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> result</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="完整的代码" tabindex="-1"><a class="header-anchor" href="#完整的代码"><span><strong>完整的代码</strong></span></a></h2><p>最终完成的效果如下</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;context&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;errors&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;sync&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">search</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> word <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> word <span class="token operator">==</span> <span class="token string">&quot;Go&quot;</span> <span class="token operator">||</span> word <span class="token operator">==</span> <span class="token string">&quot;Java&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;Go or Java&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;result: %s&quot;</span><span class="token punctuation">,</span> word<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span> <span class="token comment">// 模拟结果</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">coSearch</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> words <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancelCause</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">defer</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> <span class="token punctuation">(</span></span>
<span class="line"></span>
<span class="line">wg <span class="token operator">=</span> sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">once <span class="token operator">=</span> sync<span class="token punctuation">.</span>Once<span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">results <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>words<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">tokens <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">err <span class="token builtin">error</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> word <span class="token operator">:=</span> <span class="token keyword">range</span> words <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">tokens <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>word <span class="token builtin">string</span><span class="token punctuation">,</span> i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token operator">&lt;-</span>tokens</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">result<span class="token punctuation">,</span> e <span class="token operator">:=</span> <span class="token function">search</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> word<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> e <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">err <span class="token operator">=</span> e</span>
<span class="line"></span>
<span class="line"><span class="token function">cancel</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">results<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> result</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> results<span class="token punctuation">,</span> err</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="并发控制库errgroup" tabindex="-1"><a class="header-anchor" href="#并发控制库errgroup"><span><strong>并发控制库errgroup</strong></span></a></h2><p>可以看到要实现一个较为完备的并发控制，需要做的工作非常多。不过Go官方团队为大家准备了 golang.org/x/sync/errgroup</p><p><code>errgroup</code>提供的能力和上文的示例类似，实现方式也类似，包含并发控制，错误传递，<code>context.Context</code>传递等</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;context&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;sync&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token string">&quot;golang.org/x/sync/errgroup&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">coSearch</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> words <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">g<span class="token punctuation">,</span> ctx <span class="token operator">:=</span> errgroup<span class="token punctuation">.</span><span class="token function">WithContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">g<span class="token punctuation">.</span><span class="token function">SetLimit</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">results <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>words<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> word <span class="token operator">:=</span> <span class="token keyword">range</span> words <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">i<span class="token punctuation">,</span> word <span class="token operator">:=</span> i<span class="token punctuation">,</span> word</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">g<span class="token punctuation">.</span><span class="token function">Go</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">result<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">search</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> word<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> err</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">results<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> result</span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> <span class="token boolean">nil</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">err <span class="token operator">:=</span> g<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> results<span class="token punctuation">,</span> err</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>errgroup</code>的用法也很简单</p><ul><li><p>使用<code>g, ctx := errgroup.WithContext(ctx)</code>来创建goroutine的管理器</p></li><li><p><code>g.SetLimit()</code>可以设置允许的最大的goroutine数量</p></li><li><p>类似于<code>go</code>关键词，<code>g.Go</code>异步执行函数</p></li><li><p><code>g.Wait()</code>和<code>sync.WaitGroup{}</code>的<code>wg.Wait()</code>类似，会阻塞直到所有goroutine都运行完成，并返回其中一个goroutine的错误</p></li></ul>`,53),i=[e];function c(t,o){return s(),a("div",null,i)}const d=n(l,[["render",c],["__file","GolangSync.html.vue"]]),r=JSON.parse('{"path":"/blogs/backend/GolangSync.html","title":"Golang并发控制","lang":"en-US","frontmatter":{"title":"Golang并发控制","author":"Rain","tags":["Golang"],"categories":["backend"],"date":"2024-02-05T23:34:42.000Z"},"headers":[{"level":2,"title":"并发控制基础","slug":"并发控制基础","link":"#并发控制基础","children":[{"level":3,"title":"sync.WaitGroup{}并发控制","slug":"sync-waitgroup-并发控制","link":"#sync-waitgroup-并发控制","children":[]},{"level":3,"title":"for循环中的goroutine","slug":"for循环中的goroutine","link":"#for循环中的goroutine","children":[]},{"level":3,"title":"并发安全","slug":"并发安全","link":"#并发安全","children":[]},{"level":3,"title":"sync.Once{}单次赋值","slug":"sync-once-单次赋值","link":"#sync-once-单次赋值","children":[]},{"level":3,"title":"goroutine数量控制","slug":"goroutine数量控制","link":"#goroutine数量控制","children":[]},{"level":3,"title":"context.Context","slug":"context-context","link":"#context-context","children":[]}]},{"level":2,"title":"完整的代码","slug":"完整的代码","link":"#完整的代码","children":[]},{"level":2,"title":"并发控制库errgroup","slug":"并发控制库errgroup","link":"#并发控制库errgroup","children":[]}],"git":{"createdTime":1717432393000,"updatedTime":1717432393000,"contributors":[{"name":"Rain","email":"smalltime153@gmail.com","commits":1}]},"filePathRelative":"blogs/backend/GolangSync.md"}');export{d as comp,r as data};
