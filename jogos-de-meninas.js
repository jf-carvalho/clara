const { Builder, By } = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');

async function run() {
    const options = new Chrome.Options();

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options.addArguments('--headless=new'))
        .build();

    await driver.get('https://www.clickjogos.com.br/jogos-de-meninas');

    let adButton

    try {
        adButton = await driver.findElement(By.css('.fc-ab-dialog.fc-dialog'));
    } catch (Error) {
    }

    if (adButton !== undefined) {
        await adButton.click();
    }

    let list

    try {
        list = await driver.findElements(By.css('.gb_games_grid img'))
    } catch ({ name, message }) {
        driver.quit()

        if (name == 'NoSuchElementError') {
            return { error: 'A lista de jogos não foi encontrada' }
        } else {
            return {error: message}
        }
    }

    const games = []

    for (const game of list) {
        const name = await game.getAttribute("title")
        const img = await game.getAttribute("src")

        games.push({name: name, img: img})
    }

    return { games: games }
}

module.exports = {
    run
};