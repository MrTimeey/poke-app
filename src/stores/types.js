import {defineStore} from 'pinia'
import axios from "axios"

export const useTypeStore = defineStore("type", {
    state: () => ({
        types: {},
    }),
    getters: {
        getName: (state) => {
            return (lang, id) => {
                if (!state.types[id]) {
                    return '';
                }
                let type = state.types[id];
                if (!type.names) {
                    return ''
                }
                const translatedName = type.names.find(e => e.language.name === lang);
                return translatedName.name ?? '';
            }
        }
    },
    actions: {
        async fetchType(id) {
            if (this.types[id]) {
                return;
            }
            try {
                axios.get("https://pokeapi.co/api/v2/type/" + id)
                    .then(res => res.data)
                    .then(data => {
                        console.log(data)
                        this.types[id] = data
                    });
            } catch (e) {
                console.log(e);
            }

        }
    },
})
