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
        <button class="btn btn-blue m-4" :class="number === '1' ? 'not-allowed' : ''" @click="navigateToPokemon(decreaseNumber(number))">Back</button>
        <button class="btn btn-blue m-4" @click="navigateToPokemon(increaseNumber(number))">Next</button>
      </div>
    </div>

  </div>
</template>

<script>
import {inject, onUpdated, onMounted, reactive, toRefs} from "vue";
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
            let images = [];
            if (data.sprites?.other["official-artwork"] !== undefined) {
              images.push(Object.values(data.sprites.other["official-artwork"]))
            } else {
              images.push(data.sprites.front_default)
              images.push(data.sprites.back_default)
            }
            return { ...data, images: images};
          })
          .then(data => state.pokemon = data);
    }

    onUpdated(() => loadPokemon(props.number));
    onMounted(() => loadPokemon(props.number));
    return { ...toRefs(state), navigateToPokemon, increaseNumber, decreaseNumber }
  },
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
