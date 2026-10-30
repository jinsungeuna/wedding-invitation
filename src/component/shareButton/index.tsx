import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
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
          const title = `${GROOM_FULLNAME} · ${BRIDE_FULLNAME} 드림`
          const text = "저희의 결혼을 축하해주신 모든 분께 진심으로 감사드립니다."

          if (navigator.share) {
            try {
              await navigator.share({ title, text, url: INVITATION_URL })
              return
            } catch (error) {
              if ((error as DOMException).name === "AbortError") return
            }
          }

          await navigator.clipboard.writeText(INVITATION_URL)
          window.alert("감사 인사 페이지 주소를 복사했습니다. 카카오톡에 붙여넣어 주세요.")
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
