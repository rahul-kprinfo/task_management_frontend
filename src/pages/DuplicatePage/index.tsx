import React from "react";

function DuplicatePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Duplicate Tab Detected
      </h1>
      <p className="text-lg text-gray-600">
        Please close this tab and use the application in a single tab.
      </p>
    </div>
  );
}

export default DuplicatePage;
