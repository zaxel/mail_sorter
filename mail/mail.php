<?php

$method = $_SERVER['REQUEST_METHOD'];
if ($method !== 'POST'){
    exit();
}

$project_name = '';
$form_subject = '';
$admin_email = '';
$company_email = '';
$message = '';

$color_counter = 1;

foreach ($_POST as $key => $value){
    if($value === ''){
        continue;
    }
    if($key === 1) {
        $message = $value;
    }elseif($key === 2) {
        $company_email = $value;
    }elseif($key === 3) {
        $project_name = $value;
    }elseif($key === 4) {
        $form_subject = $value;
    }elseif($key === 5) {
        $admin_email = $value;
    }
}

function adopt($text){
    return '=?utf-8?B?'.base64_encode($text).'?=';
}
//handle br properly
// $message = nl2br($message);
// $message = "<table style='width: 100%;'>$message</table>";
//handle bs properly
// $message = str_replace("\s", "&nbsp;", $message);
//handle br properly
// $message = str_replace("\n", "<br/>", $message);
//handle tabs properly
// $message = str_replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;", $message);

$message = "<div style='white-space: pre-wrap; font-size: 15px; font-family: Georgia; line-height: 1.4;'>$message</div>";

$headers = "Mime-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=UTF-8\r\n";
$headers .= "From:" . adopt($project_name) . " <$admin_email>\r\n";

$success_send = mail($company_email, adopt($form_subject), $message, $headers);

if($success_send){
    echo 'success';
}else{
    echo 'error';
}
