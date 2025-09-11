
class NormalItemStrategy extends ItemStrategy {
    // @override
    updateQualty(item) {
        item.sellIn--;
        if(item.sellIn < 0) {
            item.quality = Math.max(0, item.quality - 2);
        } else {
            item.quality = Math.max(0, item.quality - 1)
        }
    }
}