function myFunction() {
    var x = document.getElementById("mymenu");
    if (x.className === "topnav") 
    {
        x.className += " responsive";
    } 
    else
    {
        x.className = "topnav";
    }
}