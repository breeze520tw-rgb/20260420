let capture;
let pg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 取得攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏預設的 DOM 影片元件，只在畫布上繪製
  capture.hide();

  // 產生一個與視訊顯示寬高相同的內容層
  pg = createGraphics(width * 0.6, height * 0.6);
}

function draw() {
  background('#e7c6ff');

  // 計算影像寬高 (畫布寬高的 60%)
  let vWidth = width * 0.6;
  let vHeight = height * 0.6;

  // 在 pg (Graphics) 上繪製內容
  pg.clear(); // 清除背景，使 pg 變透明
  pg.fill(255, 255, 0);
  pg.noStroke();
  pg.ellipse(pg.width / 2, pg.height / 2, 50); // 在視訊中央畫一個黃色圓點
  pg.fill(255);
  pg.textSize(20);
  pg.text("Graphics Overlay", 20, 40);

  // 計算置中位置
  let x = (width - vWidth) / 2;
  let y = (height - vHeight) / 2;

  push();
  // 將座標系統移動到畫布右側，並水平翻轉 (scale -1)
  translate(width, 0);
  scale(-1, 1);

  // 繪製影像到畫布上，此時座標系統已翻轉，影像會呈現鏡像效果
  image(capture, x, y, vWidth, vHeight);

  // 將 pg 繪製在視訊畫面的上方，同樣受到鏡像翻轉影響
  image(pg, x, y, vWidth, vHeight);
  pop();
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布尺寸
  resizeCanvas(windowWidth, windowHeight);
  // 同步調整 Graphics 層的大小
  pg.resizeCanvas(windowWidth * 0.6, windowHeight * 0.6);
}
