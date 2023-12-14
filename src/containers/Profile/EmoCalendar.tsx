'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// 일기 작성 날짜 리스트
const dayList = [
  '2023-03-10',
  '2023-03-21',
  '2023-04-02',
  '2023-04-14',
  '2023-04-27',
];

export default function EmoCalendar() {
  const [value, onChange] = useState<Value>(new Date()); // 클릭한 날짜 (초기값으로 현재 날짜 넣어줌)

  // const monthOfActiveDate = moment(value).format('YYYY-MM');
  // const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

  // const getActiveMonth = (activeStartDate: moment.MomentInput) => {
  //   const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
  //   setActiveMonth(newActiveMonth);
  // };

  // 각 날짜 타일에 컨텐츠 추가
  const addContent = ({ date }: any) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];

    // date(각 날짜)가 리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (dayList.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
      contents.push(
        <>
          {/* <div className="dot"></div> */}
          {/* <Image
            src="emotion/good.svg"
            className="diaryImg"
            width="26"
            height="26"
            alt="today is..."
          /> */}
        </>,
      );
    }
    return <div>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
  };

  return (
    <>
      <Calendar
        locale="ko"
        onChange={onChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format('D')}
        tileContent={addContent}
        showNeighboringMonth={false}
        // onActiveStartDateChange={({ activeStartDate }) =>
        //   getActiveMonth(activeStartDate)
        // }
      />
    </>
  );
}
