import RealTimePopular from '../components/usermain/RealTimePopular.tsx';
import BasicComponents from '../components/usermain/BasicComponents.tsx';
import RealTimeEventZone from '../components/usermain/RealTimeEventZone.tsx';
import CurrentAuction from '../components/usermain/CurrentAuction.tsx';

function UserMain() {
  return (<>
      <BasicComponents />
      <RealTimePopular />
      <RealTimeEventZone />
      <CurrentAuction />
    </>);
}

export default UserMain;