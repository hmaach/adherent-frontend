import React, { useEffect, useState, useCallback } from "react";
import {
  Box, Typography, IconButton, Chip, Avatar, Tooltip, Drawer,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Button, InputAdornment, OutlinedInput, Skeleton, TablePagination,
  Divider, Badge, Paper, AppBar, Toolbar, CssBaseline, Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import ArticleIcon from "@mui/icons-material/Article";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import MenuIcon from "@mui/icons-material/Menu";
import { FaHome } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import RemoveCookie from "../../cookies/JWT/RemoveCookie";
import GetCookie from "../../cookies/JWT/GetCookie";
import { getAdherentPostes, deleteAdherentPoste } from "../../app/api/postAgentAxios";

const DRAWER_WIDTH = 260;

/* ── label helpers ── */
const AUDIENCE_MAP = { public: "Public", etablissement: "Établissement", formateurs: "Formateurs", filiere: "Filière" };
const TYPE_MAP     = { announce: "Annonce", publication: "Publication", service: "Service", forum: "Forum", cour: "Cours", exercice: "Exercice" };

const audienceColor = (a) =>
  ({ public: "success", etablissement: "info", formateurs: "warning", filiere: "secondary" }[a] || "default");

/* ════════════════════════════════════ */
export default function PostAgentPanel() {
  const [postes, setPostes]               = useState([]);
  const [total, setTotal]                 = useState(0);
  const [page, setPage]                   = useState(0);
  const [rowsPerPage, setRowsPerPage]     = useState(10);
  const [query, setQuery]                 = useState("");
  const [loading, setLoading]             = useState(true);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [confirmOpen, setConfirmOpen]     = useState(false);
  const [postToDelete, setPostToDelete]   = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [previewPost, setPreviewPost]     = useState(null);

  const token    = GetCookie("jwt");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* Lock body scroll while mounted */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* fetch */
  const fetchPostes = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const data = await getAdherentPostes(token, p, rowsPerPage, query);
      setPostes(data?.data || []);
      setTotal(data?.total || 0);
    } catch {
      toast.error("Erreur lors du chargement.");
    } finally {
      setLoading(false);
    }
  }, [token, rowsPerPage, query]);

  useEffect(() => {
    const t = setTimeout(() => { setPage(0); fetchPostes(1); }, query ? 500 : 0);
    return () => clearTimeout(t);
  }, [query, rowsPerPage]);

  const openConfirm = (post) => { setPostToDelete(post); setConfirmOpen(true); };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await deleteAdherentPoste(postToDelete.id, token);
      if (res?.message === "success") {
        toast.success("Publication supprimée avec succès.");
        setPostes((prev) => prev.filter((p) => p.id !== postToDelete.id));
        setTotal((t) => t - 1);
      } else {
        toast.error("Impossible de supprimer ce post.");
      }
    } catch {
      toast.error("Erreur lors de la suppression.");
    } finally {
      setDeleteLoading(false);
      setConfirmOpen(false);
      setPostToDelete(null);
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
    RemoveCookie("jwt");
    localStorage.removeItem("credentials");
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* ── Sidebar — exact AdminLTE style ── */
  const drawer = (
    <Box sx={{
      backgroundColor: "#343a40",
      height: "100%",
      color: "#c2c7d0",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Logo header — matches AdminPanel */}
      <Toolbar sx={{
        display: "flex", alignItems: "center", justifyContent: "center",
        borderBottom: "1px solid #4b545c", minHeight: "64px !important",
        gap: 1.2, flexDirection: "row",
      }}>
        <img src="/logo.png" alt="SOBOL logo" style={{ height: 38, width: 38, objectFit: "contain" }} />
        <Box>
          <Typography sx={{
            fontFamily: "'Handlee', cursive",
            fontWeight: "bolder",
            color: "#e86928",
            fontSize: 17,
            lineHeight: 1.1,
          }}>
            SOBOL
          </Typography>
          <Typography sx={{
            fontFamily: "'Handlee', cursive",
            fontWeight: 500,
            color: "#c2c7d0",
            fontSize: 12,
            lineHeight: 1,
          }}>
            Numérique
          </Typography>
        </Box>
      </Toolbar>

      {/* User badge */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", borderBottom: "1px solid #4b545c", gap: 1.5 }}>
        <Box sx={{
          width: 35, height: 35, borderRadius: "50%",
          backgroundColor: "#e86928",
          display: "flex", justifyContent: "center", alignItems: "center",
          color: "white", fontWeight: "bold", fontSize: 13, flexShrink: 0,
        }}>
          PA
        </Box>
        <Box>
          <Typography sx={{ color: "#d0d4db", fontWeight: 600, fontSize: 13.5 }}>Agent de Publication</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.2 }}>
            <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#28a745" }} />
            <Typography sx={{ color: "#8f959e", fontSize: 11 }}>En ligne</Typography>
          </Box>
        </Box>
      </Box>

      {/* Nav */}
      <List sx={{ pt: 2, px: 1, flexGrow: 1 }}>
        <Typography variant="caption" sx={{
          pl: 2, color: "#8f959e", fontWeight: "bold",
          letterSpacing: 1, textTransform: "uppercase", fontSize: 11,
        }}>
          Modération
        </Typography>

        <ListItem disablePadding sx={{ mb: 0.5, mt: 1 }}>
          <ListItemButton selected sx={{
            borderRadius: "5px",
            backgroundColor: "#e86928",
            color: "white",
            "&.Mui-selected": { backgroundColor: "#e86928" },
            "&:hover": { backgroundColor: "#d35f1a", color: "white" },
          }}>
            <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
              <DynamicFeedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Publications adhérents"
              primaryTypographyProps={{ fontSize: "14px" }}
            />
            {total > 0 && (
              <Box sx={{
                bgcolor: "rgba(255,255,255,0.25)", color: "white",
                borderRadius: "10px", px: 1, py: 0.1,
                fontSize: 11, fontWeight: 700, minWidth: 22, textAlign: "center",
              }}>
                {total}
              </Box>
            )}
          </ListItemButton>
        </ListItem>
      </List>

      {/* Bottom actions */}
      <Box sx={{ p: 2, borderTop: "1px solid #4b545c", display: "flex", flexDirection: "column", gap: 1 }}>
        <Button
          fullWidth variant="outlined" size="small"
          startIcon={<FaHome />}
          onClick={() => navigate("/accueil")}
          sx={{
            textTransform: "none", borderColor: "#4b545c", color: "#c2c7d0",
            "&:hover": { borderColor: "#c2c7d0", bgcolor: "rgba(255,255,255,0.06)" },
          }}
        >
          Retour à l'accueil
        </Button>
        <Button
          fullWidth variant="contained" color="error" size="small"
          startIcon={<ExitToAppIcon />}
          onClick={handleLogout}
          sx={{ textTransform: "none" }}
        >
          Déconnexion
        </Button>
      </Box>
    </Box>
  );

  /* ── Main render ── */
  return (
    <Box sx={{
      display: "flex", position: "fixed", top: 0, left: 0,
      width: "100vw", height: "100vh", overflow: "hidden",
      backgroundColor: "#f4f6f9",
    }}>
      <CssBaseline />

      {/* AppBar — same style as AdminPanel */}
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          backgroundColor: "white",
          color: "black",
          zIndex: (t) => t.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit" edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton onClick={() => navigate("/accueil")} sx={{ display: { xs: "none", sm: "flex" } }}>
              <FaHome style={{ fontSize: "20px", color: "#6c757d" }} />
            </IconButton>
          </Box>
          <Typography sx={{ fontWeight: 500, color: "#212529", fontSize: 14 }}>
            Accueil / <span style={{ color: "#e86928" }}>Agent de Publication</span> / Publications adhérents
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { width: DRAWER_WIDTH, backgroundColor: "#343a40", borderRight: "none" } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" open
          sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: DRAWER_WIDTH, backgroundColor: "#343a40", borderRight: "none" } }}>
          {drawer}
        </Drawer>
      </Box>

      {/* Main content area */}
      <Box component="main" sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f6f9",
      }}>
        <Toolbar />

        {/* Scrollable body */}
        <Box sx={{
          flexGrow: 1, overflowY: "auto", p: 3,
          scrollbarWidth: "thin", scrollbarColor: "#adb5bd transparent",
          "&::-webkit-scrollbar": { width: 5 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { background: "#adb5bd", borderRadius: 3 },
        }}>

          {/* Page header */}
          <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <Typography variant="h5" sx={{ fontWeight: 400, color: "#212529", m: 1 }}>
              Publications des adhérents
            </Typography>
            <Chip
              icon={<ArticleIcon sx={{ fontSize: 16 }} />}
              label={`${total} publication${total !== 1 ? "s" : ""}`}
              sx={{
                bgcolor: "#e86928", color: "white", fontWeight: 600,
                "& .MuiChip-icon": { color: "white" },
              }}
            />
          </Box>

          {/* Content card — AdminLTE white card style */}
          <Paper elevation={0} sx={{
            borderRadius: "0.25rem",
            boxShadow: "0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)",
            overflow: "hidden",
          }}>
            {/* Card header */}
            <Box sx={{
              px: 3, py: 1.8,
              borderBottom: "1px solid #dee2e6",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1.5,
              bgcolor: "white",
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <DynamicFeedIcon sx={{ color: "#e86928", fontSize: 20 }} />
                <Typography sx={{ fontWeight: 600, color: "#343a40", fontSize: 15 }}>
                  Liste des publications
                </Typography>
              </Box>
              <OutlinedInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher..."
                size="small"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#6c757d", fontSize: 18 }} />
                  </InputAdornment>
                }
                sx={{
                  width: 260, borderRadius: "4px",
                  bgcolor: "white",
                  "& fieldset": { borderColor: "#ced4da" },
                  "&:hover fieldset": { borderColor: "#adb5bd" },
                  "&.Mui-focused fieldset": { borderColor: "#e86928" },
                  "& input": { color: "#212529", fontSize: 13, py: 0.8 },
                }}
              />
            </Box>

            {/* Column headers */}
            <Box sx={{
              display: "flex", alignItems: "center",
              px: 3, py: 1,
              bgcolor: "#f8f9fa",
              borderBottom: "1px solid #dee2e6",
            }}>
              {[
                { label: "Auteur", width: 180 },
                { label: "Date", width: 100 },
                { label: "Contenu", flex: 1 },
                { label: "Type", width: 90, center: true },
                { label: "Audience", width: 120, center: true },
                { label: "", width: 48 },
              ].map(({ label, width, flex, center }) => (
                <Box key={label} sx={{ width, flex, textAlign: center ? "center" : "left", flexShrink: 0 }}>
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#6c757d", textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Rows */}
            <Box sx={{ bgcolor: "white" }}>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <Box key={i} sx={{
                    display: "flex", alignItems: "center", gap: 2,
                    px: 3, py: 1.5,
                    borderBottom: "1px solid #f1f3f5",
                  }}>
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton variant="text" width={100} />
                    <Skeleton variant="text" width={80} />
                    <Skeleton variant="text" sx={{ flexGrow: 1 }} />
                    <Skeleton variant="rounded" width={70} height={22} />
                    <Skeleton variant="rounded" width={100} height={22} />
                    <Skeleton variant="circular" width={28} height={28} />
                  </Box>
                ))
              ) : postes.length === 0 ? (
                <Box sx={{ py: 8, textAlign: "center" }}>
                  <ArticleIcon sx={{ fontSize: 52, color: "#dee2e6", mb: 1 }} />
                  <Typography sx={{ color: "#6c757d", fontSize: 14 }}>
                    Aucune publication trouvée.
                  </Typography>
                </Box>
              ) : (
                postes.map((post, idx) => (
                  <Box key={post.id}
                    onClick={() => setPreviewPost(post)}
                    sx={{
                      display: "flex", alignItems: "center",
                      px: 3, py: 1.4,
                      borderBottom: idx < postes.length - 1 ? "1px solid #f1f3f5" : "none",
                      transition: "background 0.12s",
                      cursor: "pointer",
                      "&:hover": { bgcolor: "#fff8f3" },
                    }}>
                    {/* Avatar */}
                    <Box sx={{ width: 180, flexShrink: 0, display: "flex", alignItems: "center", gap: 1.2 }}>
                      <Avatar sx={{
                        width: 32, height: 32, flexShrink: 0,
                        bgcolor: "#e86928", fontSize: 12, fontWeight: 700,
                      }}>
                        {post.prenom?.[0]}{post.nom?.[0]}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#212529", lineHeight: 1.2 }}>
                          {post.prenom} {post.nom}
                        </Typography>
                        <Typography sx={{ fontSize: 10.5, color: "#6c757d" }}>Adhérent</Typography>
                      </Box>
                    </Box>

                    {/* Date */}
                    <Box sx={{ width: 100, flexShrink: 0 }}>
                      <Typography sx={{ fontSize: 12, color: "#6c757d" }}>
                        {new Date(post.created_at).toLocaleDateString("fr-FR", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </Typography>
                    </Box>

                    {/* Content */}
                    <Box sx={{ flexGrow: 1, minWidth: 0, mr: 1 }}>
                      <Typography title={post.libelle} sx={{
                        fontSize: 13, color: "#495057",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {post.libelle || <em style={{ color: "#adb5bd" }}>Publication sans texte</em>}
                      </Typography>
                      {post.images?.length > 0 && (
                        <Typography sx={{ fontSize: 10.5, color: "#6c757d", mt: 0.1 }}>
                          📷 {post.images.length} image{post.images.length > 1 ? "s" : ""}
                        </Typography>
                      )}
                    </Box>

                    {/* Type */}
                    <Box sx={{ width: 90, flexShrink: 0, textAlign: "center" }}>
                      <Chip
                        label={TYPE_MAP[post.type] || post.type}
                        size="small"
                        sx={{
                          bgcolor: "#e86928", color: "white",
                          fontSize: 11, fontWeight: 600, height: 22,
                          borderRadius: "4px",
                        }}
                      />
                    </Box>

                    {/* Audience */}
                    <Box sx={{ width: 120, flexShrink: 0, textAlign: "center" }}>
                      <Chip
                        label={AUDIENCE_MAP[post.audience] || post.audience}
                        color={audienceColor(post.audience)}
                        size="small"
                        sx={{ fontSize: 11, fontWeight: 600, height: 22, borderRadius: "4px" }}
                      />
                    </Box>

                    {/* Delete */}
                    <Box sx={{ width: 48, flexShrink: 0, display: "flex", justifyContent: "center" }}>
                      <Tooltip title="Supprimer cette publication" arrow>
                        <IconButton
                          onClick={(e) => { e.stopPropagation(); openConfirm(post); }}
                          size="small"
                          sx={{
                            color: "#dc3545",
                            "&:hover": { bgcolor: "rgba(220,53,69,0.1)" },
                            transition: "all 0.15s",
                          }}
                        >
                          <DeleteForeverIcon sx={{ fontSize: 19 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                ))
              )}
            </Box>

            {/* Pagination */}
            <Box sx={{ borderTop: "1px solid #dee2e6", bgcolor: "#f8f9fa" }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, p) => { setPage(p); fetchPostes(p + 1); }}
                onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
                labelRowsPerPage="Lignes :"
                sx={{ color: "#6c757d", "& .MuiIconButton-root": { color: "#6c757d" } }}
              />
            </Box>
          </Paper>

        </Box>{/* /scrollable */}
      </Box>{/* /main */}

      {/* ── Post Preview Dialog ── */}
      <Dialog
        open={Boolean(previewPost)}
        onClose={() => setPreviewPost(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "0.5rem" } }}
      >
        {previewPost && (
          <>
            <DialogTitle sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderBottom: "1px solid #dee2e6", pb: 1.5, fontWeight: 700, color: "#343a40",
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ArticleIcon sx={{ color: "#e86928" }} />
                Détail de la publication
              </Box>
              <IconButton size="small" onClick={() => setPreviewPost(null)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2.5 }}>
              {/* Author row */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
                <Avatar sx={{ width: 44, height: 44, bgcolor: "#e86928", fontWeight: 700, fontSize: 16 }}>
                  {previewPost.prenom?.[0]}{previewPost.nom?.[0]}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontWeight: 700, color: "#212529", fontSize: 15 }}>
                    {previewPost.prenom} {previewPost.nom}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: 11, color: "#6c757d" }} />
                    <Typography sx={{ fontSize: 11.5, color: "#6c757d" }}>
                      {new Date(previewPost.created_at).toLocaleDateString("fr-FR", {
                        weekday: "long", day: "2-digit", month: "long", year: "numeric",
                      })}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 0.8 }}>
                  <Chip label={TYPE_MAP[previewPost.type] || previewPost.type} size="small"
                    sx={{ bgcolor: "#e86928", color: "white", fontWeight: 600, fontSize: 11, borderRadius: "4px" }} />
                  <Chip label={AUDIENCE_MAP[previewPost.audience] || previewPost.audience}
                    color={audienceColor(previewPost.audience)} size="small"
                    sx={{ fontWeight: 600, fontSize: 11, borderRadius: "4px" }} />
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Full content */}
              <Box sx={{ bgcolor: "#f8f9fa", borderRadius: "4px", p: 2, mb: 2, border: "1px solid #dee2e6", minHeight: 80 }}>
                {previewPost.libelle ? (
                  <Typography sx={{ fontSize: 14, color: "#343a40", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                    {previewPost.libelle}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: 13, color: "#adb5bd", fontStyle: "italic" }}>
                    Cette publication ne contient pas de texte.
                  </Typography>
                )}
              </Box>

              {/* Images */}
              {previewPost.images?.length > 0 && (
                <Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#6c757d", textTransform: "uppercase", letterSpacing: 0.5, mb: 1 }}>
                    Images ({previewPost.images.length})
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {previewPost.images.map((url, i) => (
                      <Box key={i}
                        component="img" src={url} alt={`image ${i + 1}`}
                        sx={{ width: 120, height: 90, objectFit: "cover", borderRadius: "4px", border: "1px solid #dee2e6", cursor: "pointer" }}
                        onClick={() => window.open(url, "_blank")}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5, borderTop: "1px solid #dee2e6", pt: 1.5, justifyContent: "space-between" }}>
              <Button variant="contained" color="error"
                startIcon={<DeleteForeverIcon />}
                onClick={() => { setPreviewPost(null); openConfirm(previewPost); }}
                sx={{ textTransform: "none", fontWeight: 600 }}>
                Supprimer cette publication
              </Button>
              <Button variant="outlined" onClick={() => setPreviewPost(null)}
                sx={{ textTransform: "none", borderColor: "#6c757d", color: "#6c757d",
                      "&:hover": { borderColor: "#495057" } }}>
                Fermer
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => !deleteLoading && setConfirmOpen(false)}
        PaperProps={{ sx: { borderRadius: "0.5rem", minWidth: 380 } }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 700, color: "#343a40", borderBottom: "1px solid #dee2e6", pb: 1.5 }}>
          <DeleteForeverIcon sx={{ color: "#dc3545" }} />
          Confirmer la suppression
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <DialogContentText sx={{ color: "#495057", fontSize: 14, mb: 2 }}>
            Êtes-vous sûr de vouloir supprimer définitivement cette publication ?
          </DialogContentText>
          {postToDelete && (
            <Box sx={{ borderRadius: "4px", p: 2, bgcolor: "#fff3cd", border: "1px solid #ffc107" }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#856404", mb: 0.5 }}>
                {postToDelete.prenom} {postToDelete.nom}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#856404", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                « {postToDelete.libelle || "Publication sans texte"} »
              </Typography>
            </Box>
          )}
          <Typography sx={{ mt: 1.5, fontSize: 12, color: "#dc3545" }}>
            ⚠ Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1, borderTop: "1px solid #dee2e6", pt: 1.5 }}>
          <Button
            variant="outlined" onClick={() => setConfirmOpen(false)} disabled={deleteLoading}
            sx={{ textTransform: "none", borderColor: "#6c757d", color: "#6c757d",
                  "&:hover": { borderColor: "#495057", bgcolor: "rgba(0,0,0,0.04)" } }}
          >
            Annuler
          </Button>
          <Button
            variant="contained" color="error" onClick={handleDeleteConfirm} disabled={deleteLoading}
            startIcon={<DeleteForeverIcon />}
            sx={{ textTransform: "none", fontWeight: 600, minWidth: 130 }}
          >
            {deleteLoading ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
