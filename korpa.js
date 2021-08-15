var get_korisnici = () => {
  return JSON.parse(localStorage.getItem("korisnici"));
};

var set_korisnici = (korisnici) => {
  localStorage.setItem("korisnici", JSON.stringify(korisnici));
};

var get_korisnik = () => {
  return JSON.parse(localStorage.getItem("korisnik"));
};

var set_korisnik = (korisnik) => {
  localStorage.setItem("korisnik", JSON.stringify(korisnik));
};


ispisKolica();
ispis_malog_broja();

document.getElementById("checkout").addEventListener("click",()=>{
  localStorage.removeItem("korisnik");
  location.href="index.html"});


function ispisKolica(){
//var korpa = document.getElementById("korpa");
var stranicaKorpe = document.getElementById("stranica_korpa");
var trenutni_korisnik = get_korisnik();
if (trenutni_korisnik == null && stranicaKorpe != null) {
  alert("Ne mozete videti korpu posto niste ulogovani");
  location.href = "index.html";
} else {
  //console.log(trenutni_korisnik.korpa);
  var proizvodi = trenutni_korisnik.korpa;
  if (korpa != null) {
    let html = "";
    for (let i = 0; i < proizvodi.length; i++) {
      html += `<div class="product">
<div class="row" id="${proizvodi[i].id}">
  <div class="col-md-3">
    <img class="img-fluid mx-auto d-block image" src="${proizvodi[i].img_src}">
  </div>
  <div class="col-md-8">
    <div class="info">
      <div class="row">
        <div class="col-md-5 product-name">
          <div class="product-name" value="${proizvodi[i].id}">
            <a href="#">${proizvodi[i].title}</a>
            <div class="product-info">
              <div>Alcohol: <span class="value">${proizvodi[i].alcohol}</span></div>
              <div>Extract: <span class="value">${proizvodi[i].extract}</span></div>
              <div>Memory: <span class="value">32GB</span></div>
            </div>
          </div>
        </div>
        <div class="col-md-4 quantity">
          <div class="cart-quantity  cart-column">
          <input type="number" class="cart-quantity-input" value="${proizvodi[i].broj}" min="1" max="99">
          <button class="btn btn-remove" type="button"><i class="fas fa-trash"></i></button>
        </div>
        </div>
        <div class="col-md-3 price">
        <span><h5>Nekad: <del> ${proizvodi[i].price_old} din.</del></h5></span>
          <span>Sada: ${proizvodi[i].price_new} din.</span>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`;

    }
    korpa.innerHTML = html;
    

    //Liseneri za delete btn
    let removeBtn = document.getElementsByClassName("btn-remove");
    for (let btn of removeBtn) {
      btn.addEventListener("click", deleteItem);
    }

    //Liseneri za quantity btn
    let quantity = document.getElementsByClassName("cart-quantity-input");
    for (let btn of quantity) {
      btn.addEventListener("change", changeQuantity);
    }
  } else {
    alert("nema niza");
  }
}
updatePrice();

}


//izracunavanje cene
function updatePrice() {
  let user = get_korisnik();
  let popust =0;
  let isporuka=300;
  let userKorpa = user.korpa;

  //console.log(userKorpa)
  let novaCena = 0;
  for (let i = 0; i < userKorpa.length; i++) {
    novaCena =
      novaCena + JSON.parse(userKorpa[i].price_new) * userKorpa[i].broj;
  }
  document.getElementById("ukupno").innerHTML = novaCena;

  if(novaCena>1000){
  popust = novaCena/10
  };
  if(novaCena>2000){
    isporuka = 0;
  }
  
  document.getElementById("popust").innerHTML = popust+ " din";
  document.getElementById("isporuka").innerHTML = isporuka+ " din";

  novaCena = novaCena + popust + isporuka;
  console.log(novaCena);
  document.getElementById("total").innerHTML = novaCena+ " din"; //dobijena suma
}

//Funkcija za brisanje proizvoda iz korpe
function deleteItem(item) {
  let dugme = item.target;
  //console.log(dugme);
  let parent = dugme.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  let idMeta = parent.id;
  console.log(idMeta);
  let user = get_korisnik();
  let cart = user.korpa;

  console.log(cart);

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == idMeta) {
      console.log(cart[i].id);
      cart.splice(i, 1);
      let updateUser = get_korisnik();
      updateUser.korpa = cart;
      set_korisnik(updateUser);
      ispisKolica();

      let users = get_korisnici();
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == updateUser.email) {
          users[i] = updateUser;
          set_korisnici(users);
        }
      }
      
    }
  }
  updatePrice();
  ispis_malog_broja();
}

