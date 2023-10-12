import React, { useEffect, useState } from "react";
import {
  getPublicPosts,
  PosterPost,
  SupprimerPost,
  UpdatePost,
} from "../../../app/api/postAxios";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import GetCookie from "../../../cookies/JWT/GetCookie";
import UpdatePostAlert from "./post/UpdatePostAlert";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import AddPost from "./post/AddPost";
import { debounce } from "lodash";
import Post from "./post/Post";
import "./main.css";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [err, setErr] = useState();
  const curUser = useSelector(selectCurrentUser);
  const token = GetCookie("jwt");
  const [activeButton, setActiveButton] = useState("all");
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const fetchPosts = async (get = null) => {
    try {
      getPublicPosts(activeButton, searchValue, token)
        .then((data) => {
          if (data) {
            if (get) {
              setPosts((prevPosts) => [...prevPosts, ...data?.postes]);
            } else {
              setPosts(data?.postes);
            }
            setFilieres(data.filieres);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setErr(error);
        });
    } catch (error) {
      setErr(error);
      console.log(err);
      setIsLoading(false);
    }
  };

  const fetchMorePosts = async () => {
    setIsLoadingMore(true);
    try {
      getPublicPosts(activeButton, null, token, page + 1)
        .then((data) => {
          if (data) {
            setPosts((prevPosts) => [...prevPosts, ...data.postes]);
            setPage(page + 1);
          }
          setIsLoadingMore(false);
        })
        .catch((error) => {
          setErr(error);
        });
    } catch (error) {
      setErr(error);
      console.log(err);
    }
  };

  const handlePosterPost = (post) => {
    PosterPost(post, token)
      .then((data) => {
        console.log(data.message);
        console.log(data.image_data);
        if (data.message === "success") {
          post = {
            ...post,
            id: data.post_id,
            user_id: curUser.id,
            nom: curUser.nom,
            prenom: curUser.prenom,
            role: curUser.role,
            reacts: 0,
            pdf_path: data.pdf_path,
            created_at: new Date().toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setRefetch(!refetch);
          setPosts((prevPosts) => [post, ...prevPosts]);

          toast.success("Publié avec succès", {
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
      })
      .catch((error) => {
        setErr(error);
        console.log(err);
        toast.error(err, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleUpdatePost = (updatedPost) => {
    UpdatePost(updatedPost, token)
      .then((data) => {
        console.log(data.message);

        if (data.message === "success") {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === updatedPost.id ? updatedPost : post
            )
          );
          toast.success("Modifié avec succès", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setRefetch(!refetch);
        }
      })
      .catch((error) => {
        setErr(error);
        console.log(err);
        toast.error(err, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleDeletePost = (deletedPost) => {
    if (deletedPost.user_id === curUser.id || curUser.role === "admin") {
      SupprimerPost(deletedPost.id, token)
        .then((data) => {
          console.log(data.message);
          if (data.message === "success") {
            setPosts((prevPosts) =>
              prevPosts.filter((p) => p.id !== deletedPost.id)
            );
            toast.success("Supprimé avec succès", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setRefetch(!refetch);
          }
        })
        .catch((error) => {
          setErr(error);
          console.log(err);
          toast.error(err, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      console.log("Vous n'avez pas le droit d'effacer ce poste");
    }
  };

  const handleUpdateCallback2 = (post) => {
    setSelectedPost(post);
    setShowUpdateAlert(true);
  };

  const handleClose = () => {
    setShowUpdateAlert(false);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPosts(false);
  }, [activeButton, refetch]);

  useEffect(() => {
    const fetchData = async (loading = null) => {
      try {
        if (loading) {
          setIsLoading(true);
        }
        if (curUser) {
          const data = await getPublicPosts(activeButton, searchValue, token);
          setPosts(data.postes);
          setIsLoading(false);
        } else {
          const data = await getPublicPosts(activeButton, searchValue);
          setPosts(data.postes);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const delayedFetchData = debounce(fetchData, 1500);

    if (curUser) {
      delayedFetchData(true);
    } else {
      delayedFetchData(true);
    }

    return () => {
      delayedFetchData.cancel();
    };
  }, [curUser, searchValue]);

  if (posts) {
    return (
      <div id="container-main">
        <div className="main-post-header">
          <div className="main-post-filter">
            <ButtonGroup
              disableElevation
              style={{ borderRadius: "10px" }}
              aria-label="Disabled elevation buttons"
            >
              <Button
                size="small"
                style={{ borderRadius: "20px 0 0 20px" }}
                variant={activeButton === "all" ? "contained" : "outlined"}
                onClick={() => setActiveButton("all")}
              >
                Tous
              </Button>
              <Button
                size="small"
                variant={activeButton === "announce" ? "contained" : "outlined"}
                onClick={() => setActiveButton("announce")}
              >
                Announces
              </Button>
              <Button
                size="small"
                variant={activeButton === "cour" ? "contained" : "outlined"}
                onClick={() => setActiveButton("cour")}
              >
                Cours
              </Button>
              <Button
                size="small"
                variant={activeButton === "exercice" ? "contained" : "outlined"}
                onClick={() => setActiveButton("exercice")}
                style={{ borderRadius: " 0 20px  20px 0" }}
              >
                Exercices
              </Button>
            </ButtonGroup>
          </div>
          <TextField
            className="main-post-search"
            value={searchValue}
            onChange={handleSearch}
            size="small"
            id="outlined-search"
            label="Chercher publications..."
            type="search"
            InputProps={{
              style: { borderRadius: "20px" },
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              color: "#1DA1F2",
            }}
          />
        </div>
        {curUser &&
          (curUser.role === "admin" || curUser.role === "formateur") && (
            <AddPost
              onSubmit={handlePosterPost}
              filieres={filieres}
              user={curUser}
            />
          )}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {posts.map((post, index) => (
              <Post
                key={index}
                post={post}
                index={index}
                onSubmit={handleDeletePost}
                setPosts={setPosts}
                handleUpdateCallback2={() => handleUpdateCallback2(post)}
              />
            ))}
            {searchValue.length === 0 && (
              <div className="div_get_more">
                {isLoadingMore ? (
                  <CircularProgress />
                ) : posts.length !== 0 ? (
                  <Button
                    onClick={fetchMorePosts}
                    variant="outlined"
                    style={{
                      borderRadius: "20px",
                      marginTop: "0.5rem",
                    }}
                  >
                    Avoir plus
                  </Button>
                ) : (
                  <span className="main-no-posts">
                    Aucune publication trouvée !
                  </span>
                )}
              </div>
            )}
          </>
        )}

        {showUpdateAlert && (
          <UpdatePostAlert
            onSubmit={handleUpdatePost}
            post={selectedPost}
            open={true}
            filieres={filieres}
            handleClose={handleClose}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Main;
