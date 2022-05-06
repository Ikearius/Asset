const showcase = document.getElementById("showcase") as HTMLIFrameElement;
const description = document.getElementById("description") as HTMLButtonElement;
const mediaType = document.getElementById("mediaType") as HTMLButtonElement;
const mediaUrl = document.getElementById("mediaUrl") as HTMLButtonElement;
const positionx = document.getElementById("x") as HTMLButtonElement;
const positiony = document.getElementById("y") as HTMLButtonElement;
const positionz = document.getElementById("z") as HTMLButtonElement;
const btnAddTag = document.getElementById("btnAddTag") as HTMLButtonElement;
const btnPlayGame = document.getElementById("btnPlayGame") as HTMLButtonElement;
const exampleModal = document.getElementById("exampleModal") as HTMLDivElement;
const btnHint = document.getElementById("btnHint") as HTMLButtonElement;
const tagTurnRed = document.getElementById("tagTurnRed") as HTMLButtonElement;
const tagTurnGreen = document.getElementById("tagTurnGreen") as HTMLButtonElement;
const itemadd = document.getElementById("allItems") as HTMLSelectElement;
const divScore = document.getElementById("score") as HTMLDivElement;
const lblPoint = document.getElementById("lblPoint") as HTMLLabelElement;
const divQuiz = document.getElementById("quiz") as HTMLLabelElement;
const divQuestion = document.getElementById("question") as HTMLLabelElement;
const answer1 = document.getElementById("answer1") as HTMLInputElement;
const answer2 = document.getElementById("answer2") as HTMLInputElement;
const answer3 = document.getElementById("answer3") as HTMLInputElement;
const answer4 = document.getElementById("answer4") as HTMLInputElement;
const lblanswer1 = document.getElementById("lblanswer1") as HTMLLabelElement;
const lblanswer2 = document.getElementById("lblanswer2") as HTMLLabelElement;
const lblanswer3 = document.getElementById("lblanswer3") as HTMLLabelElement;
const lblanswer4 = document.getElementById("lblanswer4") as HTMLLabelElement;
const quizresult = document.getElementById("quizresult") as HTMLLabelElement;
const btnCloseQuiz = document.getElementById("closeQuiz") as HTMLButtonElement;
const ddlCategory = document.getElementById("categoryDropdown") as HTMLInputElement;
const inputItem = document.getElementById("inputItem") as HTMLInputElement;
const btnSearchTag = document.getElementById("btnSearchTag") as HTMLButtonElement;
const btnSearchItem = document.getElementById("btnSeachItem") as HTMLButtonElement;
const listItem = document.getElementById("list-item") as HTMLDivElement;
const key = "mub8swy2n1ney58icx3p07e6b";
const urlBase = "http://113.29.227.172:8080/api/";
// declare this file is a module
export {};

// augment window with the MP_SDK property
declare global {
  interface Window {
    MP_SDK: any;
  }
}
let sdk: any;
let MtnCHK: any;
// let mtnStatus: any;
let categories: any;
let allItems: any;
let items: any;
let yourPoint = 0;
let maxPoint = 3;
var mattertags = new Array();
var quizs =[
  {sid:"fU6TyD9ocFn", question:"What device is used for monitoring water level in a steam boiler", asw1:"Water Gauge",asw2:"Glass Gauge",asw3:"Preassure Gauge",asw4:"Level Gauge" },
  {sid:"R3xF5kIXgj9", question:"Which of the following should you NOT dote while lifting objects?", asw1:"Keep the object close to your body",asw2:"Keep your feet together",asw3:"Lift with your legs",asw4:"Keep your back straight" },
  {sid:"ogufjCG2SZv", question:"Who should you call in an emergency?", asw1:"911",asw2:"995",asw3:"999",asw4:"1777" },
  {sid:"whereisthis", question:"testing extra question", asw1:"testing answ 1",asw2:"testing answ 2",asw3:"testing answ 3",asw4:"testing answ 4" },
]
var colors = ["screwdriver1","screwdriver2"];
var gametags = [
 {sid:'5mXieF9m3qf',game:false, active: false},
 {sid:'TIAHTWsYtDb',game:true, active: false},
 {sid:'TYzFB5Arsfw',game:true, active: false},
 {sid:'82fMbWHkf5W',game:false, active: false},
 {sid:'Vi7SmdKCpAE',game:true, active: false}];
