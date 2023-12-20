import Image from 'next/image';
import profilePic from '../../public/trend/semo.svg';
import '../../src/styles/trend/semo.scss';

function Semo() {
  return (
    <Image
      src={profilePic}
      alt="Picture of me"
      //   placeholder="blur" // Optional blur-up while loading
      className="semoFloating"
    />
  );
}
export default Semo;
