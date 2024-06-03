import{_ as n,o as s,c as a,b as e}from"./app-B6NiJo-f.js";const p={},l=e(`<p>在Go中，批量执行任务的通用模板包括以下步骤：</p><p>首先，有一个需求：接口调用时，接收到一个包含十个元素的列表。希望并发执行这十个任务，每个任务都会返回执行的结果和可能的异常。最后，要将返回的结果整合到一个切片列表中，然后一并返回。</p><p>为了实现这个需求，首先定义一个结构体 <code>Order</code> 用于表示任务的信息：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">type</span> Order <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">Name <span class="token builtin">string</span> <span class="token string">\`json:&quot;name&quot;\`</span></span>
<span class="line"></span>
<span class="line">Id <span class="token builtin">int</span> <span class="token string">\`json:&quot;id&quot;\`</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，决定并发执行十个任务，因此初始化了两个通道，一个用于接收任务的结果，另一个用于接收异常：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line">taskNum <span class="token operator">:=</span> <span class="token number">10</span></span>
<span class="line"></span>
<span class="line">orderCh <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> Order<span class="token punctuation">,</span> taskNum<span class="token punctuation">)</span> <span class="token comment">// 用于接收返回的结果</span></span>
<span class="line"></span>
<span class="line">errCh <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">error</span><span class="token punctuation">,</span> taskNum<span class="token punctuation">)</span> <span class="token comment">// 用于接收返回的异常</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，创建任务执行函数：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">processTask</span><span class="token punctuation">(</span>task Task<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 执行任务的逻辑</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，启动十个协程来执行这些任务，并使用 <code>sync.WaitGroup</code> 来等待它们完成：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> taskNum<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 任务的执行逻辑</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 等待所有任务协程完成</span></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着，使用 <code>for-select</code> 结构从结果通道中接收执行结果：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line">orderList <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Order<span class="token punctuation">,</span> taskNum<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> taskNum<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">case</span> order<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>orderCh<span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> ok <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">orderList <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>orderList<span class="token punctuation">,</span> order<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">case</span> err <span class="token operator">:=</span> <span class="token operator">&lt;-</span>errCh<span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> err <span class="token comment">// 在发现错误时，根据需求选择是继续执行还是返回错误</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line">fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;done&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，关闭通道，表示不再发送任务：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token function">close</span><span class="token punctuation">(</span>orderCh<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token function">close</span><span class="token punctuation">(</span>errCh<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要控制每个任务的执行时间，可以使用定时器来解决超时问题：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line">timeoutTime <span class="token operator">:=</span> time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">3</span> <span class="token comment">// 超时时间</span></span>
<span class="line"></span>
<span class="line">taskTimer <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">NewTimer</span><span class="token punctuation">(</span>timeoutTime<span class="token punctuation">)</span> <span class="token comment">// 初始化定时器</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> taskNum<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">case</span> <span class="token operator">&lt;-</span>taskTimer<span class="token punctuation">.</span>C<span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line">err <span class="token operator">:=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;task timeout&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span> err</span>
<span class="line"></span>
<span class="line"><span class="token comment">// 其他 case 分支处理任务的执行和结果接收</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 每次执行都需要重置定时器</span></span>
<span class="line"></span>
<span class="line">taskTimer<span class="token punctuation">.</span><span class="token function">Reset</span><span class="token punctuation">(</span>timeoutTime<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在协程内处理 panic 问题是很重要的，在协程内使用 <code>defer</code> 来捕获 panic：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> taskNum<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> r <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> r <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">err <span class="token operator">:=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;System panic: %v&quot;</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">errCh <span class="token operator">&lt;-</span> err</span>
<span class="line"></span>
<span class="line"><span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 任务的执行逻辑</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，如果需要保持任务执行结果的顺序，可以定义一个带序号的结构体，并通过带序号的通道接收结果：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">type</span> OrderWithSeq <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">Seq <span class="token builtin">int</span></span>
<span class="line"></span>
<span class="line">OrderItem Order</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">orderCh <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> OrderWithSeq<span class="token punctuation">,</span> taskNum<span class="token punctuation">)</span> <span class="token comment">// 用于接收带序号的结构体</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在任务执行时，加入序号信息：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line"><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> taskNum<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">i <span class="token operator">:=</span> i</span>
<span class="line"></span>
<span class="line">wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 任务的执行逻辑</span></span>
<span class="line"></span>
<span class="line">orderCh <span class="token operator">&lt;-</span> OrderWithSeq<span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">Seq<span class="token punctuation">:</span> i<span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">OrderItem<span class="token punctuation">:</span> res<span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，在结果接收时，按照带序号的结构体进行排序：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="line"></span>
<span class="line">orderSeqList <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>OrderWithSeq<span class="token punctuation">,</span> taskNum<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> taskNum<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">case</span> order<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>orderCh<span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> ok <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">orderList <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>orderSeqList<span class="token punctuation">,</span> order<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 其他 case 分支处理异常等</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  </span>
<span class="line"></span>
<span class="line"><span class="token comment">// 按原始顺序进行排序</span></span>
<span class="line"></span>
<span class="line">sort<span class="token punctuation">.</span><span class="token function">Sort</span><span class="token punctuation">(</span><span class="token function">BySeq</span><span class="token punctuation">(</span>orderSeqList<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是一个完整的批量执行任务的通用模板，根据实际需求和场景，可能需要调整其中的一些部分。</p>`,25),i=[l];function c(t,o){return s(),a("div",null,i)}const d=n(p,[["render",c],["__file","GolangTemplate.html.vue"]]),r=JSON.parse('{"path":"/blogs/backend/GolangTemplate.html","title":"golang 批量执行任务的通用模板","lang":"en-US","frontmatter":{"title":"golang 批量执行任务的通用模板","author":"Rain","tags":["Golang"],"categories":["backend"],"date":"2024-02-06T23:49:03.000Z"},"headers":[],"git":{"createdTime":1717432393000,"updatedTime":1717432393000,"contributors":[{"name":"Rain","email":"smalltime153@gmail.com","commits":1}]},"filePathRelative":"blogs/backend/GolangTemplate.md"}');export{d as comp,r as data};
