---
author: 403 Forbidden
comments: true
date: 2014-06-23 05:34:24+00:00
layout: post
slug: '%e4%b8%80%e4%b8%aa%e6%8c%ba%e6%9c%89%e6%84%8f%e6%80%9d%e7%9a%84-html5-%e6%92%ad%e6%94%be%e5%99%a8'
title: 一个挺有意思的 html5 播放器
wordpress_id: 1648
categories:
- Web 开发
---
在 [http://www.ikk.me](http://www.ikk.me) 上看到的，lrc 歌词功能是亮点，于是把关键代码提出来放在这里，日后慢慢研究。

JavaScript：
```js
/*
 * Lyric support by kookxiang(http://ikk.me)
 */
function load_kk_lrc(playerid){
	var kk_lrc = new Object();
	kk_lrc.extra_top = 1;
	kk_lrc.current = -1;
	kk_lrc.current_obj;
	kk_lrc.offset = 0;
	kk_lrc.current_start = -1;
	kk_lrc.next_update_time = -1;
	kk_lrc.showtime = -1;
	kk_lrc.lrc_offset = -1;
	kk_lrc.lrc_height = -1;
	kk_lrc.lrc = [];
	kk_lrc.lrcobj = null;
	kk_lrc.target = 0;
	kk_lrc._target = 0;
	kk_lrc.player_obj = document.getElementById('kk_lrc_' + playerid);
	kk_lrc.lrc_obj = document.getElementById('kk_lrc_' + playerid + '_lrc');

	kk_lrc.scroll_lrc = function () {
		if(typeof kk_lrc.lrc[kk_lrc.current+2] != "undefined"){
			for(id in kk_lrc.lrcobj) kk_lrc.lrcobj[id].className = '';
			kk_lrc.lrcobj[kk_lrc.current+3].className = 'current';
		}
		kk_lrc.current_start = kk_lrc.lrc[kk_lrc.current];
		kk_lrc.current++;
		kk_lrc.current_obj = kk_lrc.lrcobj[kk_lrc.current+2];
		kk_lrc.next_update_time = kk_lrc.lrc[kk_lrc.current];
		kk_lrc.showtime = kk_lrc.next_update_time - kk_lrc.current_start;
		kk_lrc.lrc_offset = kk_lrc.current_obj.offsetTop;
		kk_lrc.lrc_height = kk_lrc.current_obj.offsetHeight;
	};
	kk_lrc.check_lrc_update = function () {
		var curTime = kk_lrc.player_obj.currentTime;
		if(curTime >= kk_lrc.next_update_time - 0.2){
			kk_lrc.scroll_lrc();
			kk_lrc.check_lrc_update();
		}
		if(typeof kk_lrc.lrc[kk_lrc.current-1] != "undefined"){
			kk_lrc.extra_top = (kk_lrc.next_update_time - curTime) / kk_lrc.showtime;
		}
		kk_lrc.target = Math.round(kk_lrc.lrc_offset - (125 - kk_lrc.lrc_height) / 2);
		if(kk_lrc.target < 0) kk_lrc.target = 0;
	};
	kk_lrc.init = function () {
		kk_lrc.add_lrc('999999', '');
		kk_lrc.add_lrc('999999', '');
		kk_lrc.add_lrc('999999', '');
		kk_lrc.current = -1;
		kk_lrc.lrcobj = kk_lrc.lrc_obj.getElementsByTagName('li');
		kk_lrc.current_obj = kk_lrc.lrcobj[0];
		kk_lrc.scroll_lrc();
		kk_lrc.check_lrc_update();
		kk_lrc.player_obj.addEventListener("seeked" ,function(){
			kk_lrc.current = -1;
			kk_lrc.scroll_lrc();
			kk_lrc.check_lrc_update();
		});
		kk_lrc.player_obj.addEventListener("durationchange" ,function(){
			kk_lrc.current = -1;
			kk_lrc.scroll_lrc();
			kk_lrc.check_lrc_update();
		});
		setInterval(function(){
				if(kk_lrc.player_obj.paused) return;
				if(kk_lrc.current_start > kk_lrc.player_obj.currentTime){
					kk_lrc.current = -1;
					kk_lrc.scroll_lrc();
					kk_lrc.check_lrc_update();
				}else{
					kk_lrc.check_lrc_update();
				}
			}, 100);
		setInterval(function(){
				if(kk_lrc._target == kk_lrc.target) return;
				if(Math.abs(kk_lrc.lrc_obj.scrollTop - kk_lrc._target) > kk_lrc.lrc_height){
					kk_lrc._target = kk_lrc.lrc_obj.scrollTop;
				}
				if(kk_lrc.player_obj.paused){
					kk_lrc._target = kk_lrc.fixFloat(kk_lrc._target * 0.8 + kk_lrc.target * 0.2);
				}else{
					kk_lrc._target = kk_lrc.fixFloat(kk_lrc._target * 0.98 + kk_lrc.target * 0.02);
				}
				kk_lrc.lrc_obj.scrollTop = kk_lrc._target;
			}, 5);
	};
	kk_lrc.add_lrc = function (time, lrc) {
		kk_lrc.lrc.push(parseFloat(time) + kk_lrc.offset);
		var lrc_line = document.createElement("li");
		lrc_line.innerHTML = lrc;
		kk_lrc.lrc_obj.appendChild(lrc_line);
	};
	kk_lrc.get_lrc = function (num) {
		if(typeof kk_lrc.lrc[num] != "undefined"){
			return kk_lrc.lrc[num][1];
		}else{
			return '';
		}
	}
	kk_lrc.setoffset = function (num) {
		kk_lrc.offset = num / 1000;
	}
	kk_lrc.fixFloat = function (num) {
		return Math.ceil(num * 10) / 10;
	}
	return kk_lrc;
}
```


CSS：
```css
/*
 * Lyric support by kookxiang(http://ikk.me)
 */
.kk_player { width: 100%; max-height: 40px; }
.kk_lrc { height: 125px; overflow: auto; padding: 0; margin: 0; }
.kk_lrc li { display: block; text-align: center; color: gray; line-height: 20px; margin: 2px 0 3px 0; min-height: 20px; }
.kk_lrc .current { color: black; font-weight: bold; }
.kk_lrc, .kk_lrc * { -webkit-transition-duration: 1s; -moz-transition-duration: 1s; transition-duration: 1s; }
.kk_lrc ::selection { background: transparent; background: rgba(127, 127, 127, 0.1); }
.kk_lrc_box { position: relative; }
.kk_lrc_box:before { content: '.'; overflow: hidden; text-indent: -9999px; width: 100%; height: 30px; z-index: 1; display: block; position: absolute; background: url(cover.png) repeat-x 0 0; top: 0; pointer-events: none; }
.kk_lrc_box:after { content: '.'; overflow: hidden; text-indent: -9999px; width: 100%; height: 30px; z-index: 1; display: block; position: absolute; background: url(cover.png) repeat-x 0 100%; bottom: 0; pointer-events: none; }

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { -webkit-border-radius: 10px; border-radius: 10px; }
::-webkit-scrollbar-thumb { -webkit-border-radius: 10px; border-radius: 10px; background: rgba(96, 96, 96, 0.8); -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); }
::-webkit-scrollbar-thumb:window-inactive { background: rgba(96, 96, 96, 0.4); }
```

调用：
```html
<audio class="kk_player" controls="true" id="kk_lrc_bestFriend" src="http://www.ikk.me/usr/uploads/2014/06/1587625061.mp3" preload="metadata">您的浏览器不支持HTML5的 audio 标签，无法为您播放！</audio><br />
<div class="kk_lrc_box"><ul id="kk_lrc_bestFriend_lrc" class="kk_lrc">
<li></li><li></li><li></li>
</ul></div>
<script>
var bestFriend = load_kk_lrc('bestFriend');
bestFriend.add_lrc('0.00', 'ありがとう  君がいてくれて本当よかったよ<br />');
bestFriend.add_lrc('9.19', 'どんな時だっていつも<br />');
bestFriend.add_lrc('13.54', '笑っていられる<br />');
bestFriend.add_lrc('17.43', '例えば、離れていても　何年経っても<br />');
bestFriend.add_lrc('25.79', 'ずっと変わらないでしょ<br />');
bestFriend.add_lrc('29.84', '私たちBest Friend<br />');
bestFriend.add_lrc('33.37', '好きだよ、大好きだよ<br />');
bestFriend.add_lrc('46.24', '<br />');
bestFriend.add_lrc('51.19', 'こんな遅い時間にゴメンね<br />');
bestFriend.add_lrc('55.14', '一人じゃせっぱつまってきたの<br />');
bestFriend.add_lrc('59.44', '君の声少し聞けたら  がんばれる<br />');
bestFriend.add_lrc('66.21', '何でも打ち明けられる<br />');
bestFriend.add_lrc('70.81', 'ママにも言えないことも全部<br />');
bestFriend.add_lrc('75.77', '誰よりも分かってくれる<br />');
bestFriend.add_lrc('83.28', '嬉しい時は自分の事みたいに喜んでくれて<br />');
bestFriend.add_lrc('91.21', 'ダメな時はちゃんと叱ってくれる存在<br />');
bestFriend.add_lrc('99.41', 'ありがとう  君がいてくれて本当よかったよ<br />');
bestFriend.add_lrc('107.75', 'どんな時だっていつも  笑っていられる<br />');
bestFriend.add_lrc('115.88', '例えば、離れていても　何年経っても<br />');
bestFriend.add_lrc('124.00', 'ずっと変わらないでしょ<br />');
bestFriend.add_lrc('128.36', '私たちBest Friend<br />');
bestFriend.add_lrc('131.78', '好きだよ、大好きだよ<br />');
bestFriend.add_lrc('144.67', '<br />');
bestFriend.add_lrc('149.49', '強がってもすぐにバレてる<br />');
bestFriend.add_lrc('153.63', 'へこんでる時は<br />');
bestFriend.add_lrc('155.40', '真っ先にメールくれる優しさに<br />');
bestFriend.add_lrc('159.81', 'もう何度も救われて<br />');
bestFriend.add_lrc('164.58', '泣きたい時はおもいっきり泣けばいい<br />');
bestFriend.add_lrc('170.72', '側にいるからって<br />');
bestFriend.add_lrc('174.26', '誰よりも強い味方<br />');
bestFriend.add_lrc('181.46', 'そんな君に私は何かしてあげられてるかな?<br />');
bestFriend.add_lrc('189.77', '何かあったらすぐに飛んでくから、絶対<br />');
bestFriend.add_lrc('197.90', 'ありがとう  君がいてくれて本当よかったよ<br />');
bestFriend.add_lrc('206.27', 'どんな時だっていつも<br />');
bestFriend.add_lrc('210.33', '笑っていられる<br />');
bestFriend.add_lrc('214.27', '例えば、離れていても　何年経っても<br />');
bestFriend.add_lrc('222.66', 'ずっと変わらないでしょ<br />');
bestFriend.add_lrc('226.75', '私たちBest Friend<br />');
bestFriend.add_lrc('230.29', '好きだよ、大好きだよ<br />');
bestFriend.add_lrc('243.15', '<br />');
bestFriend.add_lrc('247.12', 'どんな時も祈っているよ<br />');
bestFriend.add_lrc('255.12', '世界で一番に幸せになってほしい<br />');
bestFriend.add_lrc('263.50', 'ありがとう  君がいてくれて本当よかったよ<br />');
bestFriend.add_lrc('272.03', 'どんな時だっていつも<br />');
bestFriend.add_lrc('275.89', '笑っていられる<br />');
bestFriend.add_lrc('279.90', '例えば、離れていても　何年経っても<br />');
bestFriend.add_lrc('288.33', 'ずっと変わらないでしょ<br />');
bestFriend.add_lrc('292.38', '私たちBest Friend<br />');
bestFriend.add_lrc('296.48', '好きだよ、大好きだよ<br />');

bestFriend.init();
</script>
```
