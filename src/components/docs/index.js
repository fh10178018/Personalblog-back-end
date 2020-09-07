// 拉取该文件夹下所有文件信息
const filesMD = require.context('./', true, /\.md$/)
const filesMDNames = filesMD.keys()
const res = []
filesMDNames.map((item, index) => {
  const listObj = {}
  const listItemS = item.split('/')
  if (listItemS.length > 0) {
    listObj._id = index
    listObj.name = listItemS[1].replace('.md', '')
    listObj.docs = require(`@/components/docs/${listItemS[1]}`)
    listObj.children = []
    listObj.showChild = false
  }
  return res.push(listObj)
})

export default res
