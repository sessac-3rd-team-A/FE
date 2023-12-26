import '@/styles/profile/setting.scss';
import ProfileMenu from '@/containers/Profile/profileMenu';
import SettingForm from '@/containers/Profile/settingForm';
import { cookies } from 'next/headers'

export default async function MySettingPage() {
  const accessToken = cookies().get('accessToken').value;
  const refreshToken = cookies().get('refreshToken').value;

  return (
    <div className="setting-page-container">
      <section className="whiteGradientBg" />
      {/* <div className='header-temp'></div> */}
      <div className="setting-container">
        <div className="setting-form-container">
          <p>ACCOUNT</p>
          <SettingForm accessToken={accessToken} refreshToken={refreshToken}/>
        </div>
      </div>
      <ProfileMenu />
    </div>
  );
}
