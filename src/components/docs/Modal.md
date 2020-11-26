## Modal 模态框

**在当前页面状态下，告知用户承载相关操作**

### 基本用法

**从顶部出现，默认3 秒后自动消失。**

#### 通知框类型
支持 `info`、`error`、`success`、`warnning` 三种类型，默认为 `info`

```html
<Button type="text" @click="dialogVisible = true">点击打开 Dialog</Button>

<Modal
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
  v-model:visible="dialogVisible"
  >
  <template v-slot:default>
    <span>这是一段信息</span>
  </template>
  <template v-slot:footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </template>
</Modal>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>
```
#### 通知框可手动关闭

默认时无法人工关闭，但是可以使用`showClose`字段，显示关闭按钮。

```html
<template>
  <Button @click="open1">这是一条不可以手动关闭的消息</Button>
  <Button @click="open2">这是一条可以关闭的消息</Button>
</template>

<script>
  import Message from 'components/common/Message/Message'
  export default {
        setup () {
            const open1 = () => {
                message('这是一条消息提示')
            }
            const open2 = () => {
                message({
                    showClose: true,
                    content: '恭喜你，这是一条可以关闭的消息'
                })
            }
            return {
                open1,
                open2
            }
        }
  }
</script>
```
#### 通知框可以自定义关闭时间
通常通知框都是在3s之后关闭，但是你可以使用`duration`字段自定义设置通知框的关闭时间
```html
<template>
  <Button @click="open1">这是一条默认消息提示</Button>
  <Button @click="open2">恭喜你，这是一条可以30s后关闭的消息</Button>
</template>

<script>
  import Message from 'components/common/Message/Message'
  export default {
        setup () {
            const open1 = () => {
                message('这是一条默认消息提示')
            }
            const open2 = () => {
                message({
                    duration: 30000,
                    content: '恭喜你，这是一条可以30s后关闭的消息'
                })
            }
            return {
                open1,
                open2
            }
        }
  }
</script>
```


### Attributes && Options

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| content | 消息文字 | string/number | — | — |
| type | 主题 | string | success/warning/info/error | info |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| showClose | 是否显示关闭按钮 | boolean | — | false |
| onClose | 关闭时的回调函数, 参数为被关闭的 message 实例 | function | — | — |

### actions
| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Message |
