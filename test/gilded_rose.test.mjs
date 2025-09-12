import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose - Normal Item", () => {
  test("foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  test("reduces quality by 1 for normal item with quality above 0", () => {
    const gildedRose = new Shop([new Item("foo", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  test("does not reduce items below 0", () => {
    const gildedRose = new Shop([new Item("Normal item", 5, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  test("quality decreased by 2 when sellIn < 0", () => {
    const gildedRose = new Shop([new Item("Normal item", -1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(8);
  });
});

describe("Aged Brie", () => {
  test("Aged brie quality increases by 1 before SellIn date", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 2)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(3);
  });

  test("Aged brie gets twice in quality as older that it gets, doubles when sellIn date is passed", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 2)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(4);
  });

  test("Aged brie cant go above 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });
});

describe("Sulfuras", () => {
  test("Sulfuras never decreases in quality", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 1)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(1);
  });

  test("Sulfuras never has to be sold", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(1);
  });

  test("Sulfuras does not decrease in quality even when sellIn < 0", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 80)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80); // would fail if mutation let it degrade
  });
});

describe("Backstage passes", () => {
  test("increases quality by 1 when sellIn > 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(21);
  });

  test("Backstage passes increase quality by 2 when sellIn is exactly 11? no, should still be +1", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(21); // not 22
  });

  test("increases quality by 2 when sellIn is 10 or less and more than 5", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(27);
  });

  test("increases quality by 3 when sellIn is in less than 6", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(13);
  });

  test("increases quality by 2 when sellIn is exactly 6", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(12);
  });

  test("quality drops to 0 after the concert (sellIn <= 0)", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  test("quality never exceeds 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });
});

describe("general shop", () => {
  test("shop starts with empty items", () => {
    const gildedRose = new Shop();
    expect(gildedRose.items.length).to.equal(0);
  });
});
