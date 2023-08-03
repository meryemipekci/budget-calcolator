const nameInput = document.getElementById("name-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.querySelector("#add-btn");
const listArea = document.getElementById("list");
const statusCheckbox = document.getElementById("status-check");
const sumInfo = document.getElementById("sum-info");
const deletebtn = document.getElementById("delete");
const userInput = document.getElementById("user-input");
const select = document.querySelector("select");

// izledigimiz olaylar

addBtn.addEventListener('click', addExpense);
listArea.addEventListener("click", handleUpdate);
userInput.addEventListener("input",saveUser);
document.addEventListener("DOMContentLoaded", getUser);
select.addEventListener("change",handleFilter);

// toplamin degerini burada tutacagiz

let sum = 0;
function updateSum(price){
   
sum += Number(price);

sumInfo.innerText = sum;
}

function addExpense(event){
    // sayfanin yenilenmesini engeller
    event.preventDefault();

    if(!nameInput.value || !priceInput.value){
        alert("lutfen formu doldurunuz...");
        return ;
    }
// inputlar doluysa bir kart olustur ve html e gonder
// a=div olusturma
const expenseDiv = document.createElement("div");
// b-dive class ekleme
expenseDiv.classList.add("expense")

if(statusCheckbox.checked === true){
    expenseDiv.classList.add("payed")
}

// c-icerisinde HTML'i belirleme

expenseDiv.innerHTML = `
<h2 class="name">${nameInput.value}</h2>
<h2 class="price">${priceInput.value}</h2>
<div class="btns">
    <img id="edit" src="img/icons8-pay-64.png">
    <img id="delete" src="img/icons8-delete-30.png" >
</div>`;

// d-olusan elemani html e gonderme

listArea.appendChild(expenseDiv);

// toplam alanini guncelle

updateSum(priceInput.value);


// formu temizleme
nameInput.value = " ";
priceInput.value = " ";
statusCheckbox.checked = false;

}

// listedeki bir elemana tiklayinca calisir

function handleUpdate(event){
    const ele = event.target;
    const parent = ele.parentElement.parentElement;

    if(ele.id === "delete"){
        // sil resminin kapsayicisina erişmek
       parent.remove();

    //    toplam bilgisini guncelleme
    const price = parent.querySelector(".price").textContent;
    updateSum(number(price)*-1);
      
    }
    if(ele.id === "edit"){
        parent.classList.toggle("payed")

    }
  }
function saveUser(event){
    localStorage.setItem("username" ,event.target.value);

}
// localden ismi al isim daha once kaydedilmemişsse null yerine "" al
function getUser(){
   const username = localStorage.getItem("username") || "";
   userInput.value = username;
}

// filtreleme kismi

function handleFilter(event){
   const selected = event.target.value;
   const items = list.childNodes;

   items.forEach((item) => {
    // selected alabilecegi degrleri izleme

switch(selected){
    case "all":
    //hepsisecilirse
    item.style.display = "flex";
    break;

    case "payed":
        //yalnizca odenmeyenler
        if(item.classList.contains("payed")){
            item.style.display = "flex"
        }else{
            item.style.display = "none";
        }
        break;

        case "not-payed":
            if(!item.classList.contains("payed")){
               item.style.display = "flex"; 
            } else{
                item.style.display = "none";
            }

           break;
}
   });
}