showcase.addEventListener("load", async function () {
  try {
    const response = await fetch(urlBase + "category/get-all");
    categories = await response.json();
    const res = await fetch(urlBase + "item/get-all");
    allItems = await res.json();
    BindingCategories();
    BindingItems();
    sdk = await showcase.contentWindow.MP_SDK.connect(showcase, key, "3.6");
    sdk.Mattertag.registerIcon('checked', '../src/image/screwdriverchecked.png');
    sdk.Mattertag.registerIcon('screwdriver1', '../src/image/screwdriver1.png');
    sdk.Mattertag.registerIcon('screwdriver2', '../src/image/screwdriver2.png');
    
    sdk.on(sdk.Mattertag.Event.CLICK, callbackTagClick);
    sdk.on(sdk.Mattertag.Event.HOVER, callbackTagHover);
    sdk.on(sdk.Camera.Event.MOVE, callbackCameraMove);
    console.log(allItems);
    // var mattertagDesc = {
    //   label: 'test-IOT',
    //   anchorPosition: { x: -2.792, y: 1.527, z: 1.176 },
    //   stemVector: { x: 0, y: 0, z: -0.1 }
    // };
    // sdk.Mattertag.add(mattertagDesc);



  } catch (e) {
    //console.error(e);
    return;
  }
});
function callbackTagHover(sid: string): void {
  sdk.Mattertag.getData()
    .then(function (mattertags: any) {
      if (mattertags.length > 0) {
        let quiz = quizs.find((e: any) => e.sid === sid);
        if (quiz != null) {
          quizresult.innerText = "Unanswered!";
          quizresult.style.color="white";
          divQuiz.style.display = "block"; 
          divQuestion.innerText = quiz.question;
          lblanswer1.innerText = quiz.asw1;
          answer1.value = quiz.asw1;
          answer1.checked = false;
          lblanswer2.innerText = quiz.asw2;
          answer2.value = quiz.asw2;
          answer2.checked = false;
          lblanswer3.innerText = quiz.asw3;
          answer3.value = quiz.asw4;
          answer3.checked = false;
          lblanswer4.innerText = quiz.asw4;
          answer4.value = quiz.asw4;
          answer3.checked = false;
         
          btnCloseQuiz.addEventListener("click", async function () {
            divQuiz.style.display = "none";
          });
          if (document.querySelector('input[name="answer"]')) {
            document.querySelectorAll('input[name="answer"]').forEach((elem) => {
              elem.addEventListener("change", function(event) {
                var item = event.target as HTMLInputElement;
                if(item.value == quiz.asw2)
                {
                  quizresult.innerText = "Correct!";
                  quizresult.style.color="rgb(103, 255, 103)";
                }
                else
                {
                  quizresult.innerText = "Incorrect!";
                  quizresult.style.color="rgb(255, 103, 103)";
                }
              });
            });
          }
	let tag = mattertags.find((e: any) => e.sid === sid);
        if (tag != null) {
          let itemInfo = allItems.find((e: any) => e.itemCode === tag.label);
          InjectHtmlToTag(tag.sid, itemInfo);
        }
        }
      }
    })
    .catch(function () {});
}
function callbackTagClick(sid: string): void {
  sdk.Mattertag.getData()
    .then(function (mattertags: any) {
      if (mattertags.length > 0) {
        //search tag by item
        let tag = mattertags.find((e: any) => e.sid === sid);
        if (tag != null) {
          let itemInfo = allItems.find((e: any) => e.itemCode === tag.label);
          if (itemInfo != null && itemInfo != undefined) {
            document.getElementById("openModalButton").click();
            const itemCode = document.getElementById(
              "itemCode"
            ) as HTMLParagraphElement;
            itemCode.innerText = itemInfo["itemCode"];
            const itemDes = document.getElementById(
              "itemDes"
            ) as HTMLParagraphElement;
            itemDes.innerText = itemInfo["description"];
            const itemShortDes = document.getElementById(
              "itemShortDes"
            ) as HTMLParagraphElement;
            itemShortDes.innerText = itemInfo["shortDescription"];
            const quantity = document.getElementById(
              "quantity"
            ) as HTMLParagraphElement;
	    itemInfo.quantity = 0;
  	    if(itemInfo.itemStocks != null && itemInfo.itemStocks != undefined)
  	    {
   	       itemInfo.itemStocks.forEach((item: { quantity: any; }) => {
     	       itemInfo.quantity+= item.quantity;
    		  });
  	    }
            quantity.innerText = itemInfo.quantity;
          }

          MtnCHK = sid;

        }
        let gametag = gametags.find((e: any) => e.sid === sid);
        if(gametag != null  && !gametag.active && gametag.game)
        {
          yourPoint++;
          lblPoint.innerText = yourPoint+ "/" + maxPoint;
          gametag.active = true;
          sdk.Mattertag.editIcon(tag.sid, 'checked');
          alert("Congratulation!")
        }
        HideHint();
      }
    })
    .catch(function () {});
}
let whichdirection: any;
let dir: any;
function callbackCameraMove(pose: { position: {x: number;y: number;z: number;};rotation: { x: number;y: number;};}): void {
    dir =getDegree(pose.rotation);
    const compassDisc = document.getElementById('compassDiscImg');
    compassDisc.style.transform = `rotate(${dir}deg)`;
    // compassDisc.style.webkitTransform = `rotate(${dir}deg)`;
    // compassDisc.style.MozTransform = `rotate(${dir}deg)`;
    if(dir<0){
      dir+= 360;
    }
          if(dir >= 337.5 || dir <22.5){
      whichdirection= "North"
    }else if(dir >= 22.5 && dir <67.5){
      whichdirection= "North-East"
    }else if(dir >= 67.5 && dir <112.5){
      whichdirection= "East"
    }else if(dir >= 112.5 && dir <157.5){
      whichdirection= "South-East"
    }else if(dir >= 157.5 && dir <202.5){
      whichdirection= "South"
    }else if(dir >= 202.5 && dir <247.5){
      whichdirection= "South-West"
    }else if(dir >= 247.5 && dir <292.5){
      whichdirection= "West"
    }else if(dir >= 292.5 && dir <337.5){
      whichdirection= "North-West"
    }
    const degree = parseFloat(dir).toFixed(1);
    
    document.getElementById("displaydegree").innerHTML= degree + "°";
    document.getElementById("displaydirection").innerHTML ="Direction: "+ whichdirection;
    console.log("degrees: " +dir,"\n", "direction:"+ whichdirection);
}

