---
title: Fabric环境搭建及采坑经历
tags:
  - 后端
  - 区块链
categories:
  - 后端
date: '2021-06-28 14:32'
---

## 系统环境

> OSX: 11.4
>
> Docker Engine : v20.10.6
>
> Docker Compose: 1.29.1
>
> Kubernetes: v1.19.7
>
> Node: v12.22.1
>
> Go: 1.16.5

## 环境准备

- Docker 虚拟化容器
- Kubernetes（k8s） 集群(本地可选择采用minikube)
- Kubectl 命令行工具 (用于与集群通信)

### Minikube（可选）

本地安装minikube并启动 [文档](https://minikube.sigs.k8s.io/docs/start/)

> MacOS可跳过安装minikube，在Docker设置中直接启用Kubernetes即可

```shell
// 启动本地集群
minikube start
```

打开 Kubernetes 仪表板

```shell
minikube dashboard --url
```

## 运行[fabric-samples](https://github.com/hyperledger/fabric-samples)

[环境准备](https://hyperledger-fabric.readthedocs.io/en/latest/install.html)

```shell
// 启动测试网络并创建channel和ca
./network.sh up createChannel -c mychannel -ca

./network.sh down

./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-go -ccl go

./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-java/ -ccl java

./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-typescript -ccl typescript

./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript
```

## 采坑经历

### 安装链码

安装链码步骤Error，报错信息如下：

```shell
Error: chaincode install failed with status: 500 - failed to invoke backing implementation of 'InstallChaincode': could not build chaincode: docker build failed: docker image build failed: docker build failed: Failed to pull hyperledger/fabric-nodeenv:2.3: API error (500): Get https://registry-1.docker.io/v2/: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
```

根据报错信息发现hyperledger/fabric-nodeenv:2.3这个镜像拉取失败

解决方案: [Stack Overflow](https://stackoverflow.com/questions/48056365/error-get-https-registry-1-docker-io-v2-net-http-request-canceled-while-b)

1. 尝试更改/etc/resolv.conf配置文件中nameserver为Google DNS并重启docker，重新拉取镜像无效。
2. 在OSX环境，将Docker配置中Preferences -> Experimental Features->Experimental Virtualization Framework改为disable，重启Docker后，脚本运行成功。

### API Service Error

本地环境Service错误，报错日志如下:

```bash
2021-06-30T07:24:04.530Z - error: [ServiceEndpoint]: Error: Failed to connect before the deadline on Committer- name: orderer.example.com:7050, url:grpcs://orderer.example.com:7050, connected:false, connectAttempted:true
2021-06-30T07:24:04.530Z - error: [ServiceEndpoint]: waitForReady - Failed to connect to remote gRPC server orderer.example.com:7050 url:grpcs://orderer.example.com:7050 timeout:3000
2021-06-30T07:24:04.530Z - error: [DiscoveryService]: _buildOrderer[mychannel] - Unable to connect to the discovered orderer orderer.example.com:7050 due to Error: Failed to connect before the deadline on Committer- name: orderer.example.com:7050, url:grpcs://orderer.example.com:7050, connected:false, connectAttempted:true
```

解决方案：添加相关域名至本地hosts，并重启docker容器。
