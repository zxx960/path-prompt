# path-prompt
- 自动提示文件路径,图片预览

![演示](https://cdn.jsdelivr.net/gh/zxx960/image-hosting@master/演示.gif)
## 注意事项
- 默认配置@/为src目录
- 更多配置到settings.json中配置
- 例如：
```javascript
"path-prompt.mappings": {  
  "public": "${workspaceRoot}/public"  //'${workspaceRoot}'为项目的根目录
}
```
- 如果无效，请卸载其他路径提示插件再试
