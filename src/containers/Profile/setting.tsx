import Image from 'next/image';
import profile_background2 from '/public/images/profile_background2.svg';
import '@/styles/profile/setting.scss';
import ProfileMenu from './profileMenu';

export default function MySettingPage() {
  return (
    <div className='setting-page-container'>
      <div className='setting-container'>
        <div className='header-temp'/>
        <div className='setting-form-container'>
          <form>
            
          </form>
        </div>
      </div>
      {/* <section className='whiteGradientBg' /> */}
      <ProfileMenu />
    </div>
  )
}