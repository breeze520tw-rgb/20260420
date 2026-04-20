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
  
  // 設定文字對齊，讓數值顯示在 20x20 區塊的中央
  pg.textAlign(CENTER, CENTER);
}

function draw() {
  background('#e7c6ff');

  // 計算影像寬高 (畫布寬高的 60%)
  let vWidth = width * 0.6;
  let vHeight = height * 0.6;

  // 在 pg (Graphics) 上繪製內容
  pg.clear(); // 清除背景，使 pg 變透明

  // 讀取攝影機像素
  capture.loadPixels();

  if (capture.pixels.length > 0) {
    let step = 20; // 設定單位大小為 20x20
    pg.textSize(8);
    pg.fill(255);

    for (let y = 0; y < pg.height; y += step) {
      for (let x = 0; x < pg.width; x += step) {
        // 將 pg 的座標映射回攝影機原始影像的座標
        let imgX = floor(map(x, 0, pg.width, 0, capture.width));
        let imgY = floor(map(y, 0, pg.height, 0, capture.height));
        
        // 取得該像素在 pixels 陣列中的索引 (RGBA)
        let index = (imgX + imgY * capture.width) * 4;
        let r = capture.pixels[index];
        let g = capture.pixels[index + 1];
        let b = capture.pixels[index + 2];
        
        let avg = floor((r + g + b) / 3);

        // 在該單位位置顯示平均值
        pg.text(avg, x + step / 2, y + step / 2);
      }
    }
  }

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
