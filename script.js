const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-CT-WEB-PT-B';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;
 const statusType = {
            Field: "field",
            Bench: "bench"
        }
/** Fetch all
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
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


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */

const addNewPlayer = async (player) => {
    try {
        //https://www.startpage.com/sp/sxpra?url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fd%2Fd1%2FBlue_Merle_Border_Collie._Female.jpg%2F200px-Blue_Merle_Border_Collie._Female.jpg
        //CohortId
        // 2302-ACC-CT-WEB-PT-B
        const response = await fetch(`${APIURL}/players`,
        {
            method: "POST",
            Headers: {
                'Content-Type': 'appliction.json',
            },
            body: JSON.stringify({
                name: player.name,
                breed: player.breed,
                status: player.status,
                imageUrl: player.imageUrl,
                createdAt: player.createdAt,
                updatedAt: player.updatedAt,
                teamId: player.teamId,
                cohortId: player.cohortId                
                }),
            }).then(res => res.json())
        .then(console.log(result))
        const result = await response.json();
        console.log(result);
        //await init();
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};


const renderNewPlayerForm = async () => {
    try {
        const form = document.createElement("div");
            const submit = document.createElement("button");
            submit.setAttribute("type", "submit");
            submit.id = "submit-button";
        submit.innerHTML = "Submit";
        async function formFactor() {
            form.innerHTML = `
            <form>
                <h4>New Player: </h4><br>

                <label for="name">Name: </label><br>
                <input type="text" id="name" name="name"></input>
                <br>

                <label for="breed">Breed: </label><br>
                <input type="text" id="breed" name="breed"></input>
                <br>

                <label for="status">Status: </label><br>
                <input type="text" id="status" name="status"></input>
                <br>

                <label for="imageUrl">ImageUrl: </label><br>
                <input type="text" id="imageUrl" name="imageUrl"></input>
                <br>

                <label for="createdAt">CreatedAt: </label><br>
                <input type="text" id="createdAt" name="createdAt"></input>
                <br>

                <label for="updatedAt">UpdatedAt: </label><br>
                <input type="text" id="updatedAt" name="updatedAt"></input>
                <br>

                <label for="teamId">Team: </label><br>
                <input type="text" id="teamId" name="teamId"></input>
                <br>

                <label for="cohortId">CohortId: </label><br>
                <input type="text" id="cohortId" name="cohortId"></input>
                <br>

                <button type='submit' name="SUBMIT" type="submit" value="submit" onSubmit = ${callAdd}>Submit</button>
                <br>
            </form>
        `;
        }
        async function callAdd() {
            let name = form.querySelector('#name');
            let breed = form.querySelector('#breed');
            let status = form.querySelector('#status');
            let imageUrl = form.querySelector('#imageUrl');
            let team = form.querySelector('#teamId');
            let cohortID = form.querySelector("#cohortId");
        const player = [{
            "name": `${name}`,
            "breed": `${breed}`,
            "status": `${status}`,
            "imageUrl": `${imageUrl}`,
            "createdAt": `${Date.UTC()}`,
            "updatedAt": `${Date.UTC()}`,
            "teamId": `${team}`,
            "cohortId": `${cohortID}`
        }];
            await addNewPlayer(player);
        };
        playerContainer.classList.add('player-list');
        playerContainer.appendChild(form);
        form.appendChild(submit);
        formFactor();
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const removePlayer = async (playerId) => {
    try {

    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

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

const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}/players/`)
        const jsonResponse = await response.json();
        // this is the thing after await responce
        return jsonResponse.data.players; // this has to match the api url
        // in the api itself not the URL you stated.
        // After any kind of url index make sure the last few words
        // where anything after api are stated and not left out.
        // then add them to your jsonResponce
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const form = document.createElement("div");
        const player = playerId;
        form.innerHTML = `
                <h2>::Player Entry::</h2>
                <br>
                <h3>name: ${player.name}</h3>
                <br>
                <h3>breed: ${player.breed}</h3>
                <br>
                <h3>status: ${player.status}</h3>
                <br>
                <h3>team: ${player.teamId}</h3>
                <br>
                <h3>Date-Created: ${player.createdAt}</h3>
                <br>
                <img src= ${player.imageUrl}></img>
            `;

        playerContainer.classList.add('player-list');
        playerContainer.appendChild(form);

    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const init = async () => {
    const players = await fetchAllPlayers()
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();