/*function istampajProizvode(result) {
  let html = "";

  for (let product of result) {
    html += `<div class="col-4 text-center">
       <a href="product.html?id=${product.id}">
       <img src="${product.img.src}" alt="${
      product.img.alt
    }" class="img-fluid"></a>
       <h3>${product.title}</h3>
       <p>${product.description}</p>
       <p> ${printStars(product.stars)}</p>
       <p>${printDelivery(product.delivery)}</p>
       <p>${product.price.new} <del>${product.price.old} </del></p>
       </div>
  `;
  }

  document.getElementById("products").innerHTML = html;

}

function printStars(brojZvezdica) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= brojZvezdica) {
      html += `<i class="fas fa-star"></i>`;
    } else {
      html += `<i class="far fa-star"></i>`;
    }
  }
  return html;
}

*/

// ya rad sa local storageom:
//korisnici - svi korisnici
//korisnik  - trenutno ulogovan korisnik

function korisnik(ime,prezime,korime,lozinka,email){
  this.ime=ime;
  this.prezime=prezime;
  this.korime=korime;
  this.lozinka=lozinka;
  this.email=email;
  this.korpa=[];
}


// get_korisnici: citanje svih korisnika iz Local storage-a
// get_korisnici: citanje svih korisnika iz Local storage-a
// get_korisnik: citanje trenutnog korisnika iz Local storage-a
// get_korisnik: citanje trenutnog korisnika iz Local storage-a

var get_korisnici = ()=>{
  return JSON.parse(localStorage.getItem("korisnici"));
}

var set_korisnici = (korisnici)=>{
  localStorage.setItem("korisnici",JSON.stringify(korisnici));
}

var get_korisnik = ()=>{
  return JSON.parse(localStorage.getItem("korisnik"));
}

var set_korisnik = (korisnik)=>{
  localStorage.setItem("korisnik",JSON.stringify(korisnik));
}


//ako nema upisa, dodao sam na silu jednog, cisto da proveravam funkcionalnost. ovo moze posle da se obrise

var korisnici_svi = get_korisnici();
if(korisnici_svi==null){
  korisnici_svi = [
    new korisnik("pera","peric","pera123","password","pera@gmail.com")
  ];
  set_korisnici(korisnici_svi);
}

var odgovor = document.getElementById("odgovor");

var registruj = document.getElementById("registruj");
if(registruj!=null){
  registruj.addEventListener("click",(e)=>{
    e.preventDefault();

    var ime = document.getElementById("ime").value.trim();
    var prezime = document.getElementById("prezime").value.trim();
    var korime = document.getElementById("korime").value.trim();
    var lozinka = document.getElementById("lozinka").value.trim();
    var email = document.getElementById("email").value.trim();
    
    //provara da li je umnet podatak, treba za svaku stavku, mozda moze i pametnije
    if(ime===""){
      odgovor.innerHTML="niste uneli ime";
      return;
    }


    
    var potvrda = document.getElementById("potvrda").value;

    //validacija
    //korime jedinstveno
    //format email adrese
    //lozinka i potvrda iste

    var k = new korisnik(ime,prezime,korime,lozinka,email);
    var svi_korisnici = get_korisnici();
    svi_korisnici.push(k);
    set_korisnici(svi_korisnici);
    alert("registracija uspesna");
  });
}

var uloguj = document.getElementById("uloguj");
if(uloguj!=null){
  // u slucaju da je korisnik vec ulogovan, sakriva se login forma
  if(get_korisnik()!=null){
    odgovor.innerHTML="vec ste ulogovani";
    var forma_login = document.getElementById("forma_login");
    forma_login.style.display="none";
  }else{
    uloguj.addEventListener("click",(e)=>{
      var korime = document.getElementById("korime").value;
      var lozinka = document.getElementById("lozinka").value;

      var svi_korisnici = get_korisnici();
      for(var i=0;i<svi_korisnici.length;i++){
        var k = svi_korisnici[i];
        if(korime==k.korime && lozinka==k.lozinka){
          alert("uspesno logovanje");

          //treba da znam ako je korisnik ulogovan
          //npr: korisnik dodje na stranicu za logovanje i uloguje se
          //zatim ode da stavi proizvod u korpu
          //moram da znam da li je korisnik ulogovan
          //to radim tako sto proverim da li u localstorage postoji kljuc korisnik
          set_korisnik(k);
          document.location.reload();
          return;
        }
      }
      alert("pogresni podaci");
    });
  }
}

// kada se izloguje korisnik, postaje vidljiva forma login
// mora na silu forma da se reloaduje da bi se videle sakrivene forme
var logout = document.getElementById("logout");
if(logout!=null){
  logout.addEventListener("click",()=>{
    localStorage.removeItem("korisnik");
    document.location.reload();
  });
}