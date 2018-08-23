// 首先可以将整体封装成一个匿名自运行函数
(function ($) {
    // 本函数每次调用只负责一个轮播图的功能
    // 也就是说只会产生一个轮播,这个函数的作用域只能分配给一个轮播图
    // 所以要求在调用本函数的时候请务必将当前轮播图的标签传递过来
    var slide = function (ele,options) {
        // 转为jQuery 标签对象
        var $ele = $(ele)
        // 默认的设置选项 
        var setting = {
            // 控制刚刚炸开的时间
            delay: 1000,
            // 控制定时器的时间,轮播速度
            speed: 2000,
        }
        // 对象合并
        // para1:Boolean类型,是否深度合并对象,默认值是false,若为true,且多个对象性的某个
        // 同名属性也是对象,则该"属性对象"的属性也将进行合并
        // para2,para3.....N都为合并的对象
        $.extend(true,setting,options)
        // 规定好每张图片处于的位置和状态
        var states = [{
                Zindex: 1,
                width: 120,
                height: 150,
                top: 69,
                left: 134,
                opac: 0.2
            }, {
                Zindex: 2,
                width: 130,
                height: 170,
                top: 59,
                left: 0,
                opac: .5
            }, {
                Zindex: 3,
                width: 170,
                height: 218,
                top: 24,
                left: 110,
                opac: 0.7
            },
            {
                Zindex: 4,
                width: 224,
                height: 228,
                top: 0,
                left: 263,
                opac: 1
            }, {
                Zindex: 3,
                width: 170,
                height: 218,
                top: 24,
                left: 470,
                opac: 0.7
            }, {
                Zindex: 2,
                width: 130,
                height: 170,
                top: 59,
                left: 620,
                opac: .5
            }, {
                Zindex: 1,
                width: 120,
                height: 150,
                top: 69,
                left: 500,
                opac: 0.2
            }
        ]
        var lis=$(ele).find('li')

        function move(){
            lis.each(function(index,item){
                var state=states[index];
                $(item).css('z-index',state.Zindex).finish().animate(state,setting.delay).find('img').css('opacity',state.opac)
            })
        }
        move()
        // 下一张
        function next(){
            states.unshift(states.pop())
            move()
        }
        // 上一张
        function prev(){
            states.push(states.shift())
            move()
        }
        $(ele).find('.slide-prev').click(function(){
            prev()
        })
        $(ele).find('.slide-next').click(function(){
            next()
        })
        // 自动轮播
        var time = null
        function autoPlay(){
            time=setInterval(function(){
                next()
            },setting.speed);
        }
        autoPlay()
        // 停止轮播
        $ele.find('section').add(lis).hover(function(){
            clearInterval(time)
        },function(){
            autoPlay()
        })
    }
    $.fn.ZYSlide =function(options){
        $(this).each(function(i,ele){
            slide(ele,options)
        })
        return this;
    }

})(jQuery)

//用jQuery封装插件的几种写法
// 插件类写法:
// $.fn.customFun=function(){
//      自定义插件代码
// }
// 用法:
// $('div').customFun()

//工具类的写法  $.ajax
// $.customFun=function(){
//     // 自定义工具类的代码

// }
// 用法:
    // $.customFun()

// 变量作用域问题
// 1.全局域[window]    2.函数域[function]
// 1.全局域:从页面被打开之后到页面关闭之前都是始终存在的
// 2.函数域:存在于函数被调用的一瞬间(也不一定,考虑到闭包的存在)
// 闭包作用:可以保留函数的作用域(所以move()可以使用当前自运行函数当中的states)
// 闭包产生的必要条件:函数里面套函数(内层的函数要使用外部函数的变量)
//全局变量会产生闭包吗?
// 不会,因为全局变量存在全局域