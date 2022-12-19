const chai = require("chai")
const ge = require('../pageObject/ge')
const plp = require('../pageObject/plp')


const fs = require('fs')
let audioCategory = JSON.parse(fs.readFileSync('test/testData/audicCategory.json'))

describe('PLP test suite - plp', async () => {
    // login/register/pw reset
    it('reach PLP', async () => {
        await browser.url('/')
        await ge.navItems[3].click()
        chai.expect(await ge.breadcrumbsLocation.getText()).to.eql(await plp.getPlpTitle)       
    })
    audioCategory.forEach(({category}) => {
        it('plp - choose category', async () => {
            await browser.url('/')
            await ge.navItems[3].click()
            await plp.chooseCategory(category)   
            chai.expect(await ge.breadcrumbsLocation.getText()).to.eql(await plp.getPlpTitle)         
        })
    })
    it('plp - choose category - update price range via input', async () => {
        await browser.url('/')
        await ge.navItems[3].click()
        await plp.categoryLinks[0].click()  
        chai.expect(await ge.breadcrumbsLocation.getText()).to.eql(await plp.getPlpTitle)

        await plp.updatePriceRangeInput()
        let minValue = await plp.rangeSliderMinInput.getValue()
        // let typeOfMinValue = await typeof minValue.toString()
        // console.log('RANGE INPUT MIN VALUE IS: ' + await minValue + ', and type of:  ' + await typeOfMinValue)
        await expect(browser).toHaveUrlContaining(minValue)
    })
    it('plp - choose category - update price range via range slider', async () => {
        await browser.url('/')
        await ge.navItems[3].click()
        await plp.categoryLinks[0].click()  
        chai.expect(await ge.breadcrumbsLocation.getText()).to.eql(await plp.getPlpTitle)

        await plp.updatePriceRangeSlider()
        let minValue = await plp.rangeSliderMinInput.getValue()
        let maxValue = await plp.rangeSliderMaxInput.getValue()
        // await browser.pause(3000)
        await expect(browser).toHaveUrlContaining(minValue)
        await expect(browser).toHaveUrlContaining(maxValue)
    })
    

    
    
})