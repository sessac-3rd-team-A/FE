'use client';
import { useRecoilState } from 'recoil'; // recoil
import { userState } from '@/utils/state'; // recoil
import ReactFullpage, { fullpageOptions } from '@fullpage/react-fullpage';
import { useEffect, useState } from 'react'; // recoil
import '@/styles/main.scss';
import Main1 from './main1';
import Main2 from './main2';

interface Section {
  text: string;
  id?: number;
}

export default function MainPage() {
  const [user, setUser] = useRecoilState(userState); // recoil
  const [fullpages, setFullpages] = useState<Section[]>([
    {
      text: 'Section 1',
    },
    {
      text: 'Section 2',
    },
  ]);
  const onLeave = (origin: any, destination: any, direction: any) => {
    // console.log('onLeave', { origin, destination, direction });
  };
  // const handleAddSection = () => {
  //   setFullpages((prevFullpages) => [
  //     ...prevFullpages,
  //     {
  //       text: `section ${prevFullpages.length + 1}`,
  //       id: Math.random(),
  //     },
  //   ]);
  // };
  const pluginWrapper = () => {
    /*
     * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
     */
  };
  type Credits = {
    enabled?: boolean;
    label?: string;
    position?: 'left' | 'right';
  };
  const credits: Credits = {
    enabled: false,
    label: '',
    position: 'left',
  };
  return (
    <ReactFullpage
      licenseKey={'OPEN-SOURCE-GPLV3-LICENSE'}
      navigation
      onLeave={onLeave}
      // sectionsColor={sectionsColor}
      pluginWrapper={pluginWrapper}
      debug={false}
      credits={credits}
      render={(comp: any) => (
        <ReactFullpage.Wrapper>
          {fullpages.map(({ text }) => (
            <div key={text} className="section">
              {text == 'Section 1' ? <Main1 /> : <Main2 />}
            </div>
          ))}
        </ReactFullpage.Wrapper>
      )}
    />
  );
}
