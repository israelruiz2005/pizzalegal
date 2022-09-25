let modalQt = 1;
let cart =[];
let modalKey = 0;

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
        modalKey = key;

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

// Trata o carrinho 
qS('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(qS('.pizzaInfo--size.selected').getAttribute('data-key'));

    //tratamento para as pizzas

    let identifier = pizzaJson[modalKey].id+'@'+size;

    //procura pelo item no carrinho
    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        });    
    }
    
   // atualiza o carrinho
    updateCart();
    closeModal();
});

// apresenta açoes para carrinho em celulares
qS('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        qS('aside').style.left = '0';
    };
});

qS('.menu-closer').addEventListener('click', ()=>{
    qS('aside').style.left = '100vw';
});

function updateCart() {

    // Ajusta botão quando em celulares ou tablets
    qS('.menu-openner span').innerHTML = cart.length;

    if( cart.length > 0){
        qS('aside').classList.add('show');
        qS('.cart').innerHTML = '';
      
        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        // Pesquisa itens para o carrinho
        for ( let i in cart) {

            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);

            subtotal += pizzaItem.price * cart[i].qt;

            // apresenta dados do carrinho
            let cartItem = qS('.models .cart--item').cloneNode(true);
            let pizzaSizeName;
            switch (cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            };

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src =  "assets\\".concat(pizzaItem.img);
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            //Tratametno de quantidade modificadas no carrinho
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if( cart[i].qt >1){
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                };

                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });


            qS('.cart').append(cartItem);
        };

        // calculos finais do carrinho
        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        qS('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        qS('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        qS('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        qS('aside').classList.remove('show');
        qS('aside').style.left = '100vw';
    };

};