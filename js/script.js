//constant variables - data that naver changes
const BASE_URL = 'https://api.openbrewerydb.org/breweries';

//state variable - data that changes
let breweries;

//cached element references - parts of the dom we need to touch
const $breweries = $('#breweries');

//event listeners -capture and respond to event i.e. user clicks on somethings
//function - code that represents actions taken/carried out

init();
function init() {
    getData();
}
function getData() {
    $.ajax(BASE_URL + "?limit=48")
    .then(function (data){
        // console.log(data);
        breweries = data;
        render();
    }, function (error) {
        console.log(error);
    });
}

function render() {
    const html = breweries.map(function(brewery){
        return `
        <article class="sort">
                <h1>${brewery.brewery_type}</h1>
                <p>${brewery.name}</p>
            </article>
        `;
    });
    $breweries.append(html);
}