import React, { useEffect, useState } from "react";
import GetCookie from "../../../cookies/JWT/GetCookie";
import api from "../../../app/api/baseURL";
import url from "../../../app/api/url";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import {
  Badge,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  TextField
} from "@mui/material";

const Abonnements = () => {
  const [adherents, setAdherents] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAdherent, setSelectedAdherent] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [editPaymentReference, setEditPaymentReference] = useState("");
  const [editAdminNotes, setEditAdminNotes] = useState("");

  const token = GetCookie("jwt");

  const fetchData = async (newPage = 1) => {
    try {
      setLoading(true);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await api.get(`/admin/abonnement`, {
        headers,
        params: {
          page: newPage,
          per_page: rowsPerPage,
          search: query,
          status: status
        }
      });
      setAdherents(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleEditClick = (adherent) => {
    setSelectedAdherent(adherent);
    setEditStatus(adherent.subscription_status || "pending");
    setEditEndDate(adherent.subscription_end_date ? adherent.subscription_end_date.split('T')[0] : "");
    setEditPaymentReference(adherent.payment_reference || "");
    setEditAdminNotes(adherent.payment_admin_notes || "");
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await api.put(`/admin/abonnement/update/${selectedAdherent.id}`, {
        status: editStatus,
        end_date: editEndDate,
        payment_reference: editPaymentReference,
        payment_admin_notes: editAdminNotes
      }, { headers });
      setOpenDialog(false);
      setRefetch(!refetch);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "user.nom", label: "Nom & Prénom", minWidth: 150, format: (val, row) => `${row.user?.nom} ${row.user?.prenom}` },
    { id: "profession", label: "Profession", minWidth: 150 },
    { id: "subscription_status", align: "center", label: "Statut", minWidth: 100 },
    { id: "subscription_end_date", label: "Date d'expiration", minWidth: 120, format: (val) => val ? new Date(val).toLocaleDateString() : 'N/A' },
    { id: "payment_method", label: "Paiement", minWidth: 120 },
    { id: "payment_reference", label: "Référence", minWidth: 120 },
    { id: "payment_proof_path", label: "Preuve", minWidth: 100 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 80,
      align: "center",
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchData(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setPage(0);
      fetchData(1);
    }, 500);
    return () => clearTimeout(timerId);
  }, [query]);

  useEffect(() => {
    setPage(0);
    fetchData(1);
  }, [rowsPerPage, status, refetch]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <OutlinedInput
          sx={{ maxHeight: 40, minWidth: 300 }}
          color="primary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher (Nom, Email, Profession)..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <FormControl size="small">
          <Select
            sx={{ maxHeight: 40, minWidth: 150 }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="all">Tous les statuts</MenuItem>
            <MenuItem value="active">Actif</MenuItem>
            <MenuItem value="expired">Expiré</MenuItem>
            <MenuItem value="pending">En attente</MenuItem>
            <MenuItem value="cancelled">Annulé</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: '#f8f9fa' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Skeleton variant="rectangular" width="100%" height={30} sx={{ my: 1 }} />
                  <Skeleton variant="rectangular" width="100%" height={30} sx={{ my: 1 }} />
                  <Skeleton variant="rectangular" width="100%" height={30} sx={{ my: 1 }} />
                </TableCell>
              </TableRow>
            ) : (
              adherents.map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align || "left"}>
                      {column.id === "subscription_status" ? (
                        <Badge
                          color={
                            row.subscription_status === "active" ? "success" :
                            row.subscription_status === "expired" ? "error" :
                            row.subscription_status === "cancelled" ? "default" : "warning"
                          }
                          badgeContent={
                             row.subscription_status === "active" ? "Actif" :
                             row.subscription_status === "expired" ? "Expiré" :
                             row.subscription_status === "cancelled" ? "Annulé" : "En attente"
                          }
                          sx={{ '& .MuiBadge-badge': { position: 'static', transform: 'none' } }}
                        />
                      ) : column.id === "payment_proof_path" ? (
                        row.payment_proof_path ? (
                          <Button
                            size="small"
                            href={`${url}/storage/${row.payment_proof_path}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Voir
                          </Button>
                        ) : 'N/A'
                      ) : column.id === "actions" ? (
                        <IconButton onClick={() => handleEditClick(row)} size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      ) : column.format ? (
                        column.format(row[column.id], row)
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
            {!loading && adherents.length === 0 && (
              <TableRow>
                 <TableCell colSpan={columns.length} align="center">Aucun abonnement trouvé.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Gérer l'abonnement</DialogTitle>
        <DialogContent sx={{ minWidth: '400px', pt: 2 }}>
          {selectedAdherent && (
             <div style={{ marginTop: '10px' }}>
                <p><strong>Adhérent:</strong> {selectedAdherent.user?.nom} {selectedAdherent.user?.prenom}</p>
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                  <InputLabel id="status-label">Statut</InputLabel>
                  <Select
                    labelId="status-label"
                    value={editStatus}
                    label="Statut"
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <MenuItem value="active">Actif</MenuItem>
                    <MenuItem value="expired">Expiré</MenuItem>
                    <MenuItem value="pending">En attente</MenuItem>
                    <MenuItem value="cancelled">Annulé</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  label="Date d'expiration"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={editEndDate}
                  onChange={(e) => setEditEndDate(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Référence du paiement"
                  value={editPaymentReference}
                  onChange={(e) => setEditPaymentReference(e.target.value)}
                  sx={{ mt: 2 }}
                />

                <TextField
                  fullWidth
                  label="Notes admin"
                  value={editAdminNotes}
                  onChange={(e) => setEditAdminNotes(e.target.value)}
                  multiline
                  rows={3}
                  sx={{ mt: 2 }}
                />
             </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">Annuler</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Abonnements;
