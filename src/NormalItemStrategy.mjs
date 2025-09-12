import ItemStrategy from "./ItemStrategy.mjs";
export default class NormalItemStrategy extends ItemStrategy {
  // @override
  updateQuality(item) {
    item.sellIn--;
    if (item.sellIn < 0) {
      item.quality = Math.max(0, item.quality - 2);
    } else {
      item.quality = Math.max(0, item.quality - 1);
    }
  }
}
