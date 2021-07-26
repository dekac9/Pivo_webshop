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

// za rad sa local storageom:
//korisnici - svi korisnici
//korisnik  - trenutno ulogovan korisnik


//Konstruktor za proizvode 
function proizvod(title,img_src,img_alt,description,stars,alchohol,extract,price_old,price_new){
  this.title=title,
  this.img_src=img_src,
  this.img_alt=img_alt,
  this.description=description,
  this.stars=stars,
  this.alchohol=alchohol,
  this.extract=extract,
  this.price_old=price_old,
  this.price_new=price_new
}

//Kao i za korisnike, napravio sam f-je koje cu zvati za dohvatanje i zapisivanje u local storage

var get_proizvodi = () =>{
  return JSON.parse(localStorage.getItem("proizvodi"));
}

var set_proizvodi = (proizvodi)=>{
  localStorage.setItem("proizvodi",JSON.stringify(proizvodi));
}

//i ovde sam na silu ubacio jedan, prvi proizvod da bih video kakav mi je ispis. Moze posle da se izbrise

if(get_proizvodi()==null){
  var svi_proizvodi=[
    new proizvod("Hoptopod IPA","images/hoptopod-ipa-500ml.png","veliki hoptopod","Pivo koje ce rasplamsati sva vasa cula! Tehnikom suvog hmeljenja stvorili smo pitku i snaznu kombinaciju tropskih i cvetnih aroma.",3,"6.5% vol","15.5",310,280)
  ];
  set_proizvodi(svi_proizvodi);
}

//ispisivanje iz skupa svi_proizvodi iz LS-a na mesto prikaz_proizvodi
var prikaz_proizvodi=document.getElementById("prikaz_proizvodi");
if(prikaz_proizvodi!=null){
  var svi_proizvodi = get_proizvodi();
  for(var i=0;i<svi_proizvodi.length;i++){

    //ovo mi je samo da manje pisem
    var pr = svi_proizvodi[i];

    //sve ispod ispis svakog propertija objekta u div za ispis
    var div = document.createElement("div");
    div.classList.add("col-4");
    div.classList.add("text-center");


    var img = document.createElement("img");
    img.src=pr.img_src;
    img.alt=pr.img_alt;
    img.style.width="100%";
    div.appendChild(img);


    var h3 = document.createElement("h3");
    h3.innerHTML=pr.title;
    div.appendChild(h3);


    var p = document.createElement("p");
    p.innerHTML=pr.description;
    div.appendChild(p);


    var p2 = document.createElement("p");
    var del = document.createElement("del");
    del.innerHTML=pr.price_old;
    p2.innerHTML=pr.price_new+"";
    p2.appendChild(del);
    div.appendChild(p2);


    var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-success");
    button.innerHTML="dodaj u korpu";
    div.appendChild(button);
    button.setAttribute("obj",JSON.stringify(pr));
    button.addEventListener("click",(e)=>{
      var dugme = e.target;

      var pr = JSON.parse(dugme.getAttribute("obj"));

      var kor = get_korisnik();
      if(kor==null){
        alert("morate biti ulogovani da bi dodavali proizvode u korpu")
      }else{
        kor.korpa.push(pr);

        var svi_korisnici=get_korisnici();
        for(var i=0;i<svi_korisnici.length;i++){
          if(svi_korisnici[i].korime==kor.korime){
            svi_korisnici[i]=kor;
            //ubacivanje proizvoda i u korpu trenutnog posetioca ali i u spisak svih posetilaca, za dalje posete
            set_korisnici(svi_korisnici);
            set_korisnik(kor);
            alert("dodato u korpu");
            return
          };
        };
      };
    });

    prikaz_proizvodi.appendChild(div);
  };
};


//Konstruktor za korisnike
function korisnik(ime,prezime,korime,lozinka,email){
  this.ime=ime;
  this.prezime=prezime;
  this.korime=korime;
  this.lozinka=lozinka;
  this.email=email;
  this.korpa=[];
};


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


//provera REGEX za email
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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

    //deo provere emaila regexima
    if(!validateEmail(email)){
      alert("los email");
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

// LOGOVANJE
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