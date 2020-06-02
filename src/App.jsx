import React , {useState} from 'react';
import './App.css';
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
  Spinner
} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer , toast} from 'react-toastify';
import axios from 'axios';
import BookCard from './BookCard.jsx';
function App() {
  //states
  const [maxResult , setMaxResult] = useState(10);
  const [startIndex , setStartIndex] = useState(1);
  const [query , setQuery] = useState('');
  const [loading , setLoading] = useState(false);
  const [cards , setCards] = useState([]);
  const handleSubmit = () => {
    setLoading(true);
    if(maxResult > 40 || maxResult < 1){
      toast.error('Max Result Must Between 1 And 40');
    }else{
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResult=${maxResult}&startIndex=${startIndex}`).then(res => {
        if(startIndex >= res.data.totalItems || startIndex < 1){
          toast.error(`Max Result Must Between 1 And ${res.data.totalItems}`)
        }else{
          if(res.data.items.length > 0){
            setCards(res.data.items);
            setLoading(false);
          }
        }
      }).catch(err => {
        setLoading(true);
        toast.error(`${err.response.data.error.message}`)
      })
    }
  }
  const mainHeader = () => {
    return (
      <div className = "main-image d-flex justify-content-center align-items-center flex-column">
        <div className="filter"></div>
        <h1 className = "display-2 text-center text-white mb-3" style = {{zIndex:2}}>Google Books</h1>
        <div style = {{width:'60%',zIndex:2}}>
          <InputGroup size = '1g' className = "mb-3">
            <Input 
              placeholder = "Book Search" 
              value = {query} 
              onChange = {e => setQuery(e.target.value)}/>
            <InputGroupAddon addonType = "append">
              <Button color = "secondary" onClick = {handleSubmit}>
                <i className = "fas fa-search"></i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <div className="d-flex text-white justify-content-center">
            <FormGroup className = "ml-5">
              <Label for = 'maxResults'>Max Result</Label>
              <Input 
                type = 'number' 
                id = 'maxResults' 
                placeholder = 'Max Result'
                value = {maxResult} 
                onChange = {e => setMaxResult(e.target.value)}/>
            </FormGroup>
            <FormGroup className = "ml-5">
              <Label for = 'startIndex'>Start Index</Label>
              <Input 
                type = 'number' 
                id = 'startIndex' 
                placeholder = 'Start Index'
                value = {startIndex} 
              onChange = {e => setStartIndex(e.target.value)}/>
            </FormGroup>
          </div>
        </div>
      </div>
    )
  }
  const handleCards = () => {
    const items = cards.map((item,i) => {
      let thumbnails = '';
      if(item.volumeInfo.imageLinks.thumbnail){
        thumbnails = item.volumeInfo.imageLinks.thumbnail;
      }
      return (
        <div className="col-lg-4 mb-3" key = {item.id}>
          <BookCard 
            thumbnails = {thumbnails}
            title = {item.volumeInfo.title}
            pageCount = {item.volumeInfo.pageCount}
            language = {item.volumeInfo.language}
            authors = {item.volumeInfo.authors}
            publisher = {item.volumeInfo.publisher}
            description = {item.volumeInfo.description}
            previewLink = {item.volumeInfo.previewLink}
            infoLink = {item.volumeInfo.infoLink}
          />
        </div>
      )
    })
    if(loading){
      return (
        <div className = "d-flex justify-content-center">
          <Spinner style = {{width:'3rem',height:'3rem',marginTop:'40px'}}/>
        </div>
      )
    }else{
      return (
        <div className="container mb-5">
          <div className="row">
            {items}
          </div>
        </div>
      )
    }
  }
  return (
    <div className = "w-100 h-100">
      {mainHeader()}
      {handleCards()}
      <ToastContainer />
    </div>
  );
}
export default App;
