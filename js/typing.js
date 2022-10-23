const content =
  " Hello, I'm YoungJae,   \n 웹프로그래밍 텀프로젝트   #3   \n JavaScript 프로젝트 입니다!!                    ";
let contentArr = Array.from(content);

const $text = document.querySelector(".typingText");

let i = 0;
let isReachTheEnd = false;
const typing = () => {
  if (isReachTheEnd) {
    let text = contentArr.slice(0, i).join("");
    console.log(text);
    text = text.replaceAll("\n", "</br>");
    $text.innerHTML = text;
    i--;
    if ($text.innerHTML.length <= 0) isReachTheEnd = false;
  } else {
    $text.innerHTML += contentArr[i++] === "\n" ? "</br>" : contentArr[i];
    if ($text.innerHTML.length >= contentArr.length) isReachTheEnd = true;
  }
};

setInterval(typing, 100);
