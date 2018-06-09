var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var FONT_GAP = 15;
var TEXT_HEIGHT = 20;
var BAR_HEIGHT = 150;
var barWidth = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP / 5, CLOUD_Y + GAP / 5, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP / 2, CLOUD_Y + GAP / 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP / 2, CLOUD_Y + GAP / 2 + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  names = ['Вы', 'Суши', 'Милка', 'Греко'];

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(Math.round(times[i]),
        CLOUD_X + GAP + i * (GAP + barWidth), CLOUD_Y + 1.2 * GAP + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime + 2 * FONT_GAP / 3);

    ctx.fillStyle = 'rgba(255, 0, 0, 1)';

    if (names[i] !== 'Вы') {
      // imagined formule for the BLUE in RGB
      ctx.fillStyle = 'rgba(0, 18, ' + Math.floor(255 - 40 * i) + ', ' + Math.round(Math.random()) + 0.2 + ')';
    }
    ctx.fillRect(CLOUD_X + GAP + i * (GAP + barWidth), CLOUD_Y + 1.2 * GAP + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime + FONT_GAP,
        barWidth, (BAR_HEIGHT * times[i]) / maxTime);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i],
        CLOUD_X + GAP + i * (GAP + barWidth), CLOUD_Y + 1.2 * GAP + FONT_GAP + BAR_HEIGHT + TEXT_HEIGHT);
  }
};
