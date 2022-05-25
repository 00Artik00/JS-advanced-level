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
    getSizeValue(size) {
        let result = possibleSize.find(item => item.size === size);
        return result;
    }
    getStuffingValue(stuffing) {
        let result = possibleStuffing.find(item => item.name === stuffing);
        return result;
    }

    addTopping(topping) {
        let top = possibleTopping.find(item => item.name === topping);
        this.topping.push(top);
        console.log(this);
    } // Добавить добавку }
    removeTopping(topping) {
        let index = this.topping.indexOf(possibleTopping.find(item => item.name === topping));
        if (index > -1) {
            this.topping.splice(index, 1);
        }
        console.log(this);
    } // Убрать добавку }
    getToppings() {
        let topings = [];
        for (const top of this.topping) {
            topings.push(top.name);
        }
        console.log(`Список текущих добавок: ${topings}`);
    } // Получить список добавок }
    getSize() {
        console.log(`Размер гамбургера: ${this.size.size}`);
    } // Узнать размер гамбургера }
    getStuffing() {
        console.log(`Начинка гамбургера: ${this.stuffing.name}`);
    } // Узнать начинку гамбургера }
    calculatePrice() {
        const sizePrice = this.size.cost;
        const stuffingPrice = this.stuffing.cost;
        let toppingPrice = 0;
        for (const top of this.topping) {
            toppingPrice += top.cost;
        }
        console.log(`Цена за данный бургер составила: ${sizePrice + stuffingPrice + toppingPrice}`);
    } // Узнать цену }
    calculateCalories() {
        const sizeCal = this.size.callories;
        const stuffingCal = this.stuffing.callories;
        let toppingCal = 0;
        for (const top of this.topping) {
            toppingCal += top.callories;
        }
        console.log(`Коллорийность данного бургера: ${sizeCal + stuffingCal + toppingCal}`);
    } // Узнать калорийность }
}
const hamburg = new Hamburger('big', 'cheese');
