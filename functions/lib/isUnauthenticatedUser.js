"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @date 2022-05-04
 * @param {any} context:functions.https.CallableContext
 * @return {boolean}
 */
function isUnauthenticatedUser(context) {
    var _a;
    const { firebase } = ((_a = context === null || context === void 0 ? void 0 : context.auth) === null || _a === void 0 ? void 0 : _a.token) || {};
    const isAnonymous = (firebase === null || firebase === void 0 ? void 0 : firebase.sign_in_provider) === "anonymous";
    const isUnverified = (firebase === null || firebase === void 0 ? void 0 : firebase.email_verified) === false;
    const isUnauthenticated = !context.auth || isAnonymous || isUnverified;
    return isUnauthenticated;
}
exports.default = isUnauthenticatedUser;
//# sourceMappingURL=isUnauthenticatedUser.js.map