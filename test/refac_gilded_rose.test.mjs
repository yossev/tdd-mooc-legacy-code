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