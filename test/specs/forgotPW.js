const chai = require("chai")
const forgotPW = require('../pageObject/forgotPw')

describe('forgot password test suite', async () => {
    it('forgot pw popop true', async () => {
        await browser.url('/')
        await forgotPW.signInBtnTrigger.click()
        await forgotPW.forgotPwBtn.click()
        expect(await forgotPW.forgotPwModal).toExist()
    })
    it('forgot pw invalid submission', async () => {
        await browser.url('/')
        await forgotPW.signInBtnTrigger.click()
        await forgotPW.forgotPwBtn.click()
        await expect(await forgotPW.forgotPwModal).toExist()
        await forgotPW.forgotPwEmail.setValue('testerica@yopmail.com')        
        await forgotPW.requestPwResetBtn.click()        
        await expect(await forgotPW.submissionError).toBeElementsArrayOfSize({lte: 1})
    })
    it('forgot pw invalid submission', async () => {
        await browser.url('/')
        await forgotPW.signInBtnTrigger.click()
        await forgotPW.forgotPwBtn.click()
        expect(await forgotPW.forgotPwModal).toExist()
        await forgotPW.forgotPwEmail.setValue('testerica@yopmail.com')        
        await forgotPW.requestPwResetBtn.click()        
        expect(await forgotPW.submissionError).toBeElementsArrayOfSize({lte: 1})
    })
})