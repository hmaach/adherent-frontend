import React from "react";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

// ... (imports remain unchanged)

const InfoAlert = (props) => {
  const { open, handleClose } = props;
  const [selectedLanguage, setSelectedLanguage] = useState("french");

  const getFlagStyle = (lang) => {
    return {
      border:
        selectedLanguage === lang ? "2px solid orange" : "2px solid white",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      marginRight: "8px",
    };
  };

  const handleLanguageChange = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
  };

  const getDialogContent = () => {
    switch (selectedLanguage) {
      case "arabic":
        return (
          <DialogContent style={{ direction: "rtl" }}>
            أهلا أيها الزائر ،<br /> مرحبا بك في موقعنا، هذه المنصة قيد الإنشاء،
            قد تواجهك بعض المشاكل في رؤية الصور أو في بعض الخاصيات، وذلك قد يكون
            إما بسبب الخادم الذي المستضيف للمنصة ، أو بسبب إشكاليات تتعلق
            بالتواصل بين الواجهة والخلفية.
            <br /> للإستفسار أو التواصل معنا يمكنكم التواصل عبر:
            <br /> الواتساب :{" "}
            <a
              href="https://wa.me/+212706265024"
              style={{ unicodeBidi: "plaintext", direction: "ltr" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              +212 7062-65024
            </a>
          </DialogContent>
        );
      case "english":
        return (
          <DialogContent>
            Hello, dear visitor!
            <br /> Welcome to our site. This platform is currently under
            construction. You may encounter issues with image display or certain
            features. This could be due to the server hosting the backend or
            CORS problems. To contact us or inquire, you can reach us via:{" "}
            <br /> WhatsApp :{" "}
            <a
              href="https://wa.me/+212706265024"
              target="_blank"
              rel="noopener noreferrer"
            >
              +212 7062-65024
            </a>
          </DialogContent>
        );
      default:
        return (
          <DialogContent>
            Bonjour cher visiteur, <br />
            Bienvenue sur notre site. Cette plateforme est actuellement en
            construction. Vous pourriez rencontrer des problèmes d'affichage
            d'images ou de certaines fonctionnalités. Cela pourrait être dû soit
            au serveur hébergeant de Back-End, soit à des problèmes CORS. Pour
            nous contacter ou vous renseigner, vous pouvez le faire via : <br />{" "}
            WhatsApp :{" "}
            <a
              href="https://wa.me/+212706265024"
              target="_blank"
              rel="noopener noreferrer"
            >
              +212 7062-65024
            </a>
          </DialogContent>
        );
    }
  };

  const getTitle = () => {
    switch (selectedLanguage) {
      case "arabic":
        return "ترحيب ومعلومات";
      case "english":
        return "Welcome and Information";
      default:
        return "Bienvenue et Informations";
    }
  };

  const getActionText = () => {
    switch (selectedLanguage) {
      case "arabic":
        return "فهمت";
      case "english":
        return "Understood";
      default:
        return "J'ai compris";
    }
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        {getTitle()}
      </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ButtonGroup
            disableElevation
            sx={{
              borderRadius: "10px",
            }}
            aria-label="Disabled elevation buttons"
          >
            <Button
              size="small"
              sx={{
                borderRadius: "20px 0 0 20px",
                borderColor: "#e86928",
                color: selectedLanguage === "french" ? "white" : "#e86928",
                "&:hover": {
                  borderColor: "#e86928",
                  bgcolor: "#fff8f2",
                },
                bgcolor: selectedLanguage === "french" ? "#e86928" : "white",
                ...(selectedLanguage === "french" && {
                  "&:hover": {
                    bgcolor: "#d46025",
                  },
                }),
              }}
              variant={selectedLanguage === "french" ? "contained" : "outlined"}
              onClick={() => handleLanguageChange("french")}
            >
              français
            </Button>
            <Button
              size="small"
              sx={{
                borderRadius: "20px 0 0 20px",
                borderColor: "#e86928",
                color: selectedLanguage === "arabic" ? "white" : "#e86928",
                bgcolor: selectedLanguage === "arabic" ? "#e86928" : "white",
                "&:hover": {
                  borderColor: "#e86928",
                  bgcolor: "#fff8f2",
                },
                ...(selectedLanguage === "arabic" && {
                  "&:hover": {
                    bgcolor: "#d46025",
                  },
                }),
              }}
              variant={selectedLanguage === "arabic" ? "contained" : "outlined"}
              onClick={() => handleLanguageChange("arabic")}
            >
              العربية
            </Button>
            <Button
              size="small"
              sx={{
                borderRadius: "20px 0 0 20px",
                borderColor: "#e86928",
                color: selectedLanguage === "english" ? "white" : "#e86928",
                bgcolor: selectedLanguage === "english" ? "#e86928" : "white",
                "&:hover": {
                  borderColor: "#e86928",
                  bgcolor: "#fff8f2",
                },
                ...(selectedLanguage === "english" && {
                  "&:hover": {
                    bgcolor: "#d46025",
                  },
                }),
              }}
              variant={
                selectedLanguage === "english" ? "contained" : "outlined"
              }
              onClick={() => handleLanguageChange("english")}
              style={{ borderRadius: " 0 20px  20px 0" }}
            >
              English
            </Button>
          </ButtonGroup>
        </div>

        {getDialogContent()}
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleClose}>{getActionText()}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoAlert;
