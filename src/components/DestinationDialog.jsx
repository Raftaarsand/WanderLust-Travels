import DestinationDetails, { DESTINATION_DETAILS_TITLE_ID } from './DestinationDetails';
import Modal from './Modal';

export default function DestinationDialog({ destination, onClose, onPlanTrip }) {
  return (
    <Modal isOpen={Boolean(destination)} onClose={onClose} labelledBy={DESTINATION_DETAILS_TITLE_ID}>
      {destination && <DestinationDetails destination={destination} onPlanTrip={onPlanTrip} />}
    </Modal>
  );
}
