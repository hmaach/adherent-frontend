import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from 'react-redux';
import axios from "axios";
import CustomizedMenus from "./CustomizedMenus";
import { formatDistanceToNow } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Avatar, Badge } from "@mui/material";
import { selectCurrentUser } from "../../../../features/auth/authSlice";
import { downloadPDF } from "../../../../app/api/pdfAxios";
import GetCookie from "../../../../cookies/JWT/GetCookie";
import api from "../../../../app/api/baseURL";

const Post = (props, { setPosts }) => {

    const [post, setPost] = useState(props.post);
    const [like, setLike] = useState(post.liked);
    const token = GetCookie('jwt')
    const user = useSelector(selectCurrentUser)


    const images = post?.images?.map((image) => ({
        original: image,
        thumbnail: image,
    }));

    const [showFullContent, setShowFullContent] = useState(false);

    const handleToggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    const { handleUpdateCallback2, onSubmit } = props;

    const createdDate = new Date(post.created_at);

    const relativeTime = formatDistanceToNow(createdDate, { locale: frLocale, addSuffix: true });


    const handleUpdate = () => {
        handleUpdateCallback2('ff');
    };


    const likePost = (action) => {
        const headers = { Authorization: `Bearer ${token}` };
        api.post(`/poste/${post.id}/like`, { action }, { headers })
            .then(() => {
                if (action === 'like') {
                    setLike(true);
                    setPost({ ...post, reacts: post.reacts + 1 });
                } else if (action === 'dislike') {
                    setLike(false);
                    setPost({ ...post, reacts: post.reacts - 1 });
                }
            })
            .catch((error) => console.log(error));
    };
    const handleUpdateCallback = () => {
        handleUpdate()
    };


    const handleDownloadPDF = (pdfPath) => {
        downloadPDF(pdfPath)
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'istab.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.error('Error downloading PDF:', error);
            });
    };

    const handleDeletePost = (deletedPost) => {
        onSubmit(deletedPost);
    }

    const stringToColor = (string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (

        <div id="tweet-box">
            <div id="box-tweet">
                <div id="name-id">

                    <div style={{ display: "flex" }}>

                        <div id="profile-tweet">
                            {post.profile
                                ? <img
                                    src="ayadi.jpeg"
                                    alt="profile"
                                    id="image-profile"
                                />
                                : <Avatar id="image-profile" {...stringAvatar(`${post.prenom} ${post.nom}`)} />
                            }
                        </div>
                        <div className="publieur">

                            <span id="flex-tweet">

                                <p
                                    id="tweet-name"
                                    className="first-letter no-margin"
                                >
                                    {post.prenom} {post.nom}
                                </p>

                                <p
                                    id="type_poste"
                                    className="no-margin date_poste first-letter"
                                >
                                    <ManageAccountsIcon
                                        style={{ fontSize: '14px', marginBottom: "5px", marginRight: "3px" }}
                                    />{post.audience}{post.audience === "filiere" ? " | " + post.filiere_extention : ""}
                                </p>
                                <p
                                    id="type_poste"
                                    className="no-margin date_poste"
                                >
                                    <AccessTimeIcon style={{ fontSize: '13px', marginBottom: "3px", marginRight: "2px" }} /> {relativeTime}
                                </p>

                            </span>
                        </div>
                        <div className="type">
                            <Badge
                            className="first-letter"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                color="primary"
                                badgeContent={post.type}
                            >
                                {/* <span className="role_poste first-letter">( {post.role} )</span> */}
                                <span id="type_poste" className="first-letter"></span>
                            </Badge>
                        </div>

                    </div>

                    {user &&
                        <CustomizedMenus
                            user={user}
                            setPosts={setPosts}
                            onSubmit={handleDeletePost}
                            post={post}
                            handleUpdateCallback={handleUpdateCallback}
                        />
                    }
                </div>

                <div id="post-box">
                    <p id="text-tweet">
                        {showFullContent ? post.libelle : `${post.libelle.substring(0, 70)}`}
                        {!showFullContent && post?.libelle.length > 70 && (
                            <span className="voir_plus" onClick={handleToggleContent}>...Voir plus</span>
                        )}
                    </p>
                </div>
            </div>
            {/* {props.index === 1 && (
                <div className="img_box">
                    <img className="img_post_pub" src="/post_test.jpg" />
                </div>
            )} */}
            {post?.images?.length>0
            // !post.pdf_path 
            &&
                <div className="image_post">
                    <ImageGallery items={images} />
                </div>
            }


            {post.imgs?.map((img, index) => (
                <div key={index}>

                    <img
                        src={URL.createObjectURL(img)}
                        alt={`Image ${index}`}
                        className="img_post"
                    />
                </div>
            ))}

            {post.pdf_path && (
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <div className="pdf_box" onClick={() => handleDownloadPDF(post.pdf_path)}>
                        <span className="pdf_span">
                            <PictureAsPdfIcon />
                            <span>Télécharger PDF</span>
                        </span>
                        <span className="tele_pdf_span">
                            <SaveAltIcon />
                        </span>
                    </div>
                </div>
            )}

            {/* {props.index === 2 && (
                <div style={{ display: 'flex', justifyContent: 'start' }}>
                    <a className="post_lien" href="#">llllllllllslihjzaodizz</a>
                </div>
            )} */}



            {user ? (
                <div id="nav-bottom-post">
                    <div id="box-like-number">
                        {like
                            ? (
                                <span onClick={() => likePost('dislike')} className="like" id="nav-icon-box">
                                    {like === true ? <AiFillHeart id="red-heart" /> : <AiOutlineHeart />}
                                </span>
                            ) : (
                                <span onClick={() => likePost('like')} className="like" id="nav-icon-box">
                                    {like === true ? <AiFillHeart /> : <AiOutlineHeart />}
                                </span>
                            )
                        }
                        <span id="like-number">{post.reacts}</span>
                    </div>
                </div>
            )
                : <div id="nav-bottom-post">
                    <div id="box-like-number">
                        <span className=" like_no_hover" id="nav-icon-box">
                            <AiOutlineHeart />
                        </span>
                        <span id="like-number">{post.reacts}</span>
                    </div>
                </div>
            }

        </div>

    );
};

export default Post;
