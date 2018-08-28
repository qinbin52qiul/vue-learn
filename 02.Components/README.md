## 组件创建和注册

**基本步骤**

Vue.js的组件的使用有3个步骤：创建组件构造器、注册组件和使用组件。

![](https://images2015.cnblogs.com/blog/341820/201606/341820-20160629071630656-710782242.png)

**实例**

```html
<!DOCTYPE html>
<html>

<body>
    <div id="app">
        <!-- 3、#app 是 vue 实例挂载的元素，应该在挂载元素范围内使用组件 -->
        <my-component></my-component>
    </div>
</body>
<script src="js/vue.js"></script>
<script>
    // 1、创建一个组件构造器
    var myComponent = Vue.extend({
        template: '<div>This is my first component!</div>'
    })

    // 2、注册组件，并指定组件的标签，组件的 HTML 标签为 <my-component>
    Vue.component("my-component", myComponent)

    new Vue({
        el: '#app'
    })
</script>

</html>
```

**理解组件创建和注册步骤**

> 1. `Vue.extend()` 是 Vue 构造器的扩展，调用 `Vue.extend()` 创建的是一个组件构造器。
> 2. `Vue.extend()` 构造器有一个选项对象，选项对象的 `template` 属性用于定义组件要渲染的 HTML。
> 3. 使用 `Vue.component()` 注册组件时，需要提供 2 个参数，第 1 个参数是组件的标签，第 2 个组件的构造器。
> 4. 组件应该挂载到某个 Vue 实例下，否则组件不生效。



