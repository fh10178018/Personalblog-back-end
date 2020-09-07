## Button 按钮

**包含了常用的 button 按钮**

### 基本用法

#### 按钮类型
支持 `default`、`primary`、'success'、`warn` 三种类型，默认为 `default`

```html
<Button type="default">默认按钮</Button>
<Button type="theme">主题按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="warn">警告按钮</Button>
```
#### 按钮尺寸
支持 `large`、`normal`、`small` 四种尺寸，默认为 `normal`
```html
<Button size="large">大号按钮</Button>
<Button size="normal">普通按钮</Button>
<Button size="small">小号按钮</Button>
```
#### 禁用按钮
通过 `disabled` Boolean属性来禁用按钮
```html
<Button disabled>禁用按钮</Button>
```
#### 加载按钮
通过 `loading` Boolean属性来控制按钮是否定位也页面底部
```html
<Button loading>确定按钮</Button>
<Button loading="true">确定按钮</Button>
```
#### 按钮边框类型
通过 `round`、`circle` Boolean属性来控制按钮是否定位也页面底部
```html
<Button round>圆角按钮</Button>
<Button circle>圆形按钮，建议里面为方型元素</Button>
```
#### 按钮自定义样式
通过 `style` 属性来控制按钮是否定位也页面底部
```html
<Button style="{height:200px}">自定义高度为200px的按钮</Button>
```

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type  | 按钮类型    | string   | `default` `primary` `warn`  `success`| `default` |
| size  | 按钮 大小    | string   | `normal` `large` `small` | `normal` |
| disabled  | 按钮是否禁用    | boolean   | — | `false` |
| loading  | 按钮是否加载中，同时禁用    | boolean   | — | `false` |
| round  | 是否为圆角按钮   | boolean   | — | `false` |
| circle  | 是否为圆形按钮，推荐插槽元素为方形    | boolean   | — | `false` |
| style  | 按钮自定义样式    | object   | — | {} |

