// 导航站点设置
var Config = getMStr(function(){
	var sites;
/*
校园常用
	图书馆借阅,http://opac.lib.wust.edu.cn:8080/reader/login.php
	教务登录,http://jwxt.wust.edu.cn/whkjdx/,img/commen.png
	Matlab源码,http://blog.csdn.net/qzq14/article/details/6050381,http://blog.csdn.net/favicon.ico
	阿里云,https://account.aliyun.com/,https://www.aliyun.com/favicon.ico
	百度翻译,http://fanyi.baidu.com/translate?query=&keyfrom=baidu&smartresult=dict&lang=auto2zh#auto/zh/
	校园网充值,http://wust.rghall.com.cn/weblt/login.jsp,img/commen.png
最近访问
	机械学习,http://v.163.com/special/opencourse/machinelearning.html
	算法导论,http://open.163.com/special/opencourse/algorithms.html,http://open.163.com/favicon.ico
	Matlab命令,http://blog.sina.com.cn/s/blog_a07344a5010111r9.html
	视频上传,http://blog.csdn.net/sust2012/article/details/38298865,http://blog.csdn.net/favicon.ico
	本地发布,http://blog.csdn.net/hexiaohu2009/article/details/8395881,http://blog.csdn.net/favicon.ico
我的学习
	极客学院,http://www.jikexueyuan.com/member/mycourse/
	开课吧, http://www.kaikeba.com/,img/commen.png
	麦子学院,http://www.maiziedu.com/,img/commen.png
	传智播客,http://www.itcast.cn/
	脚本之家,http://www.jb51.net/
	天屹博客,http://www.tystudio.net/
	网易云课,http://study.163.com/
	开源中国,http://www.oschina.net/,http://www.oschina.net/favicon.ico
	英语沙龙,http://news.iciba.com/,http://news.iciba.com/favicon.ico
	方言|外语,http://dict.cn/,img/commen.png
	汉语|古语,http://www.zdic.net/,img/commen.png
	日语学习,http://www.jpwind.com/studyol/,img/commen.png
	linux开源,http://linux.cn/,http://linux.cn/favicon.ico
	源码下载,http://www.pudn.com/
	源码下载,http://www.codesoso.com/default.aspx
	张戈博客,http://zhangge.net/,http://zhangge.net/favicon.ico
	博客联盟,http://zgboke.com/
	Jquery插件,http://www.jq22.com/
	有道云笔记,http://note.youdao.com/signIn/index.html,http://note.youdao.com/favicon.ico
学术论文
	读秀搜索,http://www.duxiu.com/,http://www.duxiu.com/favicon.ico
	超星数字,http://cx.hbdlib.cn:8080/markbook/GetIndex.jsp,img/commen.png
	google学术,http://scholar.google.com.hk/,img/commen.png
	中国知网,http://www.cnki.net/,http://www.cnki.net/favicon.ico
	维基百科, http://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5,https://bits.wikimedia.org/favicon/wikipedia.ico
在线笔记
	SimpleNote,https://app.simplenote.com/,https://app.simplenote.com/favicon.ico
	协同笔记,http://piratepad.net/front-page/,http://piratepad.net/favicon.ico
	我的笔记,http://mysrc.sinaapp.com/user_home/,img/commen.png
	印象笔记,https://app.yinxiang.com/Home.action,https://app.yinxiang.com/favicon.ico
	有道云笔记,http://note.youdao.com/signIn/index.html,http://note.youdao.com/favicon.ico
新闻资讯
	Feedly,  http://cloud.feedly.com/, http://feedly.com/favicon.ico
	IT 资讯,  http://www.ithome.com/list/
	T客帮, http://www.techbang.com/,img/commen.png
	新浪网,  http://www.sina.com.cn/
	中国日报,http://language.chinadaily.com.cn/,img/commen.png
	IT经理网,http://www.ctocio.com/,http://www.ctocio.com/favicon.ico
在线应用
	在线下载,http://www.flvcd.com/index.htm,http://www.flvcd.com/favicon.ico
	站长工具, http://tool.oschina.net/, http://tool.oschina.net/img/favicon.ico
	百度云, http://pan.baidu.com/disk/home, img/panbaidu.ico
	360云盘,http://c19.yunpan.360.cn/my,img/commen.png
	快递之家,http://www.kiees.cn/,img/commen.png
	在线制图,https://www.processon.com/login,img/commen.png
影音娱乐
	Youtube, https://www.youtube.com/,img/commen.png
	优酷视频, http://www.youku.com/
	炫电影, http://www.xuandy.com/,http://www.xuandy.com/favicon.ico
	对电影,http://www.duidy.cc/,img/duidy.png
	影视资源,mypage/影视资源.html,img/yingshiziyuan.jpg
	九影,http://www.9ying.net/,img/logo_9y.png
文字阅读
	起点中文, http://www.qidian.com/Default.aspx, img/qidian.ico
	BookLink, http://booklink.me/,img/commen.png
	晋江文学,http://www.jjwxc.net/,img/commen.png
	新浪阅读,http://book.sina.com.cn/,img/commen.png
	IT图书,http://www.jb51.net/books/
	暴走日报,http://baozouribao.com/,img/commen.png
美乐倾听
	落网电台, http://www.luoo.net/,img/commen.png
	百度音乐,http://music.baidu.com/
	随心听,http://fm.baidu.com/,http://fm.baidu.com/favicon.ico
	酷我音乐,http://www.kuwo.cn/,img/kuwo.png
	清风DJ,http://www.vvvdj.com/,http://www.vvvdj.com/favicon.ico
	音乐台,http://www.yinyuetai.com/,http://www.yinyuetai.com/favicon.ico
资源收藏
	ZD423, http://www.zdfans.com/
	软件阁, http://www.lite6.com/,http://lite6com.qiniudn.com/favicon.ico
	便携绿软, http://www.portablesoft.org/
	火狐范, http://www.firefoxfan.com/index.html,img/commen.png
	绿盟,http://www.xdowns.com/,http://www.xdowns.com/favicon.ico
	系统之家,http://www.xitongzhijia.net/,http://www.xitongzhijia.net/favicon.ico
社区交流
	百度空间, http://hi.baidu.com/home, img/hibaidu.ico
	豆瓣, http://www.douban.com/,http://www.douban.com/favicon.ico
	贴吧, http://tieba.baidu.com/, img/tieba.png
	远景论坛, http://bbs.pcbeta.com/,http://www.pcbeta.com/favicon.ico
	卡饭火狐, http://www.kafan.cn/,img/commen.png

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