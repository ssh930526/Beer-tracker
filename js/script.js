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
    const selectedBrewery = breweries.find(function(brewery){
        return brewery.breweryId === breweryNum;
    });
    console.log(selectedBrewery);


// add the content to the modal
$('#patch').attr({
    src: selectedBrewery.website_url,
    alt: selectedBrewery.brewery_type
});

$('#name').text(selectedBrewery.brewery.name);

$('#breweryType').text(selectedBrewery.brewery.brewery_type);

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
        <article data-brewery-id="${brewery.breweryId}" class="sort">
                <h1>${brewery.brewery_type}</h1>
                <p>${brewery.name}</p>
            </article>
        `;
    });
    $breweries.append(html);
}