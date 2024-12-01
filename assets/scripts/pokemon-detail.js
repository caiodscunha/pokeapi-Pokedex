const pokemonDetail = document.getElementById('pokemonDetail')
const contentSection = document.querySelector('.content')
const params = new URLSearchParams(window.location.search)
const pokemonNumber = params.get('number')

pokeApi.getPokemonDetailFromNumber(pokemonNumber).then((pokemon) => {
    contentSection.classList.add(`${pokemon.type}`)
    pokemonDetail.innerHTML += `
    
        <h2>${pokemon.name}</h2>
        <div class="basicDetails">
            <div class="infoRow">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <span class="number">#${pokemon.number}</span>
            </div>
            <img class="pokemonImage" src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        
        <div class="allDetails">
            
            <p>Altura: ${pokemon.height / 10} m</p>
            <p>Peso: ${pokemon.weight / 10} kg</p>
        </div>
    
    `
})