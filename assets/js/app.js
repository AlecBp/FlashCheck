var targetUl;
var outerParentOfTargetUl;
var listCardIdentifier = ".list-container";
var inputID = "item_input_area";


// Need an array with all list names that will be vinculated with hardcoded key

onPageLoad();


// exampleSaveLoadData();
function exampleSaveLoadData() {
   // create array
   var myArray = ["val1", "val2", "val3"];
   // save the data of this array vinculated with "testList" key
   saveData("testList", myArray);
   // loadDataAsArray return an array, that is all the data that is vinculated with the key "testList"
   var data = loadDataAsArray("testList");
   // Print the entire data array
   console.log(data);
   // Print item by item inside the data array
   for (c = 0; c < data.length; c++) {
      console.log(data[c]);
   }
}

function onPageLoad() {
   // In future load a predefined array that contains all the lists, 
   // therefore you can load the content of each list
   targetUl = document.getElementsByClassName("items-list")[0];
   var listName = "My_List";
   data = loadDataAsArray(listName);
   dataState = loadDataAsArray(listName + "_state")
   for (item = 0; item < data.length; item++) {
      var newLi = document.createElement("li");
      newLi.setAttribute("class", dataState[item]);
      newLi.setAttribute("onclick", "setAsDone(this)");
      newLi.appendChild(document.createTextNode(data[item]));
      targetUl.appendChild(newLi);
   }
}

function saveData(listName, fullArrayData) {
   localStorage.setItem(listName, JSON.stringify(fullArrayData));
}

function loadDataAsArray(listName) {
   var data = JSON.parse(localStorage.getItem(listName))
   return data;
}

function loopAndSaveList(self) {
   // get parent (global Var), get all children and then save all
   outerParentOfTargetUl = self.closest(listCardIdentifier);
   var listName = outerParentOfTargetUl.getElementsByClassName("card-header")[0].innerHTML;
   listName = listName.replace(" ", "_");
   var parent = self.parentElement;
   var liArray = parent.childNodes;
   var dataArray = [];
   var dataArrayState = [];
   for (li = 0; li < liArray.length; li++) {
      dataArray.push(liArray[li].innerHTML);
      dataArrayState.push(liArray[li].className);
      // console.log("Item number: " + li + " - value:" + liArray[li].className);
   }
   saveData(listName, dataArray);
   saveData(listName + "_state", dataArrayState);
}

function clearData() {
   saveData("My_List", []);
   saveData("My_List_state", []);
   document.location.reload(true);
}

function spawnListener() {
   var listener = document.getElementById(inputID);
   listener.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
         addItem("list1");
      }
   })
}

// Look for parent with card class or id that starts with list-
function newTarget(self) {
   outerParentOfTargetUl = self.closest(listCardIdentifier);
   targetUl = outerParentOfTargetUl.getElementsByClassName("items-list")[0];
}

function addItem() {
   newItem = document.getElementById(inputID).value;
   document.getElementById('item_input_area').value = "";
   if (newItem != "") {
      var newLi = document.createElement("li");
      newLi.setAttribute("class", "checklist-item");
      newLi.setAttribute("onclick", "setAsDone(this)");
      newLi.appendChild(document.createTextNode(newItem));
      targetUl.appendChild(newLi);
   }
   // Save all items to localStorage
   var listName = outerParentOfTargetUl.getElementsByClassName("card-header")[0].innerHTML;
   listName = listName.replace(" ", "_");
   var liArray = targetUl.getElementsByTagName("li");
   var dataArray = [];
   var dataArrayState = [];
   for (li = 0; li < liArray.length; li++) {
      dataArray.push(liArray[li].innerHTML);
      dataArrayState.push(liArray[li].className);
      // console.log("Item number: " + li + " - value:" + liArray[li].innerHTML);
      // console.log("Item number: " + li + " - value:" + liArray[li].className);
   }
   saveData(listName, dataArray);
   saveData(listName + "_state", dataArrayState);
}

function setAsDone(self) {
   self.setAttribute("class", "checklist-item-done");
   self.setAttribute("onclick", "setAsNotDone(this)");
   loopAndSaveList(self);
}

function setAsNotDone(self) {
   self.setAttribute("class", "checklist-item");
   self.setAttribute("onclick", "setAsDone(this)");
   loopAndSaveList(self);
}