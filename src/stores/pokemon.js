import {defineStore} from 'pinia'
import axios from "axios"

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const usePokemonStore = defineStore("pokemon", {
    state: () => ({
        pokemon: {},
        pokemonSpecies: {},
    }),
    getters: {
        getPokemon(state) {
            return state.pokemon;
        },
        getImages(state) {
            if (!state.pokemon?.sprites) {
                return []
            }
            let otherElement = state.pokemon.sprites?.other["official-artwork"];
            if (otherElement !== undefined && otherElement !== null) {
                return [Object.values(otherElement)];
            } else {
                return [
                    state.pokemon.sprites.front_default,
                    state.pokemon.sprites.back_default
                ]
            }
        },
        getName: (state) => {
            console.log(state.pokemonSpecies)
         return (lang) => {
                if (!state.pokemonSpecies.names) {
                    return ''
                }
             const translatedName = state.pokemonSpecies.names.find(e => e.language.name === lang);
             return capitalizeFirstLetter(translatedName.name??'')
         }
        }
    },
    actions: {
        async fetchPokemon(number) {
            try {
                axios.get("https://pokeapi.co/api/v2/pokemon/" + number)
                    .then(res => res.data)
                    .then(data => this.pokemon = data);
                axios.get("https://pokeapi.co/api/v2/pokemon-species/" + number)
                    .then(res => res.data)
                    .then(data => this.pokemonSpecies = data)
            } catch (e) {
                console.log(e);
            }

        }
    },
})