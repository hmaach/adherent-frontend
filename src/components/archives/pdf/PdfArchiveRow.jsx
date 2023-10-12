import React from 'react'
import { Button, TableCell, TableRow } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CustomizedMenusArchivePDF from './CustomizedMenusArchivePDF';
import { useState } from 'react';
import UpdatePDFAlert from './UpdatePDFAlert';
import { downloadPDF } from '../../../app/api/pdfAxios';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../features/auth/authSlice';

const PdfArchiveRow = ({ pdf, user, categoryID, onUpdate, onDelete }) => {

    const [selectedPDF, setSelectedPDF] = useState(null);
    const [showUpdateAlert, setShowUpdateAlert] = useState(false);
    const [updatedPDF, setUpdatedPDF] = useState(null);
    // const user = useSelector(selectCurrentUser)

    const handleUpdateCallback = (PDF) => {
        setSelectedPDF(PDF);
        setUpdatedPDF(PDF);
        setShowUpdateAlert(true);
    };

    const handleDownloadPDF = (path) => {
        downloadPDF(path)
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'istab.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.error('Error downloading PDF:', error);
            });
    }

    const handleClose = () => {
        setShowUpdateAlert(false);
    };

    const handleUpdatePDF = (updatedPDF) => {
        onUpdate(updatedPDF, categoryID)
    };

    const handleDeletePDF = (PdfId) => {
        onDelete(PdfId, categoryID)
    };

    return (
        <TableRow key={pdf.id} className='archive-pdf-row'>
            <TableCell component="th" scope="row">
                <PictureAsPdfIcon sx={{ fontSize: 30,color:"red",marginRight:3 }}  />
                <span>{pdf.libelle}</span>
            </TableCell>
            <TableCell style={{ display: "flex", gap: "25px" }}>
                <Button
                    onClick={() => handleDownloadPDF(pdf.path)}
                    variant="contained"
                    color="success"
                    endIcon={<SimCardDownloadIcon />}
                    size="small"
                    style={{
                        borderRadius: '20px',
                        margin:'0.5rem 0'
                      }}
                >
                    Télecharger
                </Button>
                {pdf.user_id === user?.id || user?.role === "admin" ? (
                    <CustomizedMenusArchivePDF
                        className="menu-cell"
                        user={user}
                        pdf={pdf}
                        onDelete={handleDeletePDF}
                        handleUpdateCallback={() => handleUpdateCallback(pdf)}
                    />
                ) : null}
            </TableCell>
            {
                showUpdateAlert && (
                    <UpdatePDFAlert
                        onUpdate={handleUpdatePDF}
                        pdf={selectedPDF}
                        updatedPDF={updatedPDF}
                        open={true}
                        handleClose={handleClose}
                    />
                )
            }

        </TableRow>
    )
}

export default PdfArchiveRow
