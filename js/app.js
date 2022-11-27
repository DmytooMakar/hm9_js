function createStorage() {
    let countries = [];
    return {
        setCountriesBackup: newCountries => countries = newCountries,
        getCountriesBackup: () => countries
    };
}

const savedeCountries = createStorage();

function filteredCountries(valueSearch){
    const countries = savedeCountries.getCountriesBackup();
    const result = countries.filter(countrie => countrie.name.toLowerCase().indexOf(valueSearch) >=0);
    document.querySelector('#btnSearch').onclick = () =>{
        
        renderCountries(result);
    };
    document.querySelector('#btnClear').onclick = () => {
        document.querySelector('#search').value = '';
        renderCountries(countries);
    }
}

const buildTbodyElement = document.createElement('tbody');
buildTbodyElement.id = 'table_countries';
document.querySelector('thead').after(buildTbodyElement);

function renderCountries(getCountries){
    const createHtml = getCountries.reduce((countries, countrie)=>{
        return countries += `<tr>
                <td>${countrie.name}</td>
                <td>${countrie.region}</td>
                <td>${countrie.population}</td>
                <td>${countrie.area}</td> 
            </tr>`
    },''); 
    buildTbodyElement.innerHTML = createHtml;
}

document.querySelector('#search').value = '';
document.querySelector('#search').onkeyup = e =>{
    const valueSearch = e.currentTarget.value.trim().toLowerCase();
    filteredCountries(valueSearch);
}

fetch('https://restcountries.com/v2/all').then(res => res.json()).then(data =>{
    const selectedCountries = data.map(countrie => ({
        name: countrie.name,
        population: countrie.population,
        area: countrie.area,
        region: countrie.region
    }));
    savedeCountries.setCountriesBackup(selectedCountries);
    renderCountries(selectedCountries);
})