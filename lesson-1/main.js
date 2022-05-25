const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];
const renderGoodsItem = (title = 'Нет товаров', price = '',
    img = '<img src="https://picsum.photos/seed/1/200" alt="photo"></img>') => {
    return `<div class="goods-item">
        <h3>${title}</h3>
        ${img}
        <p>${price}</p>
        <button class="cart-button" type="button">Корзина</button>
    </div>`;
};
const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join("");
}
renderGoodsList(goods);
//Запятые выводились, так как, goodsList был массивом.