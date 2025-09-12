class AgedBrieStrategy extends ItemStrategy {
  updateQuality(item) {
    item.sellIn--;
    if (item.sellIn > 0) {
      item.quality = Math.min(50, item.quality + 1);
    } else {
      item.quality = Math.min(50, item.quality * 2);
    }
  }
}
