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
            // if (arr[arr.length - 1]['tag'] === t) {
            //     arr[arr.length - 1]['data'].push(item);
            // } else {
            //     var tmpObj = {};
            //     tmpObj.tag = t;
            //     tmpObj.data = [];
            //     tmpObj.data.push(item);
            //     arr.push(tmpObj);
            // }

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
            return pair[1];
        }
    }
    return (false);
}


$(document).ready(function () {

    $.getJSON("blog_data.json", function (data, textStatus, jqXHR) {
        // console.log(suiyan.formatData(data));
        suiyan.formatjson = suiyan.formatData(data); //格式化数据
        var $cl = $('.car-list');

        for (let index = 0; index < suiyan.formatjson.length; index++) {
            const element = suiyan.formatjson[index];
            //  console.log(element.data);
            var lihtml = '';
            for (let index = 0; index < element.data.length; index++) {
                const el = element.data[index];
                lihtml += '<li class="list-group-item"><a href="p.html?p=' + el.url + '">' + el.title + '</a> <span title="发布日期">' + el.time + '</span></li>';
                suiyan.con++;

            }
            // alert(lihtml)
            $cl.append('<li class="nav-item "><span class="car-yearmonth meta" style="cursor:pointer;"><i class="fa fa-list-ul" aria-hidden="true"></i> ' + element.date + ' <span class="meta" title="文章数量">(共' + element.data.length + '篇文章)</span></span><ul class="car-monthlisting list-group" style="display: block;">' + lihtml + '</ul></li>');
        }

        $('.archives-meta').html('<span class="meta">共有文章:' + data.length + '篇,最后更新:' + data[0].time + '</span>');


        $('.car-all').click(function () {
            $('.car-monthlisting').slideToggle(500);
            $(this).html() == "折叠所有" ? $(this).text('展开所有') : $(this).text('折叠所有');

        });

        $('.car-yearmonth').click(function () {
            // alert('ok');
            $(this).next().slideToggle(500);

        });


    });


});
