const $clock = document.querySelector("h1.clock");

const getClock = () => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const now = `${hours}:${minutes}:${seconds}`;
  $clock.innerText = now;
};

getClock();

setInterval(getClock, 1000);
