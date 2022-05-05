"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const functions = require("firebase-functions");
const isUnauthenticatedUser_1 = require("./isUnauthenticatedUser");
const vision_1 = require("@google-cloud/vision");
const client = new vision_1.default.ImageAnnotatorClient();
// DOCS: https://googleapis.dev/nodejs/vision/latest/v1.ImageAnnotatorClient.html#textDetection
const textDetection = functions.https.onCall(async (data, context) => {
    const isUnauthenticated = (0, isUnauthenticatedUser_1.default)(context);
    if (isUnauthenticated) {
        throw new functions.https.HttpsError("unauthenticated", "textDetection must be called while authenticated.");
    }
    try {
        const [result] = await client.textDetection(generateBody(data.image));
        const detections = result.textAnnotations || [];
        console.log("Text:");
        detections.forEach((text) => console.log(text));
    }
    catch (e) {
        throw new functions.https.HttpsError("internal", e.message, e.details);
    }
});
/**
 * @date 2022-05-04
 * @param {string} image
 * @return {object}
 */
function generateBody(image) {
    const body = {
        requests: [
            {
                image: {
                    content: image,
                },
                features: [
                    {
                        type: "TEXT_DETECTION",
                        maxResults: 1,
                    },
                ],
            },
        ],
    };
    return body;
}
exports.default = textDetection;
//# sourceMappingURL=textDetection.js.map