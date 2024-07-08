import { Cookie, Trash } from "lucide-react"
import { toast } from "sonner"

import { Button } from "../ui/button"

const CurrentTab = () => {
  const clearLocalStorage = async () => {
    const activeTab = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    if (!activeTab[0] || !activeTab[0].id) {
      return
    }

    await chrome.scripting.executeScript({
      target: { tabId: activeTab[0].id },
      func: () => window.localStorage.clear()
    })

    toast.success("LocalStorage cleared", {
      id: "clear-localstorage",
      duration: 1000
    })

    chrome.tabs.reload(activeTab[0].id)
  }

  const clearCookies = async () => {
    const activeTab = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    if (!activeTab[0] || !activeTab[0].url || !activeTab[0].id) {
      return
    }

    const allCookies = await chrome.cookies.getAll({
      url: activeTab[0].url
    })

    allCookies.forEach(async (cookie) => {
      await chrome.cookies.remove({
        url: activeTab[0].url as string,
        name: cookie.name
      })
    })

    toast.success("Cookies cleared", {
      id: "clear-cookies",
      duration: 1000
    })

    chrome.tabs.reload(activeTab[0].id)
  }

  return (
    <div className="mt-10">
      <h1 className="font-semibold">Current Tab</h1>
      <div className="flex items-center gap-5 mt-3">
        <Button
          onClick={clearLocalStorage}
          variant="destructive"
          className="flex items-center gap-2 text-xs ">
          <Trash className="w-4 h-4" />
          <p>Clear LocalStorage</p>
        </Button>

        <Button
          variant="destructive"
          onClick={clearCookies}
          className="flex items-center gap-2 text-xs">
          <Cookie className="w-4 h-4" />
          <p>Clear Cookies</p>
        </Button>
      </div>
    </div>
  )
}

export default CurrentTab
