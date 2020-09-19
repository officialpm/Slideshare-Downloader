import React, { useState, useCallback } from "react";
import Particles from 'react-particles-js';
import {
  Alert,
  Container,
  Card,
  CardBody,
  CardTitle,
  Collapse,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormInput,
  Button,
  CardFooter,
} from "shards-react";
import Download from './download.svg';
import ActivityIndicator from "./components/ActivityIndicator";
import "./App.css";

var FileSaver = require('file-saver');
function validateURL(url) {
  var re = /^http(s)?:\/\/www.slideshare.net\//ig;
  return re.test(url);
}

function App() {
  const [url, setUrl] = useState("");
  const [valid, setValid] = useState(false);
  const [invalid, setInValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [alertTheme, setAlertTheme] = useState("danger");

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setUrl(value)


    if (validateURL(value)) {
      setValid(true)
      setInValid(false)
      setDisabled(false)
    }
    else {
      setInValid(true)
      setValid(false)
      setDisabled(true)

    }
  }, []);
const NewTab = () => { 
  window.open( 
    "https://github.com/officialpm/Slideshare-Downloader", "_blank"); 
} 
  const handleSubmit = useCallback(() => {
    if (!url) {
      setError("No URL entered!");
      return false;
    }
    setLoading(true);
    fetch("https://parthmaniar.herokuapp.com/slideshare?url=" + url, {
      method: "GET"
    })
      .then((response) => {
        if (response.status == 200) {
          return response.blob().then((file) => {
            var a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.setAttribute("download", url.split("/")[4]);
            a.click();
            a.remove();
            setAlertTheme("success")
            setError("Your slides are downloaded! 😍");

            setUrl("");

            setTimeout(() => {
              setError(false);
            }, 5000);
          })
        }


        else {
          setAlertTheme("danger")
          setError("😕  Invalid URL ! Example - https://www.slideshare.net/AmazonWebServices/track-6-session-6-aws-ai");
          setInValid(true)
          setValid(false)
          setDisabled(true)
          setTimeout(() => {
            setError(false);
          }, 5000);
        }
      })
      .catch((reason) => {
        console.log(reason);
        setError("Some server error occured. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return (
    <>
      <Particles
        style={{ position: "absolute", 'z-index': '-1' }}
        height="95%"
        width="95%"
        params={{
          particles: {
            color: {
              value: "#000000"
            },
            line_linked: {
              color: {
                value: "#000000"
              }
            },
            number: {
              value: 30
            },
            size: {
              value: 2
            }
          }
        }}
      />
      <Container>

        <h1 >SlideShare Downloader 🚀</h1>

        <div id="urlCard">

          <img id="image" src={Download} alt="Slideshare Downloader" />
          <Collapse open={!!error && !loading}>
            <Alert theme={alertTheme}>{error}</Alert>
          </Collapse>

          <InputGroup seamless>
            <InputGroupAddon type="prepend">
              <InputGroupText>
                <i class="fa fa-link mr-2"></i>
              </InputGroupText>
            </InputGroupAddon>
            <FormInput
              theme="dark"
              valid={valid}
              invalid={invalid}
              autoFocus
              size="lg"
              autoComplete="off"
              placeholder="Slideshare URL"
              onChange={handleChange}
              value={url}
              name="title"
              disabled={loading}
            />
          </InputGroup>
          <Button size="lg" pill theme="success" onClick={handleSubmit} disabled={loading || disabled}>
            <i class="fa fa-download mr-2"></i>
            {loading ? <ActivityIndicator /> : "Download"}
          </Button>


        </div>

        <main>
          <Card >
            <CardBody>
              <CardTitle>Instruction To Use</CardTitle>
              <p >

                <br />

                <b>1.</b> Go to <a target="blank" href="https://www.slideshare.net">
                  Slideshare.net
                </a>  <br />
                <b>2.</b> 🔍 Search for slides and copy its link.<br />
                <b>3.</b> Paste the url in the box above and click on download. ✨<br />
              </p>
              <p id="example">Example -<a target="blank" href="https://www.slideshare.net/AmazonWebServices/track-6-session-6-aws-ai"> https://www.slideshare.net/AmazonWebServices/track-6-session-6-aws-ai</a></p>
            </CardBody>
            <CardFooter id="footer">

              <b>
                Developed By: <br />
                <a target="blank" href="https://www.linkedin.com/in/parthdmaniar/">
                  Parth Maniar
                </a>  <br />

                <a target="blank" href="https://www.github.com/officialpm">
                  <i class="fab fa-github mr-2"></i>
                </a>
                <a target="blank" href="https://www.linkedin.com/in/parthdmaniar/">
                  <i class="fab fa-linkedin mr-2"></i>
                </a>
              </b>

            </CardFooter>
          </Card>
          <Card>
            <CardBody>
              <CardTitle>About</CardTitle>
              <p >
                <div id="header">
                  <img id="downloads" src={"https://parthmaniar.herokuapp.com/slideshare/downloadcountBadge?color=BLUE&text=Total%20Downloads"} alt="Slideshare Downloader" />
                  <Button size="sm" pill theme="warning" onClick={NewTab}>
                    <i class="fa fa-star mr-2"></i>
                    <b>{"Star me on GitHub"}</b>
                  </Button>
                </div>
                <br />

                <b>SlideShare</b> is great for presentations and last minute assignments but unfortunately
              can't download slides? Don't worry, here is the tool that will help you download slides in no time.
              Just a bit of knowledge of python web scraping and selenium is what I used to build this tool.
            </p>
            </CardBody>
            <CardFooter id="footer">

              <b>
                Developed By: <br />
                <a target="blank" href="https://www.linkedin.com/in/parthdmaniar/">
                  Parth Maniar
                </a>  <br />

                <a target="blank" href="https://www.github.com/officialpm">
                  <i class="fab fa-github mr-2"></i>
                </a>
                <a target="blank" href="https://www.linkedin.com/in/parthdmaniar/">
                  <i class="fab fa-linkedin mr-2"></i>
                </a>
              </b>

            </CardFooter>
          </Card>
        </main>
      </Container>
    </>
  );
}

export default App;
