/* 다이어리 구현 */

const now = new Date();

const $diaryList = document.querySelector(".diaryList");
const $diarySubmitBtn = document.querySelector(".diaryForm button");

/* 임시로 데이터 추가 */
// localStorage.setItem(
//   "diaryList",
//   JSON.stringify([
//     { id: 1, title: "test", content: "help!" },
//     { id: 2, title: "test2", content: "help!" },
//   ])
// );

// 다이어리 목록 불러오기
let diaryList = JSON.parse(localStorage.getItem("diaryList"));
let tempDiaryItem;

const loadDiary = () => {
  if (diaryList !== null) {
    const tempDiaryList = [...diaryList].reverse();
    tempDiaryList.map((item) => {
      tempDiaryItem = document.createElement("li");
      tempDiaryItem.innerHTML = `<div class='diaryItem'>${item.title} <div class='diaryItemContentWrapper' style='display: none'><p class='diaryItemContent'>${item.content}</p><button class='diaryRemoveBtn diaryRemoveBtn${item.id}'>삭제하기</button></div></div>`;
      $diaryList.appendChild(tempDiaryItem);
    });
  }
};
loadDiary();

// 다이어리 작성
$diarySubmitBtn.addEventListener("click", (event) => {
  let id, title, content;
  event.preventDefault();

  if (diaryList?.length) {
    id = diaryList[diaryList.length - 1].id + 1;
  } else {
    id = 1;
    diaryList = new Array();
  }
  title = `${now.getFullYear()}년 ${
    now.getMonth() + 1
  }월 ${now.getDate()}일의 일기`;
  content = document.querySelector(".diaryForm textarea").value;

  diaryList.push({ id, title, content });
  localStorage.setItem("diaryList", JSON.stringify(diaryList));
  location.reload();
});

// 다이어리 삭제
const diaryRemoveBtnList = document.querySelectorAll(".diaryRemoveBtn");

const removeDiary = (event) => {
  const id = parseInt(event.target.className.replace(/[^0-9]/g, ""));
  diaryList = diaryList.filter((e) => {
    return e.id !== id;
  });
  localStorage.setItem("diaryList", JSON.stringify(diaryList));
  location.reload();
};

Array.from(diaryRemoveBtnList).map((e) => {
  e.addEventListener("click", removeDiary);
});

// 숨겨진 다이어리 펼치기/접기
const $diaryItem = document.querySelectorAll(".diaryItem");
Array.from($diaryItem).map((e) =>
  e.addEventListener("click", (event) => {
    let target = event.target.querySelector(".diaryItemContentWrapper");
    if (target.style.display === "block") {
      target.style.display = "none";
    } else {
      target.style.display = "block";
    }
  })
);

const $diaryItemContentWrapper = document.querySelector(
  ".diaryItemContentWrapper"
);

$diaryItemContentWrapper.addEventListener("click", (event) => {
  console.log(event);
  event.target.style.display = "inline-block";
});
