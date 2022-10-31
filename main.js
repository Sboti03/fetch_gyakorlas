
let products = [];


document.addEventListener('DOMContentLoaded', ()=> {


    console.log('Betöltött')
    loadProducts().then(()=> {
        adatMegjelenites(products)
        generateCat()
    });

    document.getElementById('src-all').addEventListener('click', ()=> {
        console.log('mind')
        console.log(products)
        adatMegjelenites(products.sort((a,b) => a.id > b.id))
    });

    document.getElementById('src-abc').addEventListener('click', ()=> {
        adatMegjelenites(products.sort((a,b) => a.title > b.title))
    });

    document.getElementById('src-high').addEventListener('click', ()=> {
        adatMegjelenites(products.sort((a,b) => a.price < b.price))
    });

    function search() {
        let item = document.getElementById('search').value
        item = item.toLowerCase()
        
        let filtered = products.filter(e=> e.title.toLowerCase().includes(item))
        adatMegjelenites(filtered)
    }

    document.getElementById('search-btn').addEventListener('click',search);
    document.getElementById('search').addEventListener('change', search)

    document.getElementById('src-offer').addEventListener('click', ()=> {
        products.sort((a,b) => a.rating > b.rating);
        let filtered = products.filter(e => e.price < 100)
        adatMegjelenites(filtered)
    });

    
    
});


async function loadProducts() {
    let productsList = []
    let productsJson = await (await fetch('/products.json')).json()

    for(let p of productsJson.products) {
        productsList.push(new Product(
            p.id, p.title, p.description,p.price,
            p.discountPercentage, p.rating, p.stock, p.brand,
            p.category, p.thumbnail, p.images
            ));
    }
    products = productsList
}

const adatMegjelenites = (termekLista) => {
    let container = document.getElementById('row')
    container.innerHTML = ''

    for(termek of termekLista) {
        let card = document.createElement('div')
        card.classList.add('card')

        let img = document.createElement('img')
        img.src = termek.thumbnail
        card.append(img)

        let title = document.createElement('h1')
        title.textContent = termek.title
        card.append(title)

        let price = document.createElement('div')
        price.textContent = termek.price + "$"
        price.classList.add('price')
        card.append(price)

        let description = document.createElement('p')
        description.textContent = termek.description
        description.classList.add('description')
        
        let rating = document.createElement('p')
        rating.textContent = termek.rating 
        rating.classList.add('rating')
        
        let star = document.createElement('span')
        star.classList.add('fa')
        star.classList.add('fa-star')
        star.classList.add('checked')

        rating.append(star)
        description.append(rating)
        card.append(description)

        container.append(card)
    }

};

const generateCat = () => {
    let sidenav = document.getElementById('sidenav')
    
    let category = []
    for(p of products) {
        if(!category.includes(p.category)) {
            category.push(p.category)
        }
    }

    category.sort((a, b) => a > b);
    for(c of category) {
        let label = document.createElement('label')
        label.classList.add('element')
        label.htmlFor = c
        label.textContent = c

        let checkBox = document.createElement('input')
        
        checkBox.type = 'radio'
        checkBox.id = c
        checkBox.name = 'cat'

        checkBox.addEventListener('click', ()=> {
            adatMegjelenites(products.filter(e=>e.category === checkBox.id))
            console.log(checkBox.id)
        })

        let div = document.createElement('div')
        div.append(checkBox)        
        div.append(label)

        sidenav.append(div)

    }
}

 

class Product {
    constructor(id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images){
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.discountPercentage = discountPercentage;
        this.rating = rating
        this.stock = stock
        this.brand = brand
        this.category = category
        this.thumbnail = thumbnail
        this.images = images
    }
}