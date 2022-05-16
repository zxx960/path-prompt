# path-prompt
> 自动提示文件路径, 方便引入项目为的文件.

[![Version](https://vsmarketplacebadge.apphb.com/version-short/yutent.auto-path.svg)](https://marketplace.visualstudio.com/items?itemName=yutent.auto-path)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-short/yutent.auto-path.svg)](https://marketplace.visualstudio.com/items?itemName=yutent.auto-path)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/yutent.auto-path.svg)](https://marketplace.visualstudio.com/items?itemName=yutent.auto-path)



## 概念说明

- **根目录`/`**
> 这里的根目录不是系统的根目录, 而是当前vscode打开的项目的目录。
## 支持情况

1. vue项目
> 判断根目录有 `package.json`且有使用依赖`vue`, 有则认为是vue项目。
  - 当输入 `./` 开头时, 读取当前目录下的文件。
  - 当输入 `@/`开头时, 只读取`src/`中的路径。
  - 当输入 `/`开头时, 读取根目录的文件。

2. 常规项目
  - 当输入 `./` 开头时, 读取当前目录下的文件。
  - 当输入 `/`开头时, 读取根目录的文件。