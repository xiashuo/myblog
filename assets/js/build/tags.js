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
 * 加载右侧的tabs
 */

$(document).ready(function () {
    $.getJSON("blog_data.json", function (data, textStatus, jqXHR) {
        suiyan.tagsjson = suiyan.format_tags_data(data);
        // console.log(suiyan.tagsjson);
        //加载TAG 按钮
        var tag=suiyan.getQueryVariable('t')
        // console.log(tag)
        var $tags = $('.tags');
        if (tag ==false){
            for (let index = 0; index < suiyan.tagsjson.length; index++) {
                const element = suiyan.tagsjson[index];
                $tags.append('<button class="tag-bt btn btn-info btn-sm" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><span class="tagval">'+element.tag+'</span> <span class="badge badge-light">'+element.data.length+'</span></button>');
            }
        }
        else{
            $('.tagcad').fadeToggle(500);
            suiyan.tag_json = suiyan.get_tag_json(suiyan.tagsjson,tag);
            $tags.append('<button class="tag-bt btn btn-info btn-sm" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><span class="tagval">'+tag+'</span> <span class="badge badge-light">'+suiyan.tag_json.data.length+'</span></button>');
            $('.card-header').text(suiyan.tag_json.tag);
            var $tagul = $('.card-body > ul').html('');
            var lihtml = '';
            for (let index = 0; index < suiyan.tag_json.data.length; index++) {
                const element = suiyan.tag_json.data[index];
                $tagul.append('<li>'+element.title+'</li>')
                lihtml += '<li class="list-group-item"><a href="p.html?p='+element.url+'">'+element.title+'</a> <span class="meta" title="发布日期">'+element.time+'</span></li>';

            }
            $tagul.html(lihtml);

        }


        $('.tag-bt').click(function (e) {
            $(this).siblings(".btn").fadeToggle(500);
            $('.tagcad').fadeToggle(500);
            var val = $(this).find('.tagval').text();
            // alert(val);
            // var arr = null;
            suiyan.tag_json = suiyan.get_tag_json(suiyan.tagsjson,val);
            // console.log(suiyan.tag_json);
            $('.card-header').text(suiyan.tag_json.tag);
            var $tagul = $('.card-body > ul').html('');
            var lihtml = '';
            for (let index = 0; index < suiyan.tag_json.data.length; index++) {
                const element = suiyan.tag_json.data[index];
                $tagul.append('<li>'+element.title+'</li>')
                lihtml += '<li class="list-group-item"><a href="p.html?p='+element.url+'">'+element.title+'</a> <span class="meta" title="发布日期">'+element.time+'</span></li>';
                
            }
            $tagul.html(lihtml);
        });
        });
});



