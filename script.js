const { ref, reactive, onMounted } = Vue;
const App = {
    setup() {
        const idx = ref(0);

        const poke = reactive({ name: "" });
        const theFn = () => {};

        onMounted(() => {
            axios.get("/").then((res) => {
                console.log(res.data);
            });
        });

        return { idx, poke, theFn };
    },
};
Vue.createApp(App).mount("#app");
