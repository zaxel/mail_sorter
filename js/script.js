const ErrorDuration = 3000;
$(()=>{
    let text = document.querySelector('.insert-form__string');
    let startWarn = document.querySelector('.insert-form__warn');
    let addCompanyError = document.querySelector('.add-company__error');
    let company = [];

    const startButton = document.querySelector('.insert-form__button');
    startButton.addEventListener('click', (e) => {
        e.preventDefault();
        if(text.value){
            getCompanies();
            texareaResizer('doIt');
            // console.log(text.value)
        }else{
            startWarn.innerHTML = "вы ничего не ввели"
            warnRemover(startWarn);
        }
    });

    function getCompanies(){
        let companies = document.querySelectorAll('.company');
        let coincidences = 0;

        if(companies.length > 0){
            companies.forEach(getCompanyTags)

        if(coincidences == 0){
                startWarn.innerHTML = "совпадений не обнаружено"
                warnRemover(startWarn);
            }else if(coincidences > 0){
                text.value = '';
                startWarn.innerHTML = `обнаружено ${coincidences} совпадений`
                warnRemover(startWarn);
            }
        }else{
            startWarn.innerHTML = "не добавлено ниодной компании"
            warnRemover(startWarn);
        }

        function getCompanyTags(item, i, arr){
            company = arr[i];
            let tags = company.querySelectorAll('.tag__text')
            if(tags.length > 0){
                tags.forEach(setCompanyText)
            }
        }
        function setCompanyText(item, i, arr){
            const tag = arr[i];
            // if(tag.innerHTML == text.value){
                if(text.value.indexOf(tag.innerHTML) + 1) {
                    coincidences++;
                    const emailText = company.querySelector('.company__email-text'); 
                    emailText.value = text.value;
            }
        }
    }

    function warnRemover(field) {
        setTimeout(() => {
            field.innerHTML = "";
        }, ErrorDuration);
    }
    //delete company card
    function companyRemove() {
        const companiesCards = document.querySelectorAll('.company');
        if(companiesCards.length > 0){
            for(let companyCard of companiesCards){
                let comRemoveButton = companyCard.querySelector('.company__remove');
                comRemoveButton.addEventListener('click', (e)=>{
                    e.preventDefault();
                    companyCard.remove();
                    console.log('company deleted');
                }); 
            }
        }
    }
    //add company card
    function companyAdd(){
        const addCompanyForm = document.querySelector('.add-company');
        const addCompanyButton = addCompanyForm.querySelector('.add-company__button');
        const addCompanyName = addCompanyForm.querySelector('.add-company__comp-name');
        const addCompanyText = addCompanyForm.querySelector('.add-company__text');
        const addCompanyEmail = addCompanyForm.querySelector('.add-company__comp-email');
        const middleContainer = document.querySelector('.parser__middle-section');
        const tagsWordsString = addCompanyForm.querySelector('.add-company__tags');
        let newTags = ``;
        
        addCompanyButton.addEventListener('click', (e)=>{
            e.preventDefault();
            if(!addCompanyName.value){
                addCompanyError.innerHTML = "поле \"компания\" обязательно к заполнению!";
                warnRemover(addCompanyError);
                return;
            }else if(!addCompanyEmail.value){
                addCompanyError.innerHTML = "поле \"Email компании\" обязательно к заполнению!";
                warnRemover(addCompanyError);
                return;
            }else if(addCompanyEmail.value){
                let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if(!(addCompanyEmail.value.match(mailformat))){
                    addCompanyError.innerHTML = "неверный формат Email";
                    warnRemover(addCompanyError);
                    return;
                }
            }

            if(tagsWordsString.value.length>0){
                let tagsArray = tagsWordsString.value.split(/,\s*/);
                if(tagsArray.length>0){
                    for(let tag of tagsArray){
                        if(tag){
newTags += `<div class="company__tag tag">
    <div class="tag__text">${tag}</div>
    <button class="tag__button">X</button>
</div>
`
                        }
                        
                    }
                }
                
            }
          
            let companyCard = document.createElement('form');
            companyCard.classList.add('parser__company','company');
            let element = `
            <form class="parser__middle-section company">
                <div class="company__top">
                    <div class="company__data">
                        <div class="company__name">${addCompanyName.value}</div>
                        <div class="company__email">${addCompanyEmail.value}</div>

                    </div>
                    <div class="company__text-container">
                        <textarea class="company__email-text">${addCompanyText.value}</textarea>
                        <div class="company__card-error error"></div>
                    </div>
                    <div class="company__buttons">
                        <button class="company__remove">удалить</button>
                        <button class="company__send-email" type="submit">отправить eMail</button>
                    </div>
                </div>
                <div class="company__bottom">
                    <div class="company__bot-left">${newTags}
                    </div>
                    <div class="company__bot-right">
                        <button class="company__add-button active">добавить тег</button>
                        <div class="company__add-tag">
                            <input type="text" class="company__add-input">
                            <button class="company__add-tag-button">V</button>
                        </div>
                    </div>
                </div>
        </form>
            `
            // console.log(tagsWordsString.value.length)

            companyCard.innerHTML = element;
            middleContainer.appendChild(companyCard);

            addCompanyName.value = '';
            addCompanyEmail.value = '';
            addCompanyText.value = '';
            tagsWordsString.value = '';
            newTags = ``;

            companyRemove();
            tagRemove();
            tagAdd();
            texareaResizer('doIt');
            textAreasHandler();
            emailHandler();
        }); 
    }
    //tag add remove
    function tagRemove() {
        const tags = document.querySelectorAll('.tag');
        if(tags.length > 0){
            for(let tag of tags){
                const tagRemoveButton = tag.querySelector('.tag__button');
                tagRemoveButton.addEventListener('click', (e)=>{
                    e.preventDefault();
                    tag.remove();
                }); 
            }
        }
    }
    function tagAdd() {
        const companies = document.querySelectorAll('.company');
        if(companies.length > 0){
            for(let company of companies){
                const tagWrightButton = company.querySelector('.company__add-button');

                tagWrightButton.addEventListener('click', (e)=>{
                    e.preventDefault();
                    const tagInputButton = company.querySelector('.company__add-button');
                    tagInputButton.classList.remove('active');

                    const tagInputCont = company.querySelector('.company__add-tag');
                    tagInputCont.classList.add('active');

                    const tagAddButton = tagInputCont.querySelector('.company__add-tag-button');
                    tagAddButton.addEventListener('click', (e)=>{
                        e.preventDefault();
                        tagInputButton.classList.add('active');
                        tagInputCont.classList.remove('active');

                        const newTagText = tagInputCont.querySelector('.company__add-input');
                        const fatherDiv = company.querySelector('.company__bot-left');
                        if(newTagText.value){
                            const newTag = `
                            <div class="company__tag tag">
                                <div class="tag__text">${newTagText.value}</div>
                                <button class="tag__button">X</button>
                            </div>
                            `;
                            newTagText.value = "";
                            fatherDiv.innerHTML += newTag;
                            tagRemove();
                        }
                    })
                }); 
            }
        }
    }
    
    //textareas handler (handling tabs and spaces)
    function textAreasHandler() {
        const textareas = document.querySelectorAll('textarea');
        if(textareas.length === 0)return;
        for(let textarea of textareas){
            textarea.addEventListener('keydown', function(e) {
                if (e.key == 'Tab') {
                    e.preventDefault();
                    let start = this.selectionStart;
                    let end = this.selectionEnd;
                
                    // set textarea value to: text before caret + tab + text after caret
                    this.value = this.value.substring(0, start) +
                        "\t" + this.value.substring(end);
                
                    // put caret at right position again
                    this.selectionStart =
                        this.selectionEnd = start + 1;
                }
            });
        }
        
    }

    textAreasHandler();
    tagRemove();
    tagAdd();
    companyAdd();
    companyRemove();
    texareaResizer();
    emailHandler();
});

