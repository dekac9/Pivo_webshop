export default function korisnik(ime,prezime,korime,lozinka,email){
  this.ime=ime;
  this.prezime=prezime;
  this.korime=korime;
  this.lozinka=lozinka;
  this.email=email;
  this.korpa=[];
};

export function proizvod(id,title,img_src,img_alt,description,stars,alcohol,extract,price_old,price_new){
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