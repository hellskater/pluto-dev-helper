import { useCopyToClipboard } from "@/lib/hooks/useCopyToClipboard"
import { Check, Copy } from "lucide-react"
import React, { useEffect, useState } from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

const PlutoAccessToken = () => {
  const [accessToken, setAccessToken] = useState("")
  const { copyToClipboard, hasCopied } = useCopyToClipboard()

  useEffect(() => {
    const setToken = async () => {
      const cookie = await chrome.cookies.get({
        url: "http://localhost:3000",
        name: "ext_token"
      })

      if (cookie) {
        setAccessToken(cookie.value)
        return
      }

      const tabs = await chrome.tabs.query({
        url: "http://localhost:3000/*"
      })

      if (tabs.length === 0) {
        return
      }

      const targetTab = tabs[0]

      if (!targetTab || !targetTab.id) {
        return
      }

      const resp = await chrome.scripting.executeScript({
        target: { tabId: targetTab.id },
        func: () => window.localStorage.getItem("access_token")
      })

      if (resp[0] && resp[0].result) {
        setAccessToken(resp[0].result)
      }
    }

    setToken()
  }, [])

  return (
    <div>
      <h1 className="font-semibold">Pluto Access Token (localhost:3000)</h1>
      {accessToken ? (
        <>
          <div className="mt-3">
            <Input className="font-mono" value={accessToken} disabled />
          </div>
          <Button
            onClick={() => {
              copyToClipboard(accessToken)
            }}
            className="flex items-center gap-2 mt-3 text-xs">
            {hasCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}

            <p>Copy to clipboard</p>
          </Button>
        </>
      ) : (
        <div className="text-orange-500 mt-3">
          Cannot find access token. You are probably not logged in.
        </div>
      )}
    </div>
  )
}

export default PlutoAccessToken
