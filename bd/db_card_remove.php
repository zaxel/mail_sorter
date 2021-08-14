<?php
require('db_connect.php');

  /** Получаем наш ID статьи из запроса */
$compId = trim($_POST['compId']);

if($compId){
	$query = $mysqli->query("DELETE FROM sn_company WHERE id = '$compId'");

	$message = 'компания успешно удалена из бд';
	
  }else{
	$message = 'ошибка удаления компании из бд';
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