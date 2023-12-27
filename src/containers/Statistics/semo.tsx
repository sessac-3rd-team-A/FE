import Image from 'next/image';
import profilePic from '../../../public/statistics/semo.svg';
import '../../styles/statistics/semo.scss';

function Semo() {
  return (
    <Image
      src={profilePic}
      alt="Picture of me"
      //   placeholder="blur" // Optional blur-up while loading
      className="semo-floating"
    />
  );
}
export default Semo;
