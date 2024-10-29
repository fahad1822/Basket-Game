let basket = document.getElementById("basket");
let gameArea = document.getElementById("gameArea");
let score = 0;
let lives = 3;

// Move basket with arrow keys
document.addEventListener("keydown", (e) => {
  let basketLeft = basket.offsetLeft;
  if (e.key === "ArrowLeft" && basketLeft > 0) {
    basket.style.left = basketLeft - 20 + "px";
  } else if (
    e.key === "ArrowRight" &&
    basketLeft < gameArea.offsetWidth - basket.offsetWidth
  ) {
    basket.style.left = basketLeft + 20 + "px";
  }
});

// Function to create falling items
function createFallingItem() {
  let item = document.createElement("div");
  item.classList.add("falling-item");
  item.style.left = Math.random() * (gameArea.offsetWidth - 20) + "px";
  gameArea.appendChild(item);

  let fallInterval = setInterval(() => {
    item.style.top = item.offsetTop + 5 + "px";
    // Check if item is caught
    if (checkCollision(basket, item)) {
      score++;
      document.getElementById("score").innerText = "Score: " + score;
      item.remove();
      clearInterval(fallInterval);
    } else if (item.offsetTop > gameArea.offsetHeight) {
      // Lose life if missed
      lives--;
      document.getElementById("lives").innerText = "Lives: " + lives;
      item.remove();
      clearInterval(fallInterval);
      if (lives === 0) endGame();
    }
  }, 30);
}

// Collision detection
function checkCollision(basket, item) {
  let basketRect = basket.getBoundingClientRect();
  let itemRect = item.getBoundingClientRect();
  return !(
    itemRect.top > basketRect.bottom ||
    itemRect.bottom < basketRect.top ||
    itemRect.left > basketRect.right ||
    itemRect.right < basketRect.left
  );
}

// End Game function
function endGame() {
  alert("Game Over! Your Score: " + score);
  document.location.reload();
}

// Spawn items at intervals
setInterval(createFallingItem, 1000);
