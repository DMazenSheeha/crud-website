let main_object = {};
let title = document.getElementsByClassName("title")[0];
let price = document.getElementsByClassName("price")[0];
let taxes = document.getElementsByClassName("taxes")[0];
let ads = document.getElementsByClassName("ads")[0];
let discount = document.getElementsByClassName("discount")[0];
let total = document.getElementsByClassName("total")[0];
let count = document.getElementsByClassName("count")[0];
let category = document.getElementsByClassName("category")[0];
let create_btn = document.querySelector("button");
let tapleParent = document.getElementById("watch");
let table = document.querySelector("table");
let tbody = document.querySelector("tbody");
let clear = document.querySelector(".clear");
let clears = document.querySelector(".clear span");
let sinput = document.getElementById("search");
let searchByTitle = document.querySelector(".by-title");
let searchByCategory = document.querySelector(".by-category");
let importantInputs = [title, price, taxes, ads, discount, category];
let searchmood = "title";
let mood = "create";
let totalInObj;
let id;
let dis;
let index;

// Functions //

price.oninput = function () {
  if (discount.value == "") {
    dis = 0;
  } else {
    dis = discount.value;
  }
  if (price.value != "") {
    total.innerHTML =
      "Total: " +
      Number(
        Number(ads.value) +
          Number(price.value) +
          Number(taxes.value) -
          Number(dis)
      );
    total.style.background = "#0a430e";
  } else {
    total.innerHTML = "Total";
    total.style.background = "#d9888b";
  }
  totalInObj = Number(
    Number(ads.value) + Number(price.value) + Number(taxes.value) - Number(dis)
  );
};

taxes.oninput = function () {
  if (discount.value == "") {
    dis = 0;
  } else {
    dis = discount.value;
  }
  if (price.value != "") {
    total.innerHTML =
      "Total: " +
      Number(
        Number(ads.value) +
          Number(price.value) +
          Number(taxes.value) -
          Number(dis)
      );
    total.style.background = "#0a430e";
  } else {
    total.innerHTML = "Total";
    total.style.background = "#d9888b";
  }
  totalInObj = Number(
    Number(ads.value) + Number(price.value) + Number(taxes.value) - Number(dis)
  );
};

ads.oninput = function () {
  if (discount.value == "") {
    dis = 0;
  } else {
    dis = discount.value;
  }
  if (price.value != "") {
    total.innerHTML =
      "Total: " +
      Number(
        Number(ads.value) +
          Number(price.value) +
          Number(taxes.value) -
          Number(dis)
      );
    total.style.background = "#0a430e";
  } else {
    total.innerHTML = "Total";
    total.style.background = "#d9888b";
  }
  totalInObj = Number(
    Number(ads.value) + Number(price.value) + Number(taxes.value) - Number(dis)
  );
};

discount.oninput = function () {
  if (!discount.value == "") {
    dis = discount.value;
  } else {
    dis = 0;
  }
  if (price.value != "") {
    total.innerHTML =
      "Total: " +
      Number(
        Number(ads.value) +
          Number(price.value) +
          Number(taxes.value) -
          Number(dis)
      );
    total.style.background = "#0a430e";
  } else {
    total.innerHTML = "Total";
    total.style.background = "#d9888b";
  }
  totalInObj = Number(
    Number(ads.value) + Number(price.value) + Number(taxes.value) - Number(dis)
  );
};

clears.innerHTML = Object.keys(main_object).length;

let arr = [];
create_btn.onclick = function () {
  if (
    title.value != "" &&
    price.value != "" &&
    taxes.value != "" &&
    category.value != ""
  ) {
    if (mood == "create") {
      let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: dis,
        total: totalInObj,
        category: category.value,
      };
      let c;
      if (count.value < 1) {
        c = 1;
      } else {
        c = count.value;
      }
      for (let i = 0; i < c; i++) {
        arr.push(newpro);
      }
      tbody.innerHTML = "";
      createpro();
      console.log(arr)
    } else {
      if(    
      title.value != "" &&
      price.value != "" &&
      taxes.value != "" &&
      category.value != ""){
        let newpro = {
          title: title.value,
          price: price.value,
          taxes: taxes.value,
          ads: ads.value,
          discount: discount.value,
          total: (+price.value + +taxes.value + +ads.value) - +discount.value,
          category: category.value,
        };
        arr[index] = newpro;
        count.style.display = "block";
        window.localStorage.product = JSON.stringify(arr);
        arr = JSON.parse(window.localStorage.getItem("product"));
        tbody.innerHTML = "";
        createpro();
        mood = "create";
        create_btn.innerHTML = "Create";
      }
    }
    window.localStorage.setItem("product", JSON.stringify(arr));
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "Tota: ";
    total.style.background = "#d9888b";
    if (arr.length < 1) {
      clear.style.display = "none";
    } else {
      clear.style.display = "block";
      clears.innerHTML = arr.length;
    }
  }
};

