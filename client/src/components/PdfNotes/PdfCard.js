import React from 'react';
import './PdfCard.css'
import { useNavigate } from 'react-router-dom';

function PdfCard({ pdf, image }, props) {
    const navigate = useNavigate();
    const viewPdf = () => {
        // open the pdf in a new tab
        // window.open(`http://localhost:4000/pdf/${pdf._id}`, '_blank');
        navigate('/pdf/' + pdf._id);
    }

    return (
        <div className="pdf-card" onClick={viewPdf}>
            <div className='notes-thumb' style={{backgroundImage: 'url(' + image + ')'}}></div>
            <p className='title'>{pdf.title || props.title}</p>
            {/* <p>{pdf.description}</p> */}
            {/* <div className="tags">
            {pdf.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div> */}
            <div className='flex info'>
                <p className='username'>@{props.username}</p>
                <p className='pages'>{pdf.numPages} pages</p>
            </div>
        </div>
    );
};


export default PdfCard