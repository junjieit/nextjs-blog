---
title: Nginx 配置
date: 2020-04-02 22:22:43
tags: Nginx
categories: 运维
---

## 查看配置文件
```Bash
nginx -V
```

## 访问配置

```Nginx
location /home {
  alias home/;
  index index.html;
}
```

- `root`: 实际目录，一般配置 root 目录。路径为 root + location
- `alias`: 虚拟目录，一般配置虚拟目录。 路径为 alias，相当于重定向。后面的 `/` 不能省略

## 单页面配置

使用 `try_files` 匹配 index.html，避免刷新页面 404
```Nginx
location / {
  root /home/remote/dist;
  index index.html;
  try_files $uri $uri/ /index.html;
}
```

## 允许跨域
```Nginx
{
  http {
    add_header Access-Control-Allow-origin *;
    add_header Access-Control-Allow-Headers content-type;
    add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
  }
}
```

## 反向代理

```Nginx
location /api {
  proxy_pass http://api.junjiewang.top;
  proxy_redirect off;
}
```

## 日志

### 设置权限
日志主要分为两种：`access_log` 和 `error_log`，设置路径之后，要确保用户有权限修改

```Bash
sudo chmod -R 777 /var/log/nginx/access.log
sudo chmod -R 777 /var/log/nginx/error.log
```

### 配置 access_log

#### 配置

其中 `main` 为 日志的名字，可自由定义。在格式设置中会用到
```Nginx
access_log  /var/log/nginx/access.log  main;
```

#### 作用域
```Nginx
http，server，location，limit_except
```

#### 格式设置

通过 `log_format` 配置 [官网](http://nginx.org/en/docs/http/ngx_http_log_module.html#log_format)
```
log_format name [escape=default|json] string ...;
```
- ***name*** 格式名称，在access_log指令中引用
- ***escape*** 设置变量中的字符编码方式是json还是default，默认是default
- ***string*** 要定义的日志格式内容。该参数可以有多个。参数中可以使用Nginx变量

'$remote_addr - $remote_user [$time_local] "$request" '
                      '$request_time '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

### 配置 error_log

#### 配置

其中 `main` 为 日志的名字，可自由定义。在格式设置中会用到
```Nginx
# 格式
error_log file [level]

error_log  /var/log/nginx/error.log;
```

`level`: 指定日志的级别。level可以是`debug`, `info`, `notice`, `warn`, `error`, `crit`, `alert`,`emerg`中的任意值。可以看到其取值范围是按紧急程度从低到高排列的。只有日志的错误级别等于或高于level指定的值才会写入错误日志中。默认值是error

#### 作用域
```Nginx
main， http, mail, stream, server, location
```

## 参考文档

[Nginx日志配置详解](https://segmentfault.com/a/1190000013377493)