let modalQt = 1;
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
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = "assets\\".concat(item.img);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
   
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        //pega chave da pizza
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        //preenche o modal
        qS('.pizzaBig img').src = "assets\\".concat(pizzaJson[key].img);
        qS('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qS('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        //qS('.pizzaInfo--price').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        qS('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        //Remove item selecionado
        qS('.pizzaInfo--size.selected').classList.remove('selected');
        //seleciona as informações de tamanho da pizza
        qSa('.pizzaInfo--size').forEach((size, sizeIndex)=> {
            if(sizeIndex ==2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        qS('.pizzaInfo--qt').innerHTML = modalQt;
       
        //Fim modal
        qS('.pizzaWindowArea').style.opacity = 0;
        qS('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            qS('.pizzaWindowArea').style.opacity =1;
        }, 200);
    });

    qS('.pizza-area').append(pizzaItem);
});

// Eventos do MODAL

function closeModal(){
    qS('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        qS('.pizzaWindowArea').style.display ='none';
    }, 500);   
};
// fecha o modal através dos botões
qSa('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

// trata adição e subtração de quantidades de pizza
qS('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQt>1){
        modalQt--;
    }
    qS('.pizzaInfo--qt').innerHTML = modalQt;
});

qS('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQt++;
    qS('.pizzaInfo--qt').innerHTML = modalQt;
});

// trata escolha dos tamanhos de pizzas
qSa('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        qS('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});