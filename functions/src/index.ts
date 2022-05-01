/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from "firebase-functions";
import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

// This will allow only requests with an auth token to access the Vision
// API, including anonymous ones.
// It is highly recommended to limit access only to signed-in users. This may
// be done by adding the following condition to the if statement:
//    || context.auth.token?.firebase?.sign_in_provider === 'anonymous'
//
// For more fine-grained control, you may add additional failure checks, ie:
//    || context.auth.token?.firebase?.email_verified === false
// Also see: https://firebase.google.com/docs/auth/admin/custom-claims
export const annotateImage = functions.https.onCall(async (data, context) => {
  const {token} = context?.auth || {};
  const isAnonymous = token?.firebase?.sign_in_provider === "anonymous";
  const isUnverified = token?.firebase?.email_verified === false;
  const isUnauthenticated = !context.auth || isAnonymous || isUnverified;

  if (isUnauthenticated) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "annotateImage must be called while authenticated."
    );
  }
  try {
    const [result] = await client.textDetection(JSON.parse(data));
    const detections = result.textAnnotations || [];
    console.log("Text:");
    detections.forEach((text: any) => console.log(text));
  } catch (e:any) {
    throw new functions.https.HttpsError("internal", e.message, e.details);
  }
});
