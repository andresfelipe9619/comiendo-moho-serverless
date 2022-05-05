import * as functions from "firebase-functions";

/**
 * @date 2022-05-04
 * @param {any} context:functions.https.CallableContext
 * @return {boolean}
 */
function isUnauthenticatedUser(
  context: functions.https.CallableContext
): boolean {
  const { firebase } = context?.auth?.token || {};
  const isAnonymous = firebase?.sign_in_provider === "anonymous";
  const isUnverified = firebase?.email_verified === false;
  const isUnauthenticated = !context.auth || isAnonymous || isUnverified;
  return isUnauthenticated;
}

export default isUnauthenticatedUser;
