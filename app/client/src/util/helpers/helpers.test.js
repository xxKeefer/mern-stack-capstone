import { parseLabelData, abbreviateTitle } from "./recordCardHelpers";
import { getDate } from "./newsHelpers";

describe("RecordCard Helpers", () => {
  it("should return nothing if the labels array is empty", () => {
    const labelsEmpty = [];
    expect(parseLabelData(labelsEmpty)).toBe("");
  });
  it("should return the label name if there is a label", () => {
    const labels = [{ name: "labelName" }];
    expect(parseLabelData(labels)).toBe("labelName");
  });
  it("should return title if title is less than maximum length", () => {
    const titleShort = "shortTitle";
    const length = 17;
    expect(abbreviateTitle(titleShort, length)).toBe("shortTitle");
  });
  it("should return title characters up to length followed by '...' if title is longer than length", () => {
    const titleLong = "thisIsALongTestTitle";
    const length = 15;
    expect(abbreviateTitle(titleLong, length)).toBe("thisIsALongTest...");
  });
});

describe("News Helpers", () => {
  it("should return formatted date when passed mongoDB created_at date format", () => {
    const mongoDate = "2021-01-18T05:45:48.864Z";
    expect(getDate(mongoDate)).toBe("18-01-2021");
  });
});
