var korpa = document.getElementById("korpa");
var trenutni_korisnik = get_korisnik();
if(trenutni_korisnik==null){
    alert("Ne mozete videti korpu posto niste ulogovani")
  }
if(korpa!=null){
  
  console.log(trenutni_korisnik);
  var proizvodi = trenutni_korisnik.korpa;
  

  for(var i=0;i<proizvodi.length;i++){
    var li = document.createElement("li");
    li.setAttribute("class","list-group-item");
    li.innerHTML="naziv: "+proizvodi[i].title+", broj stavki: "+proizvodi[i].broj;

    var btn = document.createElement("button");
    btn.innerHTML="+";
    btn.value = proizvodi[i].id;
    btn.addEventListener("click",(e)=>{
      e.preventDefault();
      var id = e.target.value;

      var proizvodi = trenutni_korisnik.korpa;
      for(var i=0;i<proizvodi.length;i++){
        if(proizvodi[i].id==id){
          proizvodi[i].broj++;
          break;
        }
      }
      
      trenutni_korisnik.korpa = proizvodi;
      set_korisnik(trenutni_korisnik);
      document.location.reload();
    });
    li.appendChild(btn);

    var btn2 = document.createElement("button");
    btn2.innerHTML="-";
    btn2.value = proizvodi[i].id;
    btn2.addEventListener("click",(e)=>{
      e.preventDefault();
      var id = e.target.value;

      var proizvodi = trenutni_korisnik.korpa;
      for(var i=0;i<proizvodi.length;i++){
        if(proizvodi[i].id==id){
          proizvodi[i].broj--
          if(proizvodi[i].broj<=0){
            proizvodi.splice(i,1);
          }
          break;
        }
      }
      
      trenutni_korisnik.korpa = proizvodi;
      set_korisnik(trenutni_korisnik);
      document.location.reload();
    });
    li.appendChild(btn2);

    korpa.appendChild(li);
  }
}