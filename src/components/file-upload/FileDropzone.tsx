
import { FC } from "react";
import { Upload } from "lucide-react";

interface FileDropzoneProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileDropzone: FC<FileDropzoneProps> = ({ handleFileChange }) => {
  return (
    <div className="border-2 border-dashed border-primary/40 rounded-lg p-6 w-full text-center cursor-pointer hover:bg-primary/5 transition-all">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        accept=".csv,.tsv,.txt,.xlsx"
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
        <Upload className="h-12 w-12 text-primary mb-3" />
        <p className="text-foreground font-medium">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          CSV, TSV, TXT, XLSX (Max. 10MB)
        </p>
      </label>
    </div>
  );
};

export default FileDropzone;
