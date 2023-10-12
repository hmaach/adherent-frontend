import React from 'react';
import { PictureAsPdf } from '@mui/icons-material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import './Post.css'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Switch,
    Autocomplete,
    TextField,
} from '@mui/material';
import { useRef } from 'react';

export default function SimpleAccordion({ filieres, onSubmit, user }) {

    const archive_categorie = user.pdf_categories;
    const [postLib, setPostLib] = useState('');
    const [postType, setPostType] = useState('');
    const [audience, setAudience] = useState('');
    const [filiere_id, setFiliere] = useState('');
    const [pdf_file, setPdf_file] = useState(null);
    const [imgs, setImgs] = useState([]);
    const [pdf_archive_categorie, setPdf_archive_categorie] = useState(false);
    const [pdf_archive_categorie_value, setPdf_archive_categorie_value] = useState(null);
    const [libelle_pdf, setLibelle_pdf] = useState('');
    const PdfInputRef = useRef(null);
    const ImgInputRef = useRef(null);
    const maxLength = 100;

    const handleChangeAudience = (event) => {
        setAudience(event.target.value);
    };

    const handleChangeFiliere = (event) => {
        setFiliere(event.target.value)

    };

    const handlePostTypeChange = (e) => {
        setPostType(e.target.value)
    }

    const handleChange = (e) => {
        const text = e.target.value;
        setPostLib(text);
    };

    const handlePdfIconClick = () => {
        PdfInputRef.current.click();
    };

    const handleIconClickImg = () => {
        ImgInputRef.current.click();
    };

    const handleFileSelect = (event) => {
        setPdf_file(event.target.files[0])
    };

    const addPdfToArchive = (e) => {
        setPdf_archive_categorie(!pdf_archive_categorie)
    };

    const handleChange_pdf_categorie = (e, value) => {
        if (value) {
            const option = archive_categorie.find((item) => item.id === value.id);
            if (option) {
                setPdf_archive_categorie_value(option);
                console.log(option);
            } else {
                // Handle the case when the selected option is not found
                console.log("Selected option not found");
            }
        } else {
            setPdf_archive_categorie_value(null);
        }
    };

    const removePdf = (e) => {
        e.preventDefault()
        setPdf_file(null)
        setPdf_archive_categorie(false)
    };

    const handleImagesSelect = (event) => {
        const files = event.target.files;
        const selectedImages = Array.from(files).slice(0, 10);
        setImgs((prevImgs) => [...prevImgs, ...selectedImages]);
        console.log(selectedImages);
    };

    const removeImage = (index) => {
        if (imgs.length === 1) {
            setImgs([])
        } else
            setImgs((prevImgs) => prevImgs.filter((_, i) => i !== index));
    };



    const handleSubmit = (e) => {

        e.preventDefault()
        const postLibelle = postLib;
        const postTypeValue = postType;
        const newPost = {
            libelle: postLibelle,
            type: postTypeValue,
            audience: audience,
            audience_id: filiere_id,
            pdf: pdf_file,
            pdf_archive_categorie: pdf_archive_categorie,
            pdfCategorieId: pdf_archive_categorie_value?.id,
            libelle_pdf:libelle_pdf,
            imgs: imgs,

        };

        onSubmit(newPost);
        // console.log(newPost);
        setPostLib('');
        setPostType('');
        setAudience('');
        setFiliere('');
        setPdf_archive_categorie_value(null);
        setPdf_archive_categorie(false);
        setPdf_file(null)
        setLibelle_pdf(null)
        setImgs([]);
    };

    return (
        <div className='addPost'>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Ajouter un poste</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit} className="wrapper">
                        <div className='filtrage_audience'>
                            <FormControl sx={{ m: 0, minWidth: 130, }}>
                                <InputLabel id="demo-simple-select-autowidth-label " sx={{ fontSize: '17px', marginTop: '-11px' }}>Audience</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={audience}
                                    onChange={handleChangeAudience}
                                    autoWidth
                                    required
                                    label="Audience"
                                    sx={{ height: '34px', borderRadius: '20px' }}
                                >
                                    <MenuItem value="public">Public</MenuItem>
                                    <MenuItem value="etablissement">Etablissement</MenuItem>
                                    <MenuItem value="filiere">Filière</MenuItem>
                                    <MenuItem value="formateurs">Formateurs</MenuItem>
                                </Select>
                            </FormControl>
                            {audience === "groupe" || audience === "filiere" ?
                                <FormControl sx={{ m: 0, minWidth: 100, }}>
                                    <InputLabel id="demo-simple-select-autowidth-label " sx={{ fontSize: '17px', marginTop: '-11px' }}>Filière</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={filiere_id}
                                        onChange={handleChangeFiliere}
                                        autoWidth
                                        required
                                        label="Filière"
                                        sx={{ height: '34px', borderRadius: '20px' }}
                                    >
                                        {filieres &&
                                            filieres.map(filiere => {
                                                return (<MenuItem key={filiere.id} value={filiere.id}>{filiere.libelle}</MenuItem>)
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                : null
                            }
                        </div>
                        <textarea
                            className="input-box"
                            value={postLib}
                            onChange={handleChange}
                        >
                        </textarea>
                        {pdf_file &&
                            <div className='pdf_file'>
                                <span className='pdf_name'>{pdf_file.name.substring(0, 15)}...pdf</span>
                                <div className='switch_pdf'>
                                    <Switch
                                        id="pdf_archive"
                                        onChange={addPdfToArchive}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <label htmlFor="pdf_archive" className='label_archive_pdf'>Ajouter au archive</label>
                                </div>
                                <span className='remove_pdf' onClick={removePdf}><CloseIcon /></span>
                            </div>
                        }
                        {pdf_file && pdf_archive_categorie
                            ?
                            <div className='pdf_categorie'>
                                <TextField 
                                id="standard-basic" 
                                label="Nom du document" 
                                className='nom_document' 
                                variant="standard"
                                required
                                value={libelle_pdf}
                                onChange={(e)=>setLibelle_pdf(e.target.value)}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    required
                                    options={archive_categorie}
                                    value={pdf_archive_categorie_value}
                                    onChange={(event, newValue) => {
                                        setPdf_archive_categorie_value(newValue);
                                    }}
                                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Categorie" />}
                                />
                            </div>
                            : null}
                        {imgs && (
                            <div className="imgs_post">
                                {imgs.map((img, index) => (
                                    <div key={index}>
                                        <span className="remove_img" onClick={() => removeImage(index)}>
                                            <DeleteIcon />
                                        </span>
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`Image ${index}`}
                                            className="img_post"
                                        />
                                    </div>
                                ))}
                                {imgs.length < 10 && imgs.length != 0 ?
                                    <span className='plus_img' onClick={handleIconClickImg}>
                                        <input
                                            type="file"
                                            id="pdfInput"
                                            accept=".png, .jpg"
                                            multiple
                                            ref={ImgInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleImagesSelect}
                                        />
                                        <AddPhotoAlternateIcon />
                                    </span>
                                    : null
                                }
                            </div>
                        )}
                        <div className="bottom-add-post">
                            <ul className="icons-add-post">
                                <li>
                                    <FormControl sx={{ m: 0, minWidth: 153 }}>
                                        <InputLabel
                                            id="demo-simple-select-autowidth-label"
                                            sx={{ fontSize: '17px', marginTop: '-11px' }}
                                        >
                                            Type de poste
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            autoWidth
                                            label="Type de poste"
                                            value={postType}
                                            sx={{ height: '34px', borderRadius: '20px' }}
                                            required
                                            onChange={handlePostTypeChange}
                                        >
                                            <MenuItem value="announce">Announce</MenuItem>
                                            <MenuItem value="cour">Cour</MenuItem>
                                            <MenuItem value="exercice">Exercice</MenuItem>
                                        </Select>
                                    </FormControl>
                                </li>
                                {!pdf_file && imgs.length === 0 ?
                                    < li className="pdfPost" onClick={handlePdfIconClick}>
                                        <input
                                            type="file"
                                            id="pdfInput"
                                            accept=".pdf"
                                            ref={PdfInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileSelect}
                                        />
                                        <PictureAsPdf />
                                    </li>
                                    : null
                                }
                                {!pdf_file && imgs.length === 0 ?
                                    <li className="pdfPost" onClick={handleIconClickImg}>
                                        <input
                                            type="file"
                                            id="pdfInput"
                                            accept=".png, .jpg"
                                            multiple
                                            ref={ImgInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleImagesSelect}
                                        />
                                        <AddPhotoAlternateIcon />
                                    </li>
                                    : null
                                }
                            </ul>
                            <div className="content">
                                <span className="counter">{maxLength - postLib.length}</span>
                                <button
                                    className={postLib.length > 0 ? 'active_poster' : ''}
                                    type="submit"
                                >
                                    Poster
                                </button>
                            </div>
                        </div>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div >
    );
}
