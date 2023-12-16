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

const TermsAlert = (props) => {
  const { open, handleClose, handleAgreeDialog } = props;
  const [selectedLanguage, setSelectedLanguage] = useState("french");

  const handleLanguageChange = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
  };

  const getDialogContent = () => {
    switch (selectedLanguage) {
      case "arabic":
        return (
          <DialogContent style={{ direction: "rtl" }}>
            <h2>شروط الخدمة:</h2>
            <ol>
              <li>
                <h5>الاستخدام الشرعي:</h5>
                يجب عليك استخدام خدماتنا وفقًا للقوانين واللوائح المعمول بها.
              </li>
              <li>
                <h5>حقوق الملكية الفكرية:</h5>
                كل المحتوى المتاح عبر خدماتنا محمي بحقوق الملكية الفكرية.
              </li>
              <li>
                <h5>الخصوصية:</h5>
                نحن نحترم خصوصيتك. يُرجى قراءة سياسة الخصوصية لفهم كيفية جمع
                واستخدام بياناتك.
              </li>
            </ol>
            <h2>سياسة الخصوصية:</h2>
            <ol>
              <li>
                <h5>المعلومات التي نجمعها:</h5>
                نقوم بجمع بيانات محددة لتحسين خدماتنا وتحسين تجربتك كمستخدم.
              </li>
              <li>
                <h5>كيفية استخدام المعلومات:</h5>
                نحن نستخدم المعلومات لتحسين الخدمات وتقديم تجربة أفضل
                للمستخدمين.
              </li>
              <li>
                <h5>مشاركة المعلومات:</h5>
                لا نشارك معلوماتك مع أطراف ثالثة دون موافقتك الصريحة.
              </li>
            </ol>
          </DialogContent>
        );
      case "english":
        return (
          <DialogContent>
            <h2>Terms of Service:</h2>
            <ol>
              <li>
                <h5>Lawful Use:</h5>
                You must use our services in compliance with applicable laws and
                regulations.
              </li>
              <li>
                <h5>Intellectual Property Rights:</h5>
                All content available through our services is protected by
                intellectual property rights.
              </li>
              <li>
                <h5>Privacy:</h5>
                We respect your privacy. Please read the privacy policy to
                understand how we collect and use your data.
              </li>
            </ol>
            <h2>Privacy Policy:</h2>
            <ol>
              <li>
                <h5>Information We Collect:</h5>
                We collect specific data to improve our services and enhance
                your user experience.
              </li>
              <li>
                <h5>How We Use Information:</h5>
                We use the information to improve services and provide a better
                user experience.
              </li>
              <li>
                <h5>Sharing Information:</h5>
                We do not share your information with third parties without your
                explicit consent.
              </li>
            </ol>
          </DialogContent>
        );
      default:
        return (
          <DialogContent>
            <h2>Conditions d'utilisation :</h2>
            <ol>
              <li>
                <h5>Utilisation Légale:</h5>
                Vous devez utiliser nos services en conformité avec les lois et
                réglementations applicables.
              </li>
              <li>
                <h5>Droits de Propriété Intellectuelle:</h5>
                Tout le contenu disponible via nos services est protégé par des
                droits de propriété intellectuelle.
              </li>
              <li>
                <h5>Vie Privée:</h5>
                Nous respectons votre vie privée. Veuillez lire la politique de
                confidentialité pour comprendre comment nous collectons et
                utilisons vos données.
              </li>
            </ol>
            <h2>Politique de confidentialité :</h2>
            <ol>
              <li>
                <h5>Informations Que Nous Collectons:</h5>
                Nous collectons des données spécifiques pour améliorer nos
                services et enrichir l'expérience utilisateur.
              </li>
              <li>
                <h5>Comment Nous Utilisons les Informations:</h5>
                Nous utilisons les informations pour améliorer les services et
                offrir une meilleure expérience utilisateur.
              </li>
              <li>
                <h5>Partage des Informations:</h5>
                Nous ne partageons pas vos informations avec des tiers sans
                votre consentement explicite.
              </li>
            </ol>
          </DialogContent>
        );
    }
  };

  const getTitle = () => {
    switch (selectedLanguage) {
      case "arabic":
        return "شروط الخدمة وسياسة الخصوصية";
      case "english":
        return "Terms of Service and Privacy Policy";
      default:
        return "Conditions générales et Politique de confidentialité";
    }
  };

  const getActionText = () => {
    switch (selectedLanguage) {
      case "arabic":
        return "أنا موافق";
      case "english":
        return "I agree";
      default:
        return "J'accepte";
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
        <Button onClick={handleAgreeDialog}>{getActionText()}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsAlert;
