//fja za dohvatanje niza proizvoda iz LSa
export default function get_proizvodi(){
  return JSON.parse(localStorage.getItem("proizvodi"));
};

//fja za upis niza proizvoda u LS
export function set_proizvodi(proizvodi){  
  localStorage.setItem("proizvodi",JSON.stringify(proizvodi));

}
//fja za dohvatanje niza svih ikad logovanih korisnika iz LS-a
export function get_korisnici(){
    return JSON.parse(localStorage.getItem("korisnici"));
};
//fja za upis niza svih ikad logovanih korisnika u LS  
export function set_korisnici(korisnici){
    localStorage.setItem("korisnici", JSON.stringify(korisnici));
};

//fja za dohvatanje niza trenutno logovanog korisnika iz LS-a
export function get_korisnik(){
   return JSON.parse(localStorage.getItem("korisnik"));
};

//fja za upis niza trenutno logovanog korisnika u LS 
export function set_korisnik(korisnik){
localStorage.setItem("korisnik", JSON.stringify(korisnik));
};

//ispis broja itema u kolicima trenutno logovanog korisnika na kolicima
export function ispis_malog_broja(){
  let ispis=document.getElementById("lblCartCount");
  let privremeno = get_korisnik();
  if(privremeno!=null){
  
  let sam_broj = privremeno.korpa.length;
  
  ispis.innerText=sam_broj;
  
  }
  
}

