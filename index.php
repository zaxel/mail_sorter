<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mail Sorter</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="body">
    <header class="header">
    <div class="wrapper header__wrapper">
        
    </div>
    
    
</header>
    <main class="main">
        <section class="parser">
    <div class="wrapper parser__wrapper">
        <div class="parser__top-section">
            <form class="parser__insert insert-form">
                <textarea class="insert-form__string" placeholder="введите текст здесь"></textarea>
                <button class="insert-form__button" >начать</button>
                <div class="insert-form__warn" ></div>
            </form>
        </div>
        <div class="parser__middle-section"></div>
        
        
        <form class="parser__bottom-section add-company">
            <div class="add-company__title" required >Добавление новой компании</div>
            <label for="companyname">Компания: <span>*</span></label>
            <input class="add-company__comp-name" type="text" name="companyname">
            <label for="email" required >Email компании: <span>*</span></label>
            <input class="add-company__comp-email" type="email" name="companyemail">
            <label for="companytext">Введите текст для рассылки: </label>
            <textarea class="add-company__text" name="companytext" rows="5" cols="30"></textarea>
            <label for="companytext">Введите теги: </label>
            <textarea class="add-company__tags" name="companytags" rows="5" cols="30" placeholder="можно сразу пачкой. записывать необходимо через запятую. пример: сова, глобус, штаны"></textarea>
            <div class="add-company__error error"></div>
            <button class="add-company__button">добавить компанию</button>

        </form>
    </div>
</section>



        <!-- Jump Up Button Section Start -->
<section id="jumpBtn" class="button-up">
    <div  class="button-up__button lock-margin">
        <span></span><span></span>
    </div>
</section>
<!-- Jump Up Button Section End -->

    </main>
    <!-- Footer Start -->
<footer class="footer">
    

    <!-- Pop-Up Start -->
    
    <div id="popupEmailError" class="popup">
        <div class="popup__wrapper">
            <div class="popup__content">
                <button class="popup__close close-popup"></button>
                <div class="popup__text">при попытке отправки сообщения произошла ошибка! <br/>попытайтесь еще раз через некоторое время. <br/> 
                </div>
            </div>
        </div>
    </div>
    <div id="popupEmailSuccess" class="popup">
        <div class="popup__wrapper">
            <div class="popup__content">
                <button class="popup__close close-popup"></button>
                <div class="popup__text">почта успешно отправлена!
                </div>
            </div>
        </div>
    </div>
    <!-- Pop-Up End -->
    
    <!-- Pop-Up Button End -->
</footer>
<!-- Footer End -->

    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>