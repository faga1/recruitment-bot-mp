import React, { useState,useEffect } from 'react';
import { Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default (props)=>{
  const [pageNumber, setPageNumber] = useState(1);
  const file = props.location.state.file
    return (
        <div>
             <Document
                file={file}
                >
                <Page pageNumber={pageNumber} />
            </Document>
        </div>
    )
}