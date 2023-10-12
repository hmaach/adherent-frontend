import React, { useEffect, useState } from 'react';
import { DeleteCategory, UpdateCategory, addCategory, getMyArchive } from '../../app/api/ArchiveAxios';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import GetCookie from '../../cookies/JWT/GetCookie';
import DataTable from './DataTable';
import './archives.css';
import AddCategoryAlert from './AddCategoryAlert';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Button, ButtonGroup, CircularProgress, InputAdornment, TextField } from '@mui/material';
// import { Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Archives = () => {
  const token = GetCookie('jwt');
  const user = useSelector(selectCurrentUser)
  const [pdfCategories, setPdfCategories] = useState([]);
  const [categoriesOwners, setCategoriesOwners] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("all")
  // const [selectedId, setSelectedId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [totalCategories, setTotalCategories] = useState(0)


  const handleGetMyArchive = (activeButton, searchValue) => {
    const token = GetCookie('jwt');

    getMyArchive(activeButton, searchValue, token)
      .then((data) => {
        setPdfCategories(data.pdfCategories);
        setCategoriesOwners(data.users.map((owner) => owner.user_name));
        setTotalCategories(data.totalCategories);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };


  const fetchMoreCategories = async () => {
    setIsLoadingMore(true)
    try {
      getMyArchive(activeButton, null, token, page + 1)
        .then((data) => {
          setPdfCategories((prevPdfCategories) => [...prevPdfCategories, ...data.pdfCategories]);
          setPage(page + 1)
          setTotalCategories(data.totalCategories)
          setIsLoadingMore(false)

        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }


  const handleCategoryClick = (categoryId) => {
    setPdfCategories((prevCategories) => {
      return prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            showPDFs: !category.showPDFs,
          };
        } else {
          return {
            ...category,
            showPDFs: false,
          };
        }
      });
    });
  };

  const handleAddCategory = (addedCategoryLabel) => {
    try {
      addCategory(addedCategoryLabel, token)
        .then((data) => {
          if (data.message === "success") {
            setPdfCategories(prevCategories => {
              const newCategory = {
                id: prevCategories.length + 1,
                label: addedCategoryLabel,
                user_name: user.prenom + " " + user.nom,
                updated_at: new Date().toISOString(),
                "pdfs": []
              };
              return [newCategory, ...prevCategories];
            });
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



  const handleUpdateCategory = (updatedCategory) => {
    try {
      UpdateCategory(updatedCategory, token)
        .then((data) => {
          if (data.message === "success") {
            setPdfCategories(prevCategories => {
              const updatedCategories = prevCategories.map(category => {
                if (category.id === updatedCategory.id) {
                  return { ...category, ...updatedCategory };
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

  const handleDeleteCategory = (categoryId) => {
    try {
      DeleteCategory(categoryId, token)
        .then((data) => {
          if (data.message === "success") {
            setPdfCategories(prevCategories => {
              const updatedCategories = prevCategories.filter(category => category.id !== categoryId);
              return updatedCategories;
            });
            toast.success('Supprimé avec succès', {
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

  const handleOpenAlert = () => {
    setIsAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const handleActiveButton = (filter) => {
    setActiveButton(filter)
  }

  useEffect(() => {
    const fetchData = async (loading = null, token = null) => {
      try {
        if (loading) {
          setIsLoading(true);
        }
        if (user) {
          const data = await getMyArchive(activeButton, searchValue, token);
          setPdfCategories(data.pdfCategories);
          setCategoriesOwners(data.users.map((owner) => owner.user_name));
          setIsLoading(false);
        } else {
          const data = await getMyArchive(activeButton, searchValue);
          setPdfCategories(data.pdfCategories);
          setCategoriesOwners(data.users.map((owner) => owner.user_name));
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const delayedFetchData = debounce(fetchData, 500);

    if (user) {
      fetchData(true, token);
    } else {
      fetchData(true);
    }

    const interval = setInterval(() => {
      fetchData(false);
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
      delayedFetchData.cancel();
    };
  }, [user, activeButton, token]);

  // search useEffect
  useEffect(() => {
    const fetchData = async (loading = null) => {
      try {
        if (loading) {
          setIsLoading(true);
        }
        if (user) {
          const data = await getMyArchive(activeButton, searchValue, token);
          setPdfCategories(data.pdfCategories);
          setCategoriesOwners(data.users.map((owner) => owner.user_name));
          setIsLoading(false);
        } else {
          const data = await getMyArchive(activeButton, searchValue);
          setPdfCategories(data.pdfCategories);
          setCategoriesOwners(data.users.map((owner) => owner.user_name));
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const delayedFetchData = debounce(fetchData, 1500);

    if (user) {
      delayedFetchData(true);
    } else {
      delayedFetchData(true);
    }

    return () => {
      delayedFetchData.cancel();
    };
  }, [user, searchValue]);


  return (
    <div className='archives'>
      <div className="archive-header">
        {user?.role === "formateur" || user?.role === "admin" ? (
          <div>
            <Button
              variant="contained"
              endIcon={<PlaylistAddIcon />}
              className='archive-ajouter'
              onClick={handleOpenAlert}
              style={{
                borderRadius: '20px',
                backgroundColor: 'var(--color-primary)',
              }}
            >Ajouter</Button>
          </div>
        ) : null}
        {user?.role === "formateur" || user?.role === "admin" ? (
          <div className="archive-filter">
            <ButtonGroup
              disableElevation
              style={{ borderRadius: '10px' }}
              aria-label="Disabled elevation buttons"
            >
              <Button
                style={{ borderRadius: '20px 0 0 20px' }}
                variant={activeButton === "all" ? "contained" : "outlined"}
                onClick={() => handleActiveButton("all")}
              >Tous</Button>
              <Button
                style={{ borderRadius: ' 0 20px  20px 0' }}
                variant={activeButton === "own" ? "contained" : "outlined"}
                onClick={() => setActiveButton("own")}
              >Mes propres</Button>
            </ButtonGroup>
          </div>
        ) : null}
        <TextField
          className='archive-search'
          value={searchValue}
          onChange={handleSearch}
          size="small"
          id="outlined-search"
          label="Chercher categories, pdf..."
          type="search"
          InputProps={{
            style: { borderRadius: '20px' },
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}

          sx={{
            color: '#1DA1F2',
          }}
        />
      </div>
      {/* <span>{selectedId}</span> */}
      {/* <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={categoriesOwners}
        sx={{ width: 300 }}
        value={selectedId}
        onChange={handleChangeOwner}
        renderInput={(params) => <TextField {...params} label="Categories owners" />}
      /> */}

      <DataTable
        data={pdfCategories}
        onCategoryClick={handleCategoryClick}
        onUpdate={handleUpdateCategory}
        onDelete={handleDeleteCategory}
        isLoading={isLoading}
        fetchMoreCategories={fetchMoreCategories}
        isLoadingMore={isLoadingMore}
      />
      {searchValue.length === 0 && (
        < div className="div_get_more">
          {isLoadingMore ? (
            <CircularProgress />
          ) : (
            pdfCategories.length !== totalCategories && pdfCategories.length != 0 ? (

              <Button onClick={fetchMoreCategories}
                variant="outlined"
                style={{
                  borderRadius: '20px',
                  marginTop: '0.5rem'
                }}
              >Avoir plus</Button>
            ) : null
          )}
        </div>
      )}
      {isAlertOpen && (
        <AddCategoryAlert
          open={true}
          onSubmit={handleAddCategory}
          handleClose={handleCloseAlert}
        />
      )}
    </div>
  );
};

export default Archives;
