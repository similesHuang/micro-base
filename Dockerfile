# 使用官方 Nginx 镜像
FROM nginx

# 复制前端静态文件到 Nginx 默认目录
COPY dist/ /usr/share/nginx/html/

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]