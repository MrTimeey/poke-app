<template>
  <div class="mt-10 p-4 flex flex-wrap justify-center">
    <div class="flex-col">
      <div class="flex flex-wrap justify-center">
        <img v-for="image in pokemon.images"
             :src="image"
             class="max-w-sm h-auto"
             alt="">
      </div>
      <div class="flex flex-wrap justify-center text-6xl text-blue-600">
        {{ pokemon.name }}
      </div>
      <div class="flex flex-wrap justify-center mt-10">
        <button
            class="btn btn-blue m-4"
            :class="number === '1' ? 'not-allowed' : ''"
            @click="number !== '1' ? navigateToPokemon(decreaseNumber(number)): ''">
          Back
        </button>
        <button
            class="btn btn-blue m-4"
            :class="number === '386' ? 'not-allowed' : ''"
            @click="number !== '386' ? navigateToPokemon(increaseNumber(number)): ''">
          Next
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import {inject, onUpdated, onMounted, reactive, toRefs, watch} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "Pokemon",
  props: {
    number: String
  },
  setup(props) {
    const state = reactive({
      pokemon: {}
    })

    watch(() => props.number, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        loadPokemon(newVal);
      }
    });

    const axios = inject('axios');

    const router = useRouter()

    function increaseNumber(number) {
      return Number(number) + 1;
    }

    function decreaseNumber(number) {
      console.log()
      return Number(number) - 1;
    }

    function navigateToPokemon(number) {
      return router.push({ path: `/pokemon/${number}`});
    }

    function loadPokemon(number) {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + number)
          .then(res => res.data)
          .then(data => {

            // pokemon-species for names
            let images = [];
            let otherElement = data.sprites?.other["official-artwork"];
            if (otherElement !== undefined && otherElement !== null) {
              images.push(Object.values(data.sprites.other["official-artwork"]))
            } else {
              images.push(data.sprites.front_default)
              images.push(data.sprites.back_default)
            }
            return { ...data, images: images};
          })
          .then(data => state.pokemon = data);
    }

    onMounted(() => loadPokemon(props.number));
    return { ...toRefs(state), navigateToPokemon, increaseNumber, decreaseNumber }
  },
  beforeRouteEnter(to, _from, next) {
    if (to.params.number > 386) {
      next({name: 'pageNotFound'})
    }
    next();
  }
}
</script>

<style scoped>
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.not-allowed {
  @apply opacity-50 cursor-not-allowed;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
</style>
