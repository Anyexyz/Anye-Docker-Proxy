# 使用文档

## 代理服务说明

使用本站代理服务时，拉取的镜像名前缀为本站域名，可能会影响实际使用，本站推荐三种方式以供不同的需求使用:

1. 参考首页 **快捷命令**，使用本站代理拉取镜像，并修改回原始镜像名，在删除代理镜像名。

2. 参考以下 `docker cli` 和 `docker-compose.yml` ，修改镜像名，后续一直使用本站代理服务来启动或更新镜像。

3. 参考下文，修改 `daemon.json` 配置文件，来更便捷无感的使用代理服务。

#### docker cli

```bash
docker run -d --name frpc \
    -v /path/frpc.ini:/frp/frpc.ini \
    mirror.anye.in/stilleshan/frpc:latest
```

#### docker-compose.yml

```yaml
version: "3.9"
services:
  frpc:
    image: mirror.anye.in/stilleshan/frpc:latest
    volumes:
      - ./frpc.ini:/frp/frpc.ini
    restart: always
```

#### 修改 daemon.json ( 推荐 )

如果仅仅是使用 Docker Hub 官方镜像，可以将本站加入到 daemon.json 文件中，那么可以直接使用正常的官方命令来拉取镜像或启动容器，系统会自动使用本站代理服务，而不会有上述镜像名的问题，参考添加以下信息。
```json
{
  "registry-mirrors": [
    "https://mirror.anye.in"
  ]
}
```

## Docker Hub 官方镜像代理
---

### 常规镜像代理

官方命令： `docker pull stilleshan/frpc:latest`

代理命令： `docker pull mirror.anye.in/stilleshan/frpc:latest`

### 根镜像代理

官方命令： `docker pull nginx:latest`

代理命令： `docker pull mirror.anye.in/library/nginx:latest`

## GitHub Container Registry
---

### 常规镜像代理

官方命令： `docker pull ghcr.io/username/image:tag`

代理命令： `docker pull ghcr.anye.in/username/image:tag`

## Google Container Registry
---

### 常规镜像代理

官方命令： `docker pull gcr.io/username/image:tag`

代理命令： `docker pull gcr.anye.in/username/image:tag`

## Google Kubernetes
---

### 常规镜像代理

官方命令： `docker pull k8s.gcr.io/username/image:tag`

官方命令： `docker pull registry.k8s.io/username/image:tag`

代理命令： `docker pull k8s.anye.in/username/image:tag`

### 根镜像代理

官方命令： `docker pull k8s.gcr.io/coredns:1.6.5`

官方命令： `docker pull registry.k8s.io/coredns:1.6.5`

代理命令： `docker pull k8s.anye.in/coredns:1.6.5`

## Quay.io
---

### 常规镜像代理

官方命令： `docker pull quay.io/username/image:tag`

代理命令： `docker pull quay.anye.in/username/image:tag`

## Microsoft Artifact Registry
---

### 常规镜像代理

官方命令： `docker pull mcr.microsoft.com/azure-cognitive-services/diagnostic:latest`

代理命令： `docker pull mcr.anye.in/azure-cognitive-services/diagnostic:latest`