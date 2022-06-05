---
tags:
  - AWS
  - Github
  - OAuth
categories:
  - 后端
date: '2022-04-20 16:15'
---

# 基于AWS Lambda函数实现CloudFront GitHub OAuth

## 业务场景

AWS S3可用于静态网页托管，但由于部分网页存在敏感信息，游客不能够直接访问网页，则需要对用户鉴权，于是通过 CloudFront 对S3资源进行访问，并使用Lambda函数处理 GitHub OAuth 接口，实现对用户请求进行拦截并鉴权。

## 配置流程

### S3 Bucket配置

由于该Bucket的存储敏感信息，不应通过HTTP直接访问到S3文件，存储桶策略应配置只允许 CloudFront 访问对应目录下文件。（也可以在创建CloudFront时勾选相关配置，自动配置该Bucket的权限）

配置策略参考：

```json
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E1US02RSZVS2VI"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::github-actions-runner-artifact/*"
        }
    ]
}
```

### CloudFront配置

CloudFront 源选择创建好的 S3 Bucket，访问策略选择只访问 CLoudFront，参考上文存储桶策略或按图中配置方式进行创建

![bd772caf-8ae6-45cf-a96b-e9316d0efc65.png](https://s2.loli.net/2022/06/06/6mAzPYqoHUtneiK.png)

行为配置需要拦截http请求，并使用Lambda函数，配置方式参考：

![4eca93e8-c244-4a7b-a36b-355657c326c1.png](https://s2.loli.net/2022/06/06/CDKQIZu3MpLa6YU.png)

### Lambda函数配置

创建Lambda函数参考 [配置Wiki](https://github.com/Widen/cloudfront-auth/wiki/Manual-Deployment) 需要注意该函数的权限配置，选择策略模板为基本Lambda@Edge权限，参考：

![c3433fe3-ace8-41bf-ac39-4e36bd15a661.png](https://s2.loli.net/2022/06/06/SU8sYZ7G1yPNwqA.png)

### 创建GitHub OAuth App

该步骤无特殊配置，参考[WiKi](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)，HomePage URL填写为CloudFront URL，Callback URL为`${CloudFront_URL}/_calback`，最终生成 Client ID与Secrets。

使用 [参考代码](https://github.com/Widen/cloudfront-auth) 生成OAuth代码，解压并修改生成后的源码进行二次开发，实现根据Github组织鉴权，具体修改内容参考：

- [获取用户组织接口](https://docs.github.com/en/rest/reference/orgs#list-organizations-for-the-authenticated-user)

重新打包后上传并发布版本，将 `ARN:version` 填写到 CloudFront 行为的函数关联。访问 CloudFront 进行测试。

## 参考链接

- [Github OAuth Wiki](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)
- [Github 开源代码](https://github.com/Widen/cloudfront-auth)
- [配置 Wiki](https://github.com/Widen/cloudfront-auth/wiki/Manual-Deployment)
