import React from 'react';
import { useNavigate } from 'react-router-dom';

function PdfCard({ pdf }) {
    const navigate = useNavigate();
    const viewPdf = () => {
        // open the pdf in a new tab
        // window.open(`http://localhost:4000/pdf/${pdf._id}`, '_blank');
        navigate('/pdf/' + pdf._id);
    }

    return (
    <div className="pdf-card" onClick={viewPdf}>
        <h3>{pdf.title}</h3>
        <p>{pdf.description}</p>
        <div className="tags">
        {pdf.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
    </div>
    );
};


export default PdfCard