/**
 *
 * 用来读取markdown内容并加载到页面中
 *
 */

var conname = xiashuobad.getQueryVariable('p'); //获得要加载Markdown文章的相对url。
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
            $(this).html("<ol><li>" + $(this).html().replace(/\n/g, "\n</li><li>") + "\n</li></ol>");
        });
        $("img").addClass("img-fluid");
        //修改博客文章页的title
        let str = $(".title").text();
        $("title").text(str);

        // 自动生成目录
        $('#directory').html('<a id="openHiddenLinkId" href="javascript:void(0)" isopen="0" style="display:block;float:right;z-index: 2000;">↗</a><p style="text-align: center;padding-bottom: 5px;color: #C7894F;">目录</p>');
        $("#openHiddenLinkId").click(function () {
            var isopen = $(this).attr("isopen");
            if (isopen == "1") {
                $('#directory').find("p,ul").show(200);
                $(this).attr("isopen", "0").html("↗");
            } else {
                $('#directory').find("p,ul").hide(200);
                $(this).attr("isopen", "1").html("↙");
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

        createPostDirectory = function (article, directory, isDirNum) {
            console.log(article.childNodes)
            var contentArr = [],
                titleId = [],
                levelArr, root, level,
                currentList, list, li, link, i, len;
            levelArr = (function (article, contentArr, titleId) {
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
                    dirNum.join('.') + ' ' + contentArr[i];
                li.appendChild(link);
                currentList.appendChild(li);
            }
            directory.appendChild(root);
        };
        createPostDirectory(document.getElementById('rt'), document.getElementById('directory'), true);
    })

});



