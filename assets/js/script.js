// /Função reduzida
const qS = (el)=> {
    return document.querySelector(el);
}

// Função reduzida outro jeito de fazer
const qSa =(el)=> document.querySelectorAll(el);

//Mapea o array de pizzza
pizzaJson.map((item, index)=>{
    let pizzaItem = qS('.models .pizza-item').cloneNode(true);
    //Preencher as informações em pizzaitem
    pizzaItem.querySelector('.pizza-item--img img').src = "assets\\".concat(item.img);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
   

    qS('.pizza-area').append(pizzaItem);
})