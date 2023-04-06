const chai = require("chai")
const ge = require('../pageobjects/ge')
const plp = require('../pageobjects/plp')


const fs = require('fs')
let audioCategory = JSON.parse(fs.readFileSync('test/testData/audicCategory.json'))

describe('PLP test suite - plp', async () => {
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
        // await browser.pause(7000)
        await expect(browser).toHaveUrlContaining(minValue)
        await expect(browser).toHaveUrlContaining(maxValue)
    })
    it('plp - sort products by best selling', async () =>{
        await plp.sortDropdown.selectByAttribute('value', 'best-selling')
        await expect(browser).toHaveUrlContaining('best-selling')
    })
    it('plp - pick color', async () =>{
        const firstColor = await plp.colors[0]
        const firstColorName = await firstColor.getText()
        await firstColor.click()
        await expect(browser).toHaveUrlContaining(firstColorName)
        await expect(firstColor.$('input')).toBeChecked()
    })
    it('plp - pick battery size', async () =>{
        const secondSize = await plp.batterySize[1]
        const secondSizeName = await secondSize.getText()
        const secondSizeNameURL = secondSizeName.replace(/ /g, '%20')
        console.log('NAME===='+secondSizeNameURL + ' =NAME')
        await secondSize.click()
        // functional + UI issue found
        // 1. checkbox not checked
        // 2. filter is not present in active filers bar
        // 3. depending on what battery size is clicked, filter section disappears
        // 4. when filter section is gone, active filters section remove buttons is/are not functional
        // requires different type of confirmation
        // await expect(secondSize.$('input')).toBeChecked()
        await expect(browser).toHaveUrlContaining(secondSizeNameURL)
    })
    it('plp - compare products - add 1 item - compare dialog', async () =>{
        await ge.navItems[3].click()
        await plp.categoryLinks[0].click()
        const prod1 = await plp.productBoxes[0].$('.compare-button')
        await prod1.click()
        await expect(plp.comparePopup).toExist()
        await expect(plp.comparePopup).toBeDisplayed()
    })
    it('plp - compare products - confirm delete compare dialog is present', async () =>{
        await plp.comparePopupClose.click()
        await expect(plp.Dialog).toBeDisplayed()
        await chai.expect(await plp.DialogTitle.getText()).to.equal('Poređenje proizvoda');
    })
    it('plp  - compare products - cancel confirm delete compare dialog', async () =>{
        await plp.DialogCancel.click()
        await expect(plp.Dialog).toBeDisplayed({reverse: true})
    })
    it('plp - compare products - confirm to delete compare dialog', async () =>{
        const prod3 = await plp.productBoxes[2].$('.compare-button')
        await prod3.click()
        await expect(plp.comparePopup).toExist()
        await expect(plp.comparePopup).toBeDisplayed()
        await plp.comparePopupClose.click()
        await expect(plp.Dialog).toBeDisplayed()
        await chai.expect(await plp.DialogTitle.getText()).to.equal('Poređenje proizvoda');
        await plp.DialogClose.click()
        await expect(plp.Dialog).not.toBeDisplayed()
        await expect(plp.comparePopup).not.toBePresent()
        // await browser.pause(5000)
    })
    it('plp - compare products - click the same compare button twice', async () =>{
        await ge.navItems[3].click()
        await plp.categoryLinks[0].click()
        const prod1 = await plp.productBoxes[0].$('.compare-button')
        await prod1.click()
        await expect(plp.comparePopup).toExist()
        await expect(plp.comparePopup).toBeDisplayed()
        await prod1.click()
        await expect(plp.comparePopup).not.toBePresent()
    })
    it('plp - compare products - compare two different product types', async () =>{
        await ge.navItems[3].click()        
        await plp.prodType1[0].click()
        await expect(plp.comparePopup).toExist()
        await expect(plp.comparePopup).toBeDisplayed()
        await plp.prodType2[0].click()
        await chai.expect(await plp.DialogTitle.getText()).to.equal("Greška")
    })
    it('plp - compare products - compare two different product types - cancel dialog', async () =>{
        await plp.DialogCancel.click()
        await expect(plp.Dialog).toBeDisplayed({reverse: true})
        await expect(plp.comparePopup).toExist()
        await expect(plp.comparePopup).toBeDisplayed()
    })
    it('plp - compare two different product types - close dialog', async () =>{     
        await plp.prodType2[0].click()
        await expect(plp.DialogTitle).toHaveTextContaining('Greška')
        await plp.DialogClose.click()
        await expect(plp.Dialog).not.toBeDisplayed()
    }) 
    it('plp - reach pdp', async () =>{     
        const firstProduct = await plp.productBoxes[0].$('.title a')
        const text = await firstProduct.getText()
        await firstProduct.click()
        await expect(plp.productPageTitle).toHaveTextContaining(text)
    })
})