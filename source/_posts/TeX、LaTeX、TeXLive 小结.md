---
author: 403 Forbidden
comments: true
date: 2014-05-15 16:53:48+00:00
layout: post
slug: tex%e3%80%81latex%e3%80%81texlive-%e5%b0%8f%e7%bb%93
title: TeX、LaTeX、TeXLive 小结
wordpress_id: 1574
categories:
- 计算机技术
---
一直纠结：用什么工具来记录学习中的点滴，用什么写软件的文档 

* 在线的（blog、wiki、google doc、google site、...）

* 离线的（wiki、LaTeX、sphinx、docbook、doxygen...）
... 
然后觉得 git + sphinx 应该是个不错的选择，恩，生成网页、qthelp、chm文件等都还不错，可是，当想生成包含中文的pdf时，又回到了让人倍感头痛的 LaTeX中文问题上面来了... 
windows下似乎没什么好说的，本文稍偏重ubuntu，总体来说latex中文比前几年好用太多了。本文最初目标，学习最基本的sphinx+latex的中文处理。 
##  名词

相关(类似)的名词太多了，想分清真不容易 
| 引擎   | (Knuth)TeX       | 真正的(原始的)TeX                                               |
|        | ε-TeX            | 相对于原始的TeX它提供了一种扩展模式                             |
|        | pdfTeX           | 它从tex文件不通过dvi文件直接生成pdf文件（开发者已经转向LuaTeX） |
|        | XeTeX            | 相对于原始的TeX，主要增加了Unicode和 OpenType 的支持            |
|        | LuaTeX           | 它使用Lua作为扩展语言，对于LaTeX支持尚不完善？                  |
|        | …                |                                                                 |
| 宏集   | plain TeX        | 最古老的TeX宏集，提供了一些最基本的命令                         |
|        | AMSTeX           | 是美国数学会提供的一个TeX宏集，它添加了许多数学符号和数学字体   |
|        | LaTeX            | 相对于PlainTeX，它使得科技文档的排版更加直观和方便              |
|        | ConTeXt          | 和LaTeX 相比，它更加灵活和自由                                  |
|        | …                |                                                                 |
| 发行版 | TeX Live         | 国际TeX用户组织TUG开发,支持不同的操作系统                       |
|        | MiKTeX           | Windows 下广泛使用的一个TeX发行版                               |
|        | ConTeXt Minimals | 它包含了最新版本的 ConTeXt                                      |
|        | teTeX            | 一个Unix下的TeX发行版，现在已经停止更新且并入TeXLive            |
|        | fpTeX            | 一个Windows的TeX发行版，已不再更新                              |
|        | …                |                                                                 |

真够乱的，还好，我们只关注一部分： 
###  LaTeX

原始的TeX已经有了一组宏集，也就是Knuth所写的著名的Plain TeX(原始的TeX和Plain Tex都是《The TeXbook 》一书中介绍的内容)。 
但是这些命令仍然很底层，不够方便、直观，于是Leslie Lamport写了另一组宏，称为LaTeX，主要是它版本配置和文中内容适度分开处理。 
LaTeX 2ε是自1993年以来LaTeX的一个稳定版本，是目前大部分LaTeX书籍的主体内容。 
###  ctex

ctex宏包提供了一个统一的中文LaTeX文档框架,底层支持CCT、CJK和xeCJK三种中文LaTeX系统。 

* CCT 非常不推荐了

* CJK 这个？应该在windows下工作还很不错

* xeCJK 比较推荐
ctex宏包提供了编写中文LaTeX文档常用的一些宏定义和命令。 
主要文件包括ctexart.cls、ctexrep.cls、ctexbook.cls 和 ctex.sty、ctexcap.sty。 
###  生成pdf流程
* 原始的方式
| *.tex | ==>   | *.dvi | ==>   | *.ps | ==>    | *.pdf |
|       | latex |       | divps |      | ps2pdf |       |
* dvipdfm(x),少一个 *.ps 步骤
| *.tex | ==>   | *.dvi | ==>     | *.pdf |
|       | latex |       | dvipdfm |       |

* pdflatex或xelatex，直接生成 pdf
| *.tex | ==>      | *.pdf |
|       | pdflatex |       |
##  配置
###  TeX Live

种种迹象表明，ubuntu软件仓库中的TeX Live非常非常不好用。于是，只能从官方下载ISO镜像，或者直接网络安装了。 

* 下载 texlive2011-20110705.iso

* 挂载

```shell
sudo mkdir /mnt/texlive
sudo mount -o loop texlive2011-20110705.iso /mnt/texlive
```

* 安装

```shell
cd /mnt/texlive
sudo ./install-tl
```

###  TeXworks

很不错的一个Tex(LaTeX、ConTeXt等)文档的创作环境，一个基于Unicode的可感知TeX的编辑器，集成了PDF浏览功能，干净、简洁的操作界面。 
恩，更主要的是Qt4编写的开源软件，跨Windows、Linux、Mac OS环境。 
###  中文配置

* 主要涉及几个宏包，这些宏包进化太快了，远没有latex稳定，可能了解它们最好的办法就是看其自带的手册了。
当前的推荐配置(?) 

* 使用XeLaTeX引擎处理中文

* 使用xeCJK宏包解决中西文字体选择、标点符号位置、CJK兼容等问题

