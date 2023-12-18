import Image from 'next/image';
import profilePic from '../public/semo.svg';

function Semo() {
  return (
    <Image
      src={profilePic}
      alt="Picture of me"
      //   placeholder="blur" // Optional blur-up while loading
      className="floating"
    />
  );
}
export default Semo;
