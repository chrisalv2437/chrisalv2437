//Fetch function to make a GET request to API URL returning a promise
let myJson = {};
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
        myJson = myResults[0];

        //displaying information
        const dataDisplay = document.getElementById('dataDisplay');
        const informationElement = document.createElement("p");
        informationElement.textContent = "" + JSON.stringify(myJson);
        dataDisplay.innerHTML = JSON.stringify(myJson);

    })
    //handle any errors that may occur
    .catch(error => {
        console.error('Error:', error);
    });

    const myList = document.getElementById('myList');
    myList.onchange = function(){
        console.log('Sort by: ', myList.value)
        let value = myList.value;
        if(value === 'First Name'){
            myJson.sort(sortingFirstNames);
        }
        if(value === 'Last Name'){
            myJson.sort(sortingLastNames);
        }
        if(value === 'Balance'){
            myJson.sort(sortBalance);
        }
        if(value === 'Creation Date'){
            myJson.sort(compareDates);
        }

        let dataDisplay = document.getElementById('dataDisplay');
        dataDisplay.innerHTML = JSON.stringify(myJson);
        console.table(myJson);
    };

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
}

//calling function
getResults();