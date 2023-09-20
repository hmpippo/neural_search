const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const axios = require('axios')
const cheerio = require('cheerio')

// backend rest api endpoint 
const baseUrl = 'http://localhost:8000/api/'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
}

const parseHTMLContent = (content) => {
  const $ = cheerio.load(content)
  
  const titles = $('.mdl-typography--title').map((_, el) => $(el).text()).get()
  const specificDiv = $('div[class="' + "content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1" + '"]') 
  const actions = specificDiv.map((_, el) => $(el).text()).get()
  const links = specificDiv.find('a').map((_, el) => ({
    href: $(el).attr('href'),
    text: $(el).text()
  })).get()
  const products = $('div[class="' + "content-cell mdl-cell mdl-cell--12-col mdl-typography--caption" + '"]')
  .map((_, el) => {
    const text = $(el).text()
    return text.substring(0, text.indexOf('Why is this here?')).replace('Products:', '').trim()
  }).get()

  ret = []
  for (i = 0; i < titles.length; i++) {
    let arr = actions[i].replace(links[i].text, '').replace(/\s+/g, ' ').split(' ')
    let obj = {
      title: titles[i],
      action: arr[0],
      timestamp: arr.slice(1).join(' '),
      link: links[i].href,
      text: links[i].text,
      cleaned_text: cleanText(links[i].text.trim()),
      products: products[i]
    }
    ret.push(obj)
  }
  return ret
}

const cleanText = (text) => {
  text = text.replace(/https|www\.|\.com/gi, '')
  text = text.replace(/[\/\-_]/g, ' ')
  text = text.replace(/[^a-zA-Z0-9 ]/g, '');
  return text
}

app.whenReady().then(() => {
  ipcMain.handle('search', async (_, data) => { 
    try {
      const searchTerm = data
      const apiUrl = baseUrl + `search?q=${searchTerm}`
      const resp = await axios.get(apiUrl)
      return JSON.stringify(resp.data.result, null, 2)
    } catch (error) { 
      console.error(error)
    } 
  })

  ipcMain.handle('upload', async (_, data) => { 
    try {
      const content = data
      data = parseHTMLContent(content)
      console.log(data)
      const apiUrl = baseUrl + `upload`
      const resp = await axios.post(apiUrl, data)
      return JSON.stringify(resp.data, null, 2)
    } catch (error) { 
      console.error(error)
    } 
  })
  
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})