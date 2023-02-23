import React, { useState } from 'react'
import axios from 'axios';

function UploadNotes() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append('pdf', selectedFile);
        axios.post('http://localhost:4000/upload', formData)
          .then(response => console.log(response.data))
          .catch(error => console.log(error));
    }

    return (
        <div>
            <input type="file" name="pdf" onChange={handleFileInputChange} />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    )
}

export default UploadNotes