function getDegree(rotation: {x: number;y: number;}) : number
{ 
  // var dy = rotation.x;
  // var dx = rotation.y;
  // var theta = Math.atan2(dy, dx); // range (-PI, PI]
  // return theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  return rotation.y;
}

function AddTag(detail: {
  itemId: string;
  label: string;
  description: string;
  sid: string;
  anchorPosition: {
    x: Number;
    y: Number;
    z: Number;
  };
}) {
  if (mattertags.some((e) => e.label === detail.label))
    alert("This lable has existed in matterport");

  let mediatype = sdk.Mattertag.MediaType.NONE;
  if (mediaType.value === "NONE") mediatype = sdk.Mattertag.MediaType.NONE;
  else if (mediaType.value === "PHOTO")
    mediatype = sdk.Mattertag.MediaType.PHOTO;
  else if (mediaType.value === "PHOTO")
    mediatype = sdk.Mattertag.MediaType.VIDEO;
  else {
    detail.label = "";
    detail.description = "";
  }
  var tag = {
    anchorPosition: {
      x: Number(positionx.value),
      y: Number(positiony.value),
      z: Number(positionz.value),
    },
    stemVector: {
      x: 0,
      y: 0.3,
      z: 0,
    },
    color: {
      r: 0.0,
      g: 0.0,
      b: 1.0,
    },
  };

  console.log(mediatype + mediaUrl.value);
  sdk.Mattertag.add(tag).then(async function (mattertagIds: any) {
    sdk.Mattertag.editBillboard(mattertagIds[0], {
      label: detail.label,
      //description: detail.description,
      // media: {
      //   type: mediatype,
      //   src: mediaUrl.value,
      // },
    });
    detail.sid = mattertagIds[0];
    mattertags.push(detail);
    let itemInfo = allItems.find((e: any) => e.itemCode === detail.label);
    InjectHtmlToTag(detail.sid, itemInfo);
    alert("Add mattertag sucessfully!");
  });
}
btnAddTag.addEventListener("click", async function () {
  var mattertag = {
    itemId: itemadd.value,
    label: itemadd.selectedOptions[0].value,
    description: description.value,
    anchorPosition: {
      x: Number(positionx.value),
      y: Number(positiony.value),
      z: Number(positionz.value),
    },
    stemVector: {
      x: 0,
      y: 0.3,
      z: 0,
    },
    color: {
      r: 0.0,
      g: 0.0,
      b: 1.0,
    },
    sid: "",
  };
  AddTag(mattertag);
});
exampleModal.addEventListener("show.bs.modal", function (event: any) {
  $(".spinner-border").hide();
  $(".no-data").hide();
  var modalTitle = exampleModal.querySelector(".modal-title");
  modalTitle.textContent = "Search Equipment";
});
async function BindingItems() {
  var list = document.getElementById("allItems");
  while (list.firstChild != null) {
    list.removeChild(list.lastChild);
  }
  for (var i = 0; i < allItems.length; i++) {
    var opt = allItems[i];
    var option = document.createElement("option");
    option.text = opt["description"];
    option.value = opt["itemCode"];
    list.appendChild(option);
  }
}
async function BindingCategories() {
  var list = document.getElementById("categoryDropdown");
  while (list.firstChild != null) {
    list.removeChild(list.lastChild);
  }
  for (var i = 0; i < categories.length; i++) {
    var opt = categories[i];
    var option = document.createElement("option");
    option.text = opt["categoryCode"];
    option.value = opt["categoryId"];
    list.appendChild(option);
  }
}


