const solveMaze = maze => {
  let notifications = [];
  let mazeArr = maze.split("\n");
  let startPoint = { x: 0, y: 0 };
  let finalPoint = { x: 0, y: 0 };
  let numberOfStart = 0;
  let numberOfFinal = 0;

  for (let i = 0; i < mazeArr.length; i++) {
    if (mazeArr[i].indexOf("s") >= 0) {
      numberOfStart = numberOfStart + 1;
      startPoint.x = mazeArr[i].indexOf("s");
      startPoint.y = i;
    } else if (mazeArr[i].indexOf("f") >= 0) {
      numberOfFinal = numberOfFinal + 1;
      finalPoint.x = mazeArr[i].indexOf("f");
      finalPoint.y = i;
    }
  }

  if (numberOfFinal > 1) {
    notifications.push({
      status: "warning",
      message: "More than one start point founded"
    });
  }
  if (numberOfFinal === 0) {
    notifications.push({
      status: "error",
      message: "there is no starting point"
    });
  }

  if (numberOfStart > 1) {
    notifications.push({
      status: "warning",
      message: "More than one start point founded"
    });
  }
  if (numberOfStart === 0) {
    notifications.push({
      status: "error",
      message: "there is no starting point"
    });
  }

  const result = findRoute(mazeArr, startPoint, finalPoint);

  return { notifications, result };
};

const findRoute = (mazeArr, startPoint, finalPoint) => {
  let currentPosition = startPoint;
  let preReturnMode = false;
  let finDdirectionObj = {
    isReturnMode: false,
    directionObj: {}
  };
  while (!isFinal(currentPosition, finalPoint)) {
    finDdirectionObj = findDirection(
      mazeArr,
      currentPosition,
      finDdirectionObj.isReturnMode
    );
    if (!preReturnMode && finDdirectionObj.isReturnMode) {
      let rowStr = mazeArr[currentPosition.y];
      mazeArr[currentPosition.y] =
        rowStr.substr(0, currentPosition.x) +
        (parseInt(mazeArr[currentPosition.y].charAt(currentPosition.x)) + 1) +
        rowStr.substr(currentPosition.x + 1);
    }

    preReturnMode = finDdirectionObj.isReturnMode;

    currentPosition = finDdirectionObj.directionObj.position;

    let rowStr = mazeArr[currentPosition.y];
    mazeArr[currentPosition.y] =
      rowStr.substr(0, currentPosition.x) +
      (parseInt(finDdirectionObj.directionObj.value) + 1) +
      rowStr.substr(currentPosition.x + 1);
  }

  return mazeArr
    .toString()
    .replace(/,/g, "<br>")
    .replace(/ /g, 0)
    .replace(/#/g, "<strong style='color: blue'>#</strong>");
};

const isFinal = (currentPosition, finalPoint) => {
  return (
    currentPosition.x === finalPoint.x && currentPosition.y === finalPoint.y
  );
};

const findDirection = (mazeArr, currentPosition, returnMode) => {
  let isReturnMode = returnMode;

  let move = [
    canMove("top", mazeArr, currentPosition),
    canMove("down", mazeArr, currentPosition),
    canMove("right", mazeArr, currentPosition),
    canMove("left", mazeArr, currentPosition)
  ];

  let findMove = move.filter(item => item.direction !== "noMove");

  if (findMove.length === 1 && findMove[0].value !== 0) {
    isReturnMode = true;
  } else if (isReturnMode && findMove.length > 2) {
    isReturnMode = false;
  }

  if (findMove.length > 1) {
    let minValue = Math.min(...findMove.map(item => parseInt(item.value)));
    findMove = findMove.filter(item => parseInt(item.value) === minValue);
  }

  const randomDirection = Math.floor(Math.random() * findMove.length);

  return {
    isReturnMode: isReturnMode,
    directionObj: findMove[randomDirection]
  };
};

const canMove = (direction, mazeArr, currentPosition) => {
  let canMoveDirection = false;
  let mazeValue = "#";

  const moveDirectionObj = {
    top: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  const moveDirection = moveDirectionObj[direction];
  const mazePosition = {
    x: currentPosition.x + moveDirection.x,
    y: currentPosition.y + moveDirection.y
  };

  if (
    mazePosition.x >= 0 &&
    mazePosition.y >= 0 &&
    mazeArr.length >= mazePosition.y &&
    mazeArr[mazePosition.y] &&
    mazeArr[mazePosition.y].length >= mazePosition.x
  ) {
    mazeValue = mazeArr[mazePosition.y].charAt(mazePosition.x);
    canMoveDirection = mazeValue !== "#" && mazeValue !== "s";
  }

  return {
    position: mazePosition,
    value: mazeValue === " " || mazeValue === "f" ? 0 : mazeValue,
    direction: canMoveDirection ? direction : "noMove"
  };
};

export default solveMaze;
