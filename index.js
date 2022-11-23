import {menuArray} from "./data.js"
const cartItems = document.getElementById("cart-items")
const checkout = document.getElementById("checkout")
const totalPrice = document.getElementById("total-price")
const formData = document.getElementById("form")
const thankNotice = document.getElementById("thank-notice")
const removeBtn = document.getElementById("remove-btn")

let cart = []
let total = 0

document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        let item = findItemById(e.target.dataset.add)
        addTargetObjToCart(item)
    } else if(e.target.dataset.btn == "checkout"){
        document.getElementById("form").classList.remove("hidden")
    } else if(e.target.dataset.btn == "cut"){
        document.getElementById("form").classList.add("hidden")
    } else if(e.target.dataset.btn == "remove"){
        removeBtnClick(e.target.parentElement)
    }

    if(cart.length){
        checkout.classList.remove("hidden")
    } else {
        checkout.classList.add("hidden")
    }
})

function findItemById(itemId){
    let targetObj = menuArray.filter((item) => item.id == itemId)[0]
    return targetObj
}

function addTargetObjToCart(item){
    let itemsHtml = `
        <div class="cart-item">
            <div class="cart-item-title">
                <span>${item.name}</span>
                <button class="remove-btn" data-btn="remove">remove</button>
            </div>
            <div id="cart-item-price" class="price">
                <span>$${item.price}</span>
            </div>
        </div>
    `
    total += item.price
    cart.push(itemsHtml)
    renderCart()
}

function removeBtnClick(item){
    const itemName = getFirstLine(item.innerText)
    const obj = findItemByName(itemName)

    total -= obj.price
    const itemObj = item.parentElement
    var index = cart.indexOf(itemObj);
    cart.splice(index, 1);
    renderCart()
}

function findItemByName(itemName){
    let targetObj = menuArray.filter((item) => item.name == itemName)[0]
    return targetObj
}

function getFirstLine(text) {
    var index = text.indexOf("\n");
    if (index === -1) index = undefined;
    return text.substring(0, index);
}

function renderCart(){
    let allCartItems = ""
    cart.forEach((item) => {
        allCartItems += item
    })
    cartItems.innerHTML = allCartItems
    renderTotalPrice()
}

function renderTotalPrice(){
    if(cart.length){
        totalPrice.innerHTML = `
            <span>Total Price:</span>
            <span class="price">$${total}</span>
        `
    }
}

formData.addEventListener("submit", function(e){
    e.preventDefault()

    const data = new FormData(formData)
    const name = data.get("name")
    const cardNumber = data.get("card-number")
    const cardCvv = data.get("card-cvv")

    document.getElementById("form").classList.add("hidden")
    document.getElementById("checkout").classList.add("hidden")
    thankNotice.innerHTML = `<p>Thanks, ${name}! Your order is on its way!</p>`

    cart = []
    total = 0

    name = ""
    cardNumber = ""
    cardCvv = ""
})

function menuHtml(){
    let menuHtml = ""

    menuArray.forEach((item) => {
        menuHtml += `
            <div class="item">
            <div class="item-left">
                <div class="item-img item-left-left">
                <p class="item-emoji">${item.emoji}</p>
                </div>
                <div class="item-left-right">
                    <p class="item-heading">${item.name}</p>
                    <p class="item-ingredients">${item.ingredients.join()}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
            </div>
            
            <!-- add button -->
            <div class="item-right">
                <i class="fa-solid fa-plus add-btn" id="add-btn" data-add="${item.id}"></i>
            </div>
        </div>
    `
    })

    return menuHtml
}

function renderMenu(){
    document.getElementById("main").innerHTML = menuHtml()
    if(cart.length){
        checkout.styl
    }
}

renderMenu()