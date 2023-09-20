const searchInput = document.getElementById('search-input')
const fetchButton = document.getElementById('fetch-button')
const dataContainer = document.getElementById('data-container')

fetchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim()
    if (searchTerm) {
        const resp = await globals.search(searchTerm) 
        dataContainer.innerText = resp 
    }
})

const fileInput = document.getElementById('file-input')
const parsedContent = document.getElementById('parsed-content')

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = async () => {
        const content = reader.result
        const resp = await globals.upload(content)
        parsedContent.innerText = resp
      };

      reader.readAsText(file)
    }
})
