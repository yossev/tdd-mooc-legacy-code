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
    expect(items[0].quality).to.equal(0)
  })

  test("does not reduce items below 0", () => {
    const gildedRose = new Shop([new Item("Normal item", 0, 1)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  })

  test("quality decreased by 2 when sellIn < 0", () => {
    const gildedRose = new Shop([new Item("Normal item", 0, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(8);
  })
});

describe("Aged Brie", () => {

  test("Aged brie quality increases by 1 before SellIn date", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 2)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(3);
  })

  test("Aged brie gets twice in quality as older that it gets, doubles when sellIn date is passed", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 2)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(4);
  })

  test("Aged brie cant go above 50", () =>{
        const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  })
})
