document.addEventListener('DOMContentLoaded', async () => {

    const continentSelect = document.getElementById('continent');
    const countriesGrid = document.getElementById('countriesGrid');
    const btnBuscar = document.getElementById('btnBuscar');

    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region');
    const countries = await response.json();
    console.log(countries);

    function adicionarFavorito(id, pais, favorito) {
        localStorage.setItem(id, JSON.stringify({ pais, favorito }));
    }

    function removerFavorito(id) {
        localStorage.removeItem(id);
    }

    document.getElementById('countriesGrid').addEventListener('click', function (e) {
        if (e.target.closest('button')) {
            const card = e.target.closest('.card');
            const countryName = card.querySelector('.card-title').textContent.replace('Local:', '').trim();
            const country = Array.from(countries).find(c => c.name.common === countryName);
            const id = country.name.common;
            const btn = e.target.closest('button');
            const isFavorito = localStorage.getItem(id);

            if (isFavorito) {
                removerFavorito(id);
                btn.innerHTML = `<i class="fa-solid fa-star fa-lg" style="color: gray;"></i> Add Favorito`;
            } else {
                adicionarFavorito(id, country, true);
                btn.innerHTML = `<i class="fa-solid fa-star fa-lg" style="color: yellow;"></i> Remover Favorito`;
            }
        }
    });

    function atualizarBotoesFavoritos() {
        document.querySelectorAll('#countriesGrid .card').forEach(card => {
            const countryName = card.querySelector('.card-title').textContent.replace('Local:', '').trim();
            const btn = card.querySelector('button');
            if (localStorage.getItem(countryName)) {
                btn.innerHTML = `<i class="fa-solid fa-star fa-lg" style="color: yellow;"></i> Remover Favorito`;
            } else {
                btn.innerHTML = `<i class="fa-solid fa-star fa-lg" style="color: gray;"></i> Add Favorito`;
            }
        });
    }


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
                <button class="btn btn-primary btn-sm position-absolute start-50 translate-middle-x" style="bottom: 10px;">
                    <i class="fa-solid fa-star fa-lg style="color: gray;"></i> Add Favorito
                </button>
            </div>
            `;
            document.getElementById('countriesGrid').appendChild(card);
            atualizarBotoesFavoritos();
        });
    });

    countriesGrid.innerHTML = '';
    countries.forEach(c => {
        const card = document.createElement('div');
        card.className = 'col-sm-6 col-md-4 col-lg-3 mb-4 d-flex';
        card.innerHTML = `
            <div class="card position-relative">
                <img src="${c.flags.svg}" class="card-img-top" alt="Bandeira de ${c.name.common}">
                <div class="card-body">
                    <p class="card-title"><b>Local:</b> ${c.name.common}</p>
                    <p class="card-text"><b>Capital:</b> ${c.capital ? c.capital[0] : 'N/A'}</p>
                </div>
                <button class="btn btn-primary btn-sm position-absolute start-50 translate-middle-x" style="bottom: 10px;">
                    <i class="fa-solid fa-star fa-lg style="color: gray;"></i> Add Favorito
                </button>
            </div>
        `;
        document.getElementById('countriesGrid').appendChild(card);
        atualizarBotoesFavoritos();
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
                <button class="btn btn-primary btn-sm position-absolute start-50 translate-middle-x" style="bottom: 10px;">
                    <i class="fa-solid fa-star fa-lg style="color: gray;"></i> Add Favorito
                </button>
            </div>
                `;
                document.getElementById('countriesGrid').appendChild(card);
                atualizarBotoesFavoritos();
            });
        } else if (selecionado === 'Favoritos') {
            document.getElementById('countriesGrid').innerHTML = '';
            Object.keys(localStorage).forEach(key => {
                const item = JSON.parse(localStorage.getItem(key));
                if (item && item.favorito && item.pais) {
                    const c = item.pais;
                    const card = document.createElement('div');
                    card.className = 'col-sm-6 col-md-4 col-lg-3 mb-4 d-flex';
                    card.innerHTML = `
                            <div class="card">
                                <img src="${c.flags.svg}" class="card-img-top" alt="Bandeira de ${c.name.common}">
                                <div class="card-body">
                                    <p class="card-title"><b>Local:</b> ${c.name.common}</p>
                                    <p class="card-text"><b>Capital:</b> ${c.capital ? c.capital[0] : 'N/A'}</p>
                                </div>
                                <button class="btn btn-primary btn-sm position-absolute start-50 translate-middle-x" style="bottom: 10px;">
                                    <i class="fa-solid fa-star fa-lg" style="color: yellow;"></i> Remover Favorito
                                </button>
                            </div>
                        `;
                    document.getElementById('countriesGrid').appendChild(card);
                }
            });
            atualizarBotoesFavoritos();
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
                <button class="btn btn-primary btn-sm position-absolute start-50 translate-middle-x" style="bottom: 10px;">
                    <i class="fa-solid fa-star fa-lg style="color: gray;"></i> Add Favorito
                </button>
            </div>
            `;
                document.getElementById('countriesGrid').appendChild(card);
                atualizarBotoesFavoritos();
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

