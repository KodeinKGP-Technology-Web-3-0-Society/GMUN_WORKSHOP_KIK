import React, { useState } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';

const FileUpload = ({ onFileSelect, selectedFile }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <div 
      className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
        dragActive ? "border-purple-500 bg-purple-50" : "border-gray-300 bg-gray-50"
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFile(e); }}
    >
      {!selectedFile ? (
        <label className="flex flex-col items-center cursor-pointer">
          <div className="p-4 bg-white rounded-full shadow-sm mb-4">
            <Upload className="text-purple-600" size={32} />
          </div>
          <span className="text-gray-700 font-semibold text-lg">Upload Diagnostic Report</span>
          <p className="text-gray-500 text-sm mt-1">Drag and drop or click to browse</p>
          <p className="text-xs text-gray-400 mt-4 italic">Supported: PDF, DICOM, JPG, PNG</p>
          <input type="file" className="hidden" onChange={handleFile} />
        </label>
      ) : (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <File size={24} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900 truncate max-w-[200px]">
                {selectedFile.name}
              </p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle size={12} /> Ready for IPFS encryption
              </p>
            </div>
          </div>
          <button 
            onClick={() => onFileSelect(null)}
            className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;