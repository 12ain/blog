---
title: Golang并发控制
author: Rain
tags:
  - Golang
categories:
  - 后端
date: 2024-02-05 23:34:42
---


Go中可以使用一个`go`关键字让程序异步执行

一个比较常见的场景：逐个异步调用多个函数，或者循环中异步调用

```go

func main() {

go do1()

go do2()

go do3()

}

// 或者

func main() {

for i := range []int{1,2,3}{

go do(i)

}

}

```

如果了解Go并发机制，就知道`main`在其他goroutine运行完成之前就已经结束了，所以上面代码的运行结果是不符合预期的。我们需要使用一种叫做并发控制的手段，来保证程序正确运行

举个例子：

已知有一个现成的函数`search`，能够按照关键词执行搜索

期望实现一个新的函数`coSearch`能够进行批量

```go

package main


import (

"context"

"errors"

"fmt"

"sync"

)


func search(ctx context.Context, word string) (string, error) {

if word == "Go" {

return "", errors.New("error: Go") // 模拟结果

}

return fmt.Sprintf("result: %s", word), nil // 模拟结果

}


func coSearch(ctx context.Context, words []string) (results []string, err error) {

//tbd


return

}



func main() {

words := []string{"Go", "Rust", "PHP", "JavaScript", "Java"}

results, err := coSearch(context.Background(), words)

if err != nil {

fmt.Println(err)

return

}



fmt.Println(results)

}

```

## **并发控制基础**

`sync.WaitGroup`是Go标准库中用来控制并发的结构，这里放一个使用`WaitGroup`实现`coSearch`的示例

```go

package main



import (

"context"

"errors"

"fmt"

"sync"

)



func search(ctx context.Context, word string) (string, error) {

if word == "Go" {

return "", errors.New("error: Go") // 模拟结果

}

return fmt.Sprintf("result: %s", word), nil // 模拟结果

}



func coSearch(ctx context.Context, words []string) ([]string, error) {

var (

wg = sync.WaitGroup{}

once = sync.Once{}

results = make([]string, len(words))

err error

)



for i, word := range words {

wg.Add(1)



go func(word string, i int) {

defer wg.Done()



result, e := search(ctx, word)

if e != nil {

once.Do(func() {

err = e

})



return

}



results[i] = result

}(word, i)

}



wg.Wait()



return results, err

}



func main() {

words := []string{"Go", "Rust", "PHP", "JavaScript", "Java"}

results, err := coSearch(context.Background(), words)

if err != nil {

fmt.Println(err)

return

}


fmt.Println(results)

}

```

上面的代码中有非常多的细节，来逐个聊一聊

### `sync.WaitGroup{}`并发控制

`sync.WaitGroup{}`的用法非常简洁

- 当新运行一个goroutine时，我们需要调用`wg.Add(1)`

- 当一个goroutine运行完成的时候，我们需要调用`wg.Done()`

- `wg.Wait()`让程序阻塞在此处，直到所有的goroutine运行完毕。

对于`coSearch`来说，等待所有goroutine运行完成，也就完成了函数的任务，返回最终的结果

```go

var (

wg = sync.WaitGroup{}

//...省略其他代码

)


for i, word := range words {

wg.Add(1)


go func(word string, i int) {

defer wg.Done()

//...省略其他代码

}(word, i)

}


wg.Wait()

```

### `for`循环中的goroutine

这是一个Go经典错误，如果goroutine中使用了`for`迭代的变量，所有goroutine都会获得最后一次循环的值。例如下面的示例，并不会输出"a", "b", "c" 而是输出 "c", "c", "c"

```go

func main() {

done := make(chan bool)



values := []string{"a", "b", "c"}

for _, v := range values {

go func() {

fmt.Println(v)

done <- true

}()

}



// wait for all goroutines to complete before exiting

for _ = range values {

<-done

}

}

```

正确的做法就是像上文示例一样，将迭代的变量赋值给函数参数，或者赋值给新的变量

```go

for i, word := range words {

// ...

go func(word string, i int) {

// fmt.Println(word, i)

}(word, i)

}



for i, word := range words {

i, word := i, word

go func() {

// fmt.Println(word, i)

}()

}

```

> 由于这个错误实在太常见，从Go 1.22开始Go已经修正了这个经典的错误：Fixing For Loops in Go 1.22。
> 不过Go 1.22默认不会开启修正，需要设置环境变量`GOEXPERIMENT=loopvar`才会 开启

### 并发安全

简单理解：当多个goroutine对同一个内存区域进行读写时，就会产生并发安全的问题，它会导致程序运行的结果不符合预期

上面的示例把最终的结果放入了`results = make([]string, len(words))`中。虽然我们在goroutine中并发的对于`results`变量进行写入，但因为每一个goroutine都写在了独立的位置，且没有任何读取的操作，因此`results[i] = result`是并发安全的

```text

results = [ xxxxxxxx, xxxxxxxx, xxxxxxxx, .... ]

^ ^ ^

| | |

goroutine1 goroutine2 goroutine3

```

这也意味着如果使用`results = append(results, result)`的方式并发赋值，因为会涉及到slice的扩容等操作，所以并不是并发安全的，需要利用`sync.Mutex{}`进行加锁

