import BasicComponents from '../../usermain/components/BasicComponents.tsx';
import EventLists from '../components/EventLists.tsx';
import EventZoneWrite from '../components/EventZoneWrite.tsx';

function EventWritePage()
{
  return (
    <>
      <BasicComponents />
      <EventLists />
      <EventZoneWrite />
    </>
  )
}

export default EventWritePage;