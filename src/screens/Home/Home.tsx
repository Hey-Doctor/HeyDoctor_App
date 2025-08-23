import { Image, View } from 'react-native';
import Home_Main from './Home_Main';
import Home_Sub from './Home_Sub';

import { NavButton } from '~/components/NavButton';

export default function Home() {
  return (<>
  <View className='flex-1 flex-col justify-center gap-4 p-7'>
    {/* 맨 위에 칸 */}
    <View className='w-[351px] h-[75px] p-4 flex-row items-center justify-between bg-[#F1FAF1] rounded-2xl'>
      <Image 
        source={require('~/assets/screens/HomeAssets/heyDoctorSmallLOGO1.png')} />

      <View className='flex-row gap-2 items-center'>
        <View className='w-[40px] h-[40px] rounded-full bg-[#82CD7B] flex items-center justify-center'>
          <Image 
            source={require('~/assets/screens/HomeAssets/customer1.png')} 
            className='w-[25px] h-[25px]' />
        </View>
        <Image 
        source={require('~/assets/screens/HomeAssets/alarmButton1.png')} />
      </View>
    </View>

      <Home_Main />
      <Home_Sub />

      <NavButton 
        destination='Pharmacy'
        className='w-[70px] h-[70px] absolute bottom-3 right-3'
        >
        <Image 
          source={require('~/assets/screens/HomeAssets/AIQuestionButton2.png')} 
          className='w-[70px] h-[70px]'/>
      </NavButton>

    </View>
    </>
  );
}