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
    qS('.pizza-area').append(pizzaItem);
})