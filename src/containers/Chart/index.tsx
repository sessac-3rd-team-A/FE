import MyLineChart from '@/component/trendLineChart';

export default function ChartPage() {
  let str: string = '이재욱';
  let arr;
  return (
    <div>
      <h2 className="ChartTitle"> 이 페이지는 차트입니다{str}.</h2>
      <div className="food">
        <h4>상품 1 $40</h4>
        <MyLineChart></MyLineChart>
      </div>
    </div>
  );
}
