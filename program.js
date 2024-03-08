//Fetch function to make a GET request to API URL returning a promise
async function getResults(){

    const dataDisplay = document.getElementById('dataDisplay');

    fetch("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=json", {
        method: 'GET',
        headers:{
            'Accept' : "application/json",
        },
    })

    //then method handles the asynchoronous response from server
    .then(response => {
        //checks to ensure response is valid
        if(!response.ok){
            if(response.status === 404){
                throw new Error('Data not found');
            } else if(response.status === 500){
                throw new Error('Server error');
            } else{
                throw new Error ('Response was not ok');
        }
    }
        //parse the JSON data using method below
        return response.json()
    })

    //displaying the data onto the webpage
    .then(data => {

        //defining results to sort
        let myResults = data.results;
        let element = myResults[0];

        //displaying information
        const dataDisplay = document.getElementById('dataDisplay');
        const informationElement = document.createElement("p");
        informationElement.textContent = "" + JSON.stringify(element);
        dataDisplay.appendChild(informationElement);

        //function compares the first names and sorts it from a to z
        function sortingFirstNames(a, b){
            if(a.first < b.first){
                return -1;
            }
            if(a.first > b.first){
                return 1;
            }
            return 0;
        }

        //function compares the last names and sorts it from a to z
        function sortingLastNames(a, b){
            if(a.last < b.last){
                return -1;
            }
            if(a.last > b.last){
                return 1;
            }
            return 0;
        }

        //function does not work correctly as the json data is a string
        function sortBalance(a, b){
            if(a.balance < b.balance){
                return -1;
            }
            if(a.balance > b.balance){
                return 1;
            }
            return 0;
        }

        //function compares the dates and sorts them from awhile ago to recently
        function compareDates(a, b){
            return new Date(a.created).getTime() - new Date(b.created).getTime();
        }

        //using sort function for first names
        element.sort(sortingFirstNames);
        
        //logging it to the console and presenting it in table format
        console.table(element);

    })
    //handle any errors that may occur
    .catch(error => {
        console.error('Error:', error);
    });
}

//calling function
getResults();