document.addEventListener('DOMContentLoaded', async () => {

    const continentSelect = document.getElementById('continent');
    const countriesGrid = document.getElementById('countriesGrid');
    const btnBuscar = document.getElementById('btnBuscar');

    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region');
    const countries = await response.json();
    console.log(countries);


    btnBuscar.addEventListener('click', () => {
        const buscaInput = document.getElementById('buscaInput').value.toLowerCase();
        const filtro = countries.filter(c => c.name.common.toLowerCase().includes(buscaInput));
        document.getElementById('countriesGrid').innerHTML = '';
        filtro.forEach(c => {
            const card = document.createElement('div');
            card.className = 'col-sm-6 col-md-4 col-lg-3 mb-4 d-flex';
            card.innerHTML = `
                <div class="card">
                    <img src="${c.flags.svg}" class="card-img-top" alt="Bandeira de ${c.name.common}">
                    <div class="card-body">
                        <p class="card-title"><b>Local:</b> ${c.name.common}</p>
                        <p class="card-text"><b>Capital:</b> ${c.capital ? c.capital[0] : 'N/A'}</p>
                    </div>
                </div>
            `;
            document.getElementById('countriesGrid').appendChild(card);
        });
    });

    countriesGrid.innerHTML = '';
    countries.forEach(c => {
        const card = document.createElement('div');
        card.className = 'col-sm-6 col-md-4 col-lg-3 mb-4 d-flex';
        card.innerHTML = `
            <div class="card">
                <img src="${c.flags.svg}" class="card-img-top" alt="Bandeira de ${c.name.common}">
                <div class="card-body">
                    <p class="card-title"><b>Local:</b> ${c.name.common}</p>
                    <p class="card-text"><b>Capital:</b> ${c.capital ? c.capital[0] : 'N/A'}</p>
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
                            <p class="card-title"><b>Local:</b> ${c.name.common}</p>
                            <p class="card-text"><b>Capital:</b> ${c.capital ? c.capital[0] : 'N/A'}</p>
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
                        <p class="card-title"><b>Local:</b> ${c.name.common}</p>
                        <p class="card-text"><b>Capital:</b> ${c.capital ? c.capital[0] : 'N/A'}</p>
                    </div>
                </div>
            `;
                document.getElementById('countriesGrid').appendChild(card);
            });
        }
    });
});

const btn = document.getElementById('toggleDarkMode');
const icon = document.getElementById('darkModeIcon');
const darkIcon = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/icons/moon-fill.svg";
const lightIcon = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/icons/sun-fill.svg";

function setDarkMode(enabled) {
    document.body.classList.toggle('bg-dark', enabled);
    document.body.classList.toggle('text-white', enabled);
    icon.src = enabled ? lightIcon : darkIcon;
    icon.alt = enabled ? "Desativar modo escuro" : "Ativar modo escuro";
}

btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    setDarkMode(isDark);
});