import BasicComponents from '../../usermain/components/BasicComponents.tsx';
import EventLists from '../components/EventLists.tsx';
import EventZoneView from '../components/EventZoneView.tsx';

function EventViewPage()
{
  return (
    <>
      <BasicComponents />
      <EventLists />
      <EventZoneView />
    </>
  )
}

export default EventViewPage;