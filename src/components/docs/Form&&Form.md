## InputString 输入框

**包含了常用的 InputString 字符串输入框**

### 基本用法

#### 按钮类型
支持 `text`、`password` 两种类型，默认为 `text`
```html
<InputString type="text">正常字符串输入框</InputString>
<InputString type="password">密码框</InputString>
```

#### 输入框尺寸
支持 `large`、`normal`、`small` 三种尺寸，默认为 `normal`
```html
<InputString size="large">大号输入框</InputString>
<InputString size="normal">普通输入框</InputString>
<InputString size="small">小号输入框</InputString>
```

#### 禁用输入框
通过 `disabled` 来禁用输入框
```html
<InputString disabled>禁用按钮</InputString>
```

#### 输入框是否只读
通过 `readonly` 来是输入框只读
```html
<InputString readonly>禁用按钮</InputString>
```

#### 输入框是否显示清除按钮
通过 `clearable` 显示清除按钮
```html
<InputString clearable>禁用按钮</InputString>
```

#### 自定义后缀按钮样式
通过 `suffixIcon` 来控制按钮是否定位也页面底部
```html
<InputString suffixIcon="fa-close">自定义关闭按钮</Button>
```
#### 输入框 placeholder
通过 `placeholder` 来决定该输入框的提示内容
```html
<InputString placeholder="账号">自定义关闭按钮</Button>
```

#### 输入框验证是否必须填
通过 `require` 来决定是否必须填
```html
<InputString require>输入不能为空</Button>
```

#### 输入框验证是否符合一定的长度
通过 `minlength` `maxlength`来决定长度范围，注意必选在require的情况下，该验证才会生效
```html
<InputString require minlength="3" maxlength="10">输入长度为3-10</Button>
```

### Form Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| model  | 表单数据对象    | object  | - | - |
| rules | 表单验证规则    | object   | - | - |
| size | 表单内部组件的尺寸 | string   | `normal` `large` `small` | `normal` |

### Form Methods

| 参数      | 说明    | 参数      |
|---------- |-------- |---------- |
| validate  | 对整个表单进行验证，参数未回调函数，该回调函数在验证结束后被调用，并传入两个参数`验证是否成功`、`未通过的验证信息`。若不传入回调函数则会返回一个promise    | Function(callback: Function(boolean, object))  |
| resetFields | 对整个表单进行重置，对表单数据对象值和进行重置，并移除验证结果    | -  |
| clearValidate | 根据传参清除验证结果，如果参数为字符串和数组，那便指定或者遍历所有符合的实例，一一移除结果。如果没有任何参数，则默认全删 | Function(props: array | string)   |

### Form Events

| 事件名称     | 说明    | 回调参数      |
|---------- |-------- |---------- |
|validate   |当表单验证后触发，两个参数`验证是否成功`、`未通过的验证信息`| boolean, object |
|form-item-add|当有需验证的实例加入时触发， 参数为需要删除的实例| object|
|form-item-remove|当移除验证实例时触发， 参数为需要添加的实例| object|

### FormItem Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| rulesName  | 为model表单数据的字段名称，在需要验证的时候，一定要命名，匹配验证，负责一律视为验证通过    | string  | model表单数据中的字段名称 | - |
| required | 是否必填，如不设置，则会根据校验规则自动生成    | boolean   | - | false |
| showMessage | 是否显示校验错误信息 | boolean   | - | true |
