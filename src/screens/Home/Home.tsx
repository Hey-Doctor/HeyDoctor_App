import { Image, View } from 'react-native';
import Home_Main from './Home_Main';
import Home_Sub from './Home_Sub';
import Home_Header from './Home_Header';
import { NavButton } from '~/components/NavButton';

export default function Home() {
  return (<>
  <View className='flex-1 flex-col justify-center gap-4 p-7'>

      <Home_Header/>

      <Home_Main />
      <Home_Sub />

      <NavButton 
        destination='AiquestionPage'
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