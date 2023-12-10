import { Button, IconButton } from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Swal from "sweetalert2";

const FileUploader = ({ onFileUpload, onFileDelete, existingImages, maxFiles = 3 }) => {
    const [filePreviews, setFilePreviews] = useState([]);

    useEffect(() => {
        // Update file previews with existing images
        if (existingImages && existingImages.length > 0) {
            const previews = existingImages.map((imageUrl) => ({
                previewUrl: imageUrl,
            }));
            setFilePreviews(previews);
        }
    }, [existingImages]);

    const onDrop = useCallback(
        (acceptedFiles) => {
            // Create an array of file preview objects
            const previews = acceptedFiles.map((file) => ({
                file,
                previewUrl: URL.createObjectURL(file),
            }));

            // Update state with the file previews, considering the maximum allowed files
            if (filePreviews.length + previews.length <= maxFiles) {
                setFilePreviews([...filePreviews, ...previews]);

                // Pass the files to the parent component
                onFileUpload(acceptedFiles);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `Maximum files limit reached (${maxFiles} files allowed)`,
                    confirmButtonText: "OK",
                    customClass: {
                        container: "swal2-container",
                    },
                    didOpen: () => {
                        document.querySelector(".swal2-container").style.zIndex = 10000;
                    },
                });
            }
        },
        [filePreviews, maxFiles, onFileUpload]
    );

    const handleDelete = (index) => {
        const updatedPreviews = [...filePreviews];
        const deletedFile = updatedPreviews.splice(index, 1)[0];

        // If the file is null (existing image), pass the image data for deletion
        if (!deletedFile.file) {
            onFileDelete(deletedFile.previewUrl);
        } else {
            // If the file is a new upload, pass the file for deletion
            onFileDelete(deletedFile.file);
        }

        setFilePreviews(updatedPreviews);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input name="images" {...getInputProps()} />
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
