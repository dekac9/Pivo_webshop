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



//Konstruktor za korisnika
function korisnik(ime,prezime,korime,lozinka,email){
  this.ime=ime;
  this.prezime=prezime;
  this.korime=korime;
  this.lozinka=lozinka;
  this.email=email;
  this.korpa=[];
};

//Konstruktor za proizvode(znam da saljem i sto treba i sto ne treba)
function proizvod(id,title,img_src,img_alt,description,stars,alcohol,extract,price_old,price_new){
  this.id=id;
  this.title=title;
  this.img_src=img_src+".png";
  //console.log(this.img_src);
  this.img_alt=img_alt;
  this.description=description;
  this.stars=stars;
  this.alcohol=alcohol;
  this.extract=extract;
  this.price_old=price_old;
  this.price_new=price_new;
  this.broj=1;
}


//fja za dohvatanje niza proizvoda iz LSa
var get_proizvodi = ()=>{
  return JSON.parse(localStorage.getItem("proizvodi"));
}

//fja za upis niza proizvoda iz LSa
var set_proizvodi = (proizvodi)=>{
  localStorage.setItem("proizvodi",JSON.stringify(proizvodi));
}



// let proba = fetch("./data/products.json").then(resp =>{resp.json()}).then(data=>console.log(data))


//prvi ispis

// OVO SAM KASNIJE ISPRAVIO, ALI SAM I DALJE KORISTIO KONSTRUKTORSKU FJU

var set_json = (data) => {
  var svi_proizvodi=[];
  //proizvod(id,title,img_src,img_alt,description,stars,alcohol,extract,price_old,price_new)
  for(var i=0;i<data.length;i++){
    var obj = new proizvod(
      data[i].id,data[i].title,data[i].img.src,data[i].img.alt,data[i].description,
      data[i].stars,data[i].alcohol,data[i].extract,data[i].price.old,data[i].price.new
    );
    svi_proizvodi.push(obj);
    set_proizvodi(svi_proizvodi);
  }
  
}


if(get_proizvodi()==null){
  //console.log("proizvodi");
  fetch("/data/products.json")
  .then(resp=> resp.json())
  .then(
    data=>set_json(data)
  )

//za prvi ispis da mi ne bude prazan ekran, moze posle da se obrise  
  // console.log(data);
  // console.log(svi_proizvodi);
//   var svi_proizvodi = [
//     new proizvod(1,"Hoptopod IPA 1","images/hoptopod-ipa-500ml.png","veliki hoptopod",
//     "Pivo koje će rasplamsati sva vaša čula! Tehnikom suvog hmeljenja stvorili smo pitku i snažnu kombinaciju tropskih i cvetnih aroma.",
//     3,"6.5% vol","15.5 p",310,280),
//     new proizvod(2,"Hoptopod IPA 2","images/hoptopod-ipa-500ml.png","veliki hoptopod",
//     "Pivo koje će rasplamsati sva vaša čula! Tehnikom suvog hmeljenja stvorili smo pitku i snažnu kombinaciju tropskih i cvetnih aroma.",
//     3,"4.5% vol","15.5 p",310,180),
//     new proizvod(3,"Hoptopod IPA 3","images/hoptopod-ipa-500ml.png","veliki hoptopod",
//     "Pivo koje će rasplamsati sva vaša čula! Tehnikom suvog hmeljenja stvorili smo pitku i snažnu kombinaciju tropskih i cvetnih aroma.",
//     3,"12% vol","15.5 p",310,380),
//     new proizvod(4,"Hoptopod IPA 4","images/hoptopod-ipa-500ml.png","veliki hoptopod",
//     "Pivo koje će rasplamsati sva vaša čula! Tehnikom suvog hmeljenja stvorili smo pitku i snažnu kombinaciju tropskih i cvetnih aroma.",
//     3,"16.5% vol","15.5 p",310,250),
//     new proizvod(5,"Hoptopod IPA 5","images/hoptopod-ipa-500ml.png","veliki hoptopod",
//     "Pivo koje će rasplamsati sva vaša čula! Tehnikom suvog hmeljenja stvorili smo pitku i snažnu kombinaciju tropskih i cvetnih aroma.",
//     3,"40% vol","15.5 p",310,100)
    
//   ];
   set_proizvodi(svi_proizvodi);
   

}
 