//Fja za smanjenje kolicine
function changeQuantity(item) {
  let input = item.target;
  //console.log(dugme);
  let quantity = parseInt(input.value);
  console.log(quantity);
  let parent = input.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  let idMeta = parent.id;
  console.log(idMeta);
  let user = get_korisnik();
  let userCart = user.korpa;


  for(let i = 0; i < userCart.length; i++) {
    if(userCart[i].id == idMeta) {
        userCart[i].broj = quantity;
        set_korisnik(user);
        let users = get_korisnici();
        for(let i in users) {
            if(users[i].email == user.email) {
                users[i] = user;
                set_korisnici(users);
            }
        }
    } 
  }


  updatePrice();
}

var ispis_malog_broja = ()=>{
  let ispis=document.getElementById("lblCartCount");
  let privremeno = get_korisnik();
  if(privremeno!=null){
  
  let sam_broj = privremeno.korpa.length;
  
  ispis.innerText=sam_broj;
  // ispis.innerHTML=sam_broj;
  
  }else{
    ispis.innerHTML="0";
  }
  
}




//Funkcija za brisanje proizvoda iz korpe
// function deleteItem(item) {
//   let dugme = item.target;
//   let parent = dugme.parentElement.parentElement;
//   let title = parent.getElementsByClassName("cart-item-title")[0].innerHTML;
//   //console.log(title);
//   let user = get_user();
//   let cart = user.korpa;

//   for(let i = 0; i < cart.length; i++) {
//     if(cart[i].title == title) {
//         cart.splice(i, 1);
//         let updateUser = get_user();
//         updateUser.korpa = cart;
//         set_user(updateUser);
//         displayCart();

//         let users = get_users();
//     for(let i = 0; i < users.length; i++) {
//         if(users[i].email == updateUser.email ) {
//             users[i] = updateUser;
//             set_users(users);
//         }
//     }
//         updatePrice();
//     }
//   }

// }

//OVO JE BLOK KOJI SAM ZAMENIO
// for(var i=0;i<proizvodi.length;i++){
//   console.log(proizvodi[i]);
//   var li = document.createElement("li");
//   li.setAttribute("class","list-group-item");

//   var row = document.createElement("div");
//   row.setAttribute("class","row");

//   var div1 = document.createElement("div");
//   div1.setAttribute("class","col-4");
//   //div1.innerHTML = "asd";
//   var img = document.createElement("img");
//   img.setAttribute("src",proizvodi[i].img_src);
//   img.style.width="50px";
//   img.style.height="50px";
//   div1.appendChild(img);
//   row.appendChild(div1);

//   var div2 = document.createElement("div");
//   div2.setAttribute("class","col-4");
//   div2.innerHTML = "naziv: "+proizvodi[i].title+", broj stavki: "+proizvodi[i].broj;
//   row.appendChild(div2);

//   var div3 = document.createElement("div");
//   div3.setAttribute("class","col-4");

//   var btn = document.createElement("button");
//   btn.innerHTML="+";
//   btn.value = proizvodi[i].id;
//   btn.classList.add("btn");
//   btn.classList.add("btn-success");
//   btn.classList.add("m-3");
//   btn.addEventListener("click",(e)=>{
//     e.preventDefault();
//     var id = e.target.value;

//     var proizvodi = trenutni_korisnik.korpa;
//     for(var i=0;i<proizvodi.length;i++){
//       if(proizvodi[i].id==id){
//         proizvodi[i].broj++;
//         break;
//       }
//     }

//     trenutni_korisnik.korpa = proizvodi;
//     set_korisnik(trenutni_korisnik);
//     document.location.reload();
//   });
//   div3.appendChild(btn);

//   var btn2 = document.createElement("button");
//   btn2.innerHTML="-";
//   btn2.value = proizvodi[i].id;
//   btn2.classList.add("btn");
//   btn2.classList.add("btn-danger");
//   btn2.classList.add("m-3");
//   btn2.addEventListener("click",(e)=>{
//     e.preventDefault();
//     var id = e.target.value;

//     var proizvodi = trenutni_korisnik.korpa;
//     for(var i=0;i<proizvodi.length;i++){
//       if(proizvodi[i].id==id){
//         proizvodi[i].broj--
//         if(proizvodi[i].broj<=0){
//           proizvodi.splice(i,1);
//         }
//         break;
//       }
//     }

//     trenutni_korisnik.korpa = proizvodi;
//     set_korisnik(trenutni_korisnik);
//     document.location.reload();
//   });
//   div3.appendChild(btn2);

//   row.appendChild(div3);

//   li.appendChild(row);
//   korpa.appendChild(li);
// }

// }
