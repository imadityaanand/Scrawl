import React, { useState, useEffect } from 'react';
import './PdfViewer.css'
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import { Spinner } from 'react-bootstrap';
import BackButton from '../Miscellanous/BackButton';
import ThemeButton from '../Miscellanous/ThemeButton';
import PdfNavButton from '../Miscellanous/PdfNavButton';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfViewer({ id }) {
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get(`http://localhost:4000/pdf/${id}`, {
      //   responseType: 'arraybuffer',
      // });
      const response = await axios.get(`http://localhost:4000/pdf/${id}`, {
        responseType: 'blob',
      });
      const data = response.data;
      console.log(data);
      setPdfData(await response.data.arrayBuffer());
      console.log(pdfData)
      // setPdfData(pdfData);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handlePreviousPage() {
    setCurrentPage(currentPage - 1);
  }

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  if (loading) {
    return <Spinner animation="border" />;
  }

  function DarkMode() {
    if(darkMode) {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  }

  return (
    <div>
      <div className={`blend-bg ${darkMode ? 'active' : null}`} ></div>
      <div className='pdf-topbar flex'>
        {darkMode ? <BackButton color='white' /> : <BackButton />}
          {/* <button
          className='dark-button'
          onClick={DarkMode}
          >
            Dark Mode
          </button> */}
          {/* {darkMode ? <img src='../../../assets/sun-icon.svg' alt='light' onClick={DarkMode} /> : <img src='../../../assets/moon-icon.svg' alt='dark' onClick={DarkMode} />} */}
          {darkMode ? <ThemeButton click={DarkMode} icon='sun' /> : <ThemeButton click={DarkMode} icon='moon' />}
      </div>
      <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={currentPage} />
      </Document>
      {/* {pdfData ? (
        <Document
          file={{ data: pdfData }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={currentPage} />
        </Document>
      ) : (
        <div>Loading pdf...</div>
      )} */}
      <div className='pdf-navbar'>
        {darkMode ? <PdfNavButton type='left' click={handlePreviousPage} disabled={currentPage === 1 ? 'disabled' : null} /> : <PdfNavButton type='left' theme='light' click={handlePreviousPage} disabled={currentPage === 1 ? 'disabled' : null} />}
        {/* <button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous Page
        </button> */}
        <span className={darkMode ? 'white' : null}>
          Page {currentPage} of {numPages}
        </span>
        {/* <button
          disabled={currentPage === numPages}
          onClick={handleNextPage}
        >
          Next Page
        </button> */}
        {darkMode ? <PdfNavButton type='right' click={handleNextPage} disabled={currentPage === numPages ? 'disabled' : null} /> : <PdfNavButton type='right' theme='light' click={handleNextPage} disabled={currentPage === numPages ? 'disabled' : null} />}
      </div>

      
    </div>
  );
}

export default PdfViewer;
