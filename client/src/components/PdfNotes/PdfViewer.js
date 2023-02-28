import React, { useState, useEffect } from 'react';
import './PdfViewer.css'
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import { Spinner } from 'react-bootstrap';

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
        <button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous Page
        </button>
        <span>
          Page {currentPage} of {numPages}
        </span>
        <button
          disabled={currentPage === numPages}
          onClick={handleNextPage}
        >
          Next Page
        </button>
      </div>

      <button
        className='dark-button'
        onClick={DarkMode}
      >
        Dark Mode
      </button>
    </div>
  );
}

export default PdfViewer;
