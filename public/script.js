document.addEventListener('DOMContentLoaded', async () => {
    
    const continentSelect = document.getElementById('continent');

    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region');
    const countries = await response.json();
    console.log(countries);

    //Chama a funcao exibir tudo
    exibirTudo();

    //Gerar o filtro de paises 
    continentSelect.addEventListener('change', () => {
        let selecionado = continentSelect.value;

        if(selecionado === 'Todos'){
            exibirTudo();
        }
        
        const filtro = countries.filter(c => c.region === selecionado);
        document.getElementById('countriesGrid').innerHTML = '';
        filtro.forEach(c => {
            const card = document.createElement('div');
            card.className = 'col-md-4';
            card.innerHTML = `
                <div class="card">
                    <img src="${c.flags.svg}" class="card-img-top" alt="Bandeira de ${c.name.common}">
                    <div class="card-body">
                        <h5 class="card-title"> ${c.name.common} </h5>
                        <p class="card-text">Nome: ${c.name.common} <br> Capital: ${c.capital ? c.capital[0] : 'N/A'}</p>
                    </div>
                </div>
            `;
            document.getElementById('countriesGrid').appendChild(card);
        });
    });
});

//Funcao Exibir tudo
function exibirTudo(){
    countries.forEach(c => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card">
                <img src="${c.flags.svg}" class="card-img-top" alt="Bandeira de ${c.name.common}">
                <div class="card-body">
                    <h5 class="card-title> ${c.name.common} </h5>
                    <p class="card-text">Nome: ${c.name.common} <br> Capital: ${c.capital ? c.capital[0] : 'N/A'}</p>
                </div>
            </div>
        `;
        document.getElementById('countriesGrid').appendChild(card);
    });
}