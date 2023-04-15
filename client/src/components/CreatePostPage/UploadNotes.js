import React, { useState } from 'react'
import './UploadNotes.css'
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import BackButton from '../Miscellanous/BackButton';

function UploadNotes() {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState("");

    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    const handleTitleInputChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionInputChange = (event) => {
        setDescription(event.target.value);
    }

    const handleTagsInputChange = (event) => {
        setTags(event.target.value);
    }

    const handleFileUpload = () => {
        if(title === '' || description === '' || tags==='') {
            setError('All fields must be filled');
        } else if(selectedFile === null) {
            setError('Choose a file to upload');
        } else {
            const formData = new FormData();
            formData.append('pdf', selectedFile);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('tags', tags.split(", "));
            axios.post(process.env.REACT_APP_SERVER + 'upload', formData)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
        }
    }


    return (
        <div className='createpost'>
            <div className='flex'>
                {isMobile ? <BackButton /> : null}
                <h2>Create Post</h2>
            </div>
            
            {error}
            <h6>Title</h6>
            <input type="text" name="title" onChange={handleTitleInputChange} placeholder="Title" />
            <br />
            <h6>Description</h6>
            <input type="text" name="description" onChange={handleDescriptionInputChange} placeholder="Description" />
            <br />
            <h6>Tags</h6>
            <input type="text" name="tags" onChange={handleTagsInputChange} placeholder="Tags (comma-separated)" />
            <br />
            <h6>Upload PDF</h6>
            <input type="file" name="pdf" onChange={handleFileInputChange} className='file-input' />
            <br />
            <button className='upload-button' onClick={handleFileUpload}>Upload</button>
        </div>
    )
}

export default UploadNotes
