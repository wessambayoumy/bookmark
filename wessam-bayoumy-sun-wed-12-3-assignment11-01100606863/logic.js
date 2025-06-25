var sname = document.querySelector("#Name");
var slink = document.querySelector("#url");
var sbtn = document.querySelector(".submit-btn");
var x = document.querySelector(".fa-xmark");
var layer = document.querySelector(".error");

var btnAdd = sbtn.addEventListener("click", add);

var allsites = [];

if (localStorage.getItem("allsites") != null) {
  allsites = JSON.parse(localStorage.getItem("allsites"));
  display();
}

function vName() {
  var snameRegex = /[a-zA-Z0-9]{3,}/;
  return snameRegex.test(sname.value);
}

function vLink() {
  try {
    new URL(slink.value);
    return true;
  } catch (error) {
    return false;
  }
}

function add() {
  if (vName() == true && vLink() == true) {
    var site = {
      name: sname.value,
      url: slink.value,
    };

    allsites.push(site);

    localStorage.setItem("allsites", JSON.stringify(allsites));
    console.log(allsites);

    display();
    clear();
  } else {
    displayLayer();
  }
}

function clear() {
  sname.value = "";
  slink.value = "";
}

function display() {
  st = "";
  for (let index = 0; index < allsites.length - 1; index++) {
    st += ` 
    
            
                <tr>

                    <td>
                     ${index + 1} 
                    </td>


                    <td>
                     ${allsites[index].name} 
                    </td>


                    <td>
                     <button class="table-btn eye-btn"><a class="text-decoration-none text-white" target="_blank" href="${
                       allsites[index].url
                     }"><i class="fa-solid fa-eye"></i>Visit</a></button> 
                    </td>


                    <td>
                     <button onclick="deleteSite(${index})" class="table-btn del-btn"><i class="fa-solid fa-trash-can"></i>Delete</button> 
                    </td>

                </tr>
           
            
            `;
  }
  document.querySelector("tbody").innerHTML = st;
}

function deleteSite(index) {
  console.log("hi");
  allsites.splice(index, 1);
  localStorage.setItem("allsites", JSON.stringify(allsites));
  display();
}

layer.addEventListener("click", function (e) {
  if (e.target != document.querySelector(".msg")) {
    closeLayer();
  }
});

function closeLayer() {
  layer.classList.replace("d-flex", "d-none");
}

function displayLayer() {
  layer.classList.replace("d-none", "d-flex");
}
