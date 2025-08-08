import BasicComponents from '../../usermain/components/BasicComponents.tsx';
import EventLists from '../components/EventLists.tsx';
import EventZoneBoard from '../components/EventZoneBoard.tsx';

function EventZoneMain()
{
  return (
    <>
      <BasicComponents />
      <EventLists />
      <EventZoneBoard />
    </>
  )
}

export default EventZoneMain;