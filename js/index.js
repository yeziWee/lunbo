// 首先可以将整体封装成一个匿名自运行函数
(function () {
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

    //将状态和位置赋给li
    var lis = $('#box li');

    function move() {
        lis.each(function (index, ele) {
            var state = states[index]
            $(ele).css('z-index', state.Zindex).finish().animate(state, 1000).find('img').css('opacity', state.opac)
        })
    }
    move()

    // 下一张

    function next() {
        states.unshift(states.pop())
        move()
    }
    $('#box .next').click(function () {
        // 原理:把数组中的最后一个元素移动到数组中的第一个
        next()
    })
    $('#box .prev').click(function () {
        // 原理:把数组的第一个元素移动到最后一位
        states.push(states.shift())
        move()
    })

    // 自动轮播

    var time = null;

    function autoPlay() {
        time = setInterval(function () {
            next()
        }, 1000)
    }
    autoPlay()

    $('section').add('li').hover(function () {
        clearInterval(time)
    }, function () {
        autoPlay()
    })


})()
// 变量作用域问题
// 1.全局域[window]    2.函数域[function]
// 1.全局域:从页面被打开之后到页面关闭之前都是始终存在的
// 2.函数域:存在于函数被调用的一瞬间(也不一定,考虑到闭包的存在)
// 闭包作用:可以保留函数的作用域(所以move()可以使用当前自运行函数当中的states)
// 闭包产生的必要条件:函数里面套函数(内层的函数要使用外部函数的变量)
//全局变量会产生闭包吗?
// 不会,因为全局变量存在全局域
