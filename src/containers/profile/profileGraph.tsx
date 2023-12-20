// PGraph.js
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { lineOptions } from '@/utils/chartOptions'; // 공통 옵션 가져오기

const today = Date.now();
const dayList = [];
for (let i = 0; i < 7; i++) {
  dayList.push(
    new Date(today - i * 1000 * 60 * 60 * 24)
      .toString()
      .split(' ')
      .slice(1, 3)
      .join(' '),
  );
}

const labels = dayList.reverse();

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      fill: 'start',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: 'rgb(255, 229, 99)',
      backgroundColor: 'rgba(255, 211, 99, 0.1)',
    },
  ],
};

export default function PGraph() {
  return (
    <div className="profile-graph">
      <div className="graph">
        <Line options={lineOptions} data={data} />
      </div>
      <div className="graphText">
        <p>MOOD</p>
        <p>GRAPH</p>
      </div>
      <span>WEEKLY</span>
    </div>
  );
}
