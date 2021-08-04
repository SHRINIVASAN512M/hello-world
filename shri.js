document.getElementById("myModal").addEventListener("click", function(event){
    event.preventDefault()});
  var modal = document.getElementById('tabu');
  
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  document.getElementById("v1").stepUp();


}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




var selectedRow = null;
var clickcount = 0;

function myfun() {
    
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    
}

function readFormData() {
    var formData = {clickcount};
    formData["id"] = document.getElementById("v1").value;
    formData["name"] = document.getElementById("v2").value;
    formData["gender"] = document.getElementById("v3").value;
  
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("tabu");
    var newRow = table.insertRow();
    cell1 = newRow.insertCell();
    cell1.innerHTML = data.id;
    cell2 = newRow.insertCell();
    cell2.innerHTML = data.name;
    cell3 = newRow.insertCell();
    cell3.innerHTML = data.gender;
    cell4 = newRow.insertCell();
    cell4.innerHTML = `<button id="button" onClick="onEdit(this)">Edit</button>
    <button id="button" onClick="onDelete(this)">Delete</button>`;
    localStorage.setItem(clickcount,JSON.stringify(data));
    clickcount++;

}

function resetForm() {
    document.getElementById("v1").value = "";
    document.getElementById("v2").value = "";
    document.getElementById("v3").value = "";
    selectedRow = null;
}

function onEdit(td){
	selectedRow = td.parentElement.parentElement;
	modal.style.display = "block";
    document.getElementById("v1").value = selectedRow.cells[0].innerHTML;
    document.getElementById("v2").value = selectedRow.cells[1].innerHTML;
    document.getElementById("v3").value = selectedRow.cells[2].innerHTML; 
	
}
		
		
	
function updateRecord(formData) {
     
    selectedRow.cells[0].innerHTML = formData.id;
    selectedRow.cells[1].innerHTML = formData.name;
    selectedRow.cells[2].innerHTML = formData.gender;
    row = selectedRow;
    var G = row.rowIndex; 
    localStorage.setItem(G, JSON.stringify(formData));
 
}

function onDelete(td) {
    if (confirm('R u sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        var r = row.rowIndex; 
        document.getElementById("tabu").deleteRow(r);   
        localStorage.removeItem(r);
        resetForm();
    }
}