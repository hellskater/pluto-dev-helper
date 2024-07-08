import CurrentTab from "@/components/popup/current-tab"
import PlutoAccessToken from "@/components/popup/pluto-access-token"
import { Toaster } from "sonner"

import "@/styles/index.css"

const PopupHome = () => {
  return (
    <div className="h-80 w-96 overflow-hidden p-5 text-base dark bg-background text-stone-100">
      <PlutoAccessToken />
      <CurrentTab />

      <Toaster />
    </div>
  )
}

export default PopupHome
