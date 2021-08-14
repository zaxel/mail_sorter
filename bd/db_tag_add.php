<?php
require('db_connect.php');

  /** Получаем наш ID статьи из запроса */
$companyId = trim($_POST['companyId']);
$tag = $_POST['tag'];

if($companyId && $tag){
	$query = $mysqli->query("INSERT INTO sn_tag (id, tag, userId) VALUES (NULL, '$tag', '$companyId')");
	$lastTagId = $mysqli->insert_id; //get last id

	$message = 'таг успешно записан в бд';
	
  }else{
	$message = 'ошибка записи тага в бд';
}


/** Возвращаем ответ скрипту */

// Формируем масив данных для отправки
$out = array(
	'lastTagId' => strval( $lastTagId ),
	'message' => $message
);

// Устанавливаем заголовот ответа в формате json
header('Content-Type: text/json; charset=utf-8');

// Кодируем данные в формат json и отправляем
echo json_encode($out);

mysqli_close($mysqli);
  ?>