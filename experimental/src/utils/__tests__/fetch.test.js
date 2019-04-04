import { endpoints } from "./../../config/constants";
import { isValidURL, getURL, fetchData } from "./../fetch";

const local = "http://127.0.0.1:8000/api";

const tested = {
  URL: `${local}/poems/`,
  URL2: `${local}/poems/1/`,
  brokenURL: `${local}/poems/undefined/`,
  brokenURL2: `${local}/poems/undefined/undefined/`,
  brokenURL3: "/undefinedundefined"
};

it("isValidURL passes fetch utils tests", () => {
  expect(isValidURL(tested.URL)).toBe(true);
  expect(isValidURL(tested.URL2)).toBe(true);

  expect(isValidURL(tested.brokenURL)).toBe(false);
  expect(isValidURL(tested.brokenURL2)).toBe(false);
  expect(isValidURL(tested.brokenURL3)).toBe(false);
});

it("getURL passes fetch utils tests", () => {
  expect(getURL("poems")).toEqual(tested.URL);
  expect(getURL("poem", { id: 1 })).toEqual(tested.URL2);

  expect(() => getURL("")).toThrow();
  expect(() => getURL("poms")).toThrow();
  expect(() => getURL("poem", { id: undefined })).toThrow();
});
 
