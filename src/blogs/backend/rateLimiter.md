---
title: 限流组件实现
author: Rain
tags:
  - Golang
  - 高并发
categories:
  - 后端
date: 2024-02-07 23:01:07
---
## **一、服务流量限制的重要性**

随着业务规模的增长,服务的流量也会激增,大流量可能会压垮服务器,导致服务瘫痪。因此需对服务的流量进行限制,确保在大流量的情况下也能正常运行。

当流量激增时,会占用大量服务器资源和带宽,可能会压垮整个系统。比如流量激增期间数据库连接用尽,会导致服务无法访问数据库而宕机。用限制流量可以有效防止流量暴增压垮系统。

没有限流时,流量激增期间会启动很多无用的任务占用服务器资源,造成不必要的浪费。适当限流可以排队或拒绝无效请求,有效控制资源消耗使用。

## **二、常见的限流算法**

限流的基本思想是通过算法预先设置阈值,当流量达到阈值时自动限制,常见的限流算法有:

1. 计数器算法

计数器算法根据时间窗口内的请求数进行限制,基本思路是设置一个计数器统计时间窗口内的请求数,当请求数达到限流阈值时,就拒绝服务或者排队。

**优点： **实现简单,资源消耗少。

**缺点： **无法处理突发流量,时间窗口比较难确定合适的值。

2. 漏桶算法

漏桶算法是限制请求通过的速率,基本思路是设置桶的容量和流出速率,如果请求流入速率过大会被桶阻止,根据固定速率流出,起到平滑调节速率的作用。

**优点： **可以很好地应对突发流量。

**缺点： **需要实时处理每一个请求,对系统资源消耗较大。

3. 令牌桶算法

令牌桶算法按照固定速率向桶中放入令牌,每次请求需要消耗一个令牌,只有拿到令牌的请求才允许通过。放令牌的速率可以通过调节,实现不同速率的请求限流。

**优点： **拥堵控制能力更强,可自定义速率。

**缺点： **需要实时处理请求,系统资源消耗依然比较大。

## **三、限流实战**

1. 使用计数器限制总请求数

计数器算法主要是基于时间窗口和计数器来进行限制的。下面来看一个基于计数器进行限流的实现:

```go
package limit

import (
    "sync/atomic"
    "time"
)

// 计数器限流器
type CounterLimiter struct {
    count      uint64 // 当前计数
    lastUpdate int64  // 上次更新的时间

    limitPerSec uint64 // 每秒限制的请求数
}

// 创建计数器限流器
func NewCounterLimiter(limitPerSec uint64) *CounterLimiter {
    return &CounterLimiter{
        count:      0,
        lastUpdate: time.Now().Unix(),
        limitPerSec: limitPerSec,
    }
}

// 实现限流器接口的Allow()
func (c *CounterLimiter) Allow() bool {
    now := time.Now().Unix()
    elapse := now - c.lastUpdate

    c.lastUpdate = now
    addedCount := elapse * c.limitPerSec

    c.count += uint64(addedCount)
    if c.count > c.limitPerSec {
        c.count = c.limitPerSec
    }

    if c.count < c.limitPerSec {
        c.count++
        return true
    }

    return false
}
```

基于计数器的限流器 CounterLimiter，主要逻辑是

创建限流器时指定限流频率 limitPerSec

Allow() 方法校验是否限流

- 计算当前时间和上次更新时间差 elapsed
- 根据时间差计算这段时间新增的限流额度 addedCount
- 计数器统计值增加 addedCount
- 判断计数器是否达到阈值
- 到达阈值则限流,未到则计数 +1 并放行

只需要创建一个限流器,并在请求处理前调用 Allow() 方法判断是否限流即可。

```go
func httpHandler(w http.ResponseWriter, r *http.Request) {

  limiter := NewCounterLimiter(10)

  if !limiter.Allow() {

    http.Error(w, http.StatusText(429),
      http.StatusTooManyRequests)

    return
  }

  // 核心逻辑
}
```

2. 使用漏桶算法限制请求通过速率

漏桶算法需要设置一个桶的容量 capacity,和漏出流量的速率 flow per second。如果请求流入速度过快,会被桶的容量限制而丢弃。

使用漏桶算法实现请求通过速率限流的示例:

```go
type LeakyBucket struct {
  capacity     int64 // 桶容量
  used         int64 // 当前已使用
  mu           sync.Mutex
  lastLeakTime time.Time // 上次漏水时间

  flow int64 // 每秒流速
}

// 创建漏桶限流器
func NewLeakyBucket(capacity, flow int64) *LeakyBucket {
  return &LeakyBucket{
    capacity: capacity,
    used:     0,
    flow:     flow,
  }
}

// 实现限流器接口的Allow()
func (l *LeakyBucket) Allow() bool {
  l.mu.Lock()
  defer l.mu.Unlock()

  now := time.Now()
  l.leak(now)

  if l.used >= l.capacity {
    return false
  }

  l.used += 1
  return true
}

// 漏水处理
func (l *LeakyBucket) leak(now time.Time) {

  delta := now.Sub(l.lastLeakTime)

  leaked := delta.Seconds() * float64(l.flow)

  // 计算这段间隔内的漏水量
  leakedInt := int64(leaked)
  if leakedInt > (l.used) {
    // 漏出了全部水
    l.used = 0
  } else {
    l.used -= leakedInt
  }

  l.lastLeakTime = now
}
```

