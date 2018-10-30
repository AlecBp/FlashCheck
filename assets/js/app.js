function addItem(targetUl) {
   targetUl = document.getElementById(targetUl);
   newItem = document.getElementById('item_input_area').value;
   document.getElementById('item_input_area').value = "";
   if (newItem != "") {
      console.log(newItem);
      var newLi = document.createElement("li");
      newLi.setAttribute("class", "checklist-item");
      newLi.setAttribute("onclick", "setAsDone(this)");
      newLi.appendChild(document.createTextNode(newItem));
      targetUl.appendChild(newLi);
   }
}

function setAsDone(target) {
   target.setAttribute("class", "checklist-item-done");
   target.setAttribute("onclick", "setAsNotDone(this)");
}

function setAsNotDone(target) {
   target.setAttribute("class", "checklist-item");
   target.setAttribute("onclick", "setAsDone(this)");
}