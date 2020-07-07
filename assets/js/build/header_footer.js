/**
 * 站点页面模板
 */

$(document).ready(function () {
    // 左侧共用部分side.html
    $(".header").load("assets/templates/side.html", function (response, status, request) {
        if (status == "success")
            console.log("侧边页面导入成功！")
    });
    // footer.html
    $(".footer").load("assets/templates/footer.html", function (response, status, request) {
        if (status == "success")
            console.log("底部页面导入成功！");

    });

    //加载blog配置数据,并填充数据到页面
    $.getJSON("config.json", function (data, textStatus, jqXHR) {
        // alert(data.blog_name);
        //站点信息填充
        // $('#blogcss').attr("href", "assets/css/"+data.blogcss+".css");
        // $('#highlight').attr("href", "assets/plugins/highlight/styles/"+data.highlight+".css");

        xiashuobad.config = data;
        var metaheml = '<title>' + data.blog_name + data.meta_description + '</title>\
        <meta name="keywords" content="' + data.meta_keywords + '">\
        <meta name="description" content="' + data.meta_description + '">\
        <meta name="author" content="' + data.blog_author + '">';
        $("meta[name='viewport']").after(metaheml);

        //blog基本信息
        $(".blog-name a").text(data.blog_name); //bolg名称
        $(".blog-description").text(data.blog_description);
        $('.profile-image').attr("src", data.profile_image);

        //循环添加SNS
        // (function (data, ul) {
        //     for (let i = 0; i < data.length; i++) {
        //         var lihtml = $('<li><a class="hide" href="' + data[i].url + '" target="blank_blank"><i class="fa fa-' + data[i].ico + ' fa-lg"></li></a></i>');
        //         ul.append(lihtml);
        //
        //     }
        //
        // })(data.blog_sns, $(".social-list"));

        //循环添加导航
        (function (data, ul) {
            for (let i = 0; i < data.length; i++) {
                var lihtml = $('<li class="nav-item hide"><a class="nav-link" id="' + data[i].ico + '" href="' + data[i].url + '"><i class="fa fa-' + data[i].ico + ' fa-lg"></i> ' + data[i].text + '</a></li>');
                ul.append(lihtml);

            }

        })(data.nav, $(".blog-nav"));

        //隐藏元素的动画
        var scon = 100
        $('.hide').each(function (index, element) {
            $(this).fadeIn(scon);
            scon += 100;

        });

    });


    $.getJSON("blog_data.json", function (blogdata, textStatus, jqXHR) {
        xiashuobad.blog_data = blogdata;

        // 搜索按钮
        $('.search').click(function (e) {
            var key = $('#skey').val();
            var sdata = xiashuobad.getsearch(xiashuobad.blog_data, key)
            var shtmlstr = '';
            if (sdata != '') {
                shtmlstr += '<ul class="car-list navbar-nav">'
                for (let index = 0; index < sdata.length; index++) {
                    const el = sdata[index];
                    shtmlstr += '<li class="list-group-item"><a href="p.html?p=' + el.url + '">' + el.title + '</a> <span title="发布日期">' + el.time + '</span></li>';
                }
                shtmlstr += '</ul>'
            } else {
                shtmlstr = '<p>没有搜到任何结果哦！</p>'
            }
            $('.search-list').html(shtmlstr);

        });
        $('#skey').bind('keypress', function (event) {
            if (event.keyCode == "13") {
                //回车执行查询
                $('.search').click();
            }
        });
    });
    // 加载画布
    var cvs = document.getElementById("cvs");
    var ctx = cvs.getContext("2d");
    var cw = cvs.width = document.body.clientWidth;
    var ch = cvs.height = document.body.clientHeight;
//动画绘制对象
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var codeRainArr = []; //代码雨数组
    var cols = parseInt(cw / 14); //代码雨列数
    var step = 16;  //步长，每一列内部数字之间的上下间隔
    ctx.font = "bold 26px microsoft yahei"; //声明字体，个人喜欢微软雅黑

    function createColorCv() {
//画布基本颜色
        ctx.fillStyle = "#242424";
        ctx.fillRect(0, 0, cw, ch);
    }

//创建代码雨
    function createCodeRain() {
        for (var n = 0; n < cols; n++) {
            var col = [];
//基础位置，为了列与列之间产生错位
            var basePos = parseInt(Math.random() * 300);
//随机速度 3~13之间
            var speed = parseInt(Math.random() * 10) + 3;
//每组的x轴位置随机产生
            var colx = parseInt(Math.random() * cw)

//绿色随机
            var rgbr = 0;
            var rgbg = parseInt(Math.random() * 255);
            var rgbb = 0;
//ctx.fillStyle = "rgb("+r+','+g+','+b+")"

            for (var i = 0; i < parseInt(ch / step) / 2; i++) {
                var code = {
                    x: colx,
                    y: -(step * i) - basePos,
                    speed: speed,
                    // text : parseInt(Math.random()*10)%2 == 0 ? 0 : 1 //随机生成0或者1
                    text: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "s", "t", "u", "v", "w", "x", "y", "z"][parseInt(Math.random() * 11)], //随机生成字母数组中的一个
                    color: "rgb(" + rgbr + ',' + rgbg + ',' + rgbb + ")"
                }
                col.push(code);
            }
            codeRainArr.push(col);
        }
    }

//代码雨下起来
    function codeRaining() {
//把画布擦干净
        ctx.clearRect(0, 0, cw, ch);
//创建有颜色的画布
//createColorCv();
        for (var n = 0; n < codeRainArr.length; n++) {
//取出列
            col = codeRainArr[n];
//遍历列，画出该列的代码
            for (var i = 0; i < col.length; i++) {
                var code = col[i];
                if (code.y > ch) {
                    //如果超出下边界则重置到顶部
                    code.y = 0;
                } else {
                    //匀速降落
                    code.y += code.speed;
                }

//1 颜色也随机变化
//ctx.fillStyle = "hsl("+(parseInt(Math.random()*359)+1)+",30%,"+(50-i*2)+"%)";

//2 绿色逐渐变浅
// ctx.fillStyle = "hsl(123,80%,"+(30-i*2)+"%)";

//3 绿色随机
// var r= 0;
// var g= parseInt(Math.random()*255) + 3;
// var b= 0;
// ctx.fillStyle = "rgb("+r+','+g+','+b+")";

//4 一致绿
                ctx.fillStyle = code.color;


//把代码画出来
                ctx.fillText(code.text, code.x, code.y);
            }
        }
        requestAnimationFrame(codeRaining);
    }

//创建代码雨
    createCodeRain();
//开始下雨吧 GO>>
    requestAnimationFrame(codeRaining);
});