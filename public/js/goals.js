const queries = $('.goal-name-output');

async function outputPexelImage(query, imgEl) {
  const {photos} = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
    headers: {
      Authorization: 'dSBGzPie66IdXR0BGNdj8gmNKqI0ikHPBFYTcsKMOd7sVFTaA3Le7LEo'
    }
  }).then(response => response.json());

  if (photos.length) {
    return imgEl.attr('src', photos[0].src.medium);
  }

  imgEl.attr('src', 'https://placehold.co/600x400');
}

function init() {
  queries.each((_, q) => {
    const nameEl = $(q);
    const imgEl = nameEl.next();

    outputPexelImage($(q).text(), imgEl)
  });
}

init();








// // // apikey: 

// // import { createClient } from 'pexels';

// // const client = createClient('dSBGzPie66IdXR0BGNdj8gmNKqI0ikHPBFYTcsKMOd7sVFTaA3Le7LEo');

// // // All requests made with the client will be authenticated


// // /* <a href="https://www.pexels.com/photo/food-dinner-lunch-meal-4147875">Photo</a> */

// // {
// //     "id": 2014422,
// //     "width": 3024,
// //     "height": 3024,
// //     "url": "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
// //     "photographer": "Joey Farina",
// //     "photographer_url": "https://www.pexels.com/@joey",
// //     "photographer_id": 680589,
// //     "avg_color": "#978E82",
// //     "src": {
// //       "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
// //       "large2x": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
// //       "large": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
// //       "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
// //       "small": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
// //       "portrait": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
// //       "landscape": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
// //       "tiny": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
// //     },
// //     "liked": false,
// //     "alt": "Brown Rocks During Golden Hour"
// //   }

// // // Example request
// //   import { createClient } from 'pexels';

// // const client = createClient('YOUR_API_KEY');
// // const query = 'Nature';

// // client.photos.search({ query, per_page: 1 }).then(photos => {...});
  

// // // Example Response
// // {
// //     "total_results": 10000,
// //     "page": 1,
// //     "per_page": 1,
// //     "photos": [
// //       {
// //         "id": 3573351,
// //         "width": 3066,
// //         "height": 3968,
// //         "url": "https://www.pexels.com/photo/trees-during-day-3573351/",
// //         "photographer": "Lukas Rodriguez",
// //         "photographer_url": "https://www.pexels.com/@lukas-rodriguez-1845331",
// //         "photographer_id": 1845331,
// //         "avg_color": "#374824",
// //         "src": {
// //           "original": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png",
// //           "large2x": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
// //           "large": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=650&w=940",
// //           "medium": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=350",
// //           "small": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=130",
// //           "portrait": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
// //           "landscape": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
// //           "tiny": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
// //         },
// //         "liked": false,
// //         "alt": "Brown Rocks During Golden Hour"
// //       }
// //     ],
// //     "next_page": "https://api.pexels.com/v1/search/?page=2&per_page=1&query=nature"
// //   }





// document.getElementById("amountToAdd").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   // get the amount entered by the user
//   const amountToAdd = parseFloat(document.getElementById("amountToAdd").value);

//   // add the amount to the current balance
//   const currentBalance = parseFloat("{{this.currentAmount}}");
//   const goalAmount = parseFloat("{{this.goalAmount}}");

//   if (!isNaN(amountToAdd) && amountToAdd > 0) {
//     // calculate the balance
//     const newBalance = currentBalance + amountToAdd;
//     if (newBalance <= goalAmount) {
//       // update the "how much left"
//       const howMuchLeft = goalAmount - newBalance;
//       // update the user interface with the new numbers
//       document.querySelector(".current_info").textContent = `Current Balance: ${newBalance}`;
//       document.querySelector(".current_info.how_much_left").textContent = `How Much Left: ${howMuchLeft}`;
//     } else {
//       alert("You've reached your goal!");
//     }
//   } else {
//     alert("Please enter a valid positive number to add.");
//   }
// });


// const searchPhotos = () => {

//     // const query = 'car';
  
    
//       .then(data => {
//   const photos = data.photos;
//   console.log(photos);
//   if (photos.length > 0) {
//     const photo = photos[0];
//     const photoUrl = photo.src.original;
//     if (itemElement) {
//       itemElement.src = photoUrl; // Update the src attribute
//     } else {
//       console.error("Element with ID 'item' not found in the HTML.");
//     }
//   } else {
//     console.error('No photos found for the query.');
//   }
// })
//   .catch(error => {
//     console.error('Error fetching photos:', error);
//   });
//   };

// // Call searchPhotos() when needed, e.g., in response to an event or page load
// //   searchPhotos();

// // Attach an event listener to the search button or form submission
// // Replace 'searchButton' with the ID or class of your search button or form

// document.addEventListener("DOMContentLoaded", function () {
//   // Your code here
//   var element = document.querySelector("#item");
//   if (element) {
//     element.addEventListener("submit", function () {
//       // Your event handling code
//     });
//   }
// });