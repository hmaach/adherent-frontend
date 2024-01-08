import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  AddSecteur,
  DeleteSecteur,
  UpdateSecteur,
  getSecteurs,
} from "../../../app/api/secteurAxios";
import GetCookie from "../../../cookies/JWT/GetCookie";
import { Button, ButtonGroup, IconButton, Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PublishIcon from "@mui/icons-material/Publish";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Form from "./Form";
import Confirmation from "./Confirmation";
import { toast } from "react-toastify";

const Secteurs = () => {
  const [secteurs, setSecteurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [typeForm, setTypeForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [secteurToDelete, setSecteurToDelete] = useState(null);

  const token = GetCookie("jwt");

  const fetchSecteurs = () => {
    getSecteurs(token)
      .then((data) => {
        // console.log(data);
        setSecteurs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleShowForm = (type, row = null) => {
    setTypeForm(type);
    setSelectedRow(row);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAdd = (newData) => {
    try {
      AddSecteur(newData, token).then((data) => {
        if (data?.message === "success" && data.newRow) {
          const newRow = data.newRow;
          setSecteurs([...secteurs, newRow]);
          setShowForm(false);
          toast.success("Secteur ajouté avec succès!", {
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, updatedData) => {
    try {
      UpdateSecteur(id, updatedData, token).then((data) => {
        if (data?.message === "success" && data.updatedRow) {
          setSecteurs((prevSecteurs) =>
            prevSecteurs.map((secteur) =>
              secteur.id === id ? { ...secteur, ...data.updatedRow } : secteur
            )
          );
          setShowForm(false);
          toast.success("Secteur mis à jour avec succès!", {
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteConfirmation = (confirmed) => {
    setDeleteConfirmationOpen(false);
    if (confirmed) {
      const idToDelete = secteurToDelete.id;
      try {
        DeleteSecteur(idToDelete, token).then((data) => {
          if (data?.message === "success") {
            setSecteurs((prevSecteurs) =>
              prevSecteurs.filter((secteur) => secteur.id !== idToDelete)
            );
            setSecteurToDelete(null);
            toast.success("Secteur supprimé avec succès!", {
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
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "lib", headerName: "Libele", width: 500 },
    {
      field: "created_at",
      headerName: "Créé le",
      type: "datetime",
      width: 200,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString();
      },
    },
    {
      field: "updated_at",
      headerName: "Mis à jour le",
      type: "datetime",
      width: 200,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString();
      },
    },
    {
      field: "updateButton",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => handleShowForm("update", params.row)}
            aria-label="edit"
            sx={{ margin: "auto" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            sx={{ margin: "auto" }}
            onClick={() => {
              setSecteurToDelete(params.row);
              setDeleteConfirmationOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchSecteurs();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ButtonGroup
          color="warning"
          variant="outlined"
          aria-label="text button group"
          sx={{ margin: "0 auto 1rem" }}
          size="small"
        >
          <Button
            onClick={() => handleShowForm("add")}
            endIcon={<PostAddIcon />}
          >
            Ajouter
          </Button>
          <Button disabled endIcon={<PublishIcon />}>
            Importer
          </Button>
          <Button disabled endIcon={<FileDownloadIcon />}>
            Exporter
          </Button>
        </ButtonGroup>
      </div>
      <DataGrid
        rows={loading ? [] : secteurs} 
        columns={columns}
        pageSize={5}
        autoHeight
        loading={loading}

      />
      {showForm && (
        <Form
          open={true}
          handleCancel={handleCloseForm}
          type={typeForm}
          selectedRow={selectedRow}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
        />
      )}
      {deleteConfirmationOpen && (
        <Confirmation
          open={deleteConfirmationOpen}
          handleCancel={() => setDeleteConfirmationOpen(false)}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />
      )}
    </div>
  );
};

export default Secteurs;
