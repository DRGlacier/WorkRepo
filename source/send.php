<?php
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $comment = $_POST['comment'];

  $name = htmlspecialchars($name);
  $email = htmlspecialchars($email);
  $phone = htmlspecialchars($phone);
  $comment = htmlspecialchars($comment);

  $name = urldecode($name);
  $email = urldecode($email);
  $phone = urldecode($phone);
  $comment = urldecode($comment);


  $name = trim($name);
  $email = trim($email);
  $phone = trim($phone);
  $comment = trim($comment);  

  if (mail("BakosaB@yandex.ru", "Заявка с сайта", "Имя:".$name."\nE-mail:".$email."\nНомер:".$phone.'\nСообщение:'.$comment ,"From: info@grandhouse.uz \r\n")){
    header('Location: /');
  }
?>