// 导航站点设置
var Config = getMStr(function(){
    var sites;
/*
常用
	博客工具集，http://www.xsblog.club/article/%E5%B7%A5%E5%85%B7，img/logo.jpg
	达内直播，http://www.tmooc.cn/，img/达内.png
	牛客网，https://www.nowcoder.com/5794335，img/牛客网.jfif
	GitHub，https://github.com/，img/GitHub.jfif
	我的博客，http://xiashuobad.xyz，img/logo.jpg
	markdown编辑，https://maxiang.io/，img/马克飞象.jpg
	
资源下载
	ZD423下载，http://www.zdfans.com/，img/微档下载.png
	城通网盘,  https://www.15kankan.com/，img/城通网盘.jpg
	吾爱破解，https://www.52pojie.cn/，img/吾爱破解.jfif
	MSDN，https://msdn.itellyou.cn/，img/MSDN.jfif
	百度网盘，https://pan.baidu.com/disk/home#/all?path=%2F&vmode=list，img/百度网盘.png
	github,https://github.com/，img/GitHub.jfif
	
在线视频
	365视频，https://www.k365.tv/，img/365影视.png
	疯狂影视，http://ifkdy.com/，img/logo.jpg
	碟影视界，https://dvdhd.me/，img/碟影.png
	ADC电影网，https://www.adcmove.com/，img/logo.jpg
	完美看看，https://www.wanmeikk.me/，img/logo.jpg
	草民电影，https://www.cmdy5.com/，img/logo.jpg

bt资源
	bt之家，https://www.btbtt.co/，img/logo.jpg
	磁力熊，https://www.cilixiong.com/，img/bt熊.png
	bt首发，http://btshoufa.cc/，img/logo.jpg
	比特大熊，https://www.btdx8.com/，img/logo.jpg
	bt电影天堂，http://www.btbtdy.me/，img/logo.jpg
	磁力狗，http://gg.6z05.xyz/,img/logo.jpg

阅读
	知乎，https://www.zhihu.com/，img/知乎.png
	微博，https://www.weibo.com/，img/weibo.png


*/
});

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
			switch (type) {
				case 'google':
					searchstr='https://www.google.com/search?safe=strict&sxsrf=ALeKk01ipw6Ga-WEKe5rLYuqTDEwZN1Gzw%3A1582254194452&ei=ckhPXpygG8SEytMP84yuiAo&q=' + que;
					break;
				case 'baidu':
					searchstr='http://www.baidu.com/s?wd=' + que;
					break;
				case 'googlexueshu':
					searchstr='https://scholar.google.com/scholar?q=' + que;
					break;
				case 'baiduxueshu':
					searchstr='http://xueshu.baidu.com/s?wd=' + que;
					break;
				case 'baidubaike':
					searchstr='http://baike.baidu.com/item/' + que;
					break;
				case 'transaction':
					searchstr='https://translate.google.cn/#en/zh-CN/' + que;
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
					searchstr='http://map.baidu.com/';
					break;
				case 'kafan':
					searchstr='http://bds.kafan.cn/cse/search?q=' + que +'&s=15563968344970452529';
					break;
				case 'wiki':
					searchstr='https://zh.wikipedia.org/zh-cn/' + que;
					break;
				default:
			}
		
			if(isNewTab){
				window.open(searchstr);
				$('input[name="wd"]').val("");
			} 
			else {
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
