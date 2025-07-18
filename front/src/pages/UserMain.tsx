import RealTimePopular from '../components/usermain/RealTimePopular.tsx';
import BasicComponents from '../components/usermain/BasicComponents.tsx';
import RealTimeEventZone from '../components/usermain/RealTimeEventZone.tsx';

function UserMain() {
  return (<>
      <BasicComponents />
      <RealTimePopular />
      <RealTimeEventZone />
    </>);
}

export default UserMain;