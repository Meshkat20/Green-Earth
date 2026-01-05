// const { createElement } = require("react");
// .................Category Load korar kaj..........

const loadCategories = () => {

const url = "https://openapi.programming-hero.com/api/categories"; 

// shob gula button theke active shoraite hobe...
  // const catBtns = document.querySelectorAll(".btn-category");

  // const currentBtn = document.getElementById(`cat-btn-${id}`);
  
  fetch(url)
    .then((response) => response.json())
    .then(data => showCategories(data.categories)); 
  
  };

  let cart = [];
  let total = 0;

const showCategories = (categories) => {
    // console.log (categories); 
    const categoryContainer = document.getElementById ("category-container") 
    // console.log (categoryContainer) ; 
    categoryContainer.innerHTML =``
    for (let category of categories) {
      // console.log(category);
      const categoryList = document.createElement("ul")
      categoryList.innerHTML = `
      <li><button id="cat-btn-${category.id}" onclick="loadTree(${category.id})" class="btn btn-sm w-full hover:bg-green-300 btn-category">${category.category_name}</button></li>` ;
      categoryContainer.append(categoryList);
    }
  }; 
// .............. Categotry Load er kaj..............



//......... Category click dile Plants Card show kora..........

  const loadTree = (id) => {
    // console.log("load tree call", id )
    document.getElementById("category-card").classList.add("hidden");
    document.getElementById("load-spinner").classList.remove("hidden");
    const urlID = id 
    ? `https://openapi.programming-hero.com/api/category/${id}`
    : `https://openapi.programming-hero.com/api/plants` ;

//  ........shobar theke active class ta shoraia dilam.........
    const catBtns = document.querySelectorAll(".btn-category")
    catBtns.forEach(btn => btn.classList.remove("active"))
    // console.log(currentBtn);

//.........jeta click kora oitay active class boshaia dilam..... 
    const currentBtn = document.getElementById(`cat-btn-${id}`);
    if (currentBtn) currentBtn.classList.add("active");

    fetch (urlID)
    .then((response) => response.json())
    .then ((data) => showCard(data.plants));
  }

    const showCard = (plants) => {
    // console.log(plants);

    document.getElementById("category-card").classList.remove("hidden");
    document.getElementById("load-spinner").classList.add("hidden");
    
    const categoryCard = document.getElementById("category-card")
    // console.log (categoryCard) ;
    categoryCard.innerHTML  = ''; 
    for (let plant of plants) {
      // console.log(plant);
      const CategoryCards = document.createElement("div")
      CategoryCards.innerHTML = `
      <div  class="card bg-white shadow-md p-3 h-[500px] ">
      <div onclick = "loadTreeDetails(${plant.id})" >
          <div class="rounded-t-2xl"> <img class="h-60 rounded-2xl w-full mx-auto object-cover" src="${plant.image}" alt=""></div>
          
          <div class="card-body p-4">
            <h3 class="font-semibold Tree-Name">${plant.name}</h3>
            <p class="text-sm text-gray-600">${plant.description}</p>
            <div  class="flex justify-between">
              <div><p class="badge badge-success text-white rounded-2xl">${plant.category}</p></div>
              <div><p class="font-bold Tree-Price"> ${plant.price} </p></div>
            </div>
            </div>
            </div>
            <div class="flex justify-between items-center mt-2">
              <button onclick="addToCart(this)" class="btn bg-green-700 text-white btn-sm w-full rounded-2xl">Add to Cart</button>
            </div>
        </div>
      `
      categoryCard.append(CategoryCards);
    }
  };


//......... Category click dile Plants Card show kora..........


// .......Modal show korar kaj.......... 
  const loadTreeDetails = (id) => {
    // console.log("thsisssagas gasgasg gsadg")
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
    .then((response) => response.json())
    .then ((data) => shoowModal(data.plants));
  }

    const shoowModal = (plants) => {
    // console.log(tree)
    const detailsContainer = document.getElementById("details-container")
    detailsContainer.innerHTML = ``
    const detailspagla = document.createElement("div")
    detailspagla.innerHTML = `
        <div class="" id = "details-container">
        <h1 class="font-bold text-2xl  text-center">${plants.name}</h1>
        <img class="h-96 w-96" src="${plants.image}" alt="">
        <p class="text-xl font-bold" >Category <span class="font-normal">${plants.category}</span></p>
        <p class="text-xl font-bold">Price  <span class="font-normal">${plants.price}</span></p>
        <p class="text-xl font-bold">Description <span class="text-xl font-normal">${plants.description}</span></p>
      </div>
    `
    document.getElementById("my_modal_3").showModal();
    detailsContainer.append(detailspagla); 
  }

  // Shuru te all data load 

    const allDataLoad = () => {
    const urlAll = "https://openapi.programming-hero.com/api/plants"
    fetch(urlAll)
    .then ((response) => response.json())
    .then ((data) => showCard(data.plants))
  }

  // allDataLoad ();
  loadCategories (); 
  loadTree ();

  const addToCart = (btn) => {
    const card = btn.parentNode.parentNode
    const treeName = card.querySelector(".Tree-Name").innerText;
    const treePrice = card.querySelector(".Tree-Price").innerText
    const treePriceNum = Number(treePrice)
    // console.log(treeName,treePrice)
    const selectedItem = {
      treeName : treeName,
      treePrice: treePrice,
      treePriceNum: treePriceNum,
    };
    cart.push(selectedItem);
    total = total + treePriceNum; 
    showcart(cart);
    showTotal(total);
  };

  const showTotal=(val) => {
    document.getElementById("cart-total").innerHTML = val;
  }
  const showcart = (cart) => {
    const cartContainer = document.getElementById('cart-container')
    cartContainer.innerHTML= "";
    for (let items of cart) {
      const newItem = document.createElement("div")
      newItem.innerHTML = `
      <div class="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
       <div>
           <span class="font-bold tree-name">${items.treeName}</span>
           <br>
          $ <span class="treee-price">${items.treePrice}</span>  x 1
       </div>
       <div onclick="removeCart(this)">
        <h1 class="text-lg emni cursor-pointer text-red-700 font-bold">X</h1>
       </div>
        </div>`;
        cartContainer.append(newItem)
    }

  };
  const removeCart=(emni)=>{
    const tree = emni.parentNode;
    const treeName = tree.querySelector(".tree-name").innerText;
    // const treePrice = Number(tree.querySelector(".treee-price").innerText);
    
    // console.log(treeName)
    cart = cart.filter((tree) => tree.treeName != treeName);
    // console.log(tree)
    total = 0;
    cart.forEach((item) => (total += item.treePriceNum ));
    showcart(cart);
    showTotal(total);
  }

