import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

// 예식 날짜는 추억으로 남길 표지와 달력에 사용합니다.
export const WEDDING_DATE = dayjs.tz("2026-10-18 15:00", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = "YYYY년 MMMM D일 dddd"
export const HOLIDAYS: number[] = []

// 감사 페이지에 공개할 이름만 보관합니다.
export const BRIDE_FULLNAME = "전은아"
export const BRIDE_FIRSTNAME = "은아"
export const GROOM_FULLNAME = "김진성"
export const GROOM_FIRSTNAME = "진성"
