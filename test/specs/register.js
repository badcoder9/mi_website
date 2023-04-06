const chai = require("chai")
const ge = require('../pageobjects/ge')
const reg = require('../pageobjects/register')

const fs = require('fs')

let registerCredentials = JSON.parse(fs.readFileSync('test/testData/registerData.json'))
let registerCredentialsNewUser = JSON.parse(fs.readFileSync('test/testData/registerDataNewUser.json'))

describe('header test suite', async () => {
    it('register in popop true', async () => {
        await browser.url('/')
        await reg.signInBtnTrigger.click()
        await reg.registerBtnTrigger.click()
        expect(await reg.registerModal).toExist()
    })
    it('register popop empty submission', async () => {
        await browser.url('/')
        await reg.signInBtnTrigger.click()
        await reg.registerBtnTrigger.click()
        await reg.submitBtnRegister.click()
        expect(await reg.submissionError).toBeElementsArrayOfSize({lte: 2})
    })
    registerCredentials.forEach(({name,lastname, email, password, passwordAuth}) => {
        it('register popup valid submission - existing account', async () => {
            await browser.url('/')
            await reg.signInBtnTrigger.click()
            await reg.registerBtnTrigger.click()
            expect(await reg.registerModal).toExist()
            await reg.register(name, lastname, email, password, passwordAuth)
            expect(await reg.invalidSubmissionError).toExist()
            chai.expect(await reg.invalidSubmissionError.getText()).to.equal('Polje email već postoji.')
        })
    })
    registerCredentialsNewUser.forEach(({name,lastname, email, password, passwordAuth}) => {
        // can succeed only once
        // update json before proceeding
        xit('register popup valid submission - new user', async () => {
            await browser.url('/')
            await reg.signInBtnTrigger.click()
            await reg.registerBtnTrigger.click()
            await expect(reg.registerModal).toExist()
            await reg.register(name, lastname, email, password, passwordAuth)
            await expect(reg.regSuccessMsg).toExist()
            chai.expect(await reg.regSuccessMsg.getText()).to.equal('Vaš nalog je napravljen.')
            await reg.regCompleteBtn.click()
            await reg.accountTriggerBtn.waitForExist()
            await expect(reg.accountTriggerBtn).toHaveTextContaining('Moj nalog')
            // await browser.pause(5000)
        })
    })
})