let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 取得攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏預設的 DOM 影片元件，只在畫布上繪製
  capture.hide();
}

function draw() {
  background('#e7c6ff');

  // 計算影像寬高 (畫布寬高的 60%)
  let vWidth = width * 0.6;
  let vHeight = height * 0.6;

  // 計算置中位置
  let x = (width - vWidth) / 2;
  let y = (height - vHeight) / 2;

  push();
  // 將座標系統移動到畫布右側，並水平翻轉 (scale -1)
  translate(width, 0);
  scale(-1, 1);

  // 繪製影像到畫布上，此時座標系統已翻轉，影像會呈現鏡像效果
  image(capture, x, y, vWidth, vHeight);
  pop();
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布尺寸
  resizeCanvas(windowWidth, windowHeight);
}
