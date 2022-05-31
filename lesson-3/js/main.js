const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const basketBtn = document.querySelector('.btn-cart');


class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                //                 console.log(data);
                this.render()
            });
    }
    /**
     * Функция для получения списка товаров
     * @returns Вовращает колекцию каталога товаров из удаленного файла json
     */
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    /**
     * Функция для получения суммы стоимости товаров
     * @returns Возвращает сумму товаров
     */
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    /**
     * Функция, для отрисовки каталога товара
     */
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
            this.initHandle(productObj);
        }
    }
    initHandle(product) {
        const element = document.getElementById(`${product.id}`);
        element.addEventListener('click', (event) => {
            if (event.target.tagName !== 'BUTTON') {
                return;
            }
            this.addToBasket(product);
        });

    }

    addToBasket(product) {
        if (!(product in basketList.goods)) {
            basketList.goods.contents.push(product);
        }
        console.log(basketList.goods.contents);
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    /**
     * Получение разметки товара
     * @returns Возвращает разметку для элемента каталога товаров
     */
    render() {
        return `<div class="product-item" id="${this.id}" data-price="${this.price}" data-title="${this.title}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class BasketList {
    constructor(container = '.basket') {
        this.container = container;
        this.goods = [];//массив корзины из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                //                 console.log(data);
            });
        this.initHandle();
    }
    /**
     * Функция получения товаров корзины из удаленного файла json
     * @returns Вовращает коллекцию товаров
     */
    _getProducts() {

        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    /**
     * Функция отрисовывает корзину товаров
     */
    renderBasket() {
        const block = document.querySelector(this.container);
        for (let product of this.goods.contents) {
            const productObj = new BasketItem(product);

            const baskeEl = block
                .querySelector(`.product-item[data-id="${productObj.id}"]`);

            if (!baskeEl) {
                block.insertAdjacentHTML('beforeend', productObj.render());
            }
        }
    }

    /**
     * Функция назначает обработчик на кнопку Корзина
     */
    initHandle() {
        basketBtn.addEventListener('click', () => {
            const block = document.querySelector(this.container);
            document.querySelector('.basketLine').classList.toggle('hidden');
            block.classList.toggle('hidden');
            if (!block.classList.contains('hidden')) {
                this.renderBasket();
            }
        })
    }
}

class BasketItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }
    /**
     * Функция для получения разметки элемента корзины
     * @returns Возвращает html разметку для корзины
     */
    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <h3>${this.title}</h3>
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <p>${this.price} $</p>
                        <p>Колличество: ${this.quantity}</p>
                        <button class="buy-btn">Купить</button>
                    </div>
            </div>`
    }
}
let list = new ProductsList();
let basketList = new BasketList();
console.log(list.allProducts);

