// 导航站点设置
var Config = getMStr(function(){
	var sites;
/*
搜索引擎
	google,https://www.google.de/webhp?hl=zh-CN
国外邮箱
	outlook,https://www.outlook.com/
在线视频
	youtube,https://www.youtube.com/
国外微博
	twitter,https://twitter.com/

*/
});

/*标签转储*/
/*
网购专区
	京东, http://www.jd.com/,    http://www.jd.com/favicon.ico
	天猫, http://www.tmall.com/, http://a.tbcdn.cn/p/mall/base/favicon.ico
	淘宝,http://www.taobao.com/
综合辅助
	谷歌首页, http://www.google.cn/, http://www.google.cn/favicon.ico
	百度首页, http://www.baidu.com/, http://www.baidu.com/favicon.ico
	必应首页, http://www.bing.com/, http://www.bing.com/favicon.ico
	维基百科, http://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5,https://bits.wikimedia.org/favicon/wikipedia.ico
	网盘搜索, http://so.baiduyun.me/
	Telerik之grid,http://blog.csdn.net/lego2816/article/details/6782005
*/
// 搜索引擎设置
$(document).ready(function(){

	$('#Searchtype ul li a').on('click', function(){
		$(this).parent().addClass('active').siblings().removeClass('active');
		$('#Searchbox').submit();
	});
	
	$('#Searchbox').submit(function() {
		var type = $('#Searchtype li.active a').attr('lang');
		var que = $('input[name="wd"]').val();
		if(que !== '') {
			que=encodeURIComponent(que);
			switch (type) {
				case 'Bing':
					searchstr='http://www.bing.com/search?q=' + que;
					break;
				case 'baidu':
					searchstr='http://www.baidu.com/s?ie=utf-8&wd=' + que;
					break;
				case 'tieba':
					searchstr='http://tieba.baidu.com/f?kw=' + que;
					break;
				case 'baiduyun':
					searchstr='http://www.bdyunso.com/search/';
					break;
				case 'image':
					searchstr='http://www.bing.com/images/search?q=' + que;
					break;
				case 'video':
					searchstr='http://www.soku.com/search_video/q_' + que;
					break;
				case 'music':
					searchstr='http://music.baidu.com/search?key=' + que;
					break;
				case 'YTB':
					searchstr='https://www.youtube.com/results?search_query=' + que;
					break;
				case 'shop':
					searchstr='http://s.taobao.com/search?q=' + que;
					break;
				case 'map':
					searchstr='http://ditu.google.cn/maps?output=classic&dg=ctry';
					break;
				case 'kafan':
					searchstr='http://bds.kafan.cn/cse/search?q=' + que +'&s=15563968344970452529';
					break;
				case 'wiki':
					searchstr='https://zh.wikipedia.org/zh-cn/' + que;
					break;
				case 'google':
					searchstr='https://www.google.de/#q=' + que;
					break;
				default:
			}
		
			if(isNewTab){
				window.open(searchstr,'_blank');
				$('input[name="wd"]').val("");
			} 
			else {
				//window.open(searchstr,'_blank');
				//window.location.target='_blank'
				window.location.href = searchstr;
			}
			
			return false;
		}
	});
});

// 从函数中获取多行注释的字符串
function getMStr(fn) {
    var fnSource = fn.toString();
    var ret = {};
    fnSource = fnSource.replace(/^[^{]+/, '');
    // console.log(fnSource);
    var matched;
    var reg = /var\s+([$\w]+)[\s\S]*?\/\*([\s\S]+?)\*\//g;
    while (matched = reg.exec(fnSource)) {
        // console.log(matched);
        ret[matched[1]] = matched[2];
    };
    
    return ret;
}