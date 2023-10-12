import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { formatDistanceToNow } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import CustomizedMenusArchive from './CustomizedMenusArchive';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import UpdateCategoryAlert from './UpdateCategoryAlert';
import PdfArchiveRow from './pdf/PdfArchiveRow';
import { UpdatePdfLibelle, removePdfFromCategory } from '../../app/api/pdfAxios';
import GetCookie from '../../cookies/JWT/GetCookie';
import { toast } from 'react-toastify';
import { Skeleton } from '@mui/material';

function DataTable({ data, isLoading, onUpdate, onDelete }) {

  const token = GetCookie('jwt')
  const [openRows, setOpenRows] = useState([]);
  const user = useSelector(selectCurrentUser)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState(null);
  const [pdfCategories, setPdfCategories] = useState([])

  const handleRowClick = (rowId, event) => {
    const isMenuClick = event.target.closest('.menu-cell');
    if (!isMenuClick) {
      setOpenRows((prevOpenRows) => {
        if (prevOpenRows.includes(rowId)) {
          return prevOpenRows.filter((id) => id !== rowId);
        } else {
          return [rowId];
        }
      });
    }
  };

  const handleUpdateCallback = (category) => {
    setSelectedCategory(category);
    setUpdatedCategory(category);
    setShowUpdateAlert(true);
  };


  const handleUpdateCategory = (updatedCategory) => {
    onUpdate(updatedCategory)
  };

  const handleDeleteCategory = (categoryId) => {
    onDelete(categoryId)
  };

  const handleClose = () => {
    setShowUpdateAlert(false);
  };

  const handleUpdatePDF = (updatedPDF, categoryID) => {
    try {
      UpdatePdfLibelle(updatedPDF, token)
        .then((data) => {
          if (data.message === "success") {
            setPdfCategories(() => {
              const updatedCategories = pdfCategories.map((category) => {
                if (category.id === categoryID) {
                  const updatedPdfs = category.pdfs.map((pdf) => {
                    if (pdf.id === updatedPDF.id) {
                      return {
                        ...pdf,
                        libelle: updatedPDF.libelle,
                      };
                    }
                    return pdf;
                  });
                  return {
                    ...category,
                    pdfs: updatedPdfs,
                  };
                }
                return category;
              });
              return updatedCategories;
            });
            toast.success('Modifier avec succès', {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
        ).catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDeletePDF = (pdfID, categoryID) => {
    try {
      removePdfFromCategory(pdfID, token)
        .then((data) => {
          if (data.message === "success") {
            const updatedCategories = pdfCategories.map((category) => {
              if (category.id === categoryID) {
                const updatedPdfs = category.pdfs.filter((pdf) => pdf.id !== pdfID)
                return {
                  ...category,
                  pdfs: updatedPdfs
                }
              }
              return category
            });
            setPdfCategories(updatedCategories);
            toast.success('Supprimer avec succès', {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
        )
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    setPdfCategories(data)
  }, [data])

  return (
    <TableContainer className='archive-table' component={Paper}>
      <Table >
        <TableHead className='archive-table-head'>
          <TableRow>
            <TableCell />
            <TableCell>Les categories</TableCell>
            <TableCell>Propriétaire</TableCell>
            <TableCell>Date de mise à jour</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {isLoading &&
            <TableRow>
              <TableCell style={{ border: 'none' }}>
                <Typography
                  className='archive-loading'
                  component="div"
                  variant={"h3"}
                >
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                </Typography>
              </TableCell>
            </TableRow>
          }
          {pdfCategories.length === 0 && !isLoading
            ? <TableRow>
              <TableCell style={{ border: 'none' }}>
                <span className='archive-no-categories'>Aucune catégorie trouvée !</span>
              </TableCell>
            </TableRow>
            : null}
          {pdfCategories.length != 0 && !isLoading
            ? (
              pdfCategories?.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    className={`archive-table-row ${openRows.includes(row.id) ? 'archive-table-open-row' : ''}`}
                    onClick={(event) => handleRowClick(row.id, event)}
                    style={{ backgroun: row.user_id === user?.id ? 'red' : '' }}
                  >
                    <TableCell>
                      <IconButton aria-label="expand row" size="small">
                        {openRows.includes(row.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.label} ({row.pdfs_count})</TableCell>
                    <TableCell>{row.user_name}</TableCell>
                    <TableCell>
                      {(() => {
                        let updatedDate = new Date(row.updated_at);
                        if (row.pdfs[0] && row.pdfs[0].updated_at) {
                          if (row.pdfs[0].updated_at > row.updated_at) {
                            updatedDate = new Date(row.pdfs[0].updated_at);
                          } else {
                            updatedDate = new Date(row.updated_at);
                          }
                        }

                        // Use the updatedDate variable as needed

                        // const updatedDate = new Date(row.updated_at);
                        const relativeTime = formatDistanceToNow(updatedDate, {
                          locale: frLocale,
                          addSuffix: true
                        });
                        return relativeTime;
                      })()}
                    </TableCell>
                    <TableCell className="menu-cell">
                      {row.user_id === user?.id || user?.role === "admin" ? (
                        <CustomizedMenusArchive
                          className="menu-cell"
                          user={user}
                          categorie={row}
                          onDelete={handleDeleteCategory}
                          handleUpdateCallback={() => handleUpdateCallback(row)}
                        />
                      ) : null}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                      <Collapse in={openRows.includes(row.id)} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          <Table size="small">
                            <TableBody>
                              {row.pdfs.map((pdf) => (
                                <PdfArchiveRow
                                  key={pdf.id}
                                  pdf={pdf}
                                  user={user}
                                  onUpdate={handleUpdatePDF}
                                  onDelete={handleDeletePDF}
                                  categoryID={row.id}
                                />
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : null
          }
        </TableBody>
      </Table>
      {
        showUpdateAlert && (
          <UpdateCategoryAlert
            onUpdate={handleUpdateCategory}
            category={selectedCategory}
            updatedCategory={updatedCategory}
            open={true}
            handleClose={handleClose}
          />
        )
      }
    </TableContainer >
  );
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      user_name: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      pdfs: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          libelle: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default DataTable;
