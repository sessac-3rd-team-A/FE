import '@/styles/profile/setting.scss';
import ProfileMenu from '@/containers/Profile/profileMenu';
import SettingForm from '@/containers/Profile/settingForm';

export default function MySettingPage() {
  return (
    <div className="setting-page-container">
      <section className="whiteGradientBg" />
      {/* <div className='header-temp'></div> */}
      <div className="setting-container">
        <div className="setting-form-container">
          <p>ACCOUNT</p>
          <SettingForm />
        </div>
      </div>
      <ProfileMenu />
    </div>
  );
}
