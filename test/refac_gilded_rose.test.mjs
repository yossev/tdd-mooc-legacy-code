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