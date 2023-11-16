// FileUploader.js
import { Button, IconButton } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const FileUploader = ({ onFileUpload, onFileDelete }) => {
    const [filePreviews, setFilePreviews] = useState([]);

    const onDrop = useCallback(
        (acceptedFiles) => {
            // Create an array of file preview objects
            const previews = acceptedFiles.map((file) => ({
                file,
                previewUrl: URL.createObjectURL(file),
            }));

            // Update state with the file previews
            setFilePreviews([...filePreviews, ...previews]);

            // Pass the files to the parent component
            onFileUpload(acceptedFiles);
        },
        [filePreviews, onFileUpload]
    );

    const handleDelete = (index) => {
        const updatedPreviews = [...filePreviews];
        const deletedFile = updatedPreviews.splice(index, 1)[0];
        onFileDelete(deletedFile.file);
        setFilePreviews(updatedPreviews);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <p>{isDragActive ? "Drop the files here..." : "Drag and drop files here, or click to select files"}</p>
            </div>
            <div style={previewsContainerStyles}>
                {filePreviews.map((preview, index) => (
                    <div key={index} style={previewContainerStyles}>
                        <img src={preview.previewUrl} alt={`Preview ${index}`} style={previewStyles} />
                        <IconButton onClick={() => handleDelete(index)} color="error" aria-label="delete">
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </div>
                ))}
            </div>
        </div>
    );
};

const dropzoneStyles = {
    border: "2px dashed #ddd",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
};

const previewsContainerStyles = {
    display: "flex",
    marginTop: "20px",
};

const previewContainerStyles = {
    marginRight: "10px",
};

const previewStyles = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
};

export default FileUploader;
