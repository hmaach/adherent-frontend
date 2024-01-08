import React, { useEffect, useState } from "react";
import { getUsers } from "../../../app/api/userAxios";
import GetCookie from "../../../cookies/JWT/GetCookie";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import PublishIcon from "@mui/icons-material/Publish";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Badge,
  Button,
  ButtonGroup,
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
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import AddUser from "./AddUser";
import ManageUser from "./ManageUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [page, setPage] = useState(0);
  const [showAddUserAlert, setShowAddUserAlert] = useState(false);
  const [showManageUserAlert, setShowManageUserAlert] = useState(false);
  const [userToManage, setUserToManage] = useState(null);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const token = GetCookie("jwt");
  const cur_user = useSelector(selectCurrentUser);

  const fetchData = async (newPage = 1) => {
    const qpage = newPage + 1 || page + 1;
    getUsers(qpage, rowsPerPage, query, role, token)
      .then((data) => {
        if (data) {
          setUsers(data?.data);
          setTotal(data?.total);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleOpenAddAlert = () => {
    setShowAddUserAlert(true);
  };

  const handlecloseAddAlert = () => {
    setShowAddUserAlert(false);
  };

  const handleOpenManageAlert = (userId) => {
    setShowManageUserAlert(true);
    setUserToManage(userId);
  };

  const handlecloseManageAlert = () => {
    setShowManageUserAlert(false);
    setUserToManage(null);
  };

  const columns = [
    { id: "id", label: "ID", minWidth: 85 },
    { id: "nom", label: "Nom", minWidth: 100 },
    { id: "prenom", label: "Prénom", minWidth: 100 },
    { id: "role", align: "center", label: "Rôle", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 300 },
    {
      id: "created_at",
      label: "Créé le",
      format: (value) => new Date(value).toLocaleString(),
      minWidth: 180,
    },
    {
      id: "updated_at",
      label: "Mis à jour le",
      format: (value) => new Date(value).toLocaleString(),
      minWidth: 180,
    },
    {
      id: "details",
      label: "Détails",
      minWidth: 100,
      align: "center",
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              handleOpenManageAlert(params);
            }}
            aria-label="edit"
            sx={{ margin: "auto" }}
          >
            <ManageAccountsIcon />
          </IconButton>
        </div>
      ),
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

  const highlightQuery = (text, query) => {
    if (!query || query.trim() === "") {
      return text;
    }

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    let timerId;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      setPage(0);
      setLoading(true);
      fetchData();
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    setPage(0);
    setLoading(true);
    fetchData();
  }, [rowsPerPage, role, refetch]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <OutlinedInput
          sx={{ maxHeight: 40, minWidth: 300 }}
          color="warning"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher..."
          id="standard-adornment-amount"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <Divider
          sx={{ height: 35, borderWidth: 1, color: "gray" }}
          orientation="vertical"
        />
        <Select
          sx={{ maxHeight: 40 }}
          color="warning"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="all">- Tous -</MenuItem>
          <MenuItem value="adherent">Adhérents</MenuItem>
          <MenuItem value="admin">Admins</MenuItem>
          <MenuItem value="user">Utilisateurs</MenuItem>
        </Select>
        <Divider
          sx={{ height: 35, borderWidth: 1, color: "gray" }}
          orientation="vertical"
        />
        <ButtonGroup
          variant="outlined"
          color="warning"
          aria-label="text button group"
          sx={{ marginBottom: " 1rem", minHeight: 40 }}
          size="small"
        >
          <Button
            onClick={() => handleOpenAddAlert()}
            endIcon={<PersonAddIcon />}
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

      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth, fontWeight: 700 }}
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
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={30}
                    sx={{ marginBottom: 2 }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={30}
                    sx={{ marginBottom: 2 }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={30}
                    sx={{ marginBottom: 2 }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={30}
                    sx={{ marginBottom: 2 }}
                    animation="wave"
                  />
                </TableCell>
              </TableRow>
            ) : (
              users.map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  style={{
                    backgroundColor:
                      cur_user && cur_user.id === row.id
                        ? "#e0e0e0"
                        : "inherit",
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align="left">
                      {column.id === "role" ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "2rem",
                          }}
                        >
                          <Badge
                            color={
                              row.role === "admin"
                                ? "error"
                                : row.role === "adherent"
                                ? "warning"
                                : "primary"
                            }
                            badgeContent={
                              row.role === "user"
                                ? "Utilisateur"
                                : row.role === "admin"
                                ? "Admin"
                                : row.role === "adherent"
                                ? "Adhérent"
                                : ""
                            }
                          />
                        </div>
                      ) : column.id === "details" ? (
                        column.renderCell(row)
                      ) : column.format ? (
                        column.format(row[column.id])
                      ) : (
                        highlightQuery(row[column.id].toString(), query)
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handleChangePage(event, newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {showAddUserAlert && (
        <AddUser
          open={true}
          handleclose={handlecloseAddAlert}
          refetch={refetch}
          setRefetch={setRefetch}
        />
      )}
      {showManageUserAlert && userToManage ? (
        <ManageUser
          open={true}
          handleclose={handlecloseManageAlert}
          refetch={refetch}
          setRefetch={setRefetch}
          user={userToManage}
        />
      ) : null}
    </div>
  );
};

export default Users;
