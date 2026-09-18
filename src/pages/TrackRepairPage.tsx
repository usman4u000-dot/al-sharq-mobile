import React from 'react';
import { Helmet } from 'react-helmet-async';
import RepairTracker from '../components/RepairTracker';

export default function TrackRepairPage() {
  return (
    <>
      <Helmet>
        <title>Track Repair | Al Sharq</title>
        <meta name="description" content="Track your device repair status at Al Sharq Mobile Phone & Computer Trading LLC with your ticket number." />
        <link rel="canonical" href="https://allsharq.com/track-repair" />
      </Helmet>
      <div className="min-h-[calc(100vh-80px)] bg-brand-blue dark:bg-slate-950 flex flex-col justify-center">
        <RepairTracker />
      </div>
    </>
  );
}
