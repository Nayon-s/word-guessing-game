import React, { useEffect, useState } from 'react'
import words from './words'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Guess = () => {
  const [text, setText] =useState('')
  const [result, setResult]=useState(0)
  const [wordIndex, setWordIndex]=useState(0)
  const [attempts,setAttempts]=useState(5)
  const handleChange = (e) => {
    const values = e.target.value;
    setText(values);
  }; 
  
  
  useEffect(() => {
    
    if (text === words[wordIndex].word) {
      
      toast.success('🦄 Congrats! You have done it.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setResult(previousResult => previousResult + 1);
        setWordIndex(previousIndex => previousIndex +1)
        setText('')
  
    }
    else if (text !== words[wordIndex].word && text.length === words[wordIndex].word.length) {
     if(attempts!==1){
      toast.warn('Sorry! Try Again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        
      }
      setAttempts(previousAttempts => previousAttempts -1)
        
        setText('')
        if(attempts===1){
      toast.error('Game Over! You have scored ' + result , {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setResult(0)
        setAttempts(5)
        setWordIndex(0)
    };
    }

    
  }, [text,wordIndex,attempts,result]);

  const newWord=()=>{
    setAttempts(attempts-1)
    setWordIndex(wordIndex+1)
    setText('')
    if(attempts===1){
      toast.error('Game Over! You have scored ' + result , {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setResult(0)
        setAttempts(5)
        setWordIndex(0)
    }
  }
  return (
       <div className="container d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
      <div className="card " style={{width: "22rem", backgroundColor:"#F5F5F5", border:"10px solid black"}}>
      <div className="d-block m-auto card-body">
      <h3 className="card-title">Guess the Word</h3>
      <p className="card-title fw-semibold">Word Length: {words[wordIndex].word.length} Characters</p>
      <p className="card-title fw-bold ">Hint: {words[wordIndex].hint}</p>
      <input type="text" onChange={handleChange} value={text} maxLength={words[wordIndex].word.length} />
      <h5 className="card-title mt-3">Score: {result}</h5>
      <p className="card-title mt-1 fw-bold" style={{color: "red"}}>{attempts===1? "Last Attempt":attempts + " Attempts Left"}</p>
      <button disabled={attempts===1} type="button" className="btn btn-dark mt-2" onClick={newWord}>Try Another</button>
      <ToastContainer />
      </div>
      </div>
      

      </div>  
      
   
  )
}

export default Guess