//textarea auto height grow
function texareaResizer(attr) {
    const textareas = document.querySelectorAll(".company__email-text, .insert-form__string");
    if(textareas.length === 0) return;
    for(let textarea of textareas){
        textarea.setAttribute("style", "height:" + (textarea.scrollHeight) + "px;overflow-y:hidden;");
        // textareas[i].style.height = "auto";
        textarea.addEventListener("input", OnInput, false);
        if(attr === 'doIt'){
            textarea.style.height = "auto";
            textarea.style.height = (textarea.scrollHeight) + "px";
        }
    }
    function OnInput() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
    }
}
//jump up button
$(()=>{
    $(window).scroll(()=>{
        $(this).scrollTop() != 0 ? $('#jumpBtn').fadeIn() : $('#jumpBtn').fadeOut()
    });
    $('#jumpBtn').click(()=>{
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });
});


(()=>{
    if(!Element.prototype.closest){
        Element.prototype.closest = function(css){
            let node = this;
            while(node){
                if(node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(()=>{
    if(!Element.prototype.matches){
        Element.prototype.matches = Element.prototype.matchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
})();
function warnRemover(field) {
    setTimeout(() => {
        field.innerHTML = "";
    }, ErrorDuration);
}
function emailHandler(){
    const popupLinks = document.querySelectorAll('.popup-link');
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const elToAddPad = document.querySelectorAll('section');
    const lockPadding = document.querySelectorAll('.lock-padding');
    const lockMargin = document.querySelectorAll('.lock-margin');
    const popupCloseIcons = document.querySelectorAll('.close-popup');

    //popup handler
    let unlock = true;
    const timeout = 800; //this parameter has to be the same as transform in your css ex: transition: all .8s ease 0s;
    let forms = document.querySelectorAll('.company');

    if(popupLinks.length > 0){
        for(let popupLink of popupLinks){
            popupLink.addEventListener('click', function(e){
                e.preventDefault();
                const popupName = popupLink.getAttribute('data-popup-id');
                const currentPopup = document.getElementById(popupName);
                popupOpen(currentPopup);
            }); 
        }
    }
    if(popupCloseIcons.length > 0){
        for(let i = 0; i < popupCloseIcons.length; i++){
            const popupCloseIcon = popupCloseIcons[i];
            popupCloseIcon.addEventListener('click', (e)=>{
                e.preventDefault();
                popupClose(popupCloseIcon.closest('.popup'));
            }); 
        }
    }
    function popupOpen(currentPopup){
        if(currentPopup && unlock){
            const popupActive = document.querySelector('.popup.popup-active');
            popupActive ? popupClose(popupActive, false) : bodyLock();
            

            currentPopup.classList.add('popup-active');
            currentPopup.addEventListener('click', function(e){
                e.preventDefault();
                if(!e.target.closest('.popup__content')){
                    popupClose(e.target.closest('.popup'));
                }
            })
        }
    }
    
    function popupClose(popupActive, doUnlock){
        doUnlock = (doUnlock === undefined) ? true : doUnlock;
        if(unlock){
            popupActive.classList.remove('popup-active');
            if(doUnlock){
                bodyUnlock();
            }
        }
    }
    function bodyLock(){
        const lockPaddingVal = window.innerWidth - document.querySelector('.main').offsetWidth + 'px';
        if(lockPadding.length > 0){
            for(let el of lockPadding){
                el.style.paddingRight = lockPaddingVal;
            }
        }
        if(lockMargin.length > 0){
            for(let el of lockMargin){
                el.style.marginRight = lockPaddingVal;
            }
        }
        body.classList.add('lock');
        // body.style.paddingRight = lockPaddingVal; //to use comment bottom if section and next 2 lines

        if(elToAddPad.length > 0){
            for(let el of elToAddPad){
                el.style.paddingRight = lockPaddingVal;
            }
            
        }
        header.style.paddingRight = lockPaddingVal;
        footer.style.paddingRight = lockPaddingVal;

        unlock = false;
        setTimeout(function(){
            unlock = true;
        }, timeout);
    }
    function bodyUnlock(){
        setTimeout(function(){
            if(lockPadding.length > 0){
                for(let el of lockPadding){
                    el.style.paddingRight = '0px';
                }
            }
            if(lockMargin.length > 0){
                for(let el of lockMargin){
                    el.style.marginRight = '0px';
                }
            }
            body.classList.remove('lock');
            // body.style.paddingRight = '0px';  //to use comment bottom if section and next 2 lines
            
            if(elToAddPad.length > 0){
                for(let el of elToAddPad){
                    el.style.paddingRight = '0px';
                }
                
            }
            header.style.paddingRight = '0px';
            footer.style.paddingRight = '0px';
        }, timeout);

        unlock = false;
        setTimeout(function(){
            unlock = true;
        }, timeout);
    }

    document.addEventListener('keydown', function(e){
        if(e.which === 27){
            console.log(true);
            const popupActive = document.querySelector('.popup.popup-active');
            if(popupActive === null) return;
            popupClose(popupActive);
        }
    });
    //email handler
    if(forms.length === 0) return;

    // name=value&name2=value2
    let serialize = function(form){
        let emailText = form.querySelector('.company__email-text').value;
        let companyEmail = form.querySelector('.company__email').innerHTML;
        let projectName = 'my sender';
        let formSubject = 'отправляю вам свежие предложения';
        let adminEmail = 'mail@example.com';

        let emailTextKey = 1;
        let companyEmailKey = 2;
        let projectNameKey = 3;
        let formSubjectKey = 4;
        let adminEmailKey = 5;

        let str = '';
            if(companyEmail.length>0){
                str += emailTextKey + '=' + emailText + '&' +
                companyEmailKey + '=' + companyEmail + '&' +
                projectNameKey + '=' + projectName + '&' +
                formSubjectKey + '=' + formSubject + '&' +
                adminEmailKey + '=' + adminEmail;

            }
        return str;
    }

    let formSend = function(form){
        let data = serialize(form);
        let xhr = new XMLHttpRequest();
        let url = 'mail/mail.php'
        // let url = WPJS.ajaxUrl + '?action=send_email';
        //uncoment for wp use and comment line above

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function(){
            if (this.response === 'success'){
                console.log('form sent successfully');
                const currentPopup = document.getElementById('popupEmailSuccess');
                // popupOpen(currentPopup);
                const companyCardError = form.querySelector('.company__card-error');
                companyCardError.innerHTML = "письмо успешно отправлено."
                warnRemover(companyCardError);
                form.querySelector('.company__email-text').value = "";
                
                // form.reset();
                texareaResizer('doIt');
            }else{
                console.log('some error occurred')
                const currentPopup = document.getElementById('popupEmailError');
                // popupOpen(currentPopup);
                const companyCardError = form.querySelector('.company__card-error');
                companyCardError.innerHTML = "произошла ошибка при попытке отправить почту. попытайтесь снова позже."
                warnRemover(companyCardError);
            }
        }

        xhr.send(data);
    }

    function sendValidator(el) {
        const email = el.querySelector('.company__email-text');
        const companyCardError = el.querySelector('.company__card-error');

        if(email.value.length > 0){ 
            return true;
        }else{
            companyCardError.innerHTML = "нет текста для отправки!"
            warnRemover(companyCardError);
        }
    }

    for(let i = 0; i < forms.length; i++){
        let sendButton = forms[i].querySelector('.company__send-email');
        sendButton.addEventListener('click', function(e){
            e.preventDefault();
            if(sendValidator(forms[i]))
                formSend(forms[i]);
        })
    }
};
