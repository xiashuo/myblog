/* BuildTime:January15,202010:50:49 */
var suiyan = {} //命名一个自己用的空间




//首页搜索结果
suiyan.getsearch = function (data, k) {
    var arr = [];
    data.forEach(function (item, i) {
        var key = item.title;
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
    // console.log(arr);

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

// 左侧导航导航
// loadHtml('./templates/side.html','lt');//JavaScript原生AJAX
$(document).ready(function () {

    // footer.html
    $(".footer").load("assets/templates/footer.html", function (response, status, request) {
        if (status == "success")
            console.log("如果你能看到这里说明你已经很牛逼撩！");

    });

    //加载blog配置数据,并填充数据到页面
    $.getJSON("config.json", function (data, textStatus, jqXHR) {
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

        // //循环添加SNS
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
                var lihtml = $('<li class="nav-item hide"><a class="nav-link" id="'+data[i].ico+'" href="' + data[i].url + '"><i class="fa fa-' + data[i].ico + ' fa-lg"></i> ' + data[i].text + '</a></li>');
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
/**
 * 
 * 用来读取markdown内容并加载到页面中
 * 
 */

var conname = suiyan.getQueryVariable('p'); //获得要加载Markdown文章的相对url。
// console.log(conname)
if (conname == false) conname = 0;
var mkurl = './articles/' + conname + '.md'; //组装URL地址
var inx = 1;


// loadMarkdown(mkurl,'rt');//JS 原生AJAX加载.MD。
$(document).ready(function () {

    $.when(
        $.get(mkurl, function (data, status) {
            // console.log(marked(data));
            $("#rt").html(marked(data)); //Markdown解析并加载日志

        }),
        $.getJSON("blog_data.json",
            function (data, textStatus, jqXHR) {
                // console.log(data)
                var bcon = data.length;
                var inx = data.findIndex((item) => item['url'] == conname);
                // console.log(inx)

                if (inx <= 0) {
                    $('.pr').html('到头啦！(*￣︶￣)');
                } else {
                    var el = data[inx - 1]
                    var ltitle = el.title;
                    var lurl = 'p.html?p=' + data[inx - 1].url;
                    $('.pr').html('<a href="' + lurl + '">' + ltitle + ' <i class="fa fa-long-arrow-left" aria-hidden="true"></i> <i class="fa fa-long-arrow-left" aria-hidden="true"></i></a> ');
                }

                if (inx >= bcon - 1) {
                    $('.ne').html('到头啦！(*￣︶￣)');
                } else {
                    var el = data[inx + 1]
                    var rtitle = el.title;
                    var rurl = 'p.html?p=' + data[inx + 1].url;
                    $('.ne').html('<a href="' + rurl + '"> <i class="fa fa-long-arrow-right" aria-hidden="true"></i> <i class="fa fa-long-arrow-right" aria-hidden="true"></i>' + rtitle + '</a>');

                }

            }
        )
    ).then(function () {
        //判断AJAX加载完毕加载代码美化CSS
        $('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
            $(this).html("<ol><li>" + $(this).html().replace(/\n/g,"\n</li><li>") +"\n</li></ol>");
        });
        $("img").addClass("img-fluid");
        //修改博客文章页的title
        let str = $(".title").text();
        $("title").text(str);

        // 自动生成目录
        $('#directory').html('<a id="openHiddenLinkId" href="javascript:void(0)" isopen="0" style="display:block;float:right;z-index: 2000;">↗</a><p style="text-align: center;padding-bottom: 5px;color: #C7894F;">目录</p>');
        $("#openHiddenLinkId").click(function(){
                var isopen = $(this).attr("isopen");
                if(isopen == "1"){
                  $('#directory').find("p,ul").show(200);
                  $(this).attr("isopen","0").html("↗");
                }else{
                  $('#directory').find("p,ul").hide(200);
                  $(this).attr("isopen","1").html("↙");
                }
        });

        var postChildren = function children(childNodes, reg) {
            var result = [],
            isReg = typeof reg === 'object',
            isStr = typeof reg === 'string',
            node, i, len;
            for (i = 0, len = childNodes.length; i < len; i++) {
                node = childNodes[i];
                // console.log(node)
                // console.log(childNodes.length)
                if ((node.nodeType === 1 || node.nodeType === 9) &&
                    (!reg ||
                    isReg && reg.test(node.tagName.toLowerCase()) ||
                    isStr && node.tagName.toLowerCase() === reg)) {
                    result.push(node);
                }
            }
            // console.log(childNodes)
            return result;
        };

        createPostDirectory = function(article, directory, isDirNum) {
            console.log(article.childNodes)
            var contentArr = [],
            titleId = [],
            levelArr, root, level,
            currentList, list, li, link, i, len;
            levelArr = (function(article, contentArr, titleId) {
                var titleElem = postChildren(article.childNodes, /^h\d$/),
                levelArr = [],
                lastNum = 1,
                lastRevNum = 1,
                count = 0,
                guid = 1,
                id = 'directory' + (Math.random() + '').replace(/\D/, ''),
                lastRevNum, num, elem;
                // console.log(titleElem)
                while (titleElem.length) {
                    elem = titleElem.shift();
                    contentArr.push(elem.innerHTML);
                    num = +elem.tagName.match(/\d/)[0];
                    if (num > lastNum) {
                        levelArr.push(1);
                        lastRevNum += 1;
                    } else if (num === lastRevNum ||
                        num > lastRevNum && num <= lastNum) {
                        levelArr.push(0);
                        lastRevNum = lastRevNum;
                    } else if (num < lastRevNum) {
                        levelArr.push(num - lastRevNum);
                        lastRevNum = num;
                    }
                    count += levelArr[levelArr.length - 1];
                    lastNum = num;
                    elem.id = elem.id || (id + guid++);
                    titleId.push(elem.id);
                }
                if (count !== 0 && levelArr[0] === 1) levelArr[0] = 0;

                return levelArr;
            })(article, contentArr, titleId);
            currentList = root = document.createElement('ul');
            dirNum = [0];
            for (i = 0, len = levelArr.length; i < len; i++) {
                level = levelArr[i];
                if (level === 1) {
                    list = document.createElement('ul');
                    if (!currentList.lastElementChild) {
                        currentList.appendChild(document.createElement('li'));
                    }
                    currentList.lastElementChild.appendChild(list);
                    currentList = list;
                    dirNum.push(0);
                } else if (level < 0) {
                    level *= 2;
                    while (level++) {
                        if (level % 2) dirNum.pop();
                        currentList = currentList.parentNode;
                    }
                }
                dirNum[dirNum.length - 1]++;
                li = document.createElement('li');
                link = document.createElement('a');
                link.href = '#' + titleId[i];
                link.innerHTML = !isDirNum ? contentArr[i] :
                    dirNum.join('.') + ' ' + contentArr[i] ;
                li.appendChild(link);
                currentList.appendChild(li);
            }
            directory.appendChild(root);
        };
        createPostDirectory(document.getElementById('rt'),document.getElementById('directory'), true);
    })

});



