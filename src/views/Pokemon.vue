<template>
  <div class="mt-10 p-4 flex flex-wrap justify-center">
    <div class="flex-col">
      <div class="flex flex-wrap justify-center">
        <img v-for="image in images"
             :src="image"
             class="max-w-sm h-auto"
             alt="">
      </div>
      <div class="flex flex-wrap justify-center text-6xl text-blue-600">
        {{ getTranslatedName('de') }}
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
import {inject, onUpdated, onMounted, reactive, toRefs, watch, computed} from "vue";
import {useRouter} from "vue-router";
import {usePokemonStore} from "../stores/pokemon";

export default {
  name: "Pokemon",
  props: {
    number: String
  },
  setup(props) {
    const store = usePokemonStore();

    watch(() => props.number, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        store.fetchPokemon(newVal);
      }
    });

    const router = useRouter()

    function increaseNumber(number) {
      return Number(number) + 1;
    }

    function decreaseNumber(number) {
      return Number(number) - 1;
    }

    function navigateToPokemon(number) {
      return router.push({ path: `/pokemon/${number}`});
    }

    const images = computed(() => {
      return store.getImages
    })

    onMounted(() => store.fetchPokemon(props.number));
    return { ...toRefs(store.$state), images, getTranslatedName : store.getName, navigateToPokemon, increaseNumber, decreaseNumber }
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
