const ErrorDuration = 3000;
$(()=>{
    let text = document.querySelector('.insert-form__string');
    let startWarn = document.querySelector('.insert-form__warn');
    let addCompanyError = document.querySelector('.add-company__error');
    let newTags = ``;


    //******** db set card start ********//
    function getCompanyDb(){
        $.ajax({
            url: "bd/db_card_get.php",
            type: "GET",
            dataType: "json",
            success: function(result) {
                if (result){ 
                        if(result.companies !== ""){
                            allCompaniesRender(result.companies, result.tags);
                        }else{
                            console.log('нет компаний в базе данных!');
                            allCompaniesRender();
                        }
                }else{
                    console.log(result.message);
                }
				return false;
            },
            error: function(){console.log('ошибка получения компании из бд type2')}
        });

    }
    function sendCompanyToDb(company, email, addCompanyName, addCompanyEmail, addCompanyText, middleContainer, tagsWordsString){
        let tagsFromForm = [];
        tagsFromForm = compAddTagDbPre(tagsWordsString);
        $.ajax({
            url: "bd/db_card_add.php",
            type: "POST",
            data: {company: company, email: email, tags: tagsFromForm}, // Передаем данные для записи 
            dataType: "json",
            success: function(result) {
                if (result){ 
                    let companyId = result.lastCompId;
                    let tagLastId = result.lastTagId;
					console.log(result.message);
                    companyAddTagCont(tagsWordsString, tagLastId);
                    companyAddCardCont(addCompanyName, addCompanyEmail, addCompanyText, middleContainer, tagsWordsString, companyId);

                }else{
                    console.log(result.message);
                }
				return false;
            },
            error: function() { console.log('ошибка записи компании в бд type2')}
        });

    }
    function sendTagToDb(companyId, tag, fatherDiv){
        $.ajax({
            url: "bd/db_tag_add.php",
            type: "POST",
            data: {companyId: companyId, tag: tag.value}, // Передаем данные для записи 
            dataType: "json",
            success: function(result) {
                if (result){ 
					console.log(result.message);
                    tagAddRender(tag, fatherDiv, result.lastTagId);
                }else{
                    console.log(result.message);
                }
				return false;
            },
            error: function() { console.log('ошибка записи тагов в бд type2')}
        });

    }
    function removeTagDb(tagId, tag){
        $.ajax({
            url: "bd/db_tag_remove.php",
            type: "POST",
            data: {tagId: tagId}, // Передаем данные для записи 
            dataType: "json",
            success: function(result) {
                if (result){ 
                    tagRemover(tag);
					console.log(result.message);
                }else{
                    console.log(result.message);
                }
				return false;
            },
            error: function() { console.log('ошибка удаления тага из бд type2')}
        });

    }
    function removeCompanyDb(compId, comp){
        $.ajax({
            url: "bd/db_card_remove.php",
            type: "POST",
            data: {compId: compId}, // Передаем данные для записи 
            dataType: "json",
            success: function(result) {
                if (result){ 
                    companyRemover(comp);
					console.log(result.message);
                }else{
                    console.log(result.message);
                }
				return false;
            },
            error: function() { console.log('ошибка удаления компании из бд type2')}
        });

    }
    //******** db set card end ********//
    
    showAllComp();
    //show all saved companies on page load
    function showAllComp(){
        getCompanyDb();
    }

    function allCompaniesRender(companies , tags){
        const middleContainer = document.querySelector('.parser__middle-section');
        if(companies){
            for(let i = 0; i < companies.id.length; i++){
                // console.log(result.companies.id[i] + ", ")
                let companyName = companies.title[i];
                let companyEmail = companies.email[i];
                let companyId = companies.id[i];
                //running through tags from db to find those who fits current company card id
                if(tags !== ""){
                    for(let i =0; i < tags.id.length; i++){
                        if(tags.userId[i] === companyId){
                            companiesAddTag(tags.tag[i], tags.id[i]);
                        }
                    }
                }
                let companyCard = document.createElement('form');
            companyCard.classList.add('parser__company','company');
            companyCard.id = companyId;
            let element = `
                <div class="company__top">
                    <div class="company__data">
                        <div class="company__name">${companyName}</div>
                        <div class="company__email">${companyEmail}</div>
    
                    </div>
                    <div class="company__text-container">
                        <textarea class="company__email-text"></textarea>
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
            `
            companyCard.innerHTML = element;
            middleContainer.appendChild(companyCard);
    
                companyName.value = '';
                companyEmail.value = '';
                newTags = ``;
            }

        }
        companyRemove();
        tagRemove();
        tagAdd();
        texareaResizer('doIt');
        textAreasHandler();
        emailHandler();
        companyAdd();
    }

    //render tags while loaning page
    function companiesAddTag(tag, tagId){
        if(tag != ``){
newTags += `<div class="company__tag tag" data-tagId="${parseInt(tagId)}">
<div class="tag__text">${tag}</div>
<button class="tag__button">X</button>
</div>
`
        }
    }

    const startButton = document.querySelector('.insert-form__button');
    startButton.addEventListener('click', function(e) {
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
        if(companies.length > 0){
            let coincidences = 0;

            for(let i = 0; i < companies.length; i++){
                const company = companies[i];
                let tags = company.querySelectorAll('.tag__text')
                if(tags.length > 0){
                    for(let i = 0; i < tags.length; i++){
                        const tag = tags[i];
                        // if(tag.innerHTML == text.value){
                            if(text.value.indexOf(tag.innerHTML) + 1) {
                                coincidences++;
                                const emailText = company.querySelector('.company__email-text'); 
                                emailText.value = text.value;
                        }
                    }
                }
                
            }
        if(coincidences === 0){
                startWarn.innerHTML = "совпадений не обнаружено"
                warnRemover(startWarn);
            }else if(coincidences > 0){
                text.value = ``;
                startWarn.innerHTML = `обнаружено ${coincidences} совпадений`
                warnRemover(startWarn);
            }
        }else{
            startWarn.innerHTML = "не добавлено ниодной компании"
            warnRemover(startWarn);
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
            for(let i = 0; i < companiesCards.length; i++){
                const companyCard = companiesCards[i];
                let comRemoveButton = companyCard.querySelector('.company__remove');
                comRemoveButton.addEventListener('click', function(e){
                    e.preventDefault();
                    removeCompanyDb(companyCard.id, companyCard)
                }); 
            }
        }
    }
    //delete company card after got confirmation that db data deleted
    function companyRemover(companyCard){
        companyCard.remove();
    }
    //add company card main content
    function companyAddCardCont(addCompanyName, addCompanyEmail, addCompanyText, middleContainer, tagsWordsString, companyId){
        let companyCard = document.createElement('form');
        companyCard.classList.add('parser__company','company');
        companyCard.id = companyId;
        let element = `
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
        `

        companyCard.innerHTML = element;
        middleContainer.appendChild(companyCard);
        addCompanyName.value = '';
            addCompanyEmail.value = '';
            addCompanyText.value = '';
            tagsWordsString.value = '';
            newTags = ``;
            companyRemove();
            tagRemove();
            tagAdd(companyCard);
            texareaResizer('doIt');
            textAreasHandler();
            emailHandler(companyCard);
    }

    //add company card tags while creating new card
    function companyAddTagCont(tagsWordsString, lastTagId){
        let tagsArray = [];
        if(tagsWordsString.value.length>0){
            tagsArray = tagsWordsString.value.split(/,\s*/);
            if(tagsArray.length>0){
                for(let i=0; i<tagsArray.length; i++){
                    if(tagsArray[i] != ``){
newTags += `<div class="company__tag tag" data-tagId="${parseInt(lastTagId) + i}">
<div class="tag__text">${tagsArray[i]}</div>
<button class="tag__button">X</button>
</div>
`
                    }
                    
                }
            }
            
        }
    }
    //prepare company card tags to send to db while creating new card 
    function compAddTagDbPre(tagsWordsString){
        let tagsArray = [];
        if(tagsWordsString.value.length>0){
            tagsArray = tagsWordsString.value.split(/,\s*/);
            if(tagsArray.length>0){
                let filteredTagsArr = tagsArray.filter(function (el) {
                    return el != ``;
                  });
                  return filteredTagsArr;
            }
            
        }
        return null;
    }
    //initialize company card data that has to be added if no errors
    function companyAdd(){
        const addCompanyForm = document.querySelector('.add-company');
        const addCompanyButton = addCompanyForm.querySelector('.add-company__button');
        const addCompanyName = addCompanyForm.querySelector('.add-company__comp-name');
        const addCompanyText = addCompanyForm.querySelector('.add-company__text');
        const addCompanyEmail = addCompanyForm.querySelector('.add-company__comp-email');
        const middleContainer = document.querySelector('.parser__middle-section');
        const tagsWordsString = addCompanyForm.querySelector('.add-company__tags');
        
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
            }else if(addCompanyEmail.value !== ''){
                let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if(!(addCompanyEmail.value.match(mailformat))){
                    addCompanyError.innerHTML = "неверный формат Email";
                    warnRemover(addCompanyError);
                    return;
                }
            }
           
            sendCompanyToDb(addCompanyName.value, addCompanyEmail.value, addCompanyName, addCompanyEmail, addCompanyText, middleContainer, tagsWordsString);
            
        }); 
    }
    //tag add remove
    function tagRemove() {
        const tags = document.querySelectorAll('.tag');
        if(tags.length > 0){
            for(let tag of tags){
                const tagRemoveButton = tag.querySelector('.tag__button');
                tagRemoveButton.addEventListener('click', function(e){
                    e.preventDefault();
                    removeTagDb(tag.dataset.tagid, tag);
                }); 
            }
        }
    }
    //tag remover after got confirmation from DB
    function tagRemover(tag){
        tag.remove();
    }
    //single tag add 
    function tagAdd(newCard) {
        if(newCard){
            const company = newCard;
            addTagHandler(company);
        }else{
            const companies = document.querySelectorAll('.company');
            if(companies.length > 0){
                for(let company of companies){
                    addTagHandler(company);
                }
            }
        }
        
    }
    function addTagHandler(company){
        const tagWrightButton = company.querySelector('.company__add-button');
        tagWrightButton.addEventListener('click', function(e){
            e.preventDefault();
            const tagInputButton = company.querySelector('.company__add-button');
            tagInputButton.classList.remove('active');
            const tagInputCont = company.querySelector('.company__add-tag');
            tagInputCont.classList.add('active');
            const tagAddButton = tagInputCont.querySelector('.company__add-tag-button');
            tagAddButton.addEventListener('click', function(e){
                e.preventDefault();
                tagInputButton.classList.add('active');
                tagInputCont.classList.remove('active');
                const newTagText = tagInputCont.querySelector('.company__add-input');
                const fatherDiv = company.querySelector('.company__bot-left');
                if(newTagText.value){
                    sendTagToDb(company.id, newTagText, fatherDiv);
                }
                //removing eventlistener to avoid multiply it quantity
                this.removeEventListener('click',arguments.callee,false);
            })
        }); 
    }
    //single tag render
    function tagAddRender(newTagText, fatherDiv, tagId){
        let newTags = `
        <div class="company__tag tag" data-tagId="${parseInt(tagId)}">
            <div class="tag__text">${newTagText.value}</div>
            <button class="tag__button">X</button>
        </div>
        `;
        newTagText.value = "";
        fatherDiv.innerHTML += newTags;
        newTags = ``;
        tagRemove();
    }
    //textareas handler (handling tabs and spaces)
    function tabChecker(e) {
        if (e.key === 'Tab') {
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
    }
    function textAreasHandler() {
        const textareas = document.querySelectorAll('textarea');
        if(textareas.length === 0)return;
        for(let textarea of textareas){
            textarea.removeEventListener("keydown", tabChecker)
            textarea.addEventListener('keydown', tabChecker);
        }
        
    }

    //allows textareas to auto increase height 
    function texareaResizer(attr) {
        const textareas = document.querySelectorAll(".company__email-text, .insert-form__string");
        if(textareas.length === 0) return;
        for(let textarea of textareas){
            textarea.setAttribute("style", "height:" + (textarea.scrollHeight) + "px;overflow-y:hidden;");
            // textarea.style.height = "auto";
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
function emailHandler(newForm){
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
            currentPopup.addEventListener('click', (e)=>{
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
            const popupActive = document.querySelector('.popup.popup-active');
            if(popupActive === null) {return;}
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

        let str = '';
            if(companyEmail.length>0){
                str += 'emailTextKey' + '=' + emailText + '&' +
                'companyEmailKey' + '=' + companyEmail + '&' +
                'projectNameKey' + '=' + projectName + '&' +
                'formSubjectKey' + '=' + formSubject + '&' +
                'adminEmailKey' + '=' + adminEmail;

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
                const curentPopup = document.getElementById('popupEmailSuccess');
                // popupOpen(curentPopup);
                const companyCardError = form.querySelector('.company__card-error');
                companyCardError.innerHTML = "письмо успешно отправлено."
                warnRemover(companyCardError);
                form.querySelector('.company__email-text').value = "";
                
                // form.reset();
                texareaResizer('doIt');
            }else{
                console.log('some error occurred')
                const curentPopup = document.getElementById('popupEmailError');
                // popupOpen(curentPopup);
                const companyCardError = form.querySelector('.company__card-error');
                companyCardError.innerHTML = "произошла ошибка при попытке отправить почту. попытайтесь снова позже."
                warnRemover(companyCardError);
            }
        }

        xhr.send(data);
    }
    //check if email text exist 
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
    //send email
    if(newForm){
            let submitButton = newForm.querySelector('.company__send-email');
            submitButton.addEventListener('click', (e)=>{
                e.preventDefault();
                if(sendValidator(newForm))
                    formSend(newForm);
            })
    }else{
        for(let form of forms){
            let submitButton = form.querySelector('.company__send-email');
            submitButton.addEventListener('click', (e)=>{
                e.preventDefault();
                if(sendValidator(form))
                    formSend(form);
            })
        }
    }
};

});



















