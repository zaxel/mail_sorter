<?php
require('db_connect.php');

  /** Получаем наш ID статьи из запроса */
// $email = trim($_POST['email']);
// $tags = $_POST['tags'];
// $lastTagId = "";
// $string = "";


if($mysqli){
  $query = $mysqli->query("SELECT id, title, email FROM sn_company");
  if ($query->num_rows > 0) { 
	while($row = $query->fetch_assoc()){
			$companies['id'][] = $row['id'];
			$companies['title'][] = $row['title'];
			$companies['email'][] = $row['email'];
		}
	} else{
		$companies = "";
	}


  $query2 = $mysqli->query("SELECT id, tag, userId FROM sn_tag");
  if ($query2->num_rows > 0) { 
	while($row = $query2->fetch_assoc()){
		$tags['id'][] = $row['id'];
		$tags['tag'][] = $row['tag'];
		$tags['userId'][] = $row['userId'];
	}
	} else{
		$tags = "";
	}
  


  $message = 'соединение с бд успешно установлено (получение компаний)';
  }else{
	$message = 'ошибка соединения с бд (получение компаний)';
}


/** Возвращаем ответ скрипту */

// Формируем масив данных для отправки
$out = array(
	'companies' =>  $companies,
	'message' => $message,
	'tags' =>  $tags
);

// Устанавливаем заголовот ответа в формате json
header('Content-Type: text/json; charset=utf-8');

// Кодируем данные в формат json и отправляем
echo json_encode($out);

mysqli_close($mysqli);
  ?>