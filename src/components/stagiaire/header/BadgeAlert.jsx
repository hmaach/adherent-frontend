import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import html2canvas from "html2canvas";
import QRCodeReact from "qrcode.react";
import DownloadIcon from "@mui/icons-material/Download";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { jsPDF } from "jspdf";

const BadgeAlert = (props) => {
  const { open, handleClose } = props;
  const badgeRef = useRef(null);

  const [badgeFormat, setBadgeFormat] = useState("png");

  const handleCancel = () => {
    handleClose();
  };

  const handleDownloadBadge = () => {
    if (badgeFormat === "pdf") {
      if (badgeRef.current) {
        const doc = new jsPDF();

        doc.html(badgeRef.current, {
          callback: (pdf) => {
            pdf.save("badge.pdf");
          },
        });
      }
    } else {
      if (badgeRef.current) {
        html2canvas(badgeRef.current).then((canvas) => {
          const image = canvas.toDataURL("image/png");

          const downloadLink = document.createElement("a");
          downloadLink.href = image;
          downloadLink.download = "badge.png";
          downloadLink.click();
        });
      }
    }
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleCancel}
      aria-describedby="alert-dialog-slide-description"
      sx={{ minWidth: "70%" }}
    >
      <DialogTitle>{"Le badge de 23456789"}</DialogTitle>
      <DialogContent sx={{ margin: "10px 70px", border: "gray dotted" }}>
        <div
          ref={badgeRef}
          style={{
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {/* Your badge content goes here */}
          <div
            style={{
              //   border: "2px solid #000",
              padding: "20px 5px",
              background: "#FFF",
            }}
          >
            <h6>ID : 23456789</h6>
            <p style={{ fontSize: "9px" }}>
              <span>Profession :</span> Développeur web
            </p>
            <p style={{ fontSize: "9px" }}>
              <span>Ville :</span> Berkane
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <QRCodeReact
                value={"https://adherent-sobol.vercel.app/profil"}
                style={{
                  cursor: "pointer",
                  background: "white",
                  borderRadius: "3px",
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <FormControl>
          <RadioGroup
            row
            value={badgeFormat}
            onChange={(e) => setBadgeFormat(e.target.value)}
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="png"
              control={<Radio sx={{ "&.Mui-checked": { color: "#e86928" } }} />}
              label="png"
            />

            <FormControlLabel
              value="pdf"
              control={<Radio sx={{ "&.Mui-checked": { color: "#e86928" } }} />}
              label="pdf"
            />
          </RadioGroup>
        </FormControl>
        <Button
          onClick={handleDownloadBadge}
          component="label"
          sx={{
            borderRadius: "20px",
            color: "white",
            bgcolor: "#e86928",
            "&:hover": {
              bgcolor: "#d46025",
            },
          }}
          variant="contained"
          endIcon={<DownloadIcon />}
        >
          Télécharger
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BadgeAlert;
