import BusinessOverviewPage from '../components/business/BusinessOverviewPage';
import { groceryProfile } from '../data/businessProfiles';

export default function GroceryPage({ user, onLogout, onSwitchBusiness, onToast }) {
  return (
    <BusinessOverviewPage
      profile={groceryProfile}
      user={user}
      onLogout={onLogout}
      onSwitchBusiness={onSwitchBusiness}
      onToast={onToast}
    />
  );
}
