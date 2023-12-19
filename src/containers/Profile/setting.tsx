import Image from 'next/image';
import profile_background2 from '/public/images/profile_background2.svg';
import '@/styles/profile/setting.scss';
import ProfileMenu from './profileMenu';
import { useForm } from "react-hook-form";

export default function MySettingPage() {
  return (
    <div className='setting-page-container'>
      <div className='setting-container'>
        <div className='header-temp'/>
        <div className='setting-form-container'>
          <p>ACCOUNT</p>
          <form>
            <input id='id' type='text' placeholder='사용자 아이디'/>
            <select id='age' onChange={}>
              <option value="10대">10 대</option>
              <option value="20대">20 대</option>
              <option value="20대">20 대</option>
              <option value="20대">20 대</option>
              <option value="50대">50 대 이상</option>
            </select>
            <select id='gender' onChange={}>
              <option value="female">여자</option>
              <option value="male">남자</option>
            </select>
            <button type='submit'>SUBMIT</button>
          </form>
        </div>
      </div>
      {/* <section className='whiteGradientBg' /> */}
      <ProfileMenu />
    </div>
  )
}