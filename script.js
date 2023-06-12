
const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-CT-WEB-PT-B';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}/players/`)
        const jsonResponse = await response.json();
        return jsonResponse.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const form = document.createElement("div");
        let player = playerId;
        form.innerHTML = `
            <h4>Player</h4>
            <br>
            <p>name: ${player.name}</p>
            <br>
            <p>breed: ${player.breed}</p>
            <br>
            <p>status: ${player.status}</p>
            <br>
            <img src= ${player.imageUrl}></img>
            `;

        playerContainer.classList.add('player-list');
        playerContainer.appendChild(form);
        //fetch('${APIURL}/players/${playerId}')

    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
        const form = document.createElement("div");

        form.innerHTML = `
        <h4>New Player: </h4><br>
        <p>name:</p> <input type="text name = "name"></input><br>
        <p>breed:</p> <input type="text name = "breed"></input><br>
        <p>status:</p> <input type="text name = "status"></input><br>
        <p>imageUrl:</p> <input type="text name = "imageUrl"></input><br>
        <p>team:</p> <input type="text name = "team"></input><br>
        <p>cohortId:</p> <input type="text name = "cohortId"></input><br>
        `;
        playerContainer.appendChild(form);
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    console.log('deleting' + id);

    try {

        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/${id}`, {
            method: `DELETE`,
        });
        const result = await response.json();

        console.log(result);
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = async (playerList) => {

    try {
        playerContainer.innerHTML = '';
        const pList = playerList;
        pList.forEach(yu => {
            fetchSinglePlayer(yu);
        })

    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        const form = document.createElement("div");
        const renderForm = () => {
            form.appendChild(form);

            const submit = document.createElement("button");
            submit.setAttribute("type", "submit");
            submit.id = "submit-button";
            submit.innerHTML = "Submit";
            form.appendChild(submit);
        }


        form.innerHTML = `
    <form>
      <label for="name">Name: </label><br>
      <input type="text" id="name" name="name"><br>

      <label for="breed">Breed: </label><br>
      <input type="text" id="breed" name="breed"><br>

      <label for="breed">Status: </label><br>
      <input type="text" id="status" name="status"><br>
  
      <label for="imageUrl">ImageUrl: </label><br>
      <input type="text" id="imageUrl" name="imageUrl"><br>
    </form>
  `;
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    renderAllPlayers(await fetchAllPlayers());

    //renderNewPlayerForm();
}

init();
