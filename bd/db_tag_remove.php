<?php
require('db_connect.php');

  /** Получаем наш ID статьи из запроса */
$tagId = trim($_POST['tagId']);

if($tagId){
	$query = $mysqli->query("DELETE FROM sn_tag WHERE id = '$tagId'");

	$message = 'таг успешно удален из бд';
	
  }else{
	$message = 'ошибка удаления тага из бд';
}


/** Возвращаем ответ скрипту */

// Формируем масив данных для отправки
$out = array(
	'message' => $message
);

// Устанавливаем заголовот ответа в формате json
header('Content-Type: text/json; charset=utf-8');

// Кодируем данные в формат json и отправляем
echo json_encode($out);

mysqli_close($mysqli);
  ?>