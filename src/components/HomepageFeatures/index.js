import React, { useState } from 'react';

const DockerProxy = () => {
  const [pullCommand, setPullCommand] = useState('');
  const [tagCommand, setTagCommand] = useState('');
  const [rmiCommand, setRmiCommand] = useState('');

  const generateCommands = () => {
    var originalImage = document.getElementById("name").value;
    var mirrorImage = originalImage.replace(/^(?:(?:(?<registry>[^\/]+)\/)?(?<repo>[^\/]+)\/)?(?<name>[^:]+)(?::(?<tag>[^:]+))?$/, function (match, registry, repo, name, tag) {
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
    document.getElementById("pullCommandInput").value = 'docker pull ' + mirrorImage;
    document.getElementById("tagCommandInput").value = 'docker tag ' + mirrorImage + ' ' + originalImage;
    document.getElementById("rmiCommandInput").value = 'docker rmi ' + mirrorImage;
    setPullCommand(`docker pull ${mirrorImage}`);
    setTagCommand(`docker tag ${mirrorImage} ${originalImage}`);
    setRmiCommand(`docker rmi ${mirrorImage}`);
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n        #home,\n        input {\n            line-height: 1.7em;\n            font-family: "Source Sans Pro", sans-serif;\n            font-weight: 300;\n            color: rgb(101, 107, 116);\n            font-size: 16pt;\n        width: 98%;\n}\n\n        .row {\n            display: flex;\n            flex-wrap: wrap;\n            align-items: stretch;\n        }\n\n        .row>.col-7 {\n            width: 58.3333%;\n        }\n\n        ul.actions {\n            display: flex;\n            cursor: default;\n            list-style: none;\n            margin-left: -1em;\n            padding-left: 0px;\n        }\n\n        form input[type="text"] {\n            transition: background-color 0.25s ease-in-out 0s;\n            appearance: none;\n            position: relative;\n            width: 100%;\n            border: 0px;\n            padding: 0.7em;\n            border-radius: 0.5em;\n            background: rgb(245, 247, 250);\n            outline: none;\n        }\n\n\n        .button {\n            transition: border-color 0.25s ease-in-out 0s, background-color 0.25s ease-in-out 0s, color 0.25s ease-in-out 0s;\n            position: relative;\n            display: inline-block;\n            text-decoration: none;\n            cursor: pointer;\n            border-radius: 0.5em;\n            background: rgb(255, 255, 255);\n            outline: 0px;\n            line-height: 3em;\n            text-align: center;\n            font-weight: 600;\n            padding: 0px 1.5em;\n            border: 2px solid rgb(255, 255, 255);\n            color: rgb(52, 62, 73) !important;\n        }\n\n\n        .button.alt2 {\n            border-color: rgb(59, 125, 188);\n            background: rgb(59, 125, 188);\n            color: rgb(255, 255, 255) !important;\n        }\n    '
        }}
      />
      <div id="home">
        <section className="col-12 col-12-narrower">
          <header>
            <h2 style={{ textAlign: "center" , paddingTop: 60}}>快捷命令</h2>
          </header>
          <form method="post">
            <div
              className="row gtr-50 gtr-uniform"
              style={{ justifyContent: "center" }}
            >
              <div className="col-7 col-8-narrower">
                <p>
                  <b>第一步：</b>输入原始镜像地址获取命令
                </p>
                <div className="col-8 col-12-mobilep">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="stilleshan/frpc:latest"
                  />
                </div>
                <br />
                <div className="col-4">
                  <ul className="actions">
                    <li>
                      <a id="getCommandsButton" className="button alt2" onClick={generateCommands}>
                        获取命令
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="row gtr-50 gtr-uniform"
              style={{ justifyContent: "center" }}
            >
              <div className="col-7 col-8-narrower">
                <p>
                  <b>第二步：</b>代理拉取镜像
                </p>
                <div className="col-8 col-12-mobilep">
                  <input
                    type="text"
                    readOnly=""
                    placeholder="docker pull mirror.anye.in/stilleshan/frpc:latest"
                    id="pullCommandInput"
                  />
                </div>
                <br />
              </div>
            </div>
            <div
              className="row gtr-50 gtr-uniform"
              style={{ justifyContent: "center" }}
            >
              <div className="col-7 col-8-narrower">
                <p>
                  <b>第三步：</b>重命名镜像
                </p>
                <div className="col-8 col-12-mobilep">
                  <input
                    type="text"
                    readOnly=""
                    placeholder="docker tag mirror.anye.in/stilleshan/frpc:latest stilleshan/frpc:latest"
                    id="tagCommandInput"
                  />
                </div>
                <br />
              </div>
            </div>
            <div
              className="row gtr-50 gtr-uniform"
              style={{ justifyContent: "center" }}
            >
              <div className="col-7 col-8-narrower">
                <p>
                  <b>第四步：</b>删除代理镜像
                </p>
                <div className="col-8 col-12-mobilep">
                  <input
                    type="text"
                    readOnly=""
                    placeholder="docker rmi mirror.anye.in/stilleshan/frpc:latest"
                    id="rmiCommandInput"
                  />
                </div>
                <br />
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};


export default DockerProxy;