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

// function move1(){
//     states.push(states[0])
//     states.splice(0,1)
//     lis.each(function(index,ele){
//         var state=states[index]
//        $(ele).css('z-index',state.Zindex).finish().animate(state,1000)
//     })
// }

// setInterval(move1,1000)



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

//封装为插件,插件能够使得只要使用这个插件就能被重复的使用效果,会产生什么样的问题?
// 1.插件中最好不要使用id,原因:插件是为了能够被重复使用,也就是说在一个页面上可能会重复调用,会造成页面冲突,并且id具有唯一性.
// 2.变量命名和方法的命名:states,time,move(),用户在使用这个插件的时候,可能还会引入自己创建的文件,也有这样的命名,那么就会产生冲突
// 3.标签class的值的问题:prev,next 这些class名太大众化了,大多数编写者都会使用这样的命名,势必会造成冲突
// 4.插件的文件命名:index.js,index.css这些命名也是大众化的,比如:jQuery.Slide.js
