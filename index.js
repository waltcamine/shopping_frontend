SELECTED_SIZE = "S";
SELECTED_COLOR = "black";
QUANTITIES = {};


const products = {
    "1" : {id: 1, name : "Winter Huddi", price : 250, category: 1, image: "1.jpg", description: "Primi igitur omnium statuuntur Epigonus et Eusebius ob nominum gentilitatem oppressi. praediximus  fabricarum."},
    "2" : {id: 2, name : "Winter Coat", price : 300, category: 2, image: "2.jpg", description: "Primi igitur omnium statuuntur Epigonus et Eusebius ob nominum gentilitatem oppressi. praediximus  fabricarum."},
    "3" : {id: 3, name : "Huddi 1 ", price : 370, category: 3, image : "3.jpg", description: "Primi igitur omnium statuuntur Epigonus et Eusebius ob nominum gentilitatem oppressi. praediximus  fabricarum."},
    "4" : {id: 4, name : "Huddi 2", price : 100, category: 4 , image: "4.jpg", description: "Primi igitur omnium statuuntur Epigonus et Eusebius ob nominum gentilitatem oppressi. praediximus  fabricarum."},
    "5" : {id: 5, name : "Colle roulé", price : 300, category: 4 , image: "5.jpg", description: "Primi igitur omnium statuuntur Epigonus et Eusebius ob nominum gentilitatem oppressi. praediximus  fabricarum."},
    "6" : {id: 6, name : "Manteau", price : 120, category: 4 , image: "6.jpg", description: "Hello igitur omnium statuuntur Epigonus et Eusebius ob nominum gentilitatem oppressi. praediximus  fabricarum."},
};

const cart = {};

const recommendedCollection = ["1", "2"];

const topCollection = ["3", "4"];

const upcomingCollection = ["5", "6"];


///////////////////////////////////////////////////
///////////////     CATALOG     ///////////////////
///////////////////////////////////////////////////

$(document).ready(function(){
    // dislayCatalog();
    dislayCollection(recommendedCollection, "recommended");
    dislayCollection(topCollection, "top");
    dislayCollection(upcomingCollection, "upcoming");
});


function dislayCollection(collection, name){
    let models_html = "";
    for (let pid of collection){
        const product = products[pid];
        models_html += productElement(product);
    }

    $(`.collection[data-name="${name}"] .models`).html(models_html);
}


function displayCatalog(){
    let models_html = "";
    for (let pid in products){
        const product = products[pid];
        models_html += productElement(product);
    }

    $(".collection .models").html(models_html);
}



function productElement(product){
    const html = `
    <div class="model" data-id="${product.id}">
        <div class="heart"><img src="./images/icons8-heart-100.png" alt=""></div>
        <img class="model-image" src="./images/${product.image}" alt="">
        <div class="model-info">
            <div>${product.name}</div>
            <div class="bold">$${product.price}</div>
        </div>
    </div>`;

    return html;
}



$(document).on('click', '.model', function(e){
    const product_id = $(this).data("id");
    const product = products[product_id];
    
    if (Object.keys(cart).length != 0) {
        $('.notif').addClass('active')
        
    }else{$('.notif.active').removeClass('active')};
    showProductPage(product);
     
}) ;

///////////////////////////////////////////////////
///////////////    PRODUCT PAGE    ////////////////
///////////////////////////////////////////////////

function showProductPage(product){
    const imagesHTML = productImagesHTML(product);
    const infosHTML = productInfoHTML(product);

    $("#product-page .model-photos").html(imagesHTML);
    $("#product-page #select").html(infosHTML);

    showDrawer("product-page");
}

function productImagesHTML(product){
    return `<img class="header_img" src="./images/${product.image}" alt="">`
}


function productInfoHTML(product){
    return `
                <div class="c2">
                    <div class="c1 ">
                        <div class="fs20 bold">${product.name}</div>
                        <span class="gray fs13">(prince inci. 21% VAT)</span>
                    </div>
                    <div class="fs25s bold right">
                        $${product.price}
                    </div>
                </div>
            
                <div class="choose">
                    <div class="c1 gap5">
                        <div>
                            Choose Size
                        </div>
                        <div class="choose_taille auto4 gap10">
                            <div class="taille active" data-size="S" >S</div>
                            <div class="taille" data-size="M" >M</div>
                            <div class="taille " data-size="L" >L</div>
                            <div class="taille" data-size="XL" >XL</div>
                        </div>
                        <div></div>
                    </div>
                    
                    <div class="color-picker c1 gap10  center p10">
                        <div class="color_option selected_color data-color="black">
                            <div class="color_black"></div>
                        </div>
                        <div class="color_option" data-color="gray">
                            <div class="color_gray"></div>
                        </div>
                        <div class="color_option" data-color="green">
                            <div class="color_green"></div>
                        </div>
                    </div>
                </div>
            
                <div class="card_information">
                    <div class="auto-1fr acenter">
                        <div class="detail">Détails</div>
                        <div class="center">Review</div>
                    </div>
                    <div  class="gray">
                        ${product.description}
                    </div>
                    
                    <div class="add_cart" data-id="${product.id}">
                        <div class="auto2 acenter gap5 add_card">
                            <div class="right">
                                <img src="./images/icons8-shopaholic-100.png" alt="">
                            </div>
                            <div class="fs20 white">Add to Cart</div>
                        </div>
               
                    </div>
                </div>`
}




