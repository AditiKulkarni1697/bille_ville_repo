let shipping_address_form = document.getElementById("shipping_address_form");
let customer_details = document.getElementById("customer_details");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let apartment = document.getElementById("Apartment");
let city = document.getElementById("city");
let state = document.getElementById("state");
let zip_code = document.getElementById("zip_code");
let phoneNo = document.getElementById("phoneNo");
let email = document.getElementById("email");
let free = document.getElementById("free");
let express = document.getElementById("express");
// let totalValue = JSON.parse(localStorage.getItem("total")) || 0;
let totalValue = JSON.parse(sessionStorage.getItem("total")) || 0; //temp
let items = sessionStorage.getItem("items");
totalValue = totalValue + 25 - 500;
let id = sessionStorage.getItem("id");
let bill_details = document.getElementById("bill_details");
let cartData = JSON.parse(localStorage.getItem("cart")) || [];
let cardDetails = JSON.parse(localStorage.getItem("card")) || [];
let card_Number = document.getElementById("card_Number");
let month_year = document.getElementById("month_year");
let submit = document.getElementById("submit");

shipping_address_form.addEventListener("submit", function (e) {
  e.preventDefault();
  shipping_address_form.setAttribute("style", "display:none");
  let delivery_Info = document.createElement("div");
  let Name = document.createElement("p");
  Name.innerText = firstName.value + lastName.value;
  let Address = document.createElement("span");
  Address.innerText = address.value;
  let Apartment = document.createElement("span");
  Apartment.innerText = apartment.value;
  let City = document.createElement("p");
  City.innerText = city.value;
  let State = document.createElement("span");
  State.innerText = state.value;
  let Zipcode = document.createElement("span");
  Zipcode.innerText = "-" + zip_code.value;
  let PhoneNo = document.createElement("p");
  PhoneNo.innerText = phoneNo.value;
  let Email = document.createElement("p");
  Email.innerText = email.value;
  sessionStorage.setItem("email",JSON.stringify(email.value))
  let Delivery = document.createElement("p");

  if (free.checked == true) {
    Delivery.innerText = "STANDARD-Delivery in 3-5 Business Days";
  } else if (express.checked == true) {
    Delivery.innerText = "EXPRESS-Delivery in 2-3 Business Days";
  }
  delivery_Info.append(
    Name,
    Address,
    Apartment,
    City,
    State,
    Zipcode,
    PhoneNo,
    Email,
    Delivery
  );
  customer_details.append(delivery_Info);
});

// billing details
bill_details.innerHTML = `
 <h3>Your Summary</h3>
     <p>Bag(${items})</p>
     <hr>
     <table class="total_table">
     <tr>
     <td>Subtotal</td>
     <td>${totalValue}</td>
     </tr>
     <tr>
     <td>Standard Shipping</td>
     <td>FREE</td>
     </tr>
     <tr>
     <td>Estimated Tax</td>
     <td>${totalValue}</td>
     </tr>
     
     <tr id="order_total">
     
     <td>Total</td>
     <td>${totalValue}</td>
     </tr>
     </table>
     
 `;
let button = document.createElement("a");
button.innerText = "SUBMIT YOUR ORDER";
button.setAttribute("href", "gateway.html");
button.setAttribute("id", "submit");
button.setAttribute("class", "btn btn-danger");
button.addEventListener("click", function () {
  cardDetails.push(card_Number.value);
  cardDetails.push(totalValue);
  cardDetails.push(email);
  localStorage.setItem("card", JSON.stringify(cardDetails));
});
bill_details.append(button);
