const chai = require("chai")
const ge = require('../pageObject/ge')

const fs = require('fs')


let loginCredentialsWrong = JSON.parse(fs.readFileSync('test/testData/loginDataWrong.json'))
let loginCredentialsCorrect = JSON.parse(fs.readFileSync('test/testData/loginDataCorrect.json'))
let registerCredentials = JSON.parse(fs.readFileSync('test/testData/registerData.json'))
let registerCredentialsNewUser = JSON.parse(fs.readFileSync('test/testData/registerDataNewUser.json'))


describe('header test suite', async () => {
    // login/register/pw reset
    it('sign in popop true', async () => {
        await browser.url('/')
        await ge.signInBtnTrigger.click()
        expect(await ge.loginModal).toExist()
    })
    it('register in popop true', async () => {
        await browser.url('/')
        await ge.signInBtnTrigger.click()
        await ge.registerBtnTrigger.click()
        expect(await ge.registerModal).toExist()
    })
    it('forgot pw popop true', async () => {
        await browser.url('/')
        await ge.signInBtnTrigger.click()
        await ge.forgotPwBtn.click()
        expect(await ge.forgotPwModal).toExist()
    })
    it('sign in popop empty submission', async () => {
        await browser.url('/')
        await ge.signInBtnTrigger.click()
        await ge.submitBtnLogIn.click()
        expect(await ge.submissionError).toBeElementsArrayOfSize({lte: 2})
    })
    it('register popop empty submission', async () => {
        await browser.url('/')
        await ge.signInBtnTrigger.click()
        await ge.registerBtnTrigger.click()
        await ge.submitBtnRegister.click()
        expect(await ge.submissionError).toBeElementsArrayOfSize({lte: 2})
    })
    loginCredentialsWrong.forEach(({username,password}) => {
        it('login popup invalid submission', async () => {
            await browser.url('/')
            await ge.signInBtnTrigger.click()
            await ge.login(username, password)
            chai.expect(await ge.invalidSubmissionError.getText()).to.equal('Podaci ne odgovaraju ni jednom nalogu.')
        })
    })
    loginCredentialsCorrect.forEach(({username,password}) => {
        it('login popup valid submission', async () => {
            await browser.url('/')
            await ge.signInBtnTrigger.click()
            await ge.login(username, password)
            const account = await $('.your-account-title')
            expect(await account).toExist()
        })
        it('my account - trigger dropdown', async () => {
            await browser.url('/')
            await ge.signInBtnTrigger.click()
            await ge.login(username, password)
            await ge.accountHoverEl.moveTo()
            expect(await ge.accountDropdown).toBeDisplayed()
            // await browser.pause(3000)
        })
        it('my account - trigger dropdown - addresses', async () => {
            await browser.url('/')
            await ge.signInBtnTrigger.click()
            await ge.login(username, password)
            await ge.accountHoverEl.moveTo()
            await expect(await ge.accountDropdown).toBeDisplayed()
            await expect(await ge.accountDropdownAdr).toBeDisplayed()
            await ge.accountDropdownAdr.click()
            await expect(browser).toHaveUrlContaining('addresses')
            // await browser.pause(3000)
        })
        it('my account - trigger dropdown - logout', async () => {
            await browser.url('/')
            await ge.signInBtnTrigger.click()
            await ge.login(username, password)
            await ge.accountHoverEl.moveTo()
            expect(await ge.accountDropdown).toBeDisplayed()
            await ge.accountDropdownLogOut.click()
            expect(await ge.signInBtnTrigger).toBeDisplayed()
            // await browser.pause(3000)
        })
    })
    it('forgot pw invalid submission', async () => {
        await browser.url('/')
        await ge.signInBtnTrigger.click()
        await ge.forgotPwBtn.click()
        await expect(await ge.forgotPwModal).toExist()
        await ge.forgotPwEmail.setValue('testerica@yopmail.com')        
        await ge.requestPwResetBtn.click()        
        await expect(await ge.submissionError).toBeElementsArrayOfSize({lte: 1})
        // await browser.pause(3000)
    })
    it('forgot pw invalid submission', async () => {
        await browser.url('/')
        await ge.signInBtnTrigger.click()
        await ge.forgotPwBtn.click()
        expect(await ge.forgotPwModal).toExist()
        await ge.forgotPwEmail.setValue('testerica@yopmail.com')        
        await ge.requestPwResetBtn.click()        
        expect(await ge.submissionError).toBeElementsArrayOfSize({lte: 1})
        // await browser.pause(3000)
    })
    registerCredentials.forEach(({name,lastname, email, password, passwordAuth}) => {
        // can succeed only once
        it('register popup valid submission - existing account', async () => {
            await browser.url('/')
            await ge.signInBtnTrigger.click()
            await ge.registerBtnTrigger.click()
            expect(await ge.registerModal).toExist()
            await ge.register(name, lastname, email, password, passwordAuth)
            expect(await ge.invalidSubmissionError).toExist()
            chai.expect(await ge.invalidSubmissionError.getText()).to.equal('Polje email već postoji.')
            // await browser.pause(3000)
        })
    })
    registerCredentialsNewUser.forEach(({name,lastname, email, password, passwordAuth}) => {
        // can succeed only once
        // update json before proceeding
        xit('register popup valid submission - new user', async () => {
            await browser.url('/')
            await ge.signInBtnTrigger.click()
            await ge.registerBtnTrigger.click()
            await expect(ge.registerModal).toExist()
            await ge.register(name, lastname, email, password, passwordAuth)
            await expect(ge.regSuccessMsg).toExist()
            chai.expect(await ge.regSuccessMsg.getText()).to.equal('Vaš nalog je napravljen.')
            await ge.regCompleteBtn.click()
            await ge.accountTriggerBtn.waitForExist()
            await expect(ge.accountTriggerBtn).toHaveTextContaining('Moj nalog')
            // await browser.pause(5000)
        })
    })
    // login/register/pw reset end

    
    
})