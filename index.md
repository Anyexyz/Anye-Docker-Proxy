---
layout: home

hero:
  name: "Docker Proxy"
  text: "Form Anye"
  tagline: 多平台容器镜像代理服务，支持 Docker Hub, GitHub, Google, k8s, Quay, Microsoft 等镜像仓库
  image: /Dockerlogo.png
  alt: Dockerlogo
  actions:
    - theme: brand
      text: 使用文档 - 2min ⏱️
      link: /docs/use
---

-----

<center><h1 class="title">快捷命令</h1></center>

<center><h3 class="step1">第一步：输入原始镜像地址获取命令</h3></center>

<pre class="shiki shiki-themes github-light github-dark vp-code"><code><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;"><input type="input-vue" v-model="originalImage" placeholder="请输入原始镜像地址"  style="width: 100%; padding: 0.5em; margin: 0.5em 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box;"/></span></code></pre>

<center><button @click="generateCommands">获取命令</button></center>


<center><h3 class="step2">第二步：代理拉取镜像</h3></center>

```bash-vue
{{ pullCommand }}
```

<center><h3 class="step3">第三步：重命名镜像</h3></center>

```bash-vue
{{ tagCommand }}
```

<center><h3 class="step4">第四步：删除代理镜像</h3></center>

```bash-vue
{{ rmiCommand }}
```


<script>
export default {
  data() {
    return {
      originalImage: "",
      pullCommand: "docker pull mirror.anye.in/stilleshan/frpc:latest",
      tagCommand: "docker tag mirror.anye.in/stilleshan/frpc:latest stilleshan/frpc:latest",
      rmiCommand: "docker rmi mirror.anye.in/stilleshan/frpc:latest"
    };
  },
  methods: {
    generateCommands() {
      let mirrorImage = this.originalImage.replace(/^(?:(?:(?<registry>[^\/]+)\/)?(?<repo>[^\/]+)\/)?(?<name>[^:]+)(?::(?<tag>[^:]+))?$/, function (match, registry, repo, name, tag) {
        tag = tag === undefined ? 'latest' : tag;
        registry = registry === undefined ? 'docker.io' : registry;
        repo = repo === undefined ? 'library' : repo;
        if (name === undefined || registry != 'docker.io' && registry != 'ghcr.io' && registry != 'gcr.io' && registry != 'k8s.gcr.io' && registry != 'registry.k8s.io' && registry != 'quay.io' && registry != 'mcr.microsoft.com') {
          alert('暂不支持该镜像仓库的镜像加速服务！');
          return;
        }
        return registry + '/' + repo + '/' + name + ':' + tag;
      });

      mirrorImage = mirrorImage.replace('docker.io', 'mirror.anye.in');
      mirrorImage = mirrorImage.replace('ghcr.io', 'ghcr.anye.in');
      mirrorImage = mirrorImage.replace('gcr.io', 'gcr.anye.in');
      mirrorImage = mirrorImage.replace('k8s.gcr.io', 'k8s.anye.in');
      mirrorImage = mirrorImage.replace('registry.k8s.io', 'k8s.anye.in');
      mirrorImage = mirrorImage.replace('quay.io', 'quay.anye.in');
      mirrorImage = mirrorImage.replace('mcr.microsoft.com', 'mcr.anye.in');

      this.pullCommand = 'docker pull ' + mirrorImage;
      this.tagCommand = 'docker tag ' + mirrorImage + ' ' + this.originalImage;
      this.rmiCommand = 'docker rmi ' + mirrorImage;
    }
  }
};
</script>


<style>
#VPContent > div > div.vp-doc.container > div > div > center:nth-child(5) > button {
    list-style: none;
    box-sizing: inherit;
    margin: 0;
    font: inherit;
    vertical-align: baseline;
    position: relative;
    display: inline-block;
    cursor: pointer;
    border-radius: .5em;
    outline: 0;
    line-height: 3em;
    text-align: center;
    font-weight: 600;
    padding: 0 1.5em;
    border: 2px solid #fff;
    animation: none!important;
    transition: none!important;
    text-decoration: none;
    color: #fff!important;
    border-color: #5672cd;
    background: #5672cd;
}

</style>