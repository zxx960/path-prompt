const vscode = require('vscode')
const { resolve, dirname, join } = require('path')
const fs = require('fs')
const FILE = vscode.CompletionItemKind.File
const FOLDER = vscode.CompletionItemKind.Folder
const imaType = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.svg', '.ico']  //支持的图片格式
/**
 * [isdir 判断目标是否为目录]
 */
function isdir(path) {
  try {
    return fs.statSync(path).isDirectory()
  } catch (err) {
    return false
  }
}

/**
 * 列出目录
 */
function ls(dir) {
  try {
    let list = fs.readdirSync(dir)
    return list.filter(it => !it.startsWith('.')).map(it => resolve(dir, it))
  } catch (err) {
    return []
  }
}

function getPrefixTxt(line, idx) {
  let txt = line.slice(0, idx)
  let n = txt.lastIndexOf('"') > -1 ? txt.lastIndexOf('"') : txt.lastIndexOf("'")
  let r
  txt = txt.slice(n + 1)
  if (txt) {
    // 判断匹配前缀是否被包含在引号中
    r = new RegExp(`(['"])${txt}\\1`)
    if (r.test(line)) {
      return txt
    }
  }
  return ''
}

function item(text, type, p, path) {
  let CompletionItem = new vscode.CompletionItem(text, type)
  CompletionItem.range = new vscode.Range(p, p)
  if (isdir(path)) {  //如果是目录就自动打开目录
    CompletionItem.command = {
      command: 'default:type',
      title: 'triggerSuggest',
      arguments: [
        {
          text: '/',
        },
      ],
    };
  }

  if (path) {
    imaType.forEach(item => {
      if (path.endsWith(item)) {
        let image = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![image](${vscode.Uri.file(path)}|width=200)`
        CompletionItem.documentation = new vscode.MarkdownString(image)
      }
    })
  }
  return CompletionItem
}

let rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath  //项目根目录
let mappings = vscode.workspace.getConfiguration('path-prompt').mappings
let extendWorkspace = {  //默认的路径映射'${workspaceRoot}'为项目的根目录
  "/": join(rootPath, '/'),
  "@": join(rootPath, '/src'),
}
for (let key in mappings) {
  extendWorkspace[key] = join(rootPath, mappings[key].replace('${workspaceRoot}', ''))
}
class AutoPath {
  provideCompletionItems(doc, pos) {
    let currDir = dirname(doc.fileName)
    let inputTxt = doc.lineAt(pos).text // 获取光标所在的整行代码
    let list = []
    let currDirFixed = '' //当前路径
    inputTxt = getPrefixTxt(inputTxt, pos.character)
    currDirFixed = join(currDir, inputTxt)

    if (inputTxt.startsWith('./') || inputTxt.startsWith('../')) {
      list.push(...ls(currDirFixed))
    } else {
      for (let key in extendWorkspace) {
        if (inputTxt.startsWith(key)) {
          currDirFixed = join(extendWorkspace[key], inputTxt.slice(key.length))
          list.push(...ls(currDirFixed))
        }
      }
    }

    list = list
      .filter(it => it !== doc.fileName)
      .map(k => {
        let path = k
        let t = isdir(k) ? FOLDER : FILE
        k = k.slice(currDirFixed.length)
        return item(k, t, pos, path)
      })

    if (list.length) {
      list.unshift(item('', FILE, pos))
      return Promise.resolve(list)
    }
  }
}

exports.activate = function (ctx) {
  let ap = new AutoPath()
  let auto = vscode.languages.registerCompletionItemProvider('*', ap, '"', "'", '/')
  ctx.subscriptions.push(auto)
  // console.log('启动成功')
}

exports.deactivate = function () { }
