const express = require('express')
const jogosDeMeninas = require('./jogos-de-meninas.js')

const app = express();
const PORT = 3000;

app.use(express.static('./'));

app.get('/run-selenium', async (req, res) => {
  try {
    const data = await jogosDeMeninas.run()

    res.send(data);
  } catch (error) {
    res.status(500).send(`Error running Selenium script: ${error}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