漏桶算法的实现主要分为两个部分:

- A llow() 方法检查当前使用量是否达到桶容量,未到则请求数 +1 并返回 true,已到则返回 false 限流
- leak() 方法按照固定流速进行漏水,对应速率进行的限流

可通过设置桶容量和流速,来限制请求通过系统的速率了。

3. 使用令牌桶算法释放固定数额的令牌

令牌桶算法的主要逻辑是按照一定速率往桶中放入令牌。

请求在处理前需要先获取令牌,如果没有可用令牌则丢弃该请求或进入队列等待。

下面是使用令牌桶算法实现的限流器:

```go
package limit

import (
  "sync"
  "time"
)

// 令牌桶算法限流器
type TokenBucket struct {
  capacity   int64 // 桶容量
  rate       int64 // 令牌放入速率
  tokens     int64 // 当前令牌数
  lastUpdate int64 // 上次添加令牌的时间
  mu         sync.Mutex
}

// 创建令牌桶限流器
func NewTokenBucket(capacity, rate int64) *TokenBucket {
  return &TokenBucket{capacity: capacity, rate: rate, tokens: capacity, lastUpdate: time.Now().Unix()}
}

// Allow 方法实现限流器接口
func (t *TokenBucket) Allow() bool {
  t.addTokens()
  t.mu.Lock()
  defer t.mu.Unlock()
  if t.tokens <= 0 {
    return false
  }
  t.tokens--
  return true
}

// 按速率添加令牌
func (t *TokenBucket) addTokens() {
  now := time.Now().Unix()
  elapse := now - t.lastUpdate
  add := elapse * t.rate
  t.lastUpdate = now
  t.tokens += add
  if t.tokens > t.capacity {
    t.tokens = t.capacity
  }
}
```

主要逻辑分为两部分:

- Allow() 方法处理请求前获取令牌
- addTokens() 方法按照速率往桶中添加令牌

调整桶容量和添加令牌的速率,来达到平滑限流的效果。

4. 封装限流中间件,便于业务复用

在上例中,实现了通用的限流器接口,包含创建限流器和 Allow() 校验方法。可以基于这个接口,进一步封装成限流中间件。

```go
package limit

import "net/http"

// 中间件实现
func LimitMiddleware(handler http.Handler, limiter Limiter) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter,
    r *http.Request) {

    if !limiter.Allow() {

      http.Error(w, http.StatusText(429),
        http.StatusTooManyRequests)

      return
    }

    handler.ServeHTTP(w, r)
  })
}

func main() {
  // 使用方式
  limiter := NewTokenBucket(capacity, rate)
  http.Handle("/", LimitMiddleware(myHandler, limiter))
}
```

## **四、优化限流策略**

很多时候业务访问量会有周期性波动或突发变化, 需要能够检测实时流量,动态调整限流参数。比如可以根据每分钟的请求量实时调整下一分钟的限流阈值。

根据业务需要可以设置自定义策略,比如对重要接口限流预留更多资源,对次要接口限流更严格等。允许更加细粒度地控制限流。

可以根据服务器负载、平均响应时间等指标,动态决定是否需要限流以保护系统。在流量大幅增长时自动跟进限制。

## **五、使用 Redis 实现分布式限流**

之前的限流方式都是在单机上通过计数或时间实现,存在一定的不足。可使用 Redis 实现分布式限流。

Redis 的性能和扩展性优势：

Redis 单机可以达到 10 万 + QPS 的性能, pipeline 批量操作可以进一步提升这一指标。此外 Redis 很容易通过主从复制和分片来进行扩展。正是得益于这些优势,才使得它非常适合实现分布式限流。

利用 Redis 的计数器和定时任务实现分布式限制 ，主要的思想是:

- 对每个唯一请求路径维护一个计数器
- 每次请求计数器 +1
- 当计数器达到阈值则返回限流
- 通过定时任务定期重置计数器计数

客户端请求时通过 Lua 脚本 canRequest.lua 来进行判断:

```lua
-- canRequest.lua 限流判断脚本
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local current = tonumber(redis.call('get', key) or "0")

if current + 1 > limit then 
    return 0
else
    redis.call("INCRBY", key, 1)
    redis.call("expire", key, 1) 
    return 1
end
```

使用一个唯一键 key 存储计数器,并设置 key 的过期时间,比如 1 秒。根据 key 的当前计数是否达到阈值来拒绝请求。可轻松通过 Redis 实现分布式限流,并可以横向扩展提高效率。