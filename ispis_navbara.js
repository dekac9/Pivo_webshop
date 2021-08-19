import {get_korisnik, ispis_malog_broja} from './funkcije.js';
import  asinhronost  from "./main.js";



export default function provera_za_navbar(){
 
  let html;
  let ispis = document.getElementById("navigacija")
  let temp = get_korisnik();
  if (temp!=null){
    html=`<div class="col-12">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon "></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link text-center pocetna" aria-current="page" href="index.html">Pocetna</a>
            </li>
            
            <li class="nav-item">
              <a class="nav-link text-center register" href="register.html">Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-center proizvodi" href="proizvodi.html">Proizvodi</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-center api" href="api.html">Api</a>
            </li>
            <li class="nav-item">

              <a class="nav-link text-center" href="korpa.html"><i class="fa" style="font-size:24px">&#xf07a;</i>
                <span class='badge badge-warning' id='lblCartCount'> 0 </span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-center" href="" id="logout">Logout</a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  </div>`
  ispis.innerHTML = html;
  document.getElementById("logout").addEventListener("click",()=>{
    localStorage.removeItem("korisnik");
    location.href="index.html"})
    dodaj_aktivan();
    asinhronost();
    ispis_malog_broja();
    
  };
  if(temp==null){
    html=`<div class="col-12">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon "></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link text-center pocetna" aria-current="page" href="index.html">Pocetna</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-center login" href="login.html">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-center register" href="register.html">Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-center proizvodi" href="proizvodi.html">Proizvodi</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-center api" href="api.html">Api</a>
            </li>
                        
          </ul>
        </div>
      </div>
    </nav>
  </div>`
  ispis.innerHTML = html;

  dodaj_aktivan();
  asinhronost();
  ispis_malog_broja();
  }

}

function dodaj_aktivan(){
  let meta=document.body.id;
  let linkovi = document.getElementsByClassName("nav-link")
  for (let i=0;i<linkovi.length;i++){
    let temp = linkovi[i].innerHTML;
    let temp_mala_slova = temp.toLowerCase();
    if (temp_mala_slova==meta){
      let temp2=document.getElementsByClassName(`${temp_mala_slova}`);
      temp2[0].classList.add("active");

    }
  }
 

}