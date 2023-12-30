import Image from 'next/image';
import profilePic from '../../../public/statistics/semo.svg';
import '../../styles/statistics/semo.scss';

function Semo() {
  return (
    <Image src={profilePic} alt="Picture of me" className="semo-floating" />
  );
}
export default Semo;