window.onload = function () {
  if (window.localStorage.getItem("product")) {
    arr = JSON.parse(window.localStorage.getItem("product"));
    tbody.innerHTML = "";
    createpro();
  }
  if (arr.length < 1) {
    clear.style.display = "none";
  } else {
    clear.style.display = "block";
    clears.innerHTML = arr.length;
  }
};

function createpro() {
  for (let i = 0; i < arr.length; i++) {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${arr[i].title}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].taxes}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].category}</td>
        <td><button onclick="updatepro(${i})">update</button></td>
        <td><button onclick="deletepro(${i})">delete</button></td>
      </tr>
      `;
    table.appendChild(tbody);
    tapleParent.appendChild(table);
  }
}

clear.onclick = function () {
  window.localStorage.clear();
  arr = [];
  tbody.innerHTML = "";
  clears.innerHTML = arr.length;
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "Tota: ";
  total.style.background = "#d9888b";
  if (arr.length < 1) {
    clear.style.display = "none";
  } else {
    clear.style.display = "block";
    clears.innerHTML = arr.length;
  }
};

function deletepro(a) {
  arr.splice(a, 1);
  clears.innerHTML = arr.length;
  tbody.innerHTML = "";
  window.localStorage.product = JSON.stringify(arr);
  createpro();
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "Tota: ";
  total.style.background = "#d9888b";
  if (arr.length < 1) {
    clear.style.display = "none";
  } else {
    clear.style.display = "block";
    clears.innerHTML = arr.length;
  }
}

function updatepro(a) {
  mood = "up";
  index = a;
  title.value = arr[a].title;
  price.value = arr[a].price;
  taxes.value = arr[a].taxes;
  ads.value = arr[a].ads;
  count.style.display = "none";
  discount.value = arr[a].discount;
  category.value = arr[a].category;
  total.innerHTML = "Tota: " + arr[a].total;
  total.style.background = "#0a430e";
  create_btn.innerHTML = "Update";
  scroll({
    top: 0,
    behavior:"smooth"
  })
}

searchByTitle.onclick = function () {
  searchmood = "title";
  sinput.placeholder = "Search by " + searchmood;
  sinput.focus();
};

searchByCategory.onclick = function () {
  searchmood = "category";
  sinput.placeholder = "Search by " + searchmood;
  sinput.focus();
};

sinput.onkeyup = function () {
  tbody.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (searchmood == "title") {
      if (arr[i].title.toLowerCase().includes(sinput.value.toLowerCase())) {
        tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${arr[i].title}</td>
          <td>${arr[i].price}</td>
          <td>${arr[i].taxes}</td>
          <td>${arr[i].ads}</td>
          <td>${arr[i].discount}</td>
          <td>${arr[i].total}</td>
          <td>${arr[i].category}</td>
          <td><button onclick="updatepro(${i})">update</button></td>
          <td><button onclick="deletepro(${i})">delete</button></td>
        </tr>
        `;
      }
    }
    if (searchmood == "category") {
      if (arr[i].category.toLowerCase().includes(sinput.value.toLowerCase())) {
        tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${arr[i].title}</td>
          <td>${arr[i].price}</td>
          <td>${arr[i].taxes}</td>
          <td>${arr[i].ads}</td>
          <td>${arr[i].discount}</td>
          <td>${arr[i].total}</td>
          <td>${arr[i].category}</td>
          <td><button onclick="updatepro(${i})">update</button></td>
          <td><button onclick="deletepro(${i})">delete</button></td>
        </tr>
        `;
      }
    }
  }
};
