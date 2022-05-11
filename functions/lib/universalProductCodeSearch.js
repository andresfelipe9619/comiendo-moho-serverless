"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const functions = require("firebase-functions");
const isUnauthenticatedUser_1 = require("./isUnauthenticatedUser");
const axios_1 = require("axios");
const SEARCH_ENGINE_ID = "e45f62f7fd8484b6f";
const API_KEY = "AIzaSyCdInoUIs0BWbv5xoIirS4vs4rlSU2x2g8";
const URL = "https://www.googleapis.com/customsearch/v1";
/**
 * @docs https://developers.google.com/custom-search/v1/using_rest#response_data
 * @date 2022-05-04
 * @param {string} query
 * @return {Promise<any>}
 */
async function callGoogleSearch(query) {
    const response = await axios_1.default.get(`${URL}?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`);
    console.log(response.data);
    return response.data;
}
const universalProductCodeSearch = functions.https.onCall(async (data, context) => {
    const isUnauthenticated = (0, isUnauthenticatedUser_1.default)(context);
    if (isUnauthenticated) {
        throw new functions.https.HttpsError("unauthenticated", "searchUPC must be called while authenticated.");
    }
    try {
        console.log("data", data);
        const result = await callGoogleSearch(`UPC%20${data}`);
        console.log("result", result);
        return result;
    }
    catch (e) {
        console.error(e);
        throw new functions.https.HttpsError("internal", e.message, e.details);
    }
});
exports.default = universalProductCodeSearch;
//# sourceMappingURL=universalProductCodeSearch.js.map