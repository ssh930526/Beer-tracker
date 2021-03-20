//constant variables - data that naver changes
const BASE_URL = 'https://api.openbrewerydb.org/breweries';

//state variable - data that changes
let breweries;

//cached element references - parts of the dom we need to touch
const $breweries = $('#breweries');

//event listeners -capture and respond to event i.e. user clicks on somethings

$breweries.on('click', '.sort', handleShowModal);
//function - code that represents actions taken/carried out

init();
function init() {
    getData();
}

function handleShowModal(){
    const breweryNum= parseInt(this.dataset.breweryId);
    console.log(this.dataset);
    const selectedBrewery = breweries.find(function(brewery){
        return brewery.id === breweryNum;
    });
    console.log(selectedBrewery);


// add the content to the modal
$('#patch').attr({
    href: selectedBrewery.website_url
}).text(selectedBrewery.name);

$('#name').text(selectedBrewery.name);

$('#breweryType').text(selectedBrewery.brewery_type);

$('#state').text(selectedBrewery.state);

$('.modal').modal();
}

function getData() {
    $.ajax(BASE_URL + "?limit=18")
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
        <article data-brewery-id="${brewery.id}" class="sort">
                <h1>${brewery.brewery_type}</h1>
                <p>${brewery.name}</p>
            </article>
        `;
    });
    $breweries.append(html);
}