import { useEffect, useState, useRef } from "react"
import { useNaver } from "../store"
import nmapIcon from "../../icons/nmap-icon.png"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import {
  LOCATION,
  LOCATION_ADDRESS,
  PARKING_LOCATION,
  PARKING_POSITION,
  WEDDING_HALL_POSITION,
} from "../../const"
import { NAVER_MAP_CLIENT_ID } from "../../env"

/**
 * 지도를 표시하고 길찾기 앱(네이버, 카카오, 티맵) 연동 기능을 제공하는 컴포넌트입니다.
 *
 * @returns {JSX.Element} 지도 컴포넌트
 */
export const Map = () => {
  // 네이버 지도 클라이언트 ID가 설정되어 있을 때만 지도를 렌더링합니다.
  return NAVER_MAP_CLIENT_ID ? <NaverMap /> : <NaverMapLink />
}

const NaverMapLink = () => (
  <div className="navigation navigation-link-list">
    <button
      onClick={() => {
        window.open(
          "https://map.naver.com/p/search/" +
            encodeURIComponent(LOCATION + " " + LOCATION_ADDRESS),
          "_blank",
        )
      }}
    >
      <img src={nmapIcon} alt="naver-map-icon" />
      네이버 지도에서 보기
    </button>
    <button
      onClick={() => {
        window.open(
          `https://map.kakao.com/link/map/${encodeURIComponent(
            LOCATION,
          )},${WEDDING_HALL_POSITION[1]},${WEDDING_HALL_POSITION[0]}`,
          "_blank",
        )
      }}
    >
      <img src={knaviIcon} alt="kakao-map-icon" />
      카카오맵에서 보기
    </button>
    <button
      onClick={() => {
        const params = new URLSearchParams({
          goalx: PARKING_POSITION[0].toString(),
          goaly: PARKING_POSITION[1].toString(),
          goalname: PARKING_LOCATION,
        })

        if (checkDevice() === "other") {
          alert("티맵 길찾기는 모바일에서 확인하실 수 있습니다.")
          return
        }

        window.open(`tmap://route?${params.toString()}`, "_self")
      }}
    >
      <img src={tmapIcon} alt="t-map-icon" />
      티맵 주차장 길찾기
    </button>
  </div>
)

/**
 * 사용자 기기 종류(iOS, Android 등)를 확인합니다.
 */
const checkDevice = () => {
  const userAgent = window.navigator.userAgent
  if (userAgent.match(/(iPhone|iPod|iPad)/)) {
    return "ios"
  } else if (userAgent.match(/(Android)/)) {
    return "android"
  } else {
    return "other"
  }
}

/**
 * 네이버 지도를 실제로 렌더링하는 내부 컴포넌트입니다.
 */
const NaverMap = () => {
  const naver = useNaver()
  const ref = useRef<HTMLDivElement>(null)

  // 모바일에서 스크롤 중 지도가 조작되는 것을 방지하기 위한 잠금 상태
  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef<number | null>(null)

  useEffect(() => {
    // 네이버 지도 SDK가 로드되면 지도를 초기화합니다.
    if (naver) {
      const map = new naver.maps.Map(ref.current, {
        center: new naver.maps.LatLng(
          WEDDING_HALL_POSITION[1],
          WEDDING_HALL_POSITION[0],
        ),
        zoom: 17,
      })

      // 마커 추가
      new naver.maps.Marker({
        position: new naver.maps.LatLng(
          WEDDING_HALL_POSITION[1],
          WEDDING_HALL_POSITION[0],
        ),
        map,
      })

      return () => {
        map.destroy()
      }
    }
  }, [naver])

  return (
    <>
      <div className="map-wrapper">
        {/* 잠금 상태일 때 오버레이 표시 */}
        {locked && (
          <div
            className="lock"
            onTouchStart={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current !== null) {
                clearTimeout(lockMessageTimeout.current)
              }
              lockMessageTimeout.current = window.setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
            onMouseDown={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current !== null) {
                clearTimeout(lockMessageTimeout.current)
              }
              lockMessageTimeout.current = window.setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
          >
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> 자물쇠 버튼을 눌러
                <br />
                터치 잠금 해제 후 확대 및 이동해 주세요.
              </div>
            )}
          </div>
        )}

        {/* 잠금 해제 버튼 */}
        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            if (lockMessageTimeout.current !== null) {
              clearTimeout(lockMessageTimeout.current)
            }
            setShowLockMessage(false)
            setLocked((locked) => !locked)
          }}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>

        {/* 지도가 렌더링될 실제 요소 */}
        <div className="map-inner" ref={ref}></div>
      </div>

      {/* 내비게이션 앱 연결 버튼 모음 */}
      <div className="navigation">
        {/* 네이버 지도 연동 */}
        <button
          onClick={() => {
            window.open(
              `https://map.naver.com/p/search/${encodeURIComponent(LOCATION)}`,
              "_blank",
            )
          }}
        >
          <img src={nmapIcon} alt="naver-map-icon" />
          네이버 지도
        </button>

        {/* 카카오맵 연동 */}
        <button
          onClick={() => {
            window.open(
              `https://map.kakao.com/link/map/${encodeURIComponent(
                LOCATION,
              )},${WEDDING_HALL_POSITION[1]},${WEDDING_HALL_POSITION[0]}`,
              "_blank",
            )
          }}
        >
          <img src={knaviIcon} alt="kakao-map-icon" />
          카카오맵
        </button>

        {/* 티맵 연동 */}
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android": {
                const params = new URLSearchParams({
                  goalx: PARKING_POSITION[0].toString(),
                  goaly: PARKING_POSITION[1].toString(),
                  goalname: PARKING_LOCATION,
                })
                window.open(`tmap://route?${params.toString()}`, "_self")
                break
              }
              default: {
                alert("모바일에서 확인하실 수 있습니다.")
                break
              }
            }
          }}
        >
          <img src={tmapIcon} alt="t-map-icon" />
          티맵 주차장
        </button>
      </div>
    </>
  )
}
