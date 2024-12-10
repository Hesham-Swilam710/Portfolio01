const counters = document.querySelectorAll('.count')
const container = document.querySelector('.counter')
let activated = false;
window.addEventListener("scroll", () => {
    if(
        scrollY > container.offsetTop - container.offsetHeight - 200
        && activated ===false
    ) {
        counters.forEach(counter => {
            counter.innerText = 0;
            let count = 0;
            function updateCount() {
                const target = parseInt(counter.dataset.target);
                if(count < target) {
                    count++;
                    counter.innerText = count;
                    setTimeout(updateCount, 0)
                }
                else{
                    counter.innerText = target;
                }
            }
            updateCount();
            activated = true;
        });
    }else if(
       scrollY < container.offsetTop - container.offsetHeight - 500
       || scrollY === 0
       && activated === true
    )  {
        counters.forEach(counter => {
            counter.innerText = 0;
        });
        activated = false;
    }
    });
    ///////////////// for stores
    var productName = document.getElementById("prodName");
var productPrice = document.getElementById("prodPrice");
var productCategory = document.getElementById("prodCategory");
var productDescription = document.getElementById("prodDescription");
var productImage = document.getElementById("prodImage");
var searchInput=document.getElementById("searchedProduct");
var addBtn=document.getElementById('addBtn');
var updateBtn=document.getElementById('updateBtn');
 var updatedIndex;
// localStorage.clear();
var porductsContainer = [];
if (localStorage.getItem("products") != null) {
  porductsContainer = JSON.parse(localStorage.getItem("products"));
  displayProduct();
}

function addProduct() {
  console.log("addProduct is tamam ");
  var product = {
    code: productName.value,
    price: productPrice.value,
    description: productDescription.value,
    category: productCategory.value,
    
  }

  porductsContainer.push(product);
  localStorage.setItem("products", JSON.stringify(porductsContainer));
      // clearForm();
  


  displayProduct();
}
function displayProduct() {
  var cartoona = ``;

  for (var i = 0; i < porductsContainer.length; i++) {
    cartoona += `
            <div class="col-md-2  text-center rounded-2">
            <img src="imgs/strore imges/5-2.jpg" class="w-100" alt="product photo">
            <h2 >${porductsContainer[i].code}</h2>
            <span>${porductsContainer[i].category}</span>
            <br>
            <span>${porductsContainer[i].price}</span>
            <p>${porductsContainer[i].description}</p>
            <button  onclick="deleteProduct(${i});" class="btn btn-outline-danger px-5 mb-2 ">Delete</button>
            <button  onclick="setFormForUpdate(${i});" class="btn btn-outline-warning px-5 mb-2 ">Update</button>
        </div>`;
  }
  document.getElementById("product").innerHTML = cartoona;
}
function deleteProduct(deletedIndex){
  porductsContainer.splice(deletedIndex,1);
  localStorage.setItem("products", JSON.stringify(porductsContainer));
  displayProduct();
}
function searchProduct(){
  var cartoona= ``;
  var term=searchInput.value;
       for(var i=0;i<porductsContainer.length;i++){
        if(porductsContainer[i].code.toLowerCase().includes(term.toLocaleLowerCase())){
          cartoona += `
          <div class="col-md-2  text-center rounded-2">
          <img src="imgs/strore imges/5-2.jpg" class="w-100" alt="product photo">
          <h2 >${porductsContainer[i].code}</h2>
          <span>${porductsContainer[i].category}</span>
          <br>
          <span>${porductsContainer[i].price}</span>
          <p>${porductsContainer[i].description}</p>
          <button  onclick="deleteProduct(${i});" class="btn btn-outline-danger px-5 mb-2 ">Delete</button>
           <button  onclick="setFormForUpdate(${i});" class="btn btn-outline-warning px-5 mb-2 ">Update</button>
      </div>`;
        }

       }
       document.getElementById("product").innerHTML = cartoona;


}
function setFormForUpdate(i){
  updatedIndex=i;
  updateBtn.classList.remove('d-none');
     addBtn.classList.add("d-none");
          productName.value=porductsContainer[i].code;
          productPrice.value=porductsContainer[i].price;
          productDescription.value=porductsContainer[i].description;
          productCategory.value=porductsContainer[i].category;
}

function updateProduct(){

  porductsContainer[updatedIndex].code=productName.value;
  porductsContainer[updatedIndex].price=productPrice.value;
  porductsContainer[updatedIndex].description=productDescription.value;
  porductsContainer[updatedIndex].category=productCategory.value;
  updateBtn.classList.add('d-none');
  addBtn.classList.remove("d-none");
  clearForm();
  localStorage.setItem("products", JSON.stringify(porductsContainer));
  displayProduct();
 

}


 




function clearForm() {
  productCategory.value = null;
  productDescription.value = null;
  productImage.value = null;
  productName.value = null;
  productPrice.value = null;
}
var length = porductsContainer.length;
console.log(length);
