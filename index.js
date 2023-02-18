// console.log("start");
// const api_url = "https://free-food-menus-api-production.up.railway.app/burgers";

// function getMenu(url) {
//   fetch(url).then((response) => {
//     console.log("response", response);
//     console.log("response.json()", response.json());

//     if (response.ok) {
//       return response.json();
//     }
//     throw new error("somthinge went wrong");
//   });
// }

// getMenu(api_url);
// // p.then

document.getElementById("btn");
// api url
let api_url = "https://free-food-menus-api-production.up.railway.app/burgers";
// let apiResult = [];
// let order = {};
function getMenu(url) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong");
    })
    .then((responseJson) => {
      showMenu(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showMenu(data) {
  //   apiResult = data;
  let tab = "";
  // Loop to access all rows
  for (let r of data) {
    // console.log(r);
    tab += `
        <div id="mainDiv" style="border:1px solid black;">
        <div id="productImg">
            <img src = ${r.img} height='250px' width='250px'>
        </div>
        <div id="productDetails" style="padding-left:3%">
        Name : ${r.name} <br>
        Description : ${r.dsc} <br>
        Id : ${r.id} <br>
        Price : ${r.price} <br>
        Rate: ${r.rate}<br>
        Country : ${r.country}
        </div>
           </div>`;
  }
  // Setting innerHTML as tab variable
  document.getElementById("product").innerHTML = tab;
}
// {
//     "id": "the-gramercy-tavern-burger-4-pack",
//     "img": "https://goldbelly.imgix.net/uploads/showcase_media_asset/image/137148/Gramercy-Tavern-Burger-and-Kielbasa-Kit-6.4.21-72ppi-1x1-15.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1",
//     "name": "Gramercy Tavern",
//     "dsc": "The Gramercy Tavern Burger - 4 Pack",
//     "price": 99,
//     "rate": 5,
//     "country": "New York, NY"
// }

function takeOrder(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const obj = [];
        obj.push(data[Math.floor(Math.random() * 61)]);
        obj.push(data[Math.floor(Math.random() * 61)]);
        obj.push(data[Math.floor(Math.random() * 61)]);
        setTimeout(() => {
          resolve(obj);
        }, 2500);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// takeOrder(api_url)
//   .then((result) => {
//     // console.log("result", result);
//     showOrder(result);
//   })
//   .catch((error) => console.error(error));

getMenu(api_url);
// takeOrder(api_url);

function showOrder(data) {
  //   apiResult = data;
  let tab = "";
  // Loop to access all rows
  for (let r of data) {
    // console.log(r);
    tab += `
          <div id="mainDiv" style="border:1px solid black;">
          <div id="productImg">
              <img src = ${r.img} height='280px' width='320px'>
          </div>
          <div id="productDetails" style="padding-left:3%">
          Name : ${r.name} <br>
          Description : ${r.dsc} <br>
          Id : ${r.id} <br>
          Price : ${r.price} <br>
          Rate: ${r.rate}<br>
          Country : ${r.country}
          </div>
             </div>`;
  }
  // Setting innerHTML as tab variable
  document.getElementById("order").innerHTML = tab;
}

function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

// orderPrep()
//   .then((result) => console.log("result", result))
//   .catch((error) => console.error(error));
function hide() {
  op.style.display = "block";
}

function l(){
  order.style.display="none";
}

function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

// payOrder()
//   .then((result) => console.log("result payOrder", result))
//   .catch((error) => console.error(error));

function thankyouFnc() {
  return new Promise((resolve) => {
    // alert("Thanks for ordering!");
    setTimeout(() => {
      alert("Thanks for ordering!");
      resolve();
    }, 1000);
  });
}

async function runFunctions() {
  //   await getMenu(api_url);
  await takeOrder(api_url)
    .then((result) => {
      // console.log("result", result);
      showOrder(result);
    })
    .catch((error) => console.error(error));
  await orderPrep()
    .then((result) => {
      let tab = `<h1 style="text-align: center">Order Preparation</h1>
      <h2>Order Status : ${result.order_status} </h2>
      <h2>Paid : ${result.paid}</h2><br>`;
      document.getElementById("orderPrep").innerHTML = tab;
      //   document.write("orderPrep", result);
      console.log("orderPrep", result);
    })
    .catch((error) => console.error(error));
  await payOrder()
    .then((result) => {
      let tab = `
      <h1 style="text-align: center">Pay Order</h1>
      <h2>Order Status : ${result.order_status} </h2>
        <h2>Paid : ${result.paid}</h2><br>`;
      document.getElementById("payOrder").innerHTML = tab;
      //   document.write("payOrder", result);
      console.log("payOrder", result);
    })
    // console.log("payOrder", result))
    .catch((error) => console.error(error));
  await thankyouFnc();
}

runFunctions();
