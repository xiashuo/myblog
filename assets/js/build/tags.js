/**
 * 加载右侧的tabs
 */

$(document).ready(function () {
    $.getJSON("blog_data.json", function (data, textStatus, jqXHR) {
        xiashuobad.tagsjson = xiashuobad.format_tags_data(data);
        // console.log(xiashuobad.tagsjson);
        //加载TAG 按钮
        var tag=xiashuobad.getQueryVariable('t')
        // console.log(tag)
        var $tags = $('.tags');
        if (tag ==false){
            for (let index = 0; index < xiashuobad.tagsjson.length; index++) {
                const element = xiashuobad.tagsjson[index];
                $tags.append('<button class="tag-bt btn btn-info btn-sm" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><span class="tagval">'+element.tag+'</span> <span class="badge badge-light">'+element.data.length+'</span></button>');
            }
        }
        else{
            $('.tagcad').fadeToggle(500);
            xiashuobad.tag_json = xiashuobad.get_tag_json(xiashuobad.tagsjson,tag);
            $tags.append('<button class="tag-bt btn btn-info btn-sm" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><span class="tagval">'+tag+'</span> <span class="badge badge-light">'+xiashuobad.tag_json.data.length+'</span></button>');
            $('.card-header').text(xiashuobad.tag_json.tag);
            var $tagul = $('.card-body > ul').html('');
            var lihtml = '';
            for (let index = 0; index < xiashuobad.tag_json.data.length; index++) {
                const element = xiashuobad.tag_json.data[index];
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
            xiashuobad.tag_json = xiashuobad.get_tag_json(xiashuobad.tagsjson,val);
            // console.log(xiashuobad.tag_json);
            $('.card-header').text(xiashuobad.tag_json.tag);
            var $tagul = $('.card-body > ul').html('');
            var lihtml = '';
            for (let index = 0; index < xiashuobad.tag_json.data.length; index++) {
                const element = xiashuobad.tag_json.data[index];
                $tagul.append('<li>'+element.title+'</li>')
                lihtml += '<li class="list-group-item"><a href="p.html?p='+element.url+'">'+element.title+'</a> <span class="meta" title="发布日期">'+element.time+'</span></li>';
                
            }
            $tagul.html(lihtml);
        });
        });
});



