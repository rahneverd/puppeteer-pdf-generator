const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const hbs = require('handlebars')
const path = require('path')

compile = async function (templateName) {
  const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`)
  const html = await fs.readFile(filePath, 'utf-8')
  return hbs.compile(html)({})
}

generatePdf = async function(pdfName, templateName) {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  })
    const page = await browser.newPage()
    const content = await compile(templateName)
    await page.setContent(content)
    await page.pdf({
      path: `./generatedPdfs/${pdfName}.pdf`,
      format: 'A4',
      printBackground: true
    })
    console.log('done')
    await browser.close()
    process.exit()
  } catch (error) {
    console.log('error: ', error)
    
  }
}

generatePdf('test-01', 'template-01')

