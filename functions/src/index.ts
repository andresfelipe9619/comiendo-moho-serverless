/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from "firebase-functions";
import vision from "@google-cloud/vision";
import axios from "axios";

const SEARCH_ENGINE_ID = "e45f62f7fd8484b6f";
const API_KEY = "AIzaSyCdInoUIs0BWbv5xoIirS4vs4rlSU2x2g8";
const URL = "https://www.googleapis.com/customsearch/v1";

const client = new vision.ImageAnnotatorClient();

/**
 * @date 2022-05-04
 * @param {any} context:functions.https.CallableContext
 * @return {any}
 */
function isUnauthenticatedUser(context: functions.https.CallableContext): any {
  const { firebase } = context?.auth?.token || {};
  const isAnonymous = firebase?.sign_in_provider === "anonymous";
  const isUnverified = firebase?.email_verified === false;
  const isUnauthenticated = !context.auth || isAnonymous || isUnverified;
  return isUnauthenticated;
}

export const textDetection = functions.https.onCall(async (data, context) => {
  const isUnauthenticated = isUnauthenticatedUser(context);
  if (isUnauthenticated) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "textDetection must be called while authenticated."
    );
  }
  try {
    const [result] = await client.textDetection(JSON.parse(data));
    const detections = result.textAnnotations || [];
    console.log("Text:");
    detections.forEach((text: any) => console.log(text));
  } catch (e: any) {
    throw new functions.https.HttpsError("internal", e.message, e.details);
  }
});

export const universalProductCodeSearch = functions.https.onCall(
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
    } catch (e: any) {
      throw new functions.https.HttpsError("internal", e.message, e.details);
    }
  }
);

/**
 * @date 2022-05-04
 * @param {string} query
 * @return {Promise<any>}
 */
async function callGoogleSearch(query: string): Promise<any> {
  try {
    const response = await axios.get(
      `${URL}?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
