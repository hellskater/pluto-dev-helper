import { useEffect, useState } from "react"

type CopyFn = (text: string) => Promise<boolean>

export function useCopyToClipboard() {
  const [isCopySuccessful, setIsCopySuccessful] = useState<boolean>(false)

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported")
      setIsCopySuccessful(false)
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setIsCopySuccessful(true)
      return true
    } catch (error) {
      console.warn("Copy failed", error)
      setIsCopySuccessful(false)
      return false
    }
  }

  useEffect(() => {
    if (isCopySuccessful) {
      const timeoutId = setTimeout(() => {
        setIsCopySuccessful(false)
      }, 2000)
      return () => clearTimeout(timeoutId)
    }
  }, [isCopySuccessful])

  return { copyToClipboard: copy, hasCopied: isCopySuccessful }
}
