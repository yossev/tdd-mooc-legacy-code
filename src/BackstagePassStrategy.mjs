export default class BackstagePassStrategy extends ItemStrategy {
  updateQuality(item) {
    item.sellIn--;
    if (item.sellIn > 10) {
      item.quality = Math.max(50, item.quality + 1);
    }
  }
}