btnSearchItem.addEventListener("click", async function () {
  $(".no-data").hide();
  var list = document.getElementById("list-item");
  while (list.firstChild != null) {
    list.removeChild(list.lastChild);
  }
  $(".spinner-border").show();
  let text = inputItem.value;
  let filter = ddlCategory.value.toUpperCase();
  if (text == null || text == undefined || text == "") {
    const response = await fetch(urlBase + "item/get-item-by-cateId/" + filter);
    items = await response.json();
  } else {
    const response = await fetch(
      urlBase +
        "item/get-item-by-name?categoryId=" +
        filter +
        "&itemName=" +
        text
    );
    items = await response.json();
  }
  if (items.length == 0) {
    $(".no-data").show();
    $(".spinner-border").hide();
    return;
  }
  for (var i = 0; i < items.length; i++) {
    var opt = items[i];
    var option = document.createElement("a");
    option.text = opt["description"];
    option.id = opt["itemCode"];
    option.className = "list-group-item list-group-item-action";
    list.appendChild(option);
  }
  $(".spinner-border").hide();
  $(".no-data").hide();
});
listItem.addEventListener("click", async function (e) {
  $(".list-group .list-group-item").removeClass("active");
  $(e.target).addClass("active");
});

btnSearchTag.addEventListener("click", async function () {
  var item = document.getElementsByClassName("list-group-item active");
  if (item == null || item == undefined) {
    alert("Please select item to search!");
    return;
  }
  let id = item[0].id;
  sdk.Mattertag.getData()
    .then(function (mattertags: any) {
      if (mattertags.length > 0) {
        let tag = mattertags.find((e: any) => e.label === id);
        if (tag != null) {
          document.getElementById("btn-close").click();
          sdk.Mattertag.navigateToTag(tag.sid, sdk.Mattertag.Transition.FLY);
	  let itemInfo = allItems.find((e: any) => e.itemCode === tag.label);
          InjectHtmlToTag(tag.sid, itemInfo);
        } else {
          alert("Can not find this item in model");
        }
        console.log(mattertags);
      }
    })
    .catch(function () {
      console.error("error to search");
    });
});

