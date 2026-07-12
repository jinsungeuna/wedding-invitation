import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

/**
 * 오시는 길 정보를 표시하는 컴포넌트입니다.
 * 지도와 대중교통, 자가용 이용 방법을 안내합니다.
 *
 * @returns {JSX.Element} 오시는 길 섹션
 */
export const Location = () => {
  return (
    <>
      {/* 지도 및 주소 섹션 */}
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>

      {/* 대중교통 및 자가용 안내 섹션 */}
      <LazyDiv className="card location">
        {/* 대중교통 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철로 오시는 경우
            <br />
            지하철 1호선 <b>구로역 2번·3번 출구</b>
            <br />
            도보 3분
          </div>
          <div />
          <div className="content">
            * 버스로 오시는 경우
            <br />
            <b>구로기계공구상가 17-146</b>
            <br />
            지선 5630, 6516, 6613 / 간선 571, 654
            <br />
            마을버스 구로09, 양천04
            <br />
            <br />
            <b>구로기계공구상가 17-147</b>
            <br />
            지선 5630, 6613 / 간선 571, 654
            <br />
            <br />
            <b>구로역 17-154</b>
            <br />
            지선 5615, 5714, 6512
          </div>
        </div>

        {/* 자가용 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">주차 안내</div>
          <div />
          <div className="content">
            서울 구로구 경인로 565 삼영빌딩 및
            <br />
            인근 구로기계공구상가 주차장을 이용해 주세요.
            <br />
            <br />
            예식 참석 하객 대상 주차 등록은
            <br />
            식장(2층) 안내데스크 및 로비에서
            <br />
            사전 등록할 수 있습니다.
          </div>
          <div />
          <div className="content" />
        </div>
      </LazyDiv>
    </>
  )
}
