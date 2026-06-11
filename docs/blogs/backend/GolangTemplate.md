---
title: golang 批量执行任务的通用模板
author: Rain
tags:
  - Golang
categories:
  - 后端
date: 2024-02-06 23:49:03
---

在Go中，批量执行任务的通用模板包括以下步骤：

首先，有一个需求：接口调用时，接收到一个包含十个元素的列表。希望并发执行这十个任务，每个任务都会返回执行的结果和可能的异常。最后，要将返回的结果整合到一个切片列表中，然后一并返回。

为了实现这个需求，首先定义一个结构体 `Order` 用于表示任务的信息：

```go

type Order struct {

Name string `json:"name"`

Id int `json:"id"`

}

```

然后，决定并发执行十个任务，因此初始化了两个通道，一个用于接收任务的结果，另一个用于接收异常：

```go

taskNum := 10

orderCh := make(chan Order, taskNum) // 用于接收返回的结果

errCh := make(chan error, taskNum) // 用于接收返回的异常

```

接下来，创建任务执行函数：

```go

func processTask(task Task) {

// 执行任务的逻辑

}

```

然后，启动十个协程来执行这些任务，并使用 `sync.WaitGroup` 来等待它们完成：

```go

var wg sync.WaitGroup


for i := 0; i < taskNum; i++ {

wg.Add(1)

go func() {

defer wg.Done()

// 任务的执行逻辑

}()

}


// 等待所有任务协程完成

wg.Wait()

```

接着，使用 `for-select` 结构从结果通道中接收执行结果：

```go

orderList := make([]Order, taskNum)


for i := 0; i < taskNum; i++ {

select {

case order, ok := <-orderCh:

if ok {

orderList = append(orderList, order)

}

case err := <-errCh:

if err != nil {

return err // 在发现错误时，根据需求选择是继续执行还是返回错误

}

default:

fmt.Println("done")

}

}

```

最后，关闭通道，表示不再发送任务：

```go

close(orderCh)

close(errCh)

```

如果需要控制每个任务的执行时间，可以使用定时器来解决超时问题：

```go

timeoutTime := time.Second * 3 // 超时时间

taskTimer := time.NewTimer(timeoutTime) // 初始化定时器


for i := 0; i < taskNum; i++ {

select {

case <-taskTimer.C:

err := errors.New("task timeout")

return err

// 其他 case 分支处理任务的执行和结果接收

}

// 每次执行都需要重置定时器

taskTimer.Reset(timeoutTime)

}

```

在协程内处理 panic 问题是很重要的，在协程内使用 `defer` 来捕获 panic：

```go

for i := 0; i < taskNum; i++ {

wg.Add(1)

go func() {

defer func() {

wg.Done()

if r := recover(); r != nil {

err := errors.New(fmt.Sprintf("System panic: %v", r))

errCh <- err

return

}

}()

// 任务的执行逻辑

}()

}

```

最后，如果需要保持任务执行结果的顺序，可以定义一个带序号的结构体，并通过带序号的通道接收结果：

```go

type OrderWithSeq struct {

Seq int

OrderItem Order

}

orderCh := make(chan OrderWithSeq, taskNum) // 用于接收带序号的结构体

```

在任务执行时，加入序号信息：

```go

for i := 0; i < taskNum; i++ {

i := i

wg.Add(1)

go func() {

defer wg.Done()

// 任务的执行逻辑

orderCh <- OrderWithSeq{

Seq: i,

OrderItem: res,

}

}()

}

```

最后，在结果接收时，按照带序号的结构体进行排序：

```go

orderSeqList := make([]OrderWithSeq, taskNum)

for i := 0; i < taskNum; i++ {

select {

case order, ok := <-orderCh:

if ok {

orderList = append(orderSeqList, order)

}

// 其他 case 分支处理异常等

}

}

  

// 按原始顺序进行排序

sort.Sort(BySeq(orderSeqList))

```

这就是一个完整的批量执行任务的通用模板，根据实际需求和场景，可能需要调整其中的一些部分。