如果想尽可能的提高程序的并发性能，推荐使用 `results[i] = result`这种方式赋值

### `sync.Once{}`单次赋值

示例`coSearch`中，会返回第一个出错的`search`的`error`。`err`是一个全局变量，在并发goroutine中赋值是并发不安全的操作

```go

//...省略其他代码

go func(word string, i int) {

defer wg.Done()



result, e := search(ctx, word)

if e != nil && err == nil {

err = e



return

}



results[i] = result

}(word, i)

//...省略其他代码

```

对于全局变量的赋值比较常规做法就是利用`sync.Mutex{}`进行加锁。但示例的逻辑为单次赋值，我们刚好可以利用同在`sync`库的`sync.Once{}`来简化代码

`sync.Once{}`功能如其名，将我们要执行的逻辑放到它的`Do()`方法中，无论多少并发都只会执行一次

```go

//...省略其他代码

go func(word string, i int) {

defer wg.Done()



result, e := search(ctx, word)

if e != nil {

once.Do(func() {

err = e

})



return

}



results[i] = result

}(word, i)

//...省略其他代码

```

### goroutine数量控制

`coSearch`入参的数组可能非常大，如果不加以控制可能导致我们的服务器资源耗尽，我们需要控制并发的数量

利用带缓冲channel可以实现

```go

tokens := make(chan struct{}, 10)



for i, word := range words {

tokens <- struct{}{} // 新增

wg.Add(1)



go func(word string, i int) {

defer func() {

wg.Done()

<-tokens // 新增

}()



result, e := search(ctx, word)

if e != nil {

once.Do(func() {

err = e

})



return

}



results[i] = result

}(word, i)

}



wg.Wait()

```

如上，代码中创建了10个缓冲区的channel，当channel被填满时，继续写入会被阻塞；当goroutine运行完成之后，除了原有的`wg.Done()`，我们需要从channel读取走一个数据，来允许新的goroutine运行

通过这种方式，我们控制了`coSearch`最多只能运行10个goroutine，当超过10个时需要等待前面运行的goroutine结束

### context.Context

并发执行的goroutine只要有一个出错，其他goroutine就可以停止，没有必要继续执行下去了。如何把取消的事件传导到其他goroutine呢？`context.Context`就是用来传递类似上下文信息的结构

```go

ctx, cancel := context.WithCancelCause(ctx) // 新增

defer cancel(nil) // 新增



for i, word := range words {

tokens <- struct{}{}

wg.Add(1)



go func(word string, i int) {

defer func() {

wg.Done()

<-tokens

}()



result, e := search(ctx, word)

if e != nil {

once.Do(func() {

err = e

cancel(e) // 新增

})



return

}



results[i] = result

}(word, i)

}



wg.Wait()

```

## **完整的代码**

最终完成的效果如下

```go

package main



import (

"context"

"errors"

"fmt"

"sync"

)



func search(ctx context.Context, word string) (string, error) {

select {

case <-ctx.Done():

return "", ctx.Err()

default:

if word == "Go" || word == "Java" {

return "", errors.New("Go or Java")

}

return fmt.Sprintf("result: %s", word), nil // 模拟结果

}

}



func coSearch(ctx context.Context, words []string) ([]string, error) {

ctx, cancel := context.WithCancelCause(ctx)

defer cancel(nil)



var (

wg = sync.WaitGroup{}

once = sync.Once{}



results = make([]string, len(words))

tokens = make(chan struct{}, 2)



err error

)



for i, word := range words {

tokens <- struct{}{}

wg.Add(1)



go func(word string, i int) {

defer func() {

wg.Done()

<-tokens

}()



result, e := search(ctx, word)

if e != nil {

once.Do(func() {

err = e

cancel(e)

})



return

}



results[i] = result

}(word, i)

}



wg.Wait()



return results, err

}

```

## **并发控制库errgroup**

可以看到要实现一个较为完备的并发控制，需要做的工作非常多。不过Go官方团队为大家准备了 golang.org/x/sync/errgroup

`errgroup`提供的能力和上文的示例类似，实现方式也类似，包含并发控制，错误传递，`context.Context`传递等

```go

package main



import (

"context"

"fmt"

"sync"



"golang.org/x/sync/errgroup"

)



func coSearch(ctx context.Context, words []string) ([]string, error) {

g, ctx := errgroup.WithContext(ctx)

g.SetLimit(10)

results := make([]string, len(words))



for i, word := range words {

i, word := i, word



g.Go(func() error {

result, err := search(ctx, word)

if err != nil {

return err

}



results[i] = result

return nil

})

}



err := g.Wait()



return results, err

}

```

`errgroup`的用法也很简单

- 使用`g, ctx := errgroup.WithContext(ctx)`来创建goroutine的管理器

- `g.SetLimit()`可以设置允许的最大的goroutine数量

- 类似于`go`关键词，`g.Go`异步执行函数

- `g.Wait()`和`sync.WaitGroup{}`的`wg.Wait()`类似，会阻塞直到所有goroutine都运行完成，并返回其中一个goroutine的错误
