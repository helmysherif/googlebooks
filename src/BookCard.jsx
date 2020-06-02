import React , {useState} from 'react';
import {Card,
    CardTitle,
    CardImg,
    CardBody,
    Button,
    Modal
} from 'reactstrap';
const BookCard = ({
    thumbnails,
    title,
    pageCount,
    language,
    authors,
    publisher,
    description,
    previewLink,
    infoLink
}) => {
    // states
    const [modal , setModal] = useState(false);
    const toggle = () => setModal(!modal); 
    return (
        <Card style = {{width:'233px'}} className = "m-auto">
            <CardImg top style = {{width:'100%' , height:'233px'}} src = {thumbnails} alt = "Card Img"/>
            <CardBody>
                <CardTitle className = "card-title">{title}</CardTitle>
                <Button onClick = {toggle}>More Info</Button>
            </CardBody>
            <Modal isOpen = {modal} toggle = {toggle}>
                <div className = "modal-header d-flex justify-content-center">
                    <h5 className = "modal-title text-center" id = "exampleModalLabel">{title}</h5>
                    <button aria-label = "close" className = "close" type = "button" onClick = {toggle}>
                        <span>X</span>
                    </button>
                </div>
                <div className = "modal-body">
                    <div className = "d-flex justify-content-between">
                        <img src = {thumbnails} alt = "Card Img" height = {{height:'233px'}}/>
                        <div>
                            <p>Page Count: {pageCount}</p>
                            <p>Language: {language}</p>
                            <p>Authors: {authors}</p>
                            <p>Publisher: {publisher}</p>
                        </div>
                    </div>
                    <div className = "mt-3">{description}</div>
                </div>
                <div className="modal-footer">
                    <div className="left-side">
                        <a href={previewLink} className = "btn-link" color = "default" type = "button" target = "_blank" rel = "nonpener noreferre">Preview Link</a>
                    </div>
                    <div className="right-side">
                        <a href={infoLink} className = "btn-link" color = "default" type = "button" target = "_blank" rel = "nonpener noreferre">Info Link</a>
                    </div>
                </div>
            </Modal>
        </Card>
    )
};
export default BookCard;