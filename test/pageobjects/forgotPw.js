class forgotPw {
    // flow start button
    get signInBtnTrigger(){
        return $('.navbar-end .buttons > a')
    }
   // errors
    get submissionError(){
        return $$('p.is-danger')
    }
    get invalidSubmissionError(){
        return $('p.is-danger')
    }
    // forgot pw
    get forgotPwBtn(){
        return $('[action="/login"] a.forgot-password')
    }
    get forgotPwModal(){
        return $('.modal-card [action="/password/email"]')
    }
    get requestPwResetBtn(){
        return $('.modal-card [action="/password/email"] button[type="submit"]')
    }
    get forgotPwEmail(){
        return $('.modal-card [action="/password/email"] input[type="email"]')
    }    
    get closePwModal(){
        return $('[action="/password/email"] .modal-close')
    }
    get closePwModal(){
        return $('[action="/password/email"] header .modal-close')
    }
    get closeLoginModal(){
        return $('div[class="animation-content"] > .modal-close')
    }  
}

module.exports = new forgotPw();