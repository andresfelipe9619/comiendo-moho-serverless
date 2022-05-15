/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from "firebase-functions";
import isUnauthenticatedUser from "./isUnauthenticatedUser";
import axios from "axios";

const SEARCH_ENGINE_ID = "e45f62f7fd8484b6f";
const API_KEY = "AIzaSyCdInoUIs0BWbv5xoIirS4vs4rlSU2x2g8";
const URL = "https://www.googleapis.com/customsearch/v1";

/**
 * @docs https://developers.google.com/custom-search/v1/using_rest#response_data
 * @date 2022-05-04
 * @param {string} query
 * @return {Promise<any>}
 */
async function callGoogleSearch(query: string): Promise<any> {
  const response = await axios.get(
    `${URL}?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`
  );
  console.log(response.data);
  return response.data;
}

const universalProductCodeSearch = functions.https.onCall(
  async (data, context) => {
    const isUnauthenticated = isUnauthenticatedUser(context);
    if (isUnauthenticated) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "searchUPC must be called while authenticated."
      );
    }
    try {
      console.log("data", data);
      const result = await callGoogleSearch(`UPC%20${data}`);
      console.log("result", result);
      return result;
    } catch (e: any) {
      console.error(e);
      throw new functions.https.HttpsError("internal", e.message, e.details);
    }
  }
);

export default universalProductCodeSearch;
