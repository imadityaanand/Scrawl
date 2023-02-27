import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PdfCard from './PdfCard';

function PdfList() {
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        const fetchPdfs = async () => {
            const response = await axios.get('http://localhost:4000/pdfs');
            setPdfs(response.data);
        }
        fetchPdfs();
    }, []);

    return (
        <div className="pdf-list">
          {pdfs.map(pdf => <PdfCard key={pdf._id} pdf={pdf} />)}
        </div>
    );
}

export default PdfList
