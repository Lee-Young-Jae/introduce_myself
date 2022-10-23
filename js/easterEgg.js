const $javaScriptDiv = document.querySelector(".ee");

let i = 0;
$javaScriptDiv.addEventListener("click", (e) => {
  i += 300;
  $javaScriptDiv.style.transform = `scale(${i}%)`;
  if (i > 1500) {
    location.href = "./EE.html";
  }
});
