//fja za dohvatanje niza proizvoda iz LSa
export default function get_proizvodi(){
  return JSON.parse(localStorage.getItem("proizvodi"));
};

//fja za upis niza proizvoda iz LSa
export function set_proizvodi(proizvodi){  
  localStorage.setItem("proizvodi",JSON.stringify(proizvodi));

}
export function get_korisnici(){
    return JSON.parse(localStorage.getItem("korisnici"));
};
  
export function set_korisnici(korisnici){
    localStorage.setItem("korisnici", JSON.stringify(korisnici));
};


export function get_korisnik(){
   return JSON.parse(localStorage.getItem("korisnik"));
};

export function set_korisnik(korisnik){
localStorage.setItem("korisnik", JSON.stringify(korisnik));
};

export function ispis_malog_broja(){
  let ispis=document.getElementById("lblCartCount");
  let privremeno = get_korisnik();
  if(privremeno!=null){
  
  let sam_broj = privremeno.korpa.length;
  
  ispis.innerText=sam_broj;
  // ispis.innerHTML=sam_broj;
  
  }
  
}

