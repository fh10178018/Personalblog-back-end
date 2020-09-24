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

### InputString Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type  | 按钮类型    | string   | `text` `password` | `text` |
| v-model | 绑定值    | string   | - | - |
| suffixIcon | 自定义后缀按钮样式 | string   | - | - |
| size  | 输入框大小    | string   | `normal` `large` `small` | `normal` |
| maxlength  | 最大输入长度   | number   | — | — |
| minlength  | 最小输入长度    | number   | — | — |
| disabled  | 是否被禁用   | boolean   | — | `false` |
| readonly  | 是否只读  | boolean   | — | `false` |
| validateEvent  | 是否开启验证事件  | boolean   | — | `true` |
| require  | 是否必填  | boolean   | — | `false` |
| clearable  | 是否显示可清空图标，仅在`type='text'`   | boolean   | — | `true` |
| showPassword  | 是否显示切换password，仅在`type='password'`   | boolean   | — | `true` |
| placeholder  | 输入框 placeholder属性   | String   | — | — |
