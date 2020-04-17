/* BuildTime:January15,202010:50:49 */
var suiyan = {} //命名一个自己用的空间

//首页搜索结果
suiyan.getsearch = function (data, k) {
    var arr = [];
    data.forEach(function (item, i) {
        var key = item.title;
        console.log(item)
        if (k !== '' && key.indexOf(k) > -1) {
            arr.push(item)
        }
    });
    return arr;
}

//首页加载数据ajax地址拼装
suiyan.geturl = function (url) {
    var mkurl = './articles/' + url + '.md'; //组装ajaxURL地址
    return mkurl;
}

//日志归档排序
suiyan.formatData = function (data) {
    var arr = [];
    data.forEach(function (item, i) {
        var tmpDate = new Date(item.time.split('-').join('/'));//兼容safari 出现 invalid
        var month = tmpDate.getMonth() + 1;
        var year = tmpDate.getFullYear();
        if (i === 0) {
            var tmpObj = {};
            tmpObj.date = year + '年' + month + '月';
            // console.log(year);
            
            tmpObj.data = [];
            tmpObj.data.push(item);
            arr.push(tmpObj);
            
        } else {
            if (arr[arr.length - 1]['date'] === (year + '年' + month + '月')) {
                arr[arr.length - 1]['data'].push(item);
            } else {
                var tmpObj = {};
                tmpObj.date = year + '年' + month + '月';
                tmpObj.data = [];
                tmpObj.data.push(item);
                arr.push(tmpObj);
            }
        }

    });
    return arr;
}

//根据TAG重新分组数据
suiyan.format_tags_data = function (data) {
    var arr = []
    data.forEach(function (item, i) {
        var t = item.tag;
        // console.log(t);
        if (i === 0) {
            //第一次循环 创建一个TAG
            var tmpObj = {};
            tmpObj.tag = t;
            tmpObj.data = [];
            tmpObj.data.push(item);
            arr.push(tmpObj);
        } else {
            //如果不是第一次，就和上一次的比较TAG，如果相同，添加
            isok = true;
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (element['tag'] === t) {
                    element['data'].push(item);
                    isok = false;
                    break;
                }

            }

            if (isok) {
                var tmpObj = {};
                tmpObj.tag = t;
                tmpObj.data = [];
                tmpObj.data.push(item);
                arr.push(tmpObj);
            }
        }
    });
    console.log(arr);

    return arr;
}

//返回当前TAG相关的JSON数据
suiyan.get_tag_json = function (data, key) {
    var s = {};
    data.forEach(function (item, i) {
        if (item.tag == key) {
            s = item;
        }
    });
    return s;
}

/**
 * JS获取url参数
 * @param {*} variable 
 */
suiyan.getQueryVariable = function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return decodeURI(pair[1]);
        }
    }
    return (false);
}

/**
 * 站点页面模板
 */

// 左侧导航
// loadHtml('./templates/side.html','lt');//JavaScript原生AJAX
$(document).ready(function () {

    // footer.html
    $(".footer").load("assets/templates/footer.html", function (response, status, request) {
        if (status == "success")
            console.log("如果你能看到这里说明你已经很牛逼撩！");

    });

    //加载blog配置数据,并填充数据到页面
    $.getJSON("config.json", function (data, textStatus, jqXHR) {
        // alert(data.blog_name);
        //站点信息填充
        // $('#blogcss').attr("href", "assets/css/"+data.blogcss+".css");
        // $('#highlight').attr("href", "assets/plugins/highlight/styles/"+data.highlight+".css");

        suiyan.config = data;
        var metaheml = '<title>'+data.blog_name + data.meta_description+'</title>\
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
                var lihtml = $('<li class="nav-item hide"><a class="nav-link" href="' + data[i].url + '"><i class="fa fa-' + data[i].ico + ' fa-lg"></i> ' + data[i].text + '</a></li>');
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
        suiyan.blog_data = blogdata;

        // 搜索按钮
        $('.search').click(function (e) {
            var key = $('#skey').val();
            var sdata = suiyan.getsearch(suiyan.blog_data, key)
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

    });




});
$(document).ready(function () {
    //加载首页的blog数据
    $.getJSON("blog_data.json", function (blogdata, textStatus, jqXHR) {
        suiyan.blog_data = blogdata;
        // console.log(blogdata)
        $.when( //加载blog配置数据
            $.getJSON("config.json", function (data, textStatus, jqXHR) {
                suiyan.config = data;
            })).then(function () {
            // 翻页及首页调用数据
            $("#suiyanpage").jqPaginator({
                // totalPages: 100,//分页总数
                totalCounts: suiyan.blog_data.length, //设置分页的总条目数
                visiblePages: 1, //设置最多显示的页码数（例如有100页，当前第1页，则显示1 - 7页）
                pageSize: suiyan.config.blog_list, //设置每一页的条目数
                currentPage: 1, //当前页码
                prev: '<button type="button" class="prev btn btn-primary">上一页</button>',
                next: '<button type="button" class="next btn btn-primary">下一页</button>',
                page: '<button type="button" class="page btn btn-primary">{{page}}/{{totalPages}} </button>',
                onPageChange: function (n) {
                    $('.data-list').html('');
                    var startp = suiyan.config.blog_list * (n-1)
                    var endp = startp + suiyan.config.blog_list;
                    if (endp>suiyan.blog_data.length){
                        endp=suiyan.blog_data.length
                    }
                    console.log(n)
                    for (let index = startp; index < endp; index++) {
                        const element = blogdata[index];
                        var mkurl1 = suiyan.geturl(element.url);

                        $.when(
                            $.get(mkurl1, function (data, status) {
                                // console.log(data)
                                showdata=data.substring(0,350)
                                if (data.length>350){
                                    showdata +=' ......'
                                }
                                htmlString = '<div class="b_data list-group-item" style="height: 200px">' +
                                    showdata + '</div><br/>';
                                $('.data-list').append(htmlString);


                            }))
                    }
                }
            });
        });
    });
});