function InjectHtmlToTag(sid: string, itemInfo: any) {
  itemInfo.quantity = 0;
  if(itemInfo.itemStocks != null && itemInfo.itemStocks != undefined)
  {
    itemInfo.itemStocks.forEach((item: { quantity: any; }) => {
      itemInfo.quantity+= item.quantity;
    });
  }
    
  var htmlToInject =
    `
	<style>
    body {
   		background-color: rgba(0,0,0,.85);
    	margin: 0px;
	  }
  	.item-info {
      height: px;
      text-align: left;
      margin: 5px;
    }
    .item-info label{
      display:inline-block;
      color:#ffffff;
    }
    .item-info p{
      display:inline-block;
      color:#ffffff;
    }
    .item-info button{
      display:block;
      position:absolute;
      bottom: 2px;
      right:2px;
      width: 100px;
      height: 35px;
      border-radius:4px;
      background-color: #0d6efd;
    }
    .item-info img{
      background-color: transparent;
      width: 150;
      height: 100px;
    }
  </style>
  <div class="item-info">
        <label>Item code:</label>
        <p>` +
    itemInfo["itemCode"] +
    `</p></br>
        <label>Description:</label>
        <p>` +
    itemInfo["description"] +
    `</p></br>
        <label>Short description:</label>
        <p>` +
    itemInfo["shortDescription"] +
    `</p></br>
        <label>Quantity :</label>
        <p>` +
    itemInfo["quantity"] +
    `</p></br>
        <button id="btn` +
    itemInfo["itemCode"] +
    `">Click</button>
  </div>
      <script> 
      var btn1 = document.getElementById("btn` +
    itemInfo["itemCode"] +
    `"); 
      btn1.addEventListener("click", function () { 
        window.send("buttonClick", 1234); 
      }); 
      </script>
`;
  sdk.Mattertag.injectHTML(sid, htmlToInject, {
    size: {
      w: 300,
      h: 300,
    },
  }).then(function (messenger: any) {
    messenger.on("buttonClick", function (buttonId: string) {
      alert("Click to " + itemInfo["itemCode"] + " sucessfully");
    });
  });
}

function InitTagsForGame()
{
  gametags.forEach(tag => {
      let icon = colors[Math.floor(Math.random() * colors.length)]; 
      sdk.Mattertag.editIcon(tag.sid, icon);
      sdk.Mattertag.preventAction(tag.sid, {
        opening: true,
      });
      setTimeout( () => { sdk.Mattertag.editOpacity(tag.sid, 0); }, 1000 );
  });
}


let Mtnbad1:any,Mtnbad2:any;
tagTurnRed.addEventListener("click", async function() {

  clearInterval(Mtnbad1);
  clearInterval(Mtnbad2);
Mtnbad1=setInterval(blinking1,500);
});
function blinking1() {

  sdk.Mattertag.editColor(MtnCHK, {
    r: 100,
    g: 0,
    b: 0,
  });
  clearInterval(Mtnbad1);
  Mtnbad2 = setInterval(blinking2,500);

}
function blinking2() {
  sdk.Mattertag.editColor(MtnCHK, {
    r: 0.5,
    g: 0,
    b: 0,
  });
  clearInterval(Mtnbad2);
Mtnbad1=setInterval(blinking1,500);
}

tagTurnGreen.addEventListener("click", async function() {
  clearInterval(Mtnbad1);
  clearInterval(Mtnbad2);
  sdk.Mattertag.editColor(MtnCHK, {
    r: 0,
    g: 0.9,
    b: 0,
  });
});
function HideHint()
{
  gametags.forEach(tag => {
    if(!tag.active)
      sdk.Mattertag.editOpacity(tag.sid, 0); 
  });
}
btnHint.addEventListener("click", async function () {

  gametags.forEach(tag => {
    if(!tag.active)
      sdk.Mattertag.editOpacity(tag.sid, 1); 
  });
});
btnPlayGame.addEventListener("click", async function () {
    InitTagsForGame();
    divScore.style.display = "block";
    alert("welcome to Walkthrough Tutorial")
});


const express = require('express');
const makeportwork = express();
const port = process.env.PORT || 8001;
makeportwork.listen(port, () => {
  console.log("hope this works");
});
