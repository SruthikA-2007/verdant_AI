import BusinessOverviewPage from '../components/business/BusinessOverviewPage';
import { bakeryProfile } from '../data/businessProfiles';

export default function BakeryPage({ user, onLogout, onSwitchBusiness, onToast }) {
  return (
    <BusinessOverviewPage
      profile={bakeryProfile}
      user={user}
      onLogout={onLogout}
      onSwitchBusiness={onSwitchBusiness}
      onToast={onToast}
    />
  );
}
