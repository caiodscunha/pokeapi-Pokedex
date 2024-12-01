const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 12
let offset = 0
const maxRecords = 151

function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = [])=>{

        pokemonList.innerHTML += pokemons.map((pokemon) =>
            `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                        
                </div>
            </li>
            `
        ).join('')

        //equivalente const newList = (pokemon) => convertPokemonToLi(pokemon.name)
        //const newHTML = newList.join('')
        //pokemonList.innerHTML += newHTML;

    /*
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            listItems.push(convertPokemonToLi(pokemon))
        }
    */  

        document.querySelectorAll('.pokemon').forEach((pokemon) => {
            pokemon.addEventListener('click', ()=>{
                const numberElement = pokemon.querySelector('.number');
                const pokemonNumber = numberElement ? numberElement.textContent.replace('#', '').trim() : 'Desconhecido';
                if (pokemonNumber) {
                    window.location.href = `pokemon-detail.html?number=${pokemonNumber}`;
                } else {
                    alert('Erro ao obter o número do Pokémon.');
                }
            })
        });
        
    })
    .catch((error)=>console.error(error))
}  

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords) {
        const newLimit =  maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItems(offset, limit)
    }
})