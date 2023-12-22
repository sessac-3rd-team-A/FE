import { Pie } from 'react-chartjs-2';
import { pieOptions } from '@/utils/chartOptions';

export const ratioData = {
  labels: ['Positive', 'Negative', 'Neutral'],
  datasets: [
    {
      label: ' 감정 지수',
      data: [17, 38, 45],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
      cutout: '75%',
    },
  ],
};

export default function PRatio() {
  return (
    <div className="profile-ratio">
      <div className="ratio">
        <Pie options={pieOptions} data={ratioData} />
      </div>
      <div className="ratioText">
        <p>MOOD</p>
        <p>RATIO</p>
      </div>
      <span>monthly</span>
    </div>
  );
}
