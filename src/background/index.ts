const COOKIE_REMOVE_CAUSES = ["expired_overwrite"]

chrome.cookies.onChanged.addListener((changeInfo) => {
  if (changeInfo.cookie.domain === "http://localhost") {
    if (
      changeInfo.removed &&
      changeInfo.cookie.name === "ext_token" &&
      COOKIE_REMOVE_CAUSES.includes(changeInfo.cause)
    ) {
      chrome.storage.local.remove("access_token")
    }
  }
})
