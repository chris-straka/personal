import { CatLeftUpSvg } from "./svg"
import { CatRightUpSvg } from "./svg"

type Props = {
  showLeftPaw: boolean
}
export const BongoCat = ({ showLeftPaw }: Props) => {
  return (
    <>
      {showLeftPaw ? <CatLeftUpSvg /> : <CatRightUpSvg />}
    </>
  )
}