* 使用ctex宏包和文档类解决中文版式习惯的问题
不使用这两个宏包（需要设置所用字体，命令fc-list :lang=zh-cn用来查看系统字体） 
```tex
\documentclass[11pt,a4paper]{article}
\usepackage{fontspec}
\setmainfont{WenQuanYi Micro Hei}
\begin{document}
TeX Live 2011，XeLaTeX，Texworks，你们好！！
\end{document}
```

直接使用xeCJK宏包。(属于底层的方案) 
```tex
\documentclass{article}
\usepackage{xeCJK}
\setCJKmainfont{WenQuanYi Micro Hei}
\begin{document}
TeX Live 2011，XeLaTeX，Texworks，你们好！！
\end{document}
```

使用ctex宏包。高层的方案。(默认的字体是为windows准备的，在linux下，可以直接设置字体，但更建议采用后面的方法，修改ctex的字体文件) 
```tex
\documentclass{ctexart}
\setCJKmainfont{WenQuanYi Micro Hei}
\begin{document}
TeX Live 2011，XeLaTeX，Texworks，你们好！！
\end{document}
```

解决字体问题后，看起来还是很简单的： 
```tex
\documentclass{ctexart}
\begin{document}
TeX Live 2011，XeLaTeX，Texworks，你们好！！
\end{document}
```

###  字体

*  如果不想用linux下的字体，还可以把 Windows 下的一些字体直接拷贝到~/.fonts目录中 
```shell
cp sim* ~/.fonts
```

* 对于xeCJK宏包，使用命令设置字体，比如：

```tex
\setCJKmainfont[BoldFont=Droid Sans Fallback, ItalicFont=AR PL UKai CN]{AR PL UMing CN}
\setCJKmonofont[Scale=0.9]{AR PL UKai CN}
\setCJKfamilyfont{song}[BoldFont=Droid Sans Fallback]{AR PL UMing CN}
\setCJKfamilyfont{sf}[BoldFont=Droid Sans Fallback]{Droid Sans Fallback}
```

* 使用ctex宏包时，直接修改下面这个文件：

```shell
/usr/local/texlive/2011/texmf-dist/tex/latex/ctex/fontset/ctex-xecjk-winfonts.def
```

其内容大致如下： 
```tex
% ctex-xecjk-winfonts.def: Windows 的 xeCJK 字体设置，默认为六种中易字体
% vim:ft=tex
\setCJKmainfont[BoldFont={SimHei},ItalicFont={[SIMKAI.TTF]}]{SimSun}
\setCJKsansfont{SimHei}
\setCJKmonofont{[SIMFANG.TTF]}
\setCJKfamilyfont{zhsong}{SimSun}
\setCJKfamilyfont{zhhei}{SimHei}
\setCJKfamilyfont{zhkai}{[SIMKAI.TTF]}
\setCJKfamilyfont{zhfs}{[SIMFANG.TTF]}
\newcommand*{\songti}{\CJKfamily{zhsong}} % 宋体
\newcommand*{\heiti}{\CJKfamily{zhhei}}   % 黑体
\newcommand*{\kaishu}{\CJKfamily{zhkai}}  % 楷书
\newcommand*{\fangsong}{\CJKfamily{zhfs}} % 仿宋
\endinput
```

将其中的 [SIMKAI.TTF] 和 [SIMFANG.TTF] 用 KaiTi 和 FangSong 替代。(好奇怪，Windows下怎么会这个奇怪的名字，字体直接拷过来，就不需要这么奇怪的名字) 


###  sphinx

有了前面一堆东西，终于可以回到Pyhton sphinx了 
当我们运行 sphinx-build -b latex src target时，它生成 

* Makefile

* XXX.tex

* ...
等文件 
但是， 

* 生成的 .tex 中：使用的documentclass是report或article，我们需要的是ctexrep或ctexart

* 生成的 Makefile 中：使用的latex和pdflatex，我们需要的是 xelatex
这样以来，需要简单修改一下的sphinx的latex生成器了，找到目标(这个位置不定，在python中import sphinx，然后查看sphinx.比较容易定位) 
```
/usr/lib/pymodules/python2.7/sphinx/writers/latex.py
```

* 搜索article和report，改为ctexart和ctexrep 
Makefile 是通过哪个文件生成的呢？好隐蔽 
```
/usr/share/sphinx/texinputs/Makefile
```

恩，一个静态文件，直接按照自己需要改就行了。不过我们直接将里面所有的pdflatex直接改成xelatex就够了 
##  参考

*  [http://wiki.ctex.org/index.php/%E9%A6%96%E9%A1%B5](http://wiki.ctex.org/index.php/%E9%A6%96%E9%A1%B5)

*  [http://www.newsmth.net/bbscon.php?bid=460&id=282515&ftype=11](http://www.newsmth.net/bbscon.php?bid=460&id=282515&ftype=11)

*  [http://tug.ctan.org/tex-archive/language/chinese/ctex/doc/ctex.pdf](http://tug.ctan.org/tex-archive/language/chinese/ctex/doc/ctex.pdf)

*  [http://code.google.com/p/texworks/](http://code.google.com/p/texworks/)
转载自：[http://blog.csdn.net/dbzhang800/article/details/6820659](http://blog.csdn.net/dbzhang800/article/details/6820659)
