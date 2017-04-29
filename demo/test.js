//原生JavaScript封装apply方法
Function.prototype.Apply = function(context) {
    var context = context || window
    var args = arguments[1] //获取传入的数组参数
    context.fn = this //假想context对象预先存在名为fn的属性，如果这个对象已经有了fn这个属性我也不管了
    if (args == void 0) { //没有传入参数直接执行
        return context.fn()
    }
    var fnStr = 'context.fn('
    for (var i = 0; i < args.length; i++) {
        fnStr += i == args.length - 1 ? args[i] : args[i] + ','
    }
    fnStr += ')'
    var returnValue = eval(fnStr) //还是eval强大
    delete context.fn //执行完毕之后删除这个属性
    return returnValue
}

//原生JavaScript封装call方法
Function.prototype.Call = function(context) {
    return this.Apply([].shift.Apply(arguments), arguments) //巧妙地运用上面已经实现的Apply函数
}

//原生JavaScript封装bind方法
Function.prototype.Bind = Function.prototype.bind || function(context) {
    var self = this
    var args = [].slice.call(arguments, 1)
    var f = function() {}
    f.prototype = self.prototype //new执行函数保证原型链也能指向Function.prototype
    var bound = function() {
        context = this instanceof Function ? self : (context || this)
        self.Apply(context, args.concat([].slice.call(arguments)))
    }
    bound.prototype = new f()
}

//测试
var obj = {
    a: 1
}

function test() {
    console.log(this.a + arguments[1])
}
//测试Apply方法
test.Apply(obj, [1, 2, 3, 4])
    //测试Call方法
test.Call(obj, 1, 2, 3, 4)
    //测试Bind方法
var b = test.Bind(obj, 1, 2)
b()
