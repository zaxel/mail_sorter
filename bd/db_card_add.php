<?php
require('db_connect.php');

  /** Получаем наш ID статьи из запроса */
$company = trim($_POST['company']);
$email = trim($_POST['email']);
$tags = $_POST['tags'];
$lastTagId = "";
$string = "";


if($company && $email){
	$query = $mysqli->query("INSERT INTO sn_company (id, title, email) VALUES (NULL, '$company', '$email')");
	$lastCompId = $mysqli->insert_id; //get last id
	if(!empty($tags) && $lastCompId) {
    foreach ($tags as $i => $tag) {
        if($tag!=$tags[count($tags)-1]){
            $string .= "(NULL, " . "\"" . $tag . "\", " . "\"" . $lastCompId . "\"),";
        }elseif($tag==$tags[count($tags)-1]){
            $string .= "(NULL, " . "\"" . $tag . "\", " . "\"" . $lastCompId . "\")";
        }
    }
  $query2 = $mysqli->query("INSERT INTO sn_tag (id, tag, userId) VALUES $string");
  $lastTagId = $mysqli->insert_id; //get last id
  }
	$message = 'компания успешно записана в бд';
	
}else{
	$message = 'ошибка записи компании в бд';
}


/** Возвращаем ответ скрипту */

// Формируем масив данных для отправки
$out = array(
	'lastCompId' => strval( $lastCompId ),
	'lastTagId' => strval( $lastTagId ),
	'message' => $message
);

// Устанавливаем заголовот ответа в формате json
header('Content-Type: text/json; charset=utf-8');

// Кодируем данные в формат json и отправляем
echo json_encode($out);

mysqli_close($mysqli);
  ?>