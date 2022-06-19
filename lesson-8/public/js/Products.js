Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let el of data) {
                    this.$data.products.push(el);
                    this.$data.filtered.push(el);
                }
            });
    },
    template: `<div class="fetured__items">
    <product v-for="item of filtered" 
    :key="item.id_product" 
    :img="item.imgUrl"
    :product="item"
    @add-product="$parent.$refs.cart.addProduct"
    ></product>
   </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="fetured__item">
                    <div class="fetured__item__wrap">
                    <img :src="img" alt="Some img">
                        <div class="featured-item-hower">
                            <button @click="$root.$refs.cart.addProduct(product)">
                                <img src="images/basket.svg" alt="basket">
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                    <div class="fetured__item_content">
                        <h2>{{product.product_name}}</h2>
                        <p>Known for her sculptural takes on traditional tailoring, Australian arbiter
                            of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span>{{product.price}}$</span>
                    </div>
                </div>
`
})
