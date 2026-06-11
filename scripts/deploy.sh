#!/usr/bin/env sh

# 遇到错误立即终止
set -e

# 生成静态文件
pnpm build

# 进入打包目录
cd docs/.vitepress/dist

# 自定义域名
echo 'blog.abplan.top' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# 推送到 master 分支（GitHub Pages 站点仓库）
git push -f git@github.com:12ain/blog.git main:master

cd -
