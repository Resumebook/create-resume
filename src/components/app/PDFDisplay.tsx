import React, { useState, useRef, useEffect } from 'react'
import { Document, Page } from 'react-pdf'

const PDFDisplay = ({ document }) => {
  const docRef = useRef(null)
  const [width, setWidth] = useState(300)
  useEffect(() => {
    if (!docRef.current) {
      return
    }
    setWidth(docRef.current.clientWidth)
  }, [docRef])
  useEffect(() => {
    const handleResize = () => {
      if (!docRef.current) {
        return
      }
      setWidth(docRef.current.clientWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [pageCount, setPageCount] = useState(0)
  const [currPage, setCurrPage] = useState(1)

  const onDocumentLoad = ({ numPages }) => {
    setPageCount(numPages)
  }
  const setPage = (action: 'prev' | 'next') => {
    if (action === 'prev' && currPage !== 1) {
      setCurrPage(currPage - 1)
    } else if (action === 'next' && currPage !== pageCount) {
      setCurrPage(currPage +1)
    }
  }

  return (
    <div className="pdf">
      <div ref={docRef} className="pdf-document">
        <Document file={document} onLoadSuccess={onDocumentLoad}>
          <Page pageNumber={currPage} width={width} />
        </Document>
        {pageCount > 1 ?
          <div className="pdf__pagination">
            <button
              disabled={currPage === 1}
              className="btn btn-compact"
              onClick={() => setPage('prev')}
            >
              prev
            </button>
            <button
              disabled={currPage === pageCount}
              className="btn btn-compact"
              onClick={() => setPage('next')}
            >
              Next
            </button>
          </div>
        : null}
      </div>
    </div>
  )
}

export default PDFDisplay