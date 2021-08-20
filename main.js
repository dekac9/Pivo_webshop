import provera_za_navbar from "./ispis_navbara.js";
import get_proizvodi from "./funkcije.js";
import { set_proizvodi } from "./funkcije.js";
import { get_korisnik } from "./funkcije.js";
import { set_korisnik } from "./funkcije.js";
import { get_korisnici } from "./funkcije.js";
import { set_korisnici } from "./funkcije.js";
import { ispis_malog_broja } from "./funkcije.js";

// za rad sa local storageom:
//korisnici - svi korisnici
//korisnik  - trenutno ulogovan korisnik
provera_za_navbar();

//Konstruktor za korisnika
function korisnik(ime, prezime, korime, lozinka, email) {
  this.ime = ime;
  this.prezime = prezime;
  this.korime = korime;
  this.lozinka = lozinka;
  this.email = email;
  this.korpa = [];
}

//Konstruktor za proizvode(znam da saljem i sto treba i sto ne treba)
function proizvod(
  id,
  title,
  img_src,
  img_alt,
  description,
  stars,
  alcohol,
  extract,
  price_old,
  price_new
) {
  this.id = id;
  this.title = title;
  this.img_src = img_src + ".png";
  //console.log(this.img_src);
  this.img_alt = img_alt;
  this.description = description;
  this.stars = stars;
  this.alcohol = alcohol;
  this.extract = extract;
  this.price_old = price_old;
  this.price_new = price_new;
  this.broj = 1;
}

var set_json = (data) => {
  var svi_proizvodi = [];

  for (var i = 0; i < data.length; i++) {
    var obj = new proizvod(
      data[i].id,
      data[i].title,
      data[i].img.src,
      data[i].img.alt,
      data[i].description,
      data[i].stars,
      data[i].alcohol,
      data[i].extract,
      data[i].price.old,
      data[i].price.new
    );
    //alert("usao")
    //console.log(obj);
    svi_proizvodi.push(obj);
  }

  set_proizvodi(svi_proizvodi);

  if (stranica_proizvoda != null) {
    prikaz_proizvoda_funkcija();
  }
};

//PRETHODNI FETCH NAMERNO OSTAVIO
//console.log("proizvodi");
//ODAVDE ZAKOMENTARISAO ZBOG ASYNC AWAITa
// fetch("/data/products.json")
// .then(resp=> resp.json())
// .then(
//   data=>set_json(data)
// )

// set_proizvodi(svi_proizvodi);

export default async function asinhronost() {
  try {
    var response = await fetch("/data/products.json");
    var data = await response.json();
    //console.log(data);
    set_json(data);
  } catch (error) {
    console.error(error);
  }
}
//asinhronost();

//1

var sort_cena = document.getElementById("sort_cena");
if (sort_cena != null) {
  sort_cena.addEventListener("change", prikaz_proizvoda_funkcija);
}

var select_alcohol = document.getElementById("alcohol");
if (select_alcohol != null) {
  select_alcohol.addEventListener("change", prikaz_proizvoda_funkcija);
}

function filtrirajAlkohol(data) {
  //alert("alkohol")
  let alkohol_poredjenje = document.getElementById("alcohol").value;
  //console.log(alkohol_poredjenje);
  if (alkohol_poredjenje == "Odaberite kolicinu alkohola") {
    return data;
  }
  let niz_za_alkohol = [];
  data.forEach((element) => {
    if (element.alcohol == alkohol_poredjenje) {
      niz_za_alkohol.push(element);
    }
  });
  console.log(niz_za_alkohol);
  return niz_za_alkohol;
}

function filtrirajCena(data) {
  let cena_ispis = document.getElementById("sort_cena_labela");
  let cena_poredjenje = document.getElementById("sort_cena").value;
  if (cena_poredjenje == 0) {
    cena_ispis.innerHTML = `Prikazani su svi proizvodi`;
  } else {
    cena_ispis.innerHTML = `Prikazani proiznodi jeftiniji od: ${cena_poredjenje} din`;
  }

  if (cena_poredjenje == 0) {
    return data;
  }
  let niz_za_cenu = [];
  data.forEach((element) => {
    if (element.price_new <= cena_poredjenje) {
      niz_za_cenu.push(element);
    }
  });
  console.log(niz_za_cenu);
  return niz_za_cenu;
}

// });

