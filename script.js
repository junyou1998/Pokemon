const { ref, reactive, onMounted } = Vue;
const App = {
    setup() {
        let pokeDict = {};
        const poke = reactive({ name_en: "",name_cn:"",img:"",hp:0,att:0,def:0 });
        const getRand = ()=>Math.floor(Math.random() * 100) + 1
        const basePokeApi = "https://pokeapi.co/api/v2/pokemon/"
        const pokeDictApi = "https://raw.githubusercontent.com/junyou1998/Pokemon/main/api/PokeApi.json"

        const genPoke = ()=>{
            axios.get(pokeDictApi).then((res) => {
                pokeDict = res.data;
                axios.get(basePokeApi+getRand()).then((res2) => {
                    pokeInfo = res2.data
                    poke.img = pokeInfo.sprites.other.dream_world.front_default
                    poke.name_en = pokeInfo.name
                    const matchPoke = pokeDict.find(pokemon => pokemon.name.en.toLowerCase() == pokeInfo.name);
                    poke.name_cn = matchPoke.name.zh

                    poke.hp = pokeInfo.stats[0].base_stat
                    poke.att = pokeInfo.stats[1].base_stat
                    poke.def = pokeInfo.stats[2].base_stat
                    
                });
            });
        }
        onMounted(() => {
            genPoke()
        });

        return { poke, genPoke };
    },
};

Vue.createApp(App).mount("#app");

