---
author: 403 Forbidden
comments: true
date: 2017-03-11 14:35:49+00:00
layout: post
slug: php-%e6%97%a0%e6%9e%81%e5%88%86%e7%b1%bb%e7%94%9f%e6%88%90%e6%a0%91
title: PHP 无极分类生成树状数组
wordpress_id: 2711
categories:
- Web 开发
---
```php
<?php
$arr=[
   ['id' => 1, 'text' => 'Parent 1', 'pid' => 0],
   ['id' => 2, 'text' => 'Parent 2', 'pid' => 0],
   ['id' => 3, 'text' => 'Parent 3', 'pid' => 0],
   ['id' => 4, 'text' => 'Child 1', 'pid' => 1],
   ['id' => 5, 'text' => 'Parent 4', 'pid' => 0],
   ['id' => 6, 'text' => 'Child 2', 'pid' => 1],
   ['id' => 7, 'text' => 'Child 3', 'pid' => 1],
   ['id' => 8, 'text' => 'Parent 5', 'pid' => 0],
   ['id' => 9, 'text' => 'Child 1', 'pid' => 2],
   ['id' => 10, 'text' => 'Child 4', 'pid' => 1],
   ['id' => 11, 'text' => 'Child 1', 'pid' => 5],
   ['id' => 12, 'text' => 'GrandChild 1', 'pid' => 10]
];

class createTree {
    private static $table = [];

    private function __construct() {}

    private static function tree($pid = 0) {
        $tree = array();
        foreach (self::$table as $row) {
            if ($row['pid'] === $pid) {
                $tmp = self::tree($row['id']);
                if ($tmp) {
                    $row['children'] = $tmp;
                }
                $tree[] = $row;                
            }
        }
        return $tree;        
    }

    public static function get($table) {
        self::$table = $table;
        return self::tree();        
    }
}

var_dump(createTree::get($arr));
```