const stranica_proizvoda = document.getElementById("proizvodi");
if (stranica_proizvoda != null) {
  var prikaz_proizvoda_funkcija = () => {
    let data = get_proizvodi();

    var select = document.getElementById("alcohol");
    //console.log(select.length);
    if (select.length == 1) {
      var niz_za_alkohol = [];
      for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.text = data[i].alcohol;
        option.value = data[i].alcohol;
        if (niz_za_alkohol.indexOf(option.text) < 0) {
          niz_za_alkohol.push(option.text);
          select.add(option);
        }
      }
    }
    data = filtrirajCena(data);
    data = filtrirajAlkohol(data);

    var prikaz_proizvodi = document.getElementById("prikaz_proizvodi");
    prikaz_proizvodi.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
      var pr = data[i];

      var div = document.createElement("div");
      div.classList.add("col-md-6");
      div.classList.add("col-lg-4");
      div.classList.add("text-center");

      var img = document.createElement("img");
      img.classList.add("img-fluid");
      img.src = pr.img_src;
      img.alt = pr.img_alt;
      img.style.width = "100%";
      div.appendChild(img);

      var h3 = document.createElement("h3");
      h3.innerHTML = pr.title;
      div.appendChild(h3);

      var p = document.createElement("p");
      p.innerHTML = pr.description;
      div.appendChild(p);

      var p22 = document.createElement("p");
      p22.innerHTML = "alcohol: " + pr.alcohol;
      div.appendChild(p22);

      var p2 = document.createElement("p");
      var del = document.createElement("del");
      del.innerHTML = pr.price_old;
      p2.innerHTML = pr.price_new + " ";
      p2.appendChild(del);
      div.appendChild(p2);

      var button = document.createElement("button");
      button.classList.add("btn");
      button.classList.add("btn-success");
      button.innerHTML = "dodaj u korpu";
      div.appendChild(button);
      button.setAttribute("obj", JSON.stringify(pr));
      button.addEventListener("click", (e) => {
        //ispis_malog_broja();
        var dugme = e.target;

        var pr = JSON.parse(dugme.getAttribute("obj"));
        //console.log(pr.id); radi
        var kor = get_korisnik();
        //console.log(kor.korpa);
        //console.log(pr);
        //console.log(kor.korpa.id);
        if (kor == null) {
          alert("Morate biti ulogovani da bi dodali u korpu");
        } else {
          if (kor.korpa.length == 0) {
            kor.korpa.push(pr);
          } else {
            for (let i = 0; i < kor.korpa.length; i++) {
              if (kor.korpa[i].id == pr.id) {
                alert("Dodat jos jedan proizvod koji ste vec imali u korpi");
                kor.korpa[i].broj++;
                break;
              } else if (i == kor.korpa.length - 1) {
                kor.korpa.push(pr);
                break;
              } else {
                continue;
              }
            }
            set_korisnik(kor);
          }
        }
        
        var svi_korisnici = get_korisnici();
        for (var i = 0; i < svi_korisnici.length; i++) {
          if (kor != null && svi_korisnici[i].korime == kor.korime) {
            svi_korisnici[i] = kor;
            //mora da se ubaci i u sve korisnike i u trenutnog korisnika
            //sadrzaj njegove korpe, za dalje posete
            set_korisnici(svi_korisnici);
            set_korisnik(kor);
            ispis_malog_broja();
            return;
          }
        }
        //provera_za_navbar();
      });

      prikaz_proizvodi.appendChild(div);
      //ispis_malog_broja();
    }
    var sort_cena = document.getElementById("sort_cena");
    sort_cena.addEventListener("change", prikaz_proizvoda_funkcija);

    // if(sort_cena_labela!=null){

    var select_alcohol = document.getElementById("alcohol");
    select_alcohol.addEventListener("change", prikaz_proizvoda_funkcija);
  };
}

//ako nema upisa, dodao sam na silu jednog, cisto da proveravam funkcionalnost. ovo moze posle da se obrise
var korisnici_svi = get_korisnici();
if (korisnici_svi == null) {
  korisnici_svi = [
    new korisnik("pera", "peric", "pera123", "password", "pera@gmail.com"),
  ];
  set_korisnici(korisnici_svi);
}

var odgovor = document.getElementById("odgovor");

//provera REGEX za email
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

var registruj = document.getElementById("registruj");
if (registruj != null) {
  registruj.addEventListener("click", (e) => {
    e.preventDefault();

    var ime = document.getElementById("ime").value.trim();
    var prezime = document.getElementById("prezime").value.trim();
    var korime = document.getElementById("korime").value.trim();
    var lozinka = document.getElementById("lozinka").value.trim();
    var email = document.getElementById("email").value.trim();

    //provara da li je umnet podatak, treba za svaku stavku, mozda moze i pametnije
    if (ime === "") {
      odgovor.innerHTML = "Niste uneli ime";
      return;
    }

    //deo provere emaila regexima
    if (!validateEmail(email)) {
      alert("los email");
      return;
    }

    var k = new korisnik(ime, prezime, korime, lozinka, email);
    var svi_korisnici = get_korisnici();
    svi_korisnici.push(k);
    set_korisnici(svi_korisnici);
    alert("Registracija uspesna");
    location.href = "index.html";
  });
}

// LOGOVANJE
var uloguj = document.getElementById("uloguj");
if (uloguj != null) {
  // u slucaju da je korisnik vec ulogovan, sakriva se login forma
  if (get_korisnik() != null) {
    odgovor.innerHTML = "Vec ste ulogovani";
    var forma_login = document.getElementById("forma_login");
    forma_login.style.display = "none";
  } else {
    uloguj.addEventListener("click", (e) => {
      e.preventDefault();
      var korime = document.getElementById("korime").value;
      var lozinka = document.getElementById("lozinka").value;

      var svi_korisnici = get_korisnici();
      for (var i = 0; i < svi_korisnici.length; i++) {
        var k = svi_korisnici[i];
        if (korime == k.korime && lozinka == k.lozinka) {
          alert("Uspesno logovanje");

          //treba da znam ako je korisnik ulogovan
          //npr: korisnik dodje na stranicu za logovanje i uloguje se
          //zatim ode da stavi proizvod u korpu
          //moram da znam da li je korisnik ulogovan
          //to radim tako sto proverim da li u localstorage postoji kljuc korisnik
          set_korisnik(k);
          document.location.href = "index.html";
          return;
        }
      }
      alert("Pogresni podaci");
    });
  }
}

var api = document.getElementById("api");

if (api != null) {
  var dugme = document.getElementById("dugme");
  dugme.addEventListener("click", (e) => {
    e.preventDefault();

    $.get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        $("#weather_input").val() +
        "&units=metric&appid=506c04c8964f81d05743f45f600991e8",
      function (weather) {
        console.log(weather);
        console.log(weather.coord.lon);
        console.log(weather.coord.lat);
        var html_str = "";
        html_str += "<h2 class='white'>City: " + weather.name + "</h2>";
        html_str +=
          "<h3 class='white'>Temperatura: " +
          weather.main.temp.toFixed(0) +
          " Stepeni</h3>";
        $("#weather_loc").html(html_str);
      },
      "json"
    );
  });
}
