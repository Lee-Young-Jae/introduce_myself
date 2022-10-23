let statsPoint$ = document.querySelector(".statsPoint");
let PlusBtn$ = document.querySelector(".PlusBtn");

PlusBtn$.addEventListener("click", () => {
  console.log(statsPoint$.innerHTML);
  statsPoint$.innerHTML = parseInt(statsPoint$.innerHTML) + 1;
});
