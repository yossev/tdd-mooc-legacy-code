import { describe, test } from "vitest";
import { expect } from "chai";
import { GildedRose, Item } from "../src/GildedRose.mjs";

describe("Normal Item Tests", () => {
    test("Name does not change", () => {
        const shop = new GildedRose([new Item("Normal Item", 1, 1)]);
        const items = shop.updateQuality();
        expect(items[0].name).to.equal("Normal Item")
    })
})