window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.remove("before-loading");
  }, 2000);
});

document
  .querySelector(".loading")
  .addEventListener("transitionend", (event) => {
    document.body.removeChild(event.currentTarget);
  });