$(document).on('click', '.add_cart', function(e){
    const product_id = $(this).data("id");
    const product = products[product_id];

     const cart_item = {
        product_id:product_id,
        size : SELECTED_SIZE,
        color: SELECTED_COLOR,
        price : product.price,
        qty : 1,
    }


    addItemToCart(cart_item);
    if (Object.keys(cart).length != 0) {
        $('.notif').addClass('active')
        
    }else{$('.notif.active').removeClass('active')};

}) ;





// product = 3
// cart = [{id : 4}, {id: 3}];
// {id : 4}
// {id : 3}


// trouve et met a jour un produit via son id 



///////////////////////////////////////////////////
///////////////    CART PAGE    ////////////////
///////////////////////////////////////////////////



function incrementProductQty(product_id){
    cart[product_id].qty++;
    showCart();
}

function decrementProductQty(product_id){
    cart[product_id].qty--;
    if (cart[product_id].qty <0) {
        cart[product_id].qty=0
    }
    showCart();
}


$(document).on('click', '#show_cart', function(e){
    showCart();
}) ;


function addItemToCart(cart_item){
    cart[cart_item.product_id] = cart_item;
}


function showCart(){
    let cartHTML="";
    let total = 0;
    
    for (const product_id in cart) {
        const cart_item = cart[product_id];
        
        total += cart_item.qty * cart_item.price;
        cartHTML += cartItemHTML(cart_item);
    }
    
    let tva= 70   
    if (total===0) {
        tva=0
    }

    $("#panier .cart-content").html(cartHTML);
    $("#cart-total").text(total);
    $("#cart-subtotal").text(total + tva);



    showDrawer("panier");
}



$(document).on('click', '.open_panier',function(e){
    showCart();
});



function cartItemHTML(cart_item){
    const product = products[cart_item.product_id];
    const product_size = cart_item.size;
    const product_color = cart_item.color ;
    const quantity = cart_item.qty ;
    const price = product.price ;
   
    // console.log
    return `
    <div class="card auto3 p10">
        <div class="cloth_select center ">
            <img src="./images/${product.image}" alt="">
            <div >
                <div class="save_later acenter"> Save for later </div>
            </div>
        </div>

        <div class="card_information c1 gap10 ">
            <div>
                <div class="bold">${product.name}</div>
                <div class="gray blod">Price: $${price}</div>
            </div>
            <div class="gray fs15">
                <div>Size: ${product_size}</div>
                <div>Color: ${product_color}</div>
            </div>
            
            <div class="quantity c3 acenter">
                <div class="minus"><img src="./images/icons8-minus-64.png" alt=""></div>
                <div class="center qty fs20">${quantity}</div>
                <div class="plus"><img src="./images/icons8-plus-+-100.png" alt=""></div>
            </div>
        </div>
        <div class="right supprimer"><img src="./images/icons8-trash-50.png" alt=""></div>
    </div>`
}



$(document).on('click','.color_option', function(e){
    $('.color_option').removeClass('selected_color');
    $(this).addClass('selected_color'); 
    SELECTED_COLOR = $(this).data("color");
});

$(document).on('click','.taille', function(e){
    $('.taille').removeClass('active');
    $(this).addClass('active'); 
    SELECTED_SIZE = $(this).data("size");
});

$(document).on('click','.minus',function(e){
    const product_id = $(this).closest('.card').data('id');
    decrementProductQty(product_id);
});

$(document).on('click','.plus', function(e) {
    const product_id = $(this).closest('.card').data('id');
    incrementProductQty(product_id);
});

$(document).on('click','#choose_payment', function(e) {
    $(this).addClass('active');
    $("#film").fadeIn(200);
});

$(document).on('click','#film', function(e) {
    $("#choose_payment").removeClass('active');
    $(this).fadeOut(200);
});

///////////////////////////////////////////////////
///////////////////    GENERAL  ///////////////////
///////////////////////////////////////////////////

$(document).on('click','.back_btn', function(e){
    closeDrawer();
});


function showDrawer(id){
    $(".drawer").removeClass("active");
    $("#"+id).addClass("active");
}

function closeDrawer(){
    $(".drawer").removeClass("active");
}




$(document).on('click', ".supprimer", function(e){
    e.stopPropagation();
    const product_id = $(this).closest('.card').data('id');
    delete cart[product_id] ;

    
  
    showCart()
});