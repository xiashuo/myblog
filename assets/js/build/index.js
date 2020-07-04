
$(document).ready(function () {
    //加载首页的blog数据
    $.getJSON("blog_data.json", function (blogdata, textStatus, jqXHR) {
        xiashuobad.blog_data = blogdata;
        // console.log(blogdata)
        $.when( //加载blog配置数据
            $.getJSON("config.json", function (data, textStatus, jqXHR) {
                xiashuobad.config = data;
            })).then(function () {
            // 翻页及首页调用数据
            $("#xiashuobadpage").jqPaginator({
                // totalPages: 100,//分页总数
                totalCounts: xiashuobad.blog_data.length, //设置分页的总条目数
                visiblePages: 1, //设置最多显示的页码数（例如有100页，当前第1页，则显示1 - 7页）
                pageSize: xiashuobad.config.blog_list, //设置每一页的条目数
                currentPage: 1, //当前页码
                prev: '<button type="button" id="pre_page" class="prev btn btn-primary">上一页</button>',
                next: '<button type="button" id="next_page" class="next btn btn-primary">下一页</button>',
                first: '<button type="button" id="first_page" class="prev btn btn-primary">首页</button>',
                last: '<button type="button" id="last_page" class="next btn btn-primary">尾页</button>',
                page: '<button type="button" class="page btn btn-primary">{{page}}/{{totalPages}} </button>',
                onPageChange: function (n) {
                    $('.data-list').html('');
                    var startp = xiashuobad.config.blog_list * (n - 1)
                    var endp = startp + xiashuobad.config.blog_list;
                    if (endp > xiashuobad.blog_data.length) {
                        endp = xiashuobad.blog_data.length
                    }
                    console.log(n)
                    for (let index = startp; index < endp; index++) {
                        const element = blogdata[index];
                        var mkurl1 = xiashuobad.geturl(element.url);

                        $.when(
                            $.get(mkurl1, function (data, status) {
                                // console.log(data)
                                showdata = data.substring(0, 350)
                                if (data.length > 350) {
                                    showdata += ' ......'
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
