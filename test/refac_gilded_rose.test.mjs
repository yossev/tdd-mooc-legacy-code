import { describe, test } from "vitest";
import { expect } from "chai";
import { GildedRose, Item } from "../src/GildedRose.mjs";

describe("Normal Item Tests", () => {
    test("Name does not change", () => {
        const items = [new Item("Normal Item", 10, 20)];
        const shop = new GildedRose(items);
        expect(items[0].name).to.equal("Normal Item")
    })

    test("Reduces quality by 1 for normal item with quality above 0", () => {
        const items = [new Item("Normal Item", 10, 20)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(19);
    }) 

    test("Does not reduce items below 0", () => {
        const items = [new Item("Normal Item", 10, 0)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(0);
    })

    test("quality decreased by 2 when sellIn < 0", () => {
        const items = [new Item("Normal Item", -1, 20)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(18);
    })
})

describe("Aged brie tests", () => {

    test("Aged brie quality increases by one before sellIn date", () => {
        const items = [new Item("Aged Brie", 10, 20)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(21);
    })

    test("Aged brie gets 2 INCREMENTS in quality as older that it gets, doubles when sellIn date is passed", () => {
        const items = [new Item("Aged Brie", -1, 20)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(22);
    })

    test("Aged brie quality never goes above 50 - when sellIn is passed", () => {
        const items = [new Item("Aged Brie", -1, 50)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(50);
    })

    test("Aged brie quality never goes above 50 - before sellIn is passed", () => {
        const items = [new Item("Aged Brie", 20, 50)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(50);
    })
})

describe("Sulfuras tests", () => {
    test("Sulfuras should never decrease in quality", () => {
        const items = [new Item("Sulfuras, Hand of Ragnaros", 20, 80)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(80);
    })
})

describe("Backstage passes tests", () => {
    test("Increases quality by 1 when sellIn > 10", () => {
        const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(21);
    });

    test("Increases quality by 1 when sellIn is exactly 11", () => {
        const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(21);
    });

    test("Increases quality by 2 when sellIn is 10 or less and more than 5", () => {
        const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(27);
    });

    test("Increases quality by 2 when sellIn is exactly 6", () => {
        const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(12);
    });

    test("Increases quality by 3 when sellIn is less than 6", () => {
        const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(13);
    });

    test("Quality drops to 0 after concert (sellIn <= 0)", () => {
        const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    test("Quality never exceeds 50", () => {
        const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(50);
    });
});

describe("Conjured item tests", () => {
    test("Conjured items degrade in quality twice as fast as normal items", () => {
        const items = [new Item("Conjured Mana Cake", 3, 6)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(4);
    });

    test("Conjured items degrade by 4 when sellIn < 0", () => {
        const items = [new Item("Conjured Mana Cake", -1, 6)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(2);
    });

    test("Conjured items quality never goes below 0", () => {
        const items = [new Item("Conjured Mana Cake", 0, 1)];
        const shop = new GildedRose(items);
        shop.updateQuality();
        expect(items[0].quality).to.equal(0);
    });
});

describe("General shop behavior", () => {
    test("Shop starts with empty item list", () => {
        const shop = new GildedRose([]);
        expect(shop.items.length).to.equal(0);
    });
});
