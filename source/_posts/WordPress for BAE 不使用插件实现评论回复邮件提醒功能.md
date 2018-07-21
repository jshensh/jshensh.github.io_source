---
author: 403 Forbidden
comments: true
date: 2013-05-12 02:50:34+00:00
layout: post
slug: '%e4%b8%8d%e4%bd%bf%e7%94%a8%e6%8f%92%e4%bb%b6%e5%ae%9e%e7%8e%b0%e8%af%84%e8%ae%ba%e5%9b%9e%e5%a4%8d%e9%82%ae%e4%bb%b6%e6%8f%90%e9%86%92%e5%8a%9f%e8%83%bd'
title: WordPress for BAE 不使用插件实现评论回复邮件提醒功能
wordpress_id: 143
categories:
- 程序发布
---
表示这是博主原创。。。转载请注明原文链接
该方法**仅限在 BAE 版 WordPress 上使用**
当然如果要在普通版本的 WordPress 上实现功能的话，请自行修改 wp_mail 那一行

找到你网站根目录下的 wp-comments-post.php ，在里面找这样一行代码
```php
$location = empty($_POST['redirect_to']) ? get_comment_link($comment_id) : $_POST['redirect_to'] . '#comment-' . $comment_id;

```

在前面加入
```php
if (!empty($comment_parent)) {
$get_comment_parent = get_comment($comment_parent);
$mail_subject=$comment->comment_author.' 回复了您的评论 - '.get_option('blogname');
$mail_message='

您在《'.$post->post_title.'》发表的评论内容：  
'.
$get_comment_parent->comment_content.'

'.
'

由 '.$comment->comment_author.' 于 '.$comment->comment_date.' 回复您的评论内容：  
'.
$comment->comment_content.'

'.
'

点击链接查看或回复：  
'.
'['.get_comment_link($comment_id).']('.get_comment_link($comment_id).')

';
if ($comment->comment_author_email !== $get_comment_parent->comment_author_email) {
wp_mail($get_comment_parent->comment_author_email,$mail_subject,''.$mail_message);
}
}

```

保存，上传覆盖原文件即可

