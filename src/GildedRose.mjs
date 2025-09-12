
import Item from './Item.mjs';

export default class GildedRose {
constructor(items = []) {
    this.items = items;
}

updateQuality() {
    for(let item of this.items){
        const strategy = this.getStrategy(item);
        strategy.updateQuality();
    }
    
}

getStrategy(item) {
    switch(item.name){
        case "Sulfuras, Hand of Ragnaros":
            return new SulfurasStrategy();
        case "Aged Brie":
            return new AgedBrieStrategy();
        case "Backstage passes to a TAFKAL80ETC concert:":
            return new BackstagePassStrategy();
        default:
            return new NormalItemStrategy();
    }
}

}