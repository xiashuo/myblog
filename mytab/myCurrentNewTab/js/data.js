// 导航站点设置
var Config = getMStr(function(){
    var sites;
/*
学习
	教务登录,http://jwxt.wust.edu.cn/whkjdx/,img/commen.png
	图书馆借阅,http://opac.lib.wust.edu.cn:8080/reader/login.php
	博客联盟,http://zgboke.com/,http://zgboke.com/favicon.ico
	SimpleNote,https://app.simplenote.com/,http://app.simplenote.com/favicon.ico
	速写教程,http://x.youku.com/tag/lists?t=77125
	CodeSec,http://www.codesec.net/,http://www.codesec.net/favicon.ico
	GitHub,https://github.com/
	jQuery插件,http://www.jq22.com/
	掘金稀土,http://gold.xitu.io/#/
	android工具,http://www.androiddevtools.cn/
	UI设计工具,http://www.oschina.net/project/tag/291/ui-design/
	菜鸟教程,http://www.runoob.com/
资讯
	IT 资讯,  http://www.ithome.com/list/, img/web/ithome.ico
	抽屉新热榜,  http://dig.chouti.com/, img/web/chouti.ico
	CNBeta,     http://www.cnbeta.com/, img/web/cnBeta.ico
	果壳网,   http://www.guokr.com/, img/web/guokr.ico
	淘宝网, http://www.taobao.com/, img/web/taobao.ico
	新浪网,  http://www.sina.com.cn/
	中国日报,http://language.chinadaily.com.cn/,http://language.chinadaily.com.cn/favicon.ico
社区
	Firefox吧, http://tieba.baidu.com/f?ie=utf-8&kw=firefox, img/web/tieba.png
	HalfLife吧, http://tieba.baidu.com/f?ie=utf-8&kw=halflife, img/web/tieba.png
	卡饭, http://bbs.kafan.cn/forum-215-1.html, img/web/kafan.ico
	新浪微博, http://weibo.com, img/web/weibo.ico
	豆瓣, http://www.douban.com/,img/commen.png
	百度贴吧, http://tieba.baidu.com/,img/web/tieba.png
	系统之家,http://www.xitongzhijia.net/,http://www.xitongzhijia.net/favicon.ico
娱乐
	AcFun, http://www.acfun.tv/, img/web/acfun.ico
	哔哩哔哩, http://www.bilibili.com/, img/web/bilibili.ico
	吐槽网, http://www.tucao.tv/,http://www.tucao.tv/favicon.ico
	嘀哩嘀哩, http://www.dilidili.com/, img/web/dilidili.ico
	52天, http://www.52tian.net/, img/web/52tian.ico
	优酷视频, http://www.youku.com/
	炫电影, http://www.xuandy.com/,http://www.xuandy.com/favicon.ico
资源
	ZD423, http://www.zdfans.com/, img/web/zd423.ico
	ED2000, http://www.ed2000.com/, img/web/ed2000.ico
	迅播, http://www.2tu.cc/index.html, img/web/2tu.ico
	BT天堂, http://www.bttiantang.com/, img/web/bttiantang.ico
	电影天堂, http://www.dy2018.com/, img/web/dy2018.ico
	软件阁, http://www.lite6.com/,http://lite6com.qiniudn.com/favicon.ico
	便携绿软, http://www.portablesoft.org/
	城通网盘,http://www.ctfile.com/
应用
	Bing翻译, http://www.bing.com/translator/, img/web/translate.png
	百度地图, http://map.baidu.com/, img/web/gmaps.ico
	站长工具, http://tool.oschina.net/, img/web/oschina.ico
	百度云, http://pan.baidu.com/disk/home, img/web/pan.ico
	BookLink, http://booklink.me/, img/web/booklink.ico
	360云盘,http://c19.yunpan.360.cn/my,img/commen.png
	快递之家,http://www.kiees.cn/,img/commen.png
综合
	百度音乐,http://music.baidu.com/
	爱民谣,http://www.iminyao.com/,img/commen.png
	搜图标, http://www.easyicon.net/, img/web/easyicon.png
	酷安网, http://www.coolapk.com/, img/web/coolapk.ico
	网易云音乐, http://music.163.com/, img/web/music.ico
	必应首页, http://www.bing.com/, http://www.bing.com/favicon.ico
	网盘搜索, http://so.baiduyun.me/,http://so.baiduyun.me/favicon.ico
游戏
	你画我猜,http://qqapp.qq.com/app/100619194.html,http://qqapp.qq.com/favicon.ico
	消消乐,http://qqapp.qq.com/app/100718846.html#via=APPCENTER.XX.INFO-HOT,http://qqapp.qq.com/favicon.ico
	欢乐斗地主,http://qqapp.qq.com/app/363.html#via=APPCENTER.XX.INFO-HOT,http://qqapp.qq.com/favicon.ico
	界面布局,http://v2ex.com/t/217197#reply6,http://v2ex.com/favicon.ico
	怖客,http://www.2kxs.com/xiaoshuo/30/30265/7015392.html,http://www.2kxs.com/favicon.ico
直播
	斗鱼,http://www.douyutv.com/
	熊猫,http://www.panda.tv/
	虎牙,http://www.huya.com/
工作
	看准,http://www.kanzhun.com/?ka=head-index
	海投,http://www.haitou.cc/
	SEO,http://www.seozixuewang.com/,http://www.seozixuewang.com/favicon.ico
	牛客,http://www.nowcoder.com/
	july edu,http://www.julyedu.com/
	胜意邮箱,http://mail.vetech.cn/
其他
	sonyRom,http://forum.xda-developers.com/sony-xperia-c,http://forum.xda-developers.com/favicon.ico
	黄老邪,http://huanglaoxie.com/,img/commen.png
	耍宝网,http://shuabao.net/,http://shuabao.net/favicon.ico
	花瓣网,http://huaban.com/
	当当网,http://book.dangdang.com/
	亚马逊,http://www.amazon.cn/%E5%9B%BE%E4%B9%A6/b/ref=sa_menu_top_books_l1/478-9051506-2617827?ie=UTF8&node=658390051
*/
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