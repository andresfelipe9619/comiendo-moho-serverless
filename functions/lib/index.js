"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.universalProductCodeSearch = exports.textDetection = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const functions = require("firebase-functions");
const vision_1 = require("@google-cloud/vision");
const axios_1 = require("axios");
const SEARCH_ENGINE_ID = "e45f62f7fd8484b6f";
const API_KEY = "AIzaSyCdInoUIs0BWbv5xoIirS4vs4rlSU2x2g8";
const URL = "https://www.googleapis.com/customsearch/v1";
const client = new vision_1.default.ImageAnnotatorClient();
/**
 * @date 2022-05-04
 * @param {any} context:functions.https.CallableContext
 * @return {any}
 */
function isUnauthenticatedUser(context) {
    var _a;
    const { firebase } = ((_a = context === null || context === void 0 ? void 0 : context.auth) === null || _a === void 0 ? void 0 : _a.token) || {};
    const isAnonymous = (firebase === null || firebase === void 0 ? void 0 : firebase.sign_in_provider) === "anonymous";
    const isUnverified = (firebase === null || firebase === void 0 ? void 0 : firebase.email_verified) === false;
    const isUnauthenticated = !context.auth || isAnonymous || isUnverified;
    return isUnauthenticated;
}
exports.textDetection = functions.https.onCall(async (data, context) => {
    const isUnauthenticated = isUnauthenticatedUser(context);
    if (isUnauthenticated) {
        throw new functions.https.HttpsError("unauthenticated", "textDetection must be called while authenticated.");
    }
    try {
        const [result] = await client.textDetection(JSON.parse(data));
        const detections = result.textAnnotations || [];
        console.log("Text:");
        detections.forEach((text) => console.log(text));
    }
    catch (e) {
        throw new functions.https.HttpsError("internal", e.message, e.details);
    }
});
exports.universalProductCodeSearch = functions.https.onCall(async (data, context) => {
    const isUnauthenticated = isUnauthenticatedUser(context);
    if (isUnauthenticated) {
        throw new functions.https.HttpsError("unauthenticated", "searchUPC must be called while authenticated.");
    }
    try {
        console.log("data", data);
        const result = await callGoogleSearch(`UPC%20${data}`);
        console.log("result", result);
    }
    catch (e) {
        throw new functions.https.HttpsError("internal", e.message, e.details);
    }
});
/**
 * @date 2022-05-04
 * @param {string} query
 * @return {Promise<any>}
 */
async function callGoogleSearch(query) {
    try {
        const response = await axios_1.default.get(`${URL}?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=index.js.map