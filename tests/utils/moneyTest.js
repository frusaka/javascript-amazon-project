import formatCurrency from "../../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
  it("Formats Currency", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("Displays 2 decimal places", () => {
    expect(formatCurrency(2090)).toEqual("20.90");
  });
  it("Works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  describe("rounding", () => {
    it("rounds up to the neearest cent", () => {
      expect(formatCurrency(2000.5)).toEqual("20.01");
    });
    it("rounds down to the neearest cent", () => {
      expect(formatCurrency(2000.4)).toEqual("20.00");
    });
  });
});
