function w3_open() {
  document.getElementById("main").style.marginLeft = "23%";
  document.getElementById("mySidebar").style.width = "23%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = "none";
  sessionStorage.setItem("openSidebar", true);
}

function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  sessionStorage.setItem("openSidebar", false);
}

if (sessionStorage.getItem("openSidebar") === "true") {
  w3_open();
} else {
  w3_close();
}
