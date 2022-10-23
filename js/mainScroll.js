// 스크롤 값에 따라 나타나는 텍스트

const $sectionMain1 = document.querySelector(".section-main-1");

const scrollLoop = () => {
  console.log(window.scrollY);
  let circle = document.createElement("div");
  circle.width = `${window.screenY}px`;
  circle.height = `${window.screenY}px`;
  circle.style.background = "red";
  circle.style.position = "sticky";
  circle.style.top = "100px";
  circle.innerText = "HelloWorld";
  $sectionMain1.append(circle);
};

window.addEventListener("scroll", () => {
  // scrollLoop();
});
