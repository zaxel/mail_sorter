<?php

$method = $_SERVER['REQUEST_METHOD'];
if ($method !== 'POST'){
    exit();
}

$color_counter = 1;

foreach ($_POST as $key => $value){
    if($value === ''){
        continue;
    }
    if($key === 'emailTextKey') {
        $message = $value;
    }elseif($key === 'companyEmailKey') {
        $company_email = $value;
    }elseif($key === 'projectNameKey') {
        $project_name = $value;
    }elseif($key === 'formSubjectKey') {
        $form_subject = $value;
    }elseif($key === 'adminEmailKey') {
        $admin_email = $value;
    }
}

function adopt($text){
    return '=?utf-8?B?'.base64_encode($text).'?=';
}

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
