import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PdfCard from './PdfCard';

function PdfList() {
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        const fetchPdfs = async () => {
            const response = await axios.get(process.env.REACT_APP_SERVER + 'pdfs');
            setPdfs(response.data);
        }
        fetchPdfs();
    }, []);

    return (
        <div className="pdf-list flex cards-container">
          {pdfs.map(pdf => <PdfCard key={pdf._id} pdf={pdf} image='../../../assets/notes1.png' />)}
        </div>
    );
}

export default PdfList
