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