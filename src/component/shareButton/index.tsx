import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"

const INVITATION_URL = "https://jinsungeuna.github.io/wedding-invitation/"

/**
 * 카카오톡으로 초대장을 공유할 수 있는 버튼 컴포넌트입니다.
 *
 * @returns {JSX.Element} 공유 버튼 섹션
 */
export const ShareButton = () => {
  return (
    <LazyDiv className="footer share-button">
      <button
        className="ktalk-share"
        onClick={async () => {
          const title = `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`
          const text = WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION

          if (navigator.share) {
            try {
              await navigator.share({ title, text, url: INVITATION_URL })
              return
            } catch (error) {
              if ((error as DOMException).name === "AbortError") return
            }
          }

          await navigator.clipboard.writeText(INVITATION_URL)
          window.alert("청첩장 주소를 복사했습니다. 카카오톡에 붙여넣어 주세요.")
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
