/////////////////////////////////////
//Name: Christian Alvarado
//Filename: program.js
//Editor: Visual Studio Code
//Language: Javascript
//Extension: Live server
//OS: Windows 10
//Purpose: reaching out to randomapi.com, fetching the data in JSON format,
//print out a user friendly interface that will sort data for user
//Operational status: not working
/////////////////////////////////////

//Defining API URL to call

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
        const dataDisplay = document.getElementById('dataDisplay');
        const informationElement = document.createElement("p");
        informationElement.textContent = "Info: " + JSON.stringify(data.results);
        dataDisplay.appendChild(informationElement);
        console.log(Object.values(data.results));
    })
    //handle any errors that may occur
    .catch(error => {
        console.error('Error:', error);
    });
}

getResults();

function compareFirstName(a, b){
    a = a.toLowerCase();
    b = b.toLowerCase();

    if(a.first < b.first){
        return -1;
    }
    if(a.first > b.first){
        return 1;
    }
    return 0;
}

function compareLastName(a, b){
    a = a.toLowerCase();
    b = b.toLowerCase();

    if(a.last < b.last){
        return -1;
    }
    if(a.last > b.last){
        return 1;
    }
    return 0;
}
