let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
// getting the array from the local storage 
let setItems = JSON.parse(localStorage.getItem("myLeads"))
if (setItems) {
myLeads = setItems
renderLeads(myLeads)
}


//Adding event listener to save input button
inputBtn.addEventListener("click",()=>{
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    console.log(myLeads)
    renderLeads(myLeads)
})

//renderleads function to render out the output 
function renderLeads(name){
let listItems = ''
    for(let i = 0; i < name.length; i++){
      listItems += `
      <li>
      <a target='_blank' href = '${name[i]}'>
      ${name[i]}
      </a>`
    }
ulEl.innerHTML = listItems;
}

// adding event listener to delete button
deleteBtn.addEventListener("click",function(){
    myLeads = [];
    localStorage.clear();
    ulEl.innerHTML= "";
})

//addding event listener to save tab 
tabBtn.addEventListener("click",()=>{
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderLeads(myLeads)
});
})