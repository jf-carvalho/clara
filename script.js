class Loader {
    loader

    constructor() {
        this.loader = document.getElementById("loader");
    }

    start() {
        this.loader.classList.add('d-flex')
    }

    stop() {
        this.loader.classList.add('d-none')
    }
}

async function runSelenium() {
    const loader = new Loader()
    try {
        
        loader.start()

        const response = await fetch('/run-selenium');
        const results = await response.text();

        loader.stop()

        displayResults(JSON.parse(results).games)

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

const displayResults = results => {
    const grid = document.querySelector('#results .grid')
    grid.parentElement.classList.add('d-flex')

    results.forEach(game => {
        const newItem = document.createElement('div')
        newItem.classList.add('item')

        const newItemImage = document.createElement('img')
        newItemImage.src = game.img

        const newItemLabel = document.createElement('span')
        newItemLabel.innerText = game.name

        newItem.appendChild(newItemImage)
        newItem.appendChild(newItemLabel)

        grid.appendChild(newItem)
    });
}