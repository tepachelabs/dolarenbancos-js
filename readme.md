# Dolar en bancos

A bot who fetches information of currency exchange from important mexican banks, like banorte, banamex, santander, etc.

## Fetching structure

The bot fetches information using webcrawerls and specific APIs to get the information from each respective bank. 

Each bank has its own file to fetch the information on `/fetcher/`

The `/scheduler/index.js` gets those files and runs them each hour, when the clock hits the _xx:00:00_. 

Once the fetching is done, the results are then saved on a firebase database.

## Visualization

The application currently supports 3 channels:

- Discord
- Telegram
- Web

## How to run locally the web application

1. Install dependencies.

    ``` npm install ```

2. Install firebase globally.

    ``` npm install -g firebase-tools ```

3. Run firebase locally.

    ``` firebase emulators:start --only firestore ```

4. Add the banxico environment key. Ask [@tonymtz](https://www.twitter.com/_tonymtz) for the key, or create your own.

5. On another terminal, run the server from the root directoty.

    ``` node index.js ```

### What if I want to help add more channels?

You can contact [@tonymtz](https://www.twitter.com/_tonymtz) and ask him how you can contribute on the project