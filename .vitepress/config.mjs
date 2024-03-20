import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "Anye Docker Proxy",
  description: "多平台容器镜像代理服务，支持 Docker Hub, GitHub, Google, k8s, Quay, Microsoft 等镜像仓库",
  themeConfig: {
    logo: 'Dockerlogo.png',
    nav: [
      { text: '使用文档', link: '/docs/use' },
      { text: '部署文档', link: '/docs/arrange' },
      { text: '致谢', link: 'thanks' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Anyexyz/Anye-Docker-Proxy' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 <a href="/">Anye Docker Proxy</a>'
    }
  }
})
