const possibleSize = [
    {
        size: 'big',
        cost: 100,
        callories: 40,
    },
    {
        size: 'small',
        cost: 50,
        callories: 20,
    },
];
const possibleStuffing = [
    {
        name: 'cheese',
        cost: 10,
        callories: 20,
    },
    {
        name: 'salad',
        cost: 20,
        callories: 5,
    },
    {
        name: 'potato',
        cost: 15,
        callories: 10,
    },
];
const possibleTopping = [
    {
        name: 'spice',
        cost: 15,
        callories: 0,
    },
    {
        name: 'mayonnaise',
        cost: 20,
        callories: 5,
    },
];
class Hamburger {
    constructor(size, stuffing) {
        this.size = this.getSizeValue(size);
        this.stuffing = this.getStuffingValue(stuffing);
        this.topping = [];
    }
    /**
     * Метод возвращает объект с нужным значениям цены и коллорий
     * @param {string} size Размер бургера
     * @returns {object} - Объект со значениями цены и коллорий для данного размера
     */
    getSizeValue(size) {
        let result = possibleSize.find(item => item.size === size);
        return result;
    }
    /**
     * 
     * @param {string} stuffing Начинка бургера
     * @returns {object} Возвращает объект со значениям цены и коллорий для данной
     * начинки
     */
    getStuffingValue(stuffing) {
        let result = possibleStuffing.find(item => item.name === stuffing);
        return result;
    }
    /**
     * Метод добавляет добавку в массив добавок this.topping
     * @param {string} topping Добавка которую необходимо добавить
     */
    addTopping(topping) {
        let top = possibleTopping.find(item => item.name === topping);
        this.topping.push(top);
        console.log(this);
    }
    /**
     * Метод удаляет добавку из массива добавок this.topping
     * @param {string} topping Добавка, которую необходимо удалить
     */
    removeTopping(topping) {
        let index = this.topping.indexOf(possibleTopping
            .find(item => item.name === topping));
        if (index > -1) {
            this.topping.splice(index, 1);
        }
        console.log(this);
    }
    /**
     * Метод выводит в консоль список текущих добавок
     */
    getToppings() {
        let topings = [];
        for (const top of this.topping) {
            topings.push(top.name);
        }
        console.log(`Список текущих добавок: ${topings}`);
    }
    /**
     * Метод выводит в консоль текущий размер бургера
     */
    getSize() {
        console.log(`Размер гамбургера: ${this.size.size}`);
    }
    /**
     * Метод выводит в консоль текущую начинку бургера
     */
    getStuffing() {
        console.log(`Начинка гамбургера: ${this.stuffing.name}`);
    }
    /**
     * Метод рассчитывает текущую стоимость бургера
     */
    calculatePrice() {
        const sizePrice = this.size.cost;
        const stuffingPrice = this.stuffing.cost;
        let toppingPrice = 0;
        for (const top of this.topping) {
            toppingPrice += top.cost;
        }
        console.log(`Цена за данный бургер составила: \
${sizePrice + stuffingPrice + toppingPrice} рублей`);
    }
    /**
     * Метод рассчитывает текущую каллорийность бургера
     */
    calculateCalories() {
        const sizeCal = this.size.callories;
        const stuffingCal = this.stuffing.callories;
        let toppingCal = 0;
        for (const top of this.topping) {
            toppingCal += top.callories;
        }
        console.log(`Каллорийность данного бургера: \
${sizeCal + stuffingCal + toppingCal}`);
    } 
}
const hamburg = new Hamburger('big', 'cheese');
hamburg.addTopping('spice');
hamburg.addTopping('mayonnaise');
hamburg.removeTopping('spice');
hamburg.getToppings();
hamburg.getSize();
hamburg.getStuffing();
hamburg.calculatePrice();
hamburg.calculateCalories();


