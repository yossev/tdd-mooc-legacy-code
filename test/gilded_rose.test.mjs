import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
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
});
