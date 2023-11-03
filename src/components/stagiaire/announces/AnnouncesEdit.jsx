import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AnnounceItem from "./AnnounceItem";
import { toast } from "react-toastify";
import { editAnnounces } from "../../../app/api/announceAxios";
import GetCookie from "../../../cookies/JWT/GetCookie";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";

const AnnouncesEdit = ({
  open,
  handleClose,
  announces: originalAnnounces,
  setAnnounces,
}) => {
  const [announces, setAnnouncesState] = useState(originalAnnounces);
  const [deletedAnnounces, setDeletedAnnounces] = useState([]);
  const [changesMade, setChangesMade] = useState(false);
  const token = GetCookie("jwt");

  useEffect(() => {
    setAnnouncesState(originalAnnounces);
  }, [originalAnnounces]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newAnnounces = Array.from(announces);
    const [movedAnnounce] = newAnnounces.splice(result.source.index, 1);
    newAnnounces.splice(result.destination.index, 0, movedAnnounce);

    setAnnouncesState(newAnnounces);
    setChangesMade(true);
  };

  const handleDelete = (announceId) => {
    const updatedAnnounces = announces.filter(
      (announce) => announce.id !== announceId
    );
    const deletedAnnounce = announces.find(
      (announce) => announce.id === announceId
    );

    setAnnouncesState(updatedAnnounces);
    setDeletedAnnounces([...deletedAnnounces, deletedAnnounce]);
    setChangesMade(true);
  };

  const handleSave = () => {
    const updatedAnnounces = announces.map((announce, index) => ({
      ...announce,
      order: index + 1,
    }));
    const extractedAnnounces = updatedAnnounces.map((announce) => ({
      id: announce.id,
      user_id: announce.user_id,
      order: announce.order,
    }));

    const deletedAnnounceIds = deletedAnnounces.map(
      (deletedAnnounce) => deletedAnnounce.id
    );
    // console.log(deletedAnnounceIds);

    // console.log(extractedAnnounces);

    try {
      editAnnounces(extractedAnnounces, deletedAnnounceIds, token)
        .then((data) => {
          if (data.message === "success") {
            setAnnounces(updatedAnnounces);
            console.log(extractedAnnounces);
            handleClose();
            toast.success("Les changements sont enregistrés", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setChangesMade(false);
          } else {
            console.log(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    if (changesMade) {
      const confirmDiscard = window.confirm(
        "Des changements non enregistrés existent. Voulez-vous vraiment les ignorer ?"
      );
      if (!confirmDiscard) {
        return;
      }
    }

    setAnnouncesState(originalAnnounces);
    handleClose();
    setChangesMade(false);
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleCancel}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Modifier les annonces"}</DialogTitle>
      <DialogContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="announces">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {announces.map((announce, index) => (
                  <Draggable
                    key={announce.id}
                    draggableId={announce.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <AnnounceItem
                          announce={announce}
                          index={index}
                          onDelete={handleDelete}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Annuler</Button>
        <Button onClick={handleSave} disabled={!changesMade}>
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnnouncesEdit;
