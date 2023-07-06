import './App.css';
import {useRef, useState} from "react";
import axios from "axios";
import {youtube_parser} from "./utils.jsx";

function App() {
   const inputUrlRef = useRef();
   const [urlResult, setUrlResult] = useState(null);

   const handleSubmit = (e) => {
       e.preventDefault();
       console.log(inputUrlRef.current.value);
       const youtubeID = youtube_parser(inputUrlRef.current.value);
       console.log(youtubeID);

       const options = {
           method: 'GET',
           url: 'https://youtube-mp36.p.rapidapi.com/dl',
           headers: {
               'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
               'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
           },
           params: {
               id: youtubeID,
           }
       }
       axios(options)
           .then(res => setUrlResult(res.data.link))
           .catch(err => console.log(err))

       inputUrlRef.current.value = "";
   }

  return (
    <div className="app">
        <span className="logo">youtube2mp3</span>
        <section className="content">
            <h1 className="content_title">
                YouTube to MP3 Converter
            </h1>
            <p className="content_description">
                Convert and download youtube videos to mp3 (audio) or mp4 (video) files for free. There is no registration or software needed.
            </p>

            <form onSubmit={handleSubmit} className="form">
                <input ref={inputUrlRef} className="form_input" type="text" placeholder="Paste your YouTube URL here" />
                <button className="form_button" type="submit">Convert</button>
            </form>
            {urlResult ?
                <a target='_blank' rel='noreferrer' href={urlResult} className="download_btn">Download MP3</a> : ''
            }

        </section>
    </div>
  )
}

export default App
