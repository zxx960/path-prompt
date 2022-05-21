# path-prompt
- 自动提示文件路径,图片预览

![演示](https://cdn.jsdelivr.net/gh/zxx960/image-hosting@master/演示.gif)
## 配置别名路径
- 到settings.json中配置
- 例如：
```javascript
"path-prompt.pathMappings": {  
    "@": "${folder}/src", // alias for /test
},
```
## import或着require引入图片不能预览
- 本插件import或着require加载路径默认不显示扩展名导致的
- 到settings.json中配置
```javascript
"path-prompt.extensionOnImport":true
```
## 注意事项
- 本插件是基于Path Autocomplete进行二次开发，所有配置项与原插件一致
- 配置settings.jsons时需要把path-autocomplete换成path-prompt，如上示例
- 更多文档查看[https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete]
