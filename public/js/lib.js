function w3_open() {
  document.getElementById("main").style.marginLeft = "23%";
  document.getElementById("mySidebar").style.width = "23%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = "none";
  localStorage.setItem("openSidebar", true);
}

function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  localStorage.setItem("openSidebar", false);
}

if (localStorage.getItem("openSidebar") === "true") {
  w3_open();
} else {
  w3_close();
}
