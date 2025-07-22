document.addEventListener('DOMContentLoaded', async () => {

    const continentSelect = document.getElementById('continent');
    const countriesGrid = document.getElementById('countriesGrid');
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region');
    const countries = await response.json();
    console.log(countries);

    countriesGrid.innerHTML = '';
    countries.forEach(c => {
        const card = document.createElement('div');
        card.className = 'col-sm-6 col-md-4 col-lg-3 mb-4 d-flex';
        card.innerHTML = `
            <div class="card">
                <img src="${c.flags.svg}" class="card-img-top" alt="Bandeira de ${c.name.common}">
                <div class="card-body">
                    <h5 class="card-title> ${c.name.common} </h5>
                    <p class="card-text">Capital: ${c.capital ? c.capital[0] : 'N/A'}</p>
                </div>
            </div>
        `;
        document.getElementById('countriesGrid').appendChild(card);
    });

    continentSelect.addEventListener('change', () => {
        const selecionado = continentSelect.value;
        if (selecionado === 'Todos') {
            document.getElementById('countriesGrid').innerHTML = '';
            countries.forEach(c => {
                const card = document.createElement('div');
                card.className = 'col-sm-6 col-md-4 col-lg-3 mb-4 d-flex';
                card.innerHTML = `
                    <div class="card">
                        <img src="${c.flags.svg}" class="card-img-top" alt="Bandeira de ${c.name.common}">
                        <div class="card-body">
                            <h5 class="card-title"> ${c.name.common} </h5>
                            <p class="card-text">Capital: ${c.capital ? c.capital[0] : 'N/A'}</p>
                        </div>
                    </div>
                `;
                document.getElementById('countriesGrid').appendChild(card);
            });
        } else {
            const filtro = countries.filter(c => c.region === selecionado);
            document.getElementById('countriesGrid').innerHTML = '';
            filtro.forEach(c => {
                const card = document.createElement('div');
                card.className = 'col-sm-6 col-md-4 col-lg-3 mb-4 d-flex';
                card.innerHTML = `
                <div class="card">
                    <img src="${c.flags.svg}" class="card-img-top" alt="Bandeira de ${c.name.common}">
                    <div class="card-body">
                        <h5 class="card-title"> ${c.name.common} </h5>
                        <p class="card-text">Capital: ${c.capital ? c.capital[0] : 'N/A'}</p>
                    </div>
                </div>
            `;
                document.getElementById('countriesGrid').appendChild(card);
            });
        }

    });
});
