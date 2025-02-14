import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 ">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-900 border-t-transparent"></div>
    </div>
  );
};

export default Loading;
