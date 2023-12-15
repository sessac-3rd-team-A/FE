'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { GrCaretNext } from 'react-icons/gr';
import { GrCaretPrevious } from 'react-icons/gr';
import '@/styles/profile/calendar.scss';
import Image from 'next/image';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// 일기 작성 날짜 리스트 -> 여기에 데이터 들어오면 될듯
const dayList = [
  '2023-12-15',
  '2023-12-14',
  '2023-12-13',
  '2023-12-12',
  '2023-12-11',
];

export default function EmoCalendar() {
  const [value, onChange] = useState<Value>(new Date()); // 클릭한 날짜 (초기값으로 현재 날짜 넣어줌)

  // const monthOfActiveDate = moment(value).format('YYYY-MM');
  // const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

  // const getActiveMonth = (activeStartDate: moment.MomentInput) => {
  //   const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
  //   setActiveMonth(newActiveMonth);
  // };

  // console.log('변경된 날짜 :: ', value);

  // 각 날짜 타일에 컨텐츠 추가
  const addContent = ({ date }: any) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    let content;

    // date(각 날짜)가 리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (dayList.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
      // contents.push(
      //   <>
      //     {/* <div className="dot"></div> */}
      //     {/* <Image
      //       src="emotion/good.svg"
      //       className="diaryImg"
      //       width="26"
      //       height="26"
      //       alt="diary is..."
      //     /> */}
      //     🥲
      //   </>,
      // );
      content = '🥲';
    }
    return <div>{content}</div>; // 각 날짜마다 해당 요소가 들어감
  };

  return (
    <>
      <Calendar
        locale="en"
        onChange={(value, event) => {
          // alert(`New date is : ${value}`);
          // console.log(event);
          onChange(value);
        }}
        value={value}
        nextLabel={<GrCaretNext />}
        prevLabel={<GrCaretPrevious />}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format('D')}
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        tileContent={addContent}
        showNeighboringMonth={false}
        onActiveStartDateChange={({ activeStartDate }) =>
          // getActiveMonth(activeStartDate)
          alert(`next, prev 눌러서 설정된 시작 일자 : ${activeStartDate}`)
        }
      />
    </>
  );
}
