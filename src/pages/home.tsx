
import AppHeader from '../components/header/appHeader';
import './home.scss';
import AppNavbar from '../components/navbar/appNavbar';
import Cityform from '../components/cityform/cityform';
import PredictionCard from '../components/predictionCard/PredictionCard';
import AppFooter from '../components/footer/AppFotter';


function Home(){
  
  return (
    <>
    <AppHeader></AppHeader>
    {/* <AppNavbar></AppNavbar> */}
    <PredictionCard></PredictionCard>
    <AppFooter></AppFooter>
    </>
  )
}

export default Home;