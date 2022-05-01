"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.annotateImage = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const functions = require("firebase-functions");
const vision_1 = require("@google-cloud/vision");
const client = new vision_1.default.ImageAnnotatorClient();
// This will allow only requests with an auth token to access the Vision
// API, including anonymous ones.
// It is highly recommended to limit access only to signed-in users. This may
// be done by adding the following condition to the if statement:
//    || context.auth.token?.firebase?.sign_in_provider === 'anonymous'
//
// For more fine-grained control, you may add additional failure checks, ie:
//    || context.auth.token?.firebase?.email_verified === false
// Also see: https://firebase.google.com/docs/auth/admin/custom-claims
exports.annotateImage = functions.https.onCall(async (data, context) => {
    var _a, _b;
    const { token } = (context === null || context === void 0 ? void 0 : context.auth) || {};
    const isAnonymous = ((_a = token === null || token === void 0 ? void 0 : token.firebase) === null || _a === void 0 ? void 0 : _a.sign_in_provider) === "anonymous";
    const isUnverified = ((_b = token === null || token === void 0 ? void 0 : token.firebase) === null || _b === void 0 ? void 0 : _b.email_verified) === false;
    const isUnauthenticated = !context.auth || isAnonymous || isUnverified;
    if (isUnauthenticated) {
        throw new functions.https.HttpsError("unauthenticated", "annotateImage must be called while authenticated.");
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
//# sourceMappingURL=index.js.map