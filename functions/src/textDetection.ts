/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from "firebase-functions";
import isUnauthenticatedUser from "./isUnauthenticatedUser";
import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

// DOCS: https://googleapis.dev/nodejs/vision/latest/v1.ImageAnnotatorClient.html#textDetection
const textDetection = functions.https.onCall(async (data, context) => {
  const isUnauthenticated = isUnauthenticatedUser(context);
  if (isUnauthenticated) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "textDetection must be called while authenticated."
    );
  }
  try {
    const [result] = await client.textDetection(generateBody(data.image));
    const detections = result.textAnnotations || [];
    console.log("Text:");
    detections.forEach((text: any) => console.log(text));
    return result;
  } catch (e: any) {
    throw new functions.https.HttpsError("internal", e.message, e.details);
  }
});

/**
 * @date 2022-05-04
 * @param {string} image
 * @return {object}
 */
function generateBody(image: string): object {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: "TEXT_DETECTION", // we will use this API for text detection purposes.
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
}

export default textDetection;
