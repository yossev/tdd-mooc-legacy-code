// I decided to use the strategy design pattern
// to get rid of the if pyramid of doom in the
// original code.

class ItemStrategy {
  updateQuality(item) {
    throw new Error("this method should be overriden");
  }
}
