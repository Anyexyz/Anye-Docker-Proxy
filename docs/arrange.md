# 部署文档

## 部署环境

### 服务器要求

- **服务器**：已安装 1Panel 面板的服务器一台，详细安装方法请参考 [1Panel 安装教程](https://1panel.cn/docs/installation/online_installation/)。

> 快速安装命令：
>
> RedHat / CentOS
> ```bash
>curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sh quick_start.sh
>```
>
> Ubuntu / Debian
> ```bash
>curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && bash quick_start.sh
>```

- **网络环境**：服务器需要能够 **无阻碍** 访问 [Docker Hub](https://docker.io/), [GitHub](https://ghcr.io/), [Google](https://gcr.io/), [k8s](https://k8s.gcr.io/), [Quay](https://quay.io/), [Microsoft](https://mcr.microsoft.com) 等镜像仓库

- **域名**：域名一个，解析到服务器的公网 IP 地址，DNS 解析包括将要用于代理的子域的记录。 

- **带宽**：根据你的业务需求，选择合适的带宽。

- **硬盘**：根据你的业务需求，选择合适的硬盘。

### 安装 OpenResty

在 1Panel 面板的 **应用商店** 中安装 ``OpenResty``，用于反向代理代理服务。

## 部署代理服务

### 创建容器组

1. 在 1Panel 面板中，点击 **容器** -> **编排** -> **创建编排**，填写如下信息：

```yaml
version: '3'
services:
  # Docker Hub
  docker-hub:
    container_name: mirror-docker-hub
    image: registry:latest
    restart: always
    volumes:
      - ./docker-hub.yml:/etc/docker/registry/config.yml
      - ./registry:/var/lib/registry
    ports:
      - 127.0.0.1:51000:5000
    networks:
      - registry-net
  # GitHub Container Registry
  ghcr:
    container_name: mirror-ghcr
    image: registry:latest
    restart: always 
    volumes:
      - ./ghcr.yml:/etc/docker/registry/config.yml
      - ./registry:/var/lib/registry
    ports:
      - 127.0.0.1:52000:5000
    networks:
      - registry-net
  # Google Container Registry
  gcr:
    container_name: mirror-gcr
    image: registry:latest
    restart: always
    volumes:
      - ./gcr.yml:/etc/docker/registry/config.yml
      - ./registry:/var/lib/registry
    ports:
      - 127.0.0.1:53000:5000
    networks:
      - registry-net
  # Google Kubernetes
  k8s-gcr:
    container_name: mirror-k8s-gcr
    image: registry:latest
    restart: always
    volumes:
      - ./k8s-gcr.yml:/etc/docker/registry/config.yml
      - ./registry:/var/lib/registry
    ports:
      - 127.0.0.1:54000:5000
    networks:
      - registry-net
  # Quay.io
  quay:
    container_name: mirror-quay
    image: registry:latest
    restart: always
    volumes:
      - ./quay.yml:/etc/docker/registry/config.yml
      - ./registry:/var/lib/registry
    ports:
      - 127.0.0.1:55000:5000
    networks:
      - registry-net
  # Microsoft Artifact Registry
  mcr:
    container_name: mirror-mcr
    image: registry:latest
    restart: always
    volumes:
      - ./mcr.yml:/etc/docker/registry/config.yml
      - ./registry:/var/lib/registry
    ports:
      - 127.0.0.1:56000:5000
    networks:
      - registry-net
 
networks:
  registry-net:
```

这将创建一个容器组，包含了 Docker Hub、GitHub、Google、k8s、Quay、Microsoft 的镜像仓库。

2. 填写文件夹名称为 ``docker-mirror``，点击 **确认**，等待容器组创建完成。

### 创建配置文件

在 ``/opt/1panel/docker/compose/docker-mirror`` 路径中，创建以下配置文件：


```yaml
$ docker-hub.yml

version: 0.1 
storage:
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry
  delete:
    enabled: true
http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
proxy:
  remoteurl: https://registry-1.docker.io # Docker Hub 镜像仓库地址
  username:  # （可选）Docker Hub 的用户名
  password:  # （可选）Docker Hub 的密码
```

``ghcr.yml``, ``gcr.yml``, ``k8s-gcr.yml``, ``quay.yml``, ``mcr.yml`` 配置文件类似，只需修改 ``proxy.remoteurl`` 为对应的镜像仓库地址:

| 镜像仓库 | 配置文件 | remoteurl |
| :---: | :---: | :---: |
| Docker Hub | docker-hub.yml | https://registry-1.docker.io |
| GitHub Container Registry | ghcr.yml | https://ghcr.io |
| Google Container Registry | gcr.yml | https://gcr.io |
| Google Kubernetes | k8s-gcr.yml | https://k8s.gcr.io |
| Quay.io | quay.yml | https://quay.io |
| Microsoft Artifact Registry | mcr.yml | https://mcr.microsoft.com |


### 申请证书

在 1Panel 面板中，点击 **证书**，创建 ``Acme账户`` 和 ``DNS 账户``，然后点击 **申请证书**。

在这里建议申请 **泛域名证书**，以便后续使用。

其余各项信息按需填写。

### 配置反向代理

在 1Panel 面板中，点击 **网站** -> **网站** -> **创建网站**，分别创建以下网站：

>（此处以本站域名为例 ``anye.in``，请替换为你的域名）

| 模式 | 主域名 | 协议 | 代理地址 | 备注 |
| :---: | :---: | :---: | :---: | :---: |
| 反向代理 | mirror.anye.in | http | 127.0.0.1:51000 | Docker Hub |
| 反向代理 | ghcr.anye.in | http | 127.0.0.1:52000 | GitHub Container Registry |
| 反向代理 | gcr.anye.in | http | 127.0.0.1:53000 | Google Container Registry |
| 反向代理 | k8s.anye.in | http | 127.0.0.1:54000 | Google Kubernetes |
| 反向代理 | quay.anye.in | http | 127.0.0.1:55000 | Quay.io |
| 反向代理 | mcr.anye.in | http | 127.0.0.1:56000 | Microsoft Artifact Registry |

### 启用HTTPS

在 1Panel 面板中，为上述反向代理站点配置 HTTPS :

点击 **网站** -> **网站** -> **配置**，点击 **HTTPS**，点击 **启用 HTTPS**，选择 **泛域名证书**，点击 **保存**。

### 配置自动清理（可选）

在 1Panel 面板中，点击 **计划任务** -> **创建计划任务**，填写如下信息：

- **任务类型**：Shell 脚本
- **任务名称**：自动清理 docker 缓存
- **执行周期**：每天
- **脚本内容**：``rm /opt/1panel/docker/compose/docker-mirror/registry/* -r``


### 部署完成

至此，代理服务部署完成，可以通过自己的子域名访问各个镜像仓库。

## 进阶配置

通过修改配置文件，可以对代理服务进行进一步的配置，比如认证、存储、缓存等。

详情请参考 [Distribution Registry 文档](https://distribution.github.io/distribution/)。