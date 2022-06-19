Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            show: false,
        }
    },
    methods: {
        addProduct(product) {
            let change = this.cartItems.find(el => el.id_product === product.id_product);
            if (change) {
                this.$parent.putJson(`/api/cart/${change.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            change.quantity++;
                        }
                    })
            }
            else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    })
            }
            else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`, item)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        } else {
                            console.log('error')
                        }
                    })
            }
        },
        calcSum() {
            let sum = 0;
            this.cartItems.forEach(el => {
                sum += el.price * el.quantity;
            });
            return sum;
        },
        calcBaskCount() {
            let result = 0;
            this.cartItems.forEach(el => {
                result += el.quantity;
            });
            return result;
        }

    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
    <div class="basketPos">
        <span class="basket-icon-wrapp" @click="show = !show">
            <img class="basket-icon" src="images/basket.svg" alt="basket">
            <span>{{calcBaskCount()}}</span>
        </span>
        <div class="basket" v-show="show">
            <div class="basketRow basketHeader">
            <div>Название товара</div>
            <div>Количество</div>
            <div>Цена за шт.</div>
            <div>Итого</div>
        </div>
        <p v-if="!cartItems.length">Корзина пуста</p>
            <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                @remove="remove">
            </cart-item>
            <div class="basketTotal" v-if="cartItems.length">
                Товаров в корзине на сумму:
                $<span class="basketTotalValue">{{calcSum()}}</span>
            </div>
        </div>
    </div>
    `
})

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="basketRow">
        <div>{{ cartItem.product_name }}</div>
        <div>
            <span class="productCount">{{ cartItem.quantity }}</span> шт.
        </div>
        <div>{{ cartItem.price }}$</div>
        <div>
         <span class="productTotalRow">{{(cartItem.quantity*cartItem.price).toFixed(2)}}$</span>
         <img class="basket_close" src="images/close-icon.svg" alt="close-icon" @click="$root.$refs.cart.remove(cartItem)">
        </div>
    </div>
    `
})
