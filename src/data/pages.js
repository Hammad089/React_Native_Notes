import { useSelector } from 'react-redux';
import Onboarding1 from '../assets/svgs/onboarding1.svg';
import onboarding2 from '../assets/svgs/onboarding2.svg';
import onboarding3 from '../assets/svgs/onboarding3.svg';

export const useOnboardingPages = () => {
  const { SelectLanguage } = useSelector(state => state.languageReducer);

  return [
    {
      title: SelectLanguage.To_Do_List, 
      subtitle: SelectLanguage.organize_task,
      image: Onboarding1,
    },
    {
      title: SelectLanguage.AdNotes,
      subtitle: SelectLanguage.quickly_jot_down,
      image: onboarding2,
    },
    {
      title: SelectLanguage.Calender,
      subtitle: SelectLanguage.stay_organized,
      image: onboarding3,
    },
  ];
};
