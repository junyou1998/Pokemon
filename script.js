const { ref, reactive, onMounted } = Vue;
const App = {
    setup() {
        const idx = ref(0);
        let pokeDict = {};

        const poke = reactive({ name: "",img:"" });

        const getRand = ()=>Math.floor(Math.random() * 100) + 1
        
        const basePokeUrl = "https://pokeapi.co/api/v2/pokemon/"
        const pokeDictApi = "https://raw.githubusercontent.com/junyou1998/Pokemon/main/api/PokeApi.json"
        onMounted(() => {
            axios.get(pokeDictApi).then((res) => {
                pokeDict = res.data;
                console.log(pokeDict)

                axios.get(basePokeUrl+getRand()).then((res) => {
                    console.log(res.data)

                    poke.img = res.data.sprites.other.dream_world.front_default
                });
            });
        });

        return { idx, poke };
    },
};

Vue.createApp(App).mount("#app");
