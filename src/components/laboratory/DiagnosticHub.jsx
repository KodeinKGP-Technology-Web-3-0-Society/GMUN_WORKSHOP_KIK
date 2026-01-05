import React from 'react';
import LabReportForm from './LabReportForm';
import ReportCard from './ReportCard';

const DiagnosticHub = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 italic">MedChain Laboratory Hub</h1>
          <p className="text-gray-600">Securely uploading and managing patient diagnostic records via NFT reports.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <LabReportForm />
          </div>

          {/* History Section */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Reports Issued</h2>
            <ReportCard reportName="Blood Work - Panel A" date="Oct 24, 2023" doctor="City Central Lab" />
            <ReportCard reportName="Chest X-Ray (Full)" date="Oct 22, 2023" doctor="Modern Imaging Center" />
            <ReportCard reportName="MRI Lumbar Spine" date="Oct 15, 2023" doctor="Modern Imaging Center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticHub;