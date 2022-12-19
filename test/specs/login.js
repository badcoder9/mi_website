const chai = require("chai")
const ge = require('../pageObject/ge')
const login = require('../pageObject/login')

const fs = require('fs')


let loginCredentialsWrong = JSON.parse(fs.readFileSync('test/testData/loginDataWrong.json'))
let loginCredentialsCorrect = JSON.parse(fs.readFileSync('test/testData/loginDataCorrect.json'))

describe('login test suite', async () => {
    it('sign in popop true', async () => {
        await browser.url('/')
        await login.signInBtnTrigger.click()
        expect(await login.loginModal).toExist()
        await login.loginCloseBtn.click()
    })
    it('sign in popop empty submission', async () => {
        await browser.url('/')
        await login.signInBtnTrigger.click()
        await login.submitBtnLogIn.click()
        expect(await login.submissionError).toBeElementsArrayOfSize({lte: 2})
        await login.loginCloseBtn.click()
    })
    loginCredentialsWrong.forEach(({username,password}) => {
        it('login popup invalid submission', async () => {
            await browser.url('/')
            await login.signInBtnTrigger.click()
            await login.login(username, password)
            chai.expect(await login.invalidSubmissionError.getText()).to.equal('Podaci ne odgovaraju ni jednom nalogu.')
            await login.loginCloseBtn.click()
        })
    })
    loginCredentialsCorrect.forEach(({username,password}) => {
        it('login popup valid submission', async () => {
            await browser.url('/')
            await login.signInBtnTrigger.click()
            await login.login(username, password)
            const account = await $('.your-account-title')
            expect(await account).toExist()
        })
        it('my account - trigger dropdown', async () => {
            // await browser.url('/')
            await login.accountHoverEl.waitForExist()
            await login.accountHoverEl.moveTo()
            expect(await login.accountDropdown).toBeDisplayed()
        })
        it('my account - trigger dropdown - addresses', async () => {
            await browser.url('/')
            await login.accountHoverEl.waitForExist()
            await login.accountHoverEl.moveTo()
            expect(await login.accountDropdown).toBeDisplayed()
            expect(await login.accountDropdownAdr).toBeDisplayed()
            await login.accountDropdownAdr.click()
            expect(await browser).toHaveUrlContaining('addresses')
        })
        it('my account - trigger dropdown - logout', async () => {
            await browser.url('/')
            await login.accountHoverEl.waitForExist()
            await login.accountHoverEl.moveTo()
            expect(await login.accountDropdown).toBeDisplayed()
            await login.accountDropdownLogOut.click()
            expect(await login.signInBtnTrigger).toBeDisplayed()
        })
    })
})