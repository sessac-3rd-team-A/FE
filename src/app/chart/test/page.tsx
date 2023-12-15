import Item from '@/component/test';
import './test.scss';
export default function test() {
  let str: string = '차트 페이지';
  let 상품: string[] = ['guitar', 'drum', 'bass', 'violin'];
  let 가격: Array<number> = [140, 500, 200, 1000];
  상품[3] = 'keyboard';
  // console.log(상품[3]);

  return (
    <div>
      <h2 className="ChartTitle"> 이 페이지는 {str}입니다.</h2>

      <InstrumentItem></InstrumentItem>
      <Item></Item>
      <div className="food">
        <h4>상품 3 $40</h4>
      </div>
      <div className="food">
        <h4>상품 4 $40</h4>
      </div>
    </div>
  );
}

function InstrumentItem() {
  return (
    <div className="food">
      <h4>상품 1 $40</h4>
    </div>
  );
}