var prikaz_proizvodi_alcohol = (alc) =>{
 
  var prikaz_proizvodi = document.getElementById("prikaz_proizvodi");
  prikaz_proizvodi.innerHTML="";

  var svi_proizvodi = get_proizvodi();
  for(var i=0;i<svi_proizvodi.length;i++){
    //ovo mi je samo da manje pisem
    var pr = svi_proizvodi[i];
    
    if(pr.alcohol!=alc){
      continue;
    }

    var div = document.createElement("div");
    div.classList.add("col-4");
    div.classList.add("text-center");

    var img = document.createElement("img");
    img.src = pr.img_src;
    img.alt = pr.img_alt;
    img.style.width="100%";
    div.appendChild(img);

    var h3 = document.createElement("h3");
    h3.innerHTML=pr.title;
    div.appendChild(h3);

    var p = document.createElement("p");
    p.innerHTML=pr.description;
    div.appendChild(p);

    var p22 = document.createElement("p");
    p22.innerHTML="alcohol: "+pr.alcohol;
    div.appendChild(p22);

    var p2 = document.createElement("p");
    var del = document.createElement("del");
    del.innerHTML=pr.price.old.value;
    p2.innerHTML=pr.price.new+" "; 
    p2.appendChild(del);
    div.appendChild(p2);

    var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-success");
    button.innerHTML="dodaj u korpu";
    div.appendChild(button);
    button.setAttribute("obj",JSON.stringify(pr));
    button.addEventListener("click",(e)=>{
      console.log("dugme kliknuto");
      var dugme = e.target;
      
      var pr = JSON.parse(dugme.getAttribute("obj"));
      
      var kor = get_korisnik();
      if(kor==null){
        alert("Morate biti ulogovani da bi dodali u korpu");
      }else{
        kor.korpa.push(pr);
        console.log(pr);

        var svi_korisnici = get_korisnici();
        for(var i=0;i<svi_korisnici.length;i++){
          if(svi_korisnici[i].korime==kor.korime){
            svi_korisnici[i]=kor;
            //mora da se ubaci i u sve korisnike i u trenutnog korisnika
            //sadrzaj njegove korpe, za dalje posete
            set_korisnici(svi_korisnici);
            set_korisnik(kor);
            alert("Dodato u korpu");
            return;
          }
        }
      }
    });


    prikaz_proizvodi.appendChild(div);
  }
 
}

//1
var prikaz_proizvodi_fun = (cena=999999) =>{
  
  var prikaz_proizvodi = document.getElementById("prikaz_proizvodi");
  prikaz_proizvodi.innerHTML="";

  var svi_proizvodi = get_proizvodi();
  for(var i=0;i<svi_proizvodi.length;i++){
    var pr = svi_proizvodi[i];

    if(pr.price_new>cena){
      continue;
    }

    var div = document.createElement("div");
    div.classList.add("col-4");
    div.classList.add("text-center");

    var img = document.createElement("img");
    img.src = pr.img_src;
    img.alt = pr.img_alt;
    img.style.width="100%";
    div.appendChild(img);

    var h3 = document.createElement("h3");
    h3.innerHTML=pr.title;
    div.appendChild(h3);

    var p = document.createElement("p");
    p.innerHTML=pr.description;
    div.appendChild(p);

    var p22 = document.createElement("p");
    p22.innerHTML="alcohol: "+pr.alcohol;
    div.appendChild(p22);

    var p2 = document.createElement("p");
    var del = document.createElement("del");
    del.innerHTML=pr.price_old;
    p2.innerHTML=pr.price_new+" "; 
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
        alert("Morate biti ulogovani da bi dodali u korpu");
      }else{
        kor.korpa.push(pr);
        console.log(pr);

        var svi_korisnici = get_korisnici();
        for(var i=0;i<svi_korisnici.length;i++){
          if(svi_korisnici[i].korime==kor.korime){
            svi_korisnici[i]=kor;
            //mora da se ubaci i u sve korisnike i u trenutnog korisnika
            //sadrzaj njegove korpe, za dalje posete
            set_korisnici(svi_korisnici);
            set_korisnik(kor);
            //alert("Dodato u korpu");
            ispis_malog_broja();
            return;
          }
        }
      }
    });

    
    prikaz_proizvodi.appendChild(div);
  }
  
}

