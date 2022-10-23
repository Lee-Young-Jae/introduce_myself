// const $title = document.createElement("h1");
const $table = document.createElement("table");
const $result = document.createElement("div");
const $tictactoeGameForm = document.querySelector(".tictactoeGameForm");
const $replayGameBtn = document.createElement("button");

$result.textContent = "당신의 턴입니다! 시작하시려면 빈 셀을 눌러주세요.";
$result.id = "result";
const rows = [];
let turn = "⭕";

//// 승부 판단하기 ////
const checkWinner = (target) => {
  let rowIndex = target.parentNode.rowIndex;
  let cellIndex = target.cellIndex;

  // 세 칸 다 채워졌나?
  let hasWinner = 0; //0 : 기본, 1 : 승리, 2 : 패배, -1 : 에러
  // 가로줄 검사
  if (
    rows[0][0].textContent &&
    rows[0][1].textContent &&
    rows[0][2].textContent &&
    rows[1][0].textContent &&
    rows[1][1].textContent &&
    rows[1][2].textContent &&
    rows[2][0].textContent &&
    rows[2][1].textContent &&
    rows[2][2].textContent
  ) {
    hasWinner = 2;
  }
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = 1;
  }
  // 세로줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = 1;
  }
  // 대각선 검사
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = 1;
  }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = 1;
  }
  return hasWinner;
};

const checkWinnerAndDraw = (target) => {
  const hasWinner = checkWinner(target);

  // 승자가 있으면
  if (hasWinner == 1) {
    $result.textContent =
      turn === "⭕" ? `가볍게 승리 하셨네요!` : `패배 하였습니다...`;
    $replayGameBtn.addEventListener("click", () => {
      location.reload();
    });
    $replayGameBtn.textContent =
      turn === "⭕"
        ? `또 한번 이겨 볼까요? (클릭!)`
        : `다시 도전해서 이겨 보세요 (클릭!)`;
    $table.removeEventListener("click", checkTurnCallback);
    $tictactoeGameForm.appendChild($replayGameBtn);
    return;
  }
  // 승자가 없으면 (무승부)
  const draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    $result.textContent = "힘든 승부였네요 무승부 입니다!";
    $replayGameBtn.textContent = `다음에는 쉽게 이길 꺼예요 (클릭!)`;
    $replayGameBtn.addEventListener("click", () => {
      location.reload();
    });
    $tictactoeGameForm.appendChild($replayGameBtn);
    $table.removeEventListener("click", checkTurnCallback);

    return;
  }
  // 턴 바꾸기
  turn = turn === "❌" ? "⭕" : "❌";
  $result.textContent = "당신의 차례입니다.";
};

const checkTurnCallback = (event) => {
  if (event.target.textContent !== "") {
    // 칸이 이미 채워져 있는가?
    return;
  }
  // 빈칸이면
  event.target.textContent = turn;
  checkWinnerAndDraw(event.target);

  if (turn === "❌") {
    $result.textContent = "컴퓨터의 차례입니다.";
    $table.removeEventListener("click", checkTurnCallback);
    setTimeout(() => {
      const emptyCells = rows.flat().filter((v) => !v.textContent);
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.textContent = "❌";
      checkWinnerAndDraw(randomCell);
      $table.addEventListener("click", checkTurnCallback);
    }, Math.floor(Math.random() * 500) + 500);
  }
};

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement("tr");
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement("td");
    cells.push($td);
    // $td.style.cssText =
    //   "border: 1px solid black;width: 55px;height: 55px;text-align: center;";
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}
$table.addEventListener("click", checkTurnCallback);
/// rows 드리블

// $tictactoeGameForm.append($title);
$tictactoeGameForm.append($table);
$tictactoeGameForm.append($result);
