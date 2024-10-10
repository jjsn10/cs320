import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './App.css'

function App(){

  const navigate = useNavigate();
  const navigateToPage2 = () => {
    navigate('/page2');
  }

  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  //const [submittedData, setSubmittedData] = useState(null);



  const handleSubmit = async (e)=>{
    e.preventDefault();
    //const data = {firstName, lastName};
    //console.log(data)
    try{
      const response = await fetch(`/hello/personalized`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({first: firstName, last: lastName}),
      });

      if(response.ok){
        //const result = await response.json();
        const result = await response.text()
        setMessage(result)
        setFirstName('')
        setLastName('')
        //console.log(result);

      }else{
        console.error('Error submitting form:',response.statusText);
      }
    }catch(error){
      console.error('Error:',error);
    }
  };

  return (
      <div className="container">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <h2>Personalized Greeting</h2>
            <div className="name">
              <label>First Name: </label>
              <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="last">
              <label>Last Name: </label>
              <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <button type="submit" className="submit">Submit</button>
            <button onClick={navigateToPage2} className="page2">Page 2</button>
          </form>
        </div>
        {message && (
            <div>
            <p>{message}</p>
            </div>
        )}

      </div>
  );
}

export default App;