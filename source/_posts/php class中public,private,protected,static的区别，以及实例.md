---
author: 403 Forbidden
comments: true
date: 2015-02-08 16:16:35+00:00
layout: post
slug: php-class%e4%b8%adpublicprivateprotectedstatic%e7%9a%84%e5%8c%ba%e5%88%ab%ef%bc%8c%e4%bb%a5%e5%8f%8a%e5%ae%9e%e4%be%8b
title: php class中public,private,protected,static的区别，以及实例
wordpress_id: 2156
categories:
- Web 开发
---
**一，public,private,protected的区别**
public:权限是最大的，可以内部调用，实例调用等。
protected: 受保护类型，用于本类和继承类调用。
private: 私有类型，只有在本类中使用。

**二，实例**
```php
<?php
error_reporting(E_ALL);

class test{
 public $public;
 private $private;
 protected $protected;
 static $instance;
 public  function __construct(){
 $this->public    = 'public     <br>';
 $this->private   = 'private    <br>';
 $this->protected = 'protected  <br>';
 }
 static function tank(){
 if (!isset(self::$instance[get_class()]))
 {
 $c = get_class();
 self::$instance = new $c;
 }

 return self::$instance;
 }    

 public function pub_function() {
 echo "you request public function<br>";
 echo $this->public;
 echo $this->private;        //private,内部可以调用
 echo $this->protected;      //protected,内部可以调用
 $this->pri_function();      //private方法，内部可以调用
 $this->pro_function();      //protected方法，内部可以调用
 }
 protected  function pro_function(){
 echo "you request protected function<br>";
 }
 private function pri_function(){
 echo "you request private function<br>";
 }
}

$test = test::tank();
echo $test->public;
echo $test->private;    //Fatal error: Cannot access private property test::$private
echo $test->protected;  //Fatal error: Cannot access protected property test::$protected
$test->pub_function();
$test->pro_function();  //Fatal error: Call to protected method test::pro_function() from context
$test->pri_function();  //Fatal error: Call to private method test::pri_function() from context

?>
```

从上面的例子中，我们可以看出，
public:    可以class内部调用，可以实例化调用。
private:   可以class内部调用，实例化调用报错。
protected：  可以class内部调用，实例化调用报错。

```php
<?php

class test{
 public $public;
 private $private;
 protected $protected;
 static $instance;

 public  function __construct(){
 $this->public    = 'public     <br>';
 $this->private   = 'private    <br>';
 $this->protected = 'protected  <br>';
 }
 protected function tank(){                          //私有方法不能继承，换成public,protected
 if (!isset(self::$instance[get_class()]))
 {
 $c = get_class();
 self::$instance = new $c;
 }
 return self::$instance;
 }    

 public function pub_function() {
 echo "you request public function<br>";
 echo $this->public;
 }
 protected  function pro_function(){
 echo "you request protected function<br>";
 echo $this->protected;
 }
 private function pri_function(){
 echo "you request private function<br>";
 echo $this->private;
 }
}

class test1 extends test{

 public function __construct(){
 parent::tank();
 parent::__construct();
 }
 public function tank(){
 echo $this->public;
 echo $this->private;       //Notice: Undefined property: test1::$private
 echo $this->protected;
 $this->pub_function();
 $this->pro_function();
 $this->pri_function();    //Fatal error: Call to private method test::pri_function() from context 'test1'
 }

 public  function pro_extends_function(){
 echo "you request extends_protected function<br>";
 }
 public function pri_extends_function(){
 echo "you request extends_private function<br>";
 }
}

error_reporting(E_ALL);
$test = new test1();
$test -> tank();       //子类和父类有相同名字的属性和方法，实例化子类时，子类的中的属性和方法会盖掉父类的。

?>
```

从上面的例子中，我们可以看出，
public:    test中的public可以被继承。
private:   test中的private不可以被继承。
protected：  test中的protected可以被继承。
static：        test中的static可以被继承。

转载自 [http://blog.163.com/wz_pk007/blog/static/170627050201143104938560/](http://blog.163.com/wz_pk007/blog/static/170627050201143104938560/)
