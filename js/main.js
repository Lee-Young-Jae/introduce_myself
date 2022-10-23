/* 야간모드 구현 */

const $bodyWrapper = document.querySelector(".bodyWrapper");
const $nightModToggleBtn = document.querySelector(".nightModToggleBtn");
const $menu = document.querySelector(".menu");

// localStorage에서 nightMode를 확인 후 true라면 야간모드 적용
if (localStorage.getItem("nightMod") === "true") {
  $bodyWrapper.style.color = "white";
  $bodyWrapper.style.background = "black";
  $nightModToggleBtn.innerText = "🌚";
  $menu.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  $menu.style.color = "black";
}

$nightModToggleBtn.addEventListener("click", () => {
  // 이미 야간모드라면 야간모드 해제
  if (localStorage.getItem("nightMod") === "true") {
    // console.log("야간모드 해제!", localStorage.getItem("nightMod"));
    $bodyWrapper.style.color = "black";
    $bodyWrapper.style.background = " rgba(199, 234, 255, 0.445)";
    $nightModToggleBtn.innerText = "🌞";
    localStorage.setItem("nightMod", false);
    $menu.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  }
  // 야간모드가 아니라면 야간모드로 설정
  else {
    // console.log("야간모드 설정!", localStorage.getItem("nightMod"));
    $bodyWrapper.style.color = "white";
    $bodyWrapper.style.background = "black";
    $nightModToggleBtn.innerText = "🌚";
    localStorage.setItem("nightMod", true);
    $menu.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  }
});
