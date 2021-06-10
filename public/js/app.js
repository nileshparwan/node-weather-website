console.log("Client side javascript is enabled");

fetch("http://puzzle.mead.io/puzzle").then(response => {
   return response.json().then((data) => {
      console.log(data);
   });
});


const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".t1");
const messageTwo = document.querySelector(".t2");

weatherForm.addEventListener("submit", (event) => {
   event.preventDefault();

   messageOne.textContent = "...Loading weather";
   messageTwo.textContent = "";

   setTimeout(() => {
      fetch(`http://localhost:3000/weather?address=${search.value}`)
         .then((response) => {
            return response
               .json()
               .then((data) => {

                  if (data.error) {
                     console.log(data.error);
                     messageOne.textContent = "";
                     messageTwo.textContent = data.error;
                  } else {
                     console.log(data);
                     messageOne.textContent = "";
                     messageTwo.textContent = data.forecast;
                  }

               });
         });
   }, 1000);
});