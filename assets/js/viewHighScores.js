//Get info from localStorage and show the result on screen
var historyRecord = document.querySelector("#historyRecord");
for(var i =0; i < localStorage.length; i++){
    var list = document.createElement("li");   
    historyRecord.appendChild(list);
    var playerName = localStorage.key(i);
    var playerScore = localStorage.getItem(localStorage.key(i));
    if (playerName) {
        list.innerHTML = localStorage.key(i) +"    "+ "Score: "+localStorage.getItem(localStorage.key(i));
    }
}
//clear score function
var clearScoresEl = document.querySelector("#clear-scores");
clearScoresEl.addEventListener("click", function(event){
    event.preventDefault();
    localStorage.clear();
    historyRecord.innerHTML = "";
})
