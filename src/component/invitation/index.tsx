import { BRIDE_FULLNAME, GROOM_FULLNAME } from "../../const"
import { LazyDiv } from "../lazyDiv"

/** 결혼식에 마음을 보내주신 모든 분께 전하는 감사 인사입니다. */
export const Invitation = () => (
  <LazyDiv className="card invitation">
    <h2 className="english">Thank You</h2>
    <p className="content">
      저희 두 사람의 새로운 시작에<br />
      따뜻한 마음을 보내주신 모든 분께<br />
      진심으로 감사드립니다.
    </p>
    <p className="content">
      결혼식 당일, 쏟아지는 폭우 속에서도<br />
      귀한 걸음을 해주신 분들,<br />
      옷이 흠뻑 젖는 불편함을 겪으면서도<br />
      곁에서 축하해주신 분들께<br />
      특별히 깊은 감사의 마음을 전합니다.
    </p>
    <p className="content">
      궂은 날씨에 저희를 만나러 오시다가<br />
      끝내 발길을 돌리셔야 했던 분들께도<br />
      꼭 감사하다는 말씀을 드리고 싶습니다.<br />
      저희를 위해 나서주셨던 그 마음까지<br />
      오래도록 소중히 간직하겠습니다.
    </p>
    <p className="content">
      함께하지 못했지만 멀리서<br />
      축하와 응원을 보내주신 분들께도<br />
      진심으로 감사드립니다.
    </p>
    <p className="content">
      여러분이 보내주신 사랑 덕분에<br />
      비가 쏟아지던 그날이 저희에게는<br />
      더없이 따뜻한 날로 남았습니다.
    </p>
    <p className="content">
      그날의 고마움을 잊지 않고,<br />
      서로를 아끼고 배려하며<br />
      행복하게 살아가겠습니다.
    </p>
    <p className="content">
      늘 건강하시고, 여러분의 일상에도<br />
      따뜻한 행복이 가득하길 바랍니다.
    </p>
    <div className="break" />
    <div className="name">{GROOM_FULLNAME} · {BRIDE_FULLNAME} 드림</div>
  </LazyDiv>
)
