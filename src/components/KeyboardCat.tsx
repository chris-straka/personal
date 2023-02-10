import { useStore } from "@nanostores/preact"
import { isLeftPaw } from "../store"
import { CatLeft, CatRight } from "./svg"

interface KeyboardCatProps {
  className: string
}

function KeyboardCat({
  className
}: KeyboardCatProps) {
  const $isLeftPaw = useStore(isLeftPaw)
  return $isLeftPaw ? <CatLeft className={className} /> : <CatRight className={className} />
}

export default KeyboardCat