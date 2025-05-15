
import { FC } from "react";

interface AlgorithmInfo {
  name: string;
  description: string;
}

interface AlgorithmDetailsProps {
  algorithm: AlgorithmInfo;
  fileName: string;
}

const AlgorithmDetails: FC<AlgorithmDetailsProps> = ({ algorithm, fileName }) => {
  return (
    <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-100 text-left w-full">
      <h4 className="font-medium text-blue-700 mb-1">{algorithm.name}</h4>
      <p className="text-xs text-blue-600">{algorithm.description}</p>
      <div className="mt-3 pt-2 border-t border-blue-100">
        <p className="text-xs font-medium text-blue-700">Dataset: {fileName}</p>
        <p className="text-xs text-blue-600 mt-1">Analysis complete. View results in the dashboard.</p>
      </div>
    </div>
  );
};

export default AlgorithmDetails;
