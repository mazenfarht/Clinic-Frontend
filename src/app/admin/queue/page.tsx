"use client";

import { useState } from "react";
import QueueHeader from "../../components/Queue2/QueueHeader";
import QueueSummary from "../../components/Queue2/QueueSummary";
import QueueList from "../../components/Queue2/QueueList";
import CurrentlyServing from "../../components/Queue2/CurrentlyServing";
import NextPatient from "../../components/Queue2/NextPatient";
import QueueQuickActions from "../../components/Queue2/QueueQuickActions";
import QueueStatistics from "../../components/Queue2/QueueStatistics";
import CheckInModal from "../../components/Queue2/CheckInModal";
import ReserveQueueModal from "../../components/Queue2/ReserveQueueModal";
import ResetQueueModal from "../../components/Queue2/ResetQueueModal";

export default function QueuePage() {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <QueueHeader onReset={() => setShowResetModal(true)} />

      <QueueSummary />

      <QueueStatistics />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_288px]">
        {/* Main Queue */}
        <div className="min-w-0">
          <QueueList />
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <QueueQuickActions
            onCheckIn={() => setShowCheckInModal(true)}
            onReserve={() => setShowReserveModal(true)}
          />

          <CurrentlyServing />

          <NextPatient />
        </aside>
      </div>

      {showCheckInModal && (
        <CheckInModal onClose={() => setShowCheckInModal(false)} />
      )}

      {showReserveModal && (
        <ReserveQueueModal onClose={() => setShowReserveModal(false)} />
      )}

      {showResetModal && (
        <ResetQueueModal onClose={() => setShowResetModal(false)} />
      )}
    </div>
  );
}
