export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class QualityStrategy {
    update(item) {
        throw new Error("This method should be overridden!");
    }
}

class NormalItemStrategy extends QualityStrategy {
    update(item) {
        if(item.sellIn < 0) {
            item.quality = Math.max(0, item.quality - 2);
        } else {
            item.quality = Math.max(0, item.quality - 1);
        }
    }
}

class AgedBrieStrategy extends QualityStrategy {
    update(item) {
        item.quality = Math.min(50, item.quality + 1);
    }
}

class SulfurasStrategy extends QualityStrategy {
    update(item) {
        // Sulfuras does not change
    }
}

class BackstagePassStrategy extends QualityStrategy {
    update(item) {
        if (item.sellIn <= 0) {
            item.quality = 0;
        } else if (item.sellIn <= 5) {
            item.quality = Math.min(50, item.quality + 3);
        } else if (item.sellIn <= 10) {
            item.quality = Math.min(50, item.quality + 2);
        } else {
            item.quality = Math.min(50, item.quality + 1);
        }
    }
}

class ConjuredItemStrategy extends QualityStrategy {
    update(item) {
        item.quality = Math.max(0, item.quality - 2);
    }
}

export class GildedRose {
    constructor(items = []) {
        this.items = items;
        this.strategies = {
            'Aged Brie': new AgedBrieStrategy(),
            'Sulfuras, Hand of Ragnaros': new SulfurasStrategy(),
            'Backstage passes to a TAFKAL80ETC concert': new BackstagePassStrategy(),
            'Conjured': new ConjuredItemStrategy(),
        };
    }

    updateQuality() {
        for (let item of this.items) {
            const strategy = this.strategies[item.name] || new NormalItemStrategy();
            strategy.update(item);
            item.sellIn--;
        }
    }
}