var prikaz_proizvodi = document.getElementById("prikaz_proizvodi");
if(prikaz_proizvodi!=null){
  prikaz_proizvodi_fun();
  var select = document.getElementById("alcohol");

  var svi_proizvodi = get_proizvodi();
  for(var i=0;i<svi_proizvodi.length;i++){
    var option = document.createElement("option");
    option.text = svi_proizvodi[i].alcohol;
    option.value = svi_proizvodi[i].alcohol;
    select.add(option);
  }

  select.addEventListener("change",(e)=>{
    var a = e.target.value
    prikaz_proizvodi_alcohol(a);
  });
}

var sort_cena_labela = document.getElementById("sort_cena_labela");
if(sort_cena_labela!=null){
  var sort_cena = document.getElementById("sort_cena");

  sort_cena.addEventListener("change",(e)=>{
    var cena = e.target.value;
    sort_cena_labela.innerHTML="sortiraj po ceni("+cena+")";

    prikaz_proizvodi_fun(cena);
    
  });
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
ispis_malog_broja();
//fja za ispis malog broja na korpi
// var ispis_malog_broja = ()=>{
//   alert("evo me")
//   let privremeno = get_korisnik();
//   return privremeno;
// };
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
      odgovor.innerHTML="Niste uneli ime";
      return;
    }

    //deo provere emaila regexima
    if(!validateEmail(email)){
      alert("los email");
      return;
    }

    
    // var potvrda = document.getElementById("potvrda").value;

    //validacija
    //korime jedinstveno
    //format email adrese
    //lozinka i potvrda iste

    var k = new korisnik(ime,prezime,korime,lozinka,email);
    var svi_korisnici = get_korisnici();
    svi_korisnici.push(k);
    set_korisnici(svi_korisnici);
    alert("Registracija uspesna");
  });
}

// LOGOVANJE
var uloguj = document.getElementById("uloguj");
if(uloguj!=null){
  // u slucaju da je korisnik vec ulogovan, sakriva se login forma
  if(get_korisnik()!=null){
    odgovor.innerHTML="Vec ste ulogovani";
    var forma_login = document.getElementById("forma_login");
    forma_login.style.display="none";
  }else{
    uloguj.addEventListener("click",(e)=>{
      e.preventDefault();
      var korime = document.getElementById("korime").value;
      var lozinka = document.getElementById("lozinka").value;

      var svi_korisnici = get_korisnici();
      for(var i=0;i<svi_korisnici.length;i++){
        var k = svi_korisnici[i];
        if(korime==k.korime && lozinka==k.lozinka){
          alert("Uspesno logovanje");

          //treba da znam ako je korisnik ulogovan
          //npr: korisnik dodje na stranicu za logovanje i uloguje se
          //zatim ode da stavi proizvod u korpu
          //moram da znam da li je korisnik ulogovan
          //to radim tako sto proverim da li u localstorage postoji kljuc korisnik
          set_korisnik(k);
          document.location.href="index.html";
          return;
        }
      }
      alert("Pogresni podaci");
    });
  }
}

// kada se izloguje korisnik, postaje vidljiva forma login
// mora na silu forma da se reloaduje da bi se videle sakrivene forme
var logout = document.getElementById("logout");
if(logout!=null){
  logout.addEventListener("click",()=>{
    localStorage.removeItem("korisnik");
    location.href="index.html";
  });
}

var api = document.getElementById("api");

if(api!=null){
  var dugme = document.getElementById("dugme");
  dugme.addEventListener("click",(e)=>{
    e.preventDefault();

    $.get('https://api.openweathermap.org/data/2.5/weather?q=' + $('#weather_input').val() + '&units=metric&appid=506c04c8964f81d05743f45f600991e8', function(weather) {
      
      console.log(weather);
      console.log(weather.coord.lon);
      console.log(weather.coord.lat);
        var html_str = "";
        html_str += "<h2>City: " + weather.name + "</h2>";
        html_str += "<h3 class='white'>Temperature: " + weather.main.temp.toFixed(0) + " Stepeni</h3>";
        $('#weather_loc').html(html_str);
        document.body.style.background = "url(/images/"+$('#weather_input').val()+".png)";
        document.body.style.backgroundSize = "cover";
    }, "json");
    
      
  });


  
    


}