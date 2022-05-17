# path-prompt
> 自动提示文件路径, 方便引入项目为的文件.

[![Version](https://vsmarketplacebadge.apphb.com/version-short/yutent.auto-path.svg)](https://marketplace.visualstudio.com/items?itemName=yutent.auto-path)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-short/yutent.auto-path.svg)](https://marketplace.visualstudio.com/items?itemName=yutent.auto-path)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/yutent.auto-path.svg)](https://marketplace.visualstudio.com/items?itemName=yutent.auto-path)



## 注意事项
1 默认配置@/为src目录
2 更多配置到settings.json中配置

例如：
"path-prompt.mappings": {  
  "components/": "${workspaceRoot}/src/components"  //'${workspaceRoot}'为项目的根目录
},
