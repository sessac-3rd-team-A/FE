'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { GrCaretNext } from 'react-icons/gr';
import { GrCaretPrevious } from 'react-icons/gr';
import '@/styles/profile/_calendar.scss';
// import Image from 'next/image';

interface Props {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalDate: Dispatch<SetStateAction<string>>;
  emoData: object;
}

export default function EmoCalendar({
  setModalDate,
  setIsModalOpen,
  emoData,
}: Props) {
  const [value, onChange] = useState<Date>(new Date()); // 클릭한 날짜 (초기값으로 현재 날짜 넣어줌)

  // const monthOfActiveDate = moment(value).format('YYYY-MM');
  // const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

  // const getActiveMonth = (activeStartDate: moment.MomentInput) => {
  //   const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
  //   setActiveMonth(newActiveMonth);
  // };

  // console.log('변경된 날짜 :: ', value);

  const dayList = Object.keys(emoData);

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
          // onChange(value);
          if (
            dayList.find(
              (day) =>
                day ===
                moment(value as moment.MomentInput).format('YYYY-MM-DD'),
            )
          ) {
            setIsModalOpen(true);
            setModalDate(
              moment(value as moment.MomentInput).format('YYYY-MM-DD'),
            );
          }
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
        onActiveStartDateChange={
          ({ activeStartDate }) =>
            // getActiveMonth(activeStartDate)
            console.log('하이')
          // alert(`next, prev 눌러서 설정된 시작 일자 : ${activeStartDate}`)
        }
      />
    </>
  );
}
