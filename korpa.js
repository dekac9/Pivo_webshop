
import provera_za_navbar from './ispis_navbara.js';
import {get_korisnici} from './funkcije.js';
import {set_korisnici} from './funkcije.js';
import {get_korisnik} from './funkcije.js';
import {set_korisnik} from './funkcije.js';
import {ispis_malog_broja} from './funkcije.js';


provera_za_navbar();

var stranicaKorpe = document.getElementById("stranica_korpa");
if(stranicaKorpe!=null){
  ispisKolica();
}



function ispisKolica() {
  //var korpa = document.getElementById("korpa");
  //var stranicaKorpe = document.getElementById("stranica_korpa");
  var trenutni_korisnik = get_korisnik();
  if (trenutni_korisnik == null && stranicaKorpe != null) {
    alert("Ne mozete videti korpu posto niste ulogovani");
    location.href = "index.html";
  } else if (trenutni_korisnik.korpa != null && stranicaKorpe!=null) {
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
              <div>Ocena potrosaca: <span class="value">${proizvodi[i].stars}</span></div>
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

      document.getElementById("checkout").addEventListener("click",()=>{
        let temp_korisnik=get_korisnik();
        temp_korisnik.korpa=[];
        set_korisnik(temp_korisnik);
        let users = get_korisnici();
        for (let i = 0; i < users.length; i++) {
        if (users[i].email == temp_korisnik.email) {
            users[i] = temp_korisnik;
            set_korisnici(users);
        }
      }
        //localStorage.removeItem("korisnik");
        location.href="index.html"});
      
    }
    updatePrice();
    ispis_malog_broja();
  } else {
    true;
    //console.log(trenutni_korisnik.korpa);
  }
  
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




