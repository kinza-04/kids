/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import AppLayout from './components/AppLayout';
import MagicCursor from './components/MagicCursor';
import { RewardProvider } from './context/RewardContext';
import RewardModal from './components/RewardModal';

export default function App() {
  return (
    <RewardProvider>
      <div className="min-h-screen bg-pink-50 relative overflow-hidden">
        <MagicCursor />
        <AppLayout />
        <RewardModal />
      </div>
    </RewardProvider>
  );
}

