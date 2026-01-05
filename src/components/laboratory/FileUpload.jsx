import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';

const FileUpload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white">
      {!selectedFile ? (
        <label className="cursor-pointer flex flex-col items-center">
          <Upload className="text-blue-500 mb-2" size={40} />
          <span className="text-gray-600 font-medium">Click to upload diagnostic report</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded">
          <div className="flex items-center gap-2">
            <File className="text-blue-600" size={20} />
            <span className="text-sm font-medium">{selectedFile.name}</span>
          </div>
          <button onClick={() => setSelectedFile(null)}>
            <X size={18} className="text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;