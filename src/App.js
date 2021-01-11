import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import withFirebaseAuth from 'react-with-firebase-auth';
import { providers, firebaseAppAuth, db } from './firebaseSetup';
import Login from './components/login';
import LoggedIn from './components/loggedin';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cards from './components/Cards';
import TimeTrack from './TimeTrack.svg'

function App({signInWithGoogle, signOut, user}) {


  const [currentUser , setCurrentUser] = useState(null);
  const [timeTable , settimeTable] = useState([]);

  const subname = useRef();
  const subday = useRef();
  const subtime = useRef();

  const[key, setKey] = useState('');

  async function getUser() {
    const x = {subname:subname.current.value, day:subday.current.value, time:subtime.current.value}
    await db.collection("users").doc(currentUser.uid).collection("timetable").add(x).then(function () {
      console.log('Document successfully written!');
      alert("Subject has been inserted.");
      settimeTable(i=>[...i, x]);
  })
  .catch(function (error) {
      console.error('Error writing document: ', error);
  });
  }

  async function getData() {
    await db.collection("users").doc(currentUser.uid).collection("timetable").get().then(function (data) {
      console.log('Document successfully written!');
      const records = [];
      data.forEach(function (doc) {
        records.push({ id: doc.id, ...doc.data() });
   });
   settimeTable(records);
  })
  .catch(function (error) {
      console.error('Error writing document: ', error);
  });
  }

  useEffect(() => {
    const unsubscribe = firebaseAppAuth.onAuthStateChanged(user => {
        setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if(currentUser) {
      getData();
    }
  }, [currentUser]);

  return (
    <div href="#home" className="App">
      {console.log(timeTable)}
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">TimeTrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>{user ? <LoggedIn user={user} /> : <Login login={signInWithGoogle} />}</Nav.Link>
          </Nav>
          {/* {user && (<Nav>
            <Button variant="secondary" size="lg" onClick={signOut}>SignOut</Button>
          </Nav>)} */}
        </Navbar.Collapse>
    </Navbar>
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab">
      <Tab eventKey="create" title="Create">
      <div className="inputForm">
      <Form>
      <Form.Group controlId="formGroupSubname">
        <Form.Label>Subject Name</Form.Label>
        <Form.Control type="text" ref={subname} placeholder="Sub Name" />
      </Form.Group>
      <Form.Group controlId="formGroupDay">
        <Form.Label>Day(Monday, Tuesday, ... Saturday)</Form.Label>
        <Form.Control type="text" ref={subday} placeholder="Sub Day" />
      </Form.Group>
      <Form.Group controlId="formGroupTime">
        <Form.Label>Time</Form.Label>
        <Form.Control type="time" ref={subtime} placeholder="Sub Time" />
      </Form.Group>
      <Button variant="dark" onClick={() => getUser()}>Submit</Button>
      </Form>
      </div>
      </Tab>
      <Tab eventKey="view" title="View">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={3}>
      <Nav variant="pills" className="flex-column" activeKey={key} onSelect={(k) => setKey(k)}>
        <Nav.Item>
          <Nav.Link eventKey="monday">Monday</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tuesday">Tuesday</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="wednesday">Wednesday</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="thursday">Thursday</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="friday">Friday</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="saturday">Saturday</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={9}>
      <Tab.Content>
        {timeTable.length > 0 && (<Cards day={key} carddata={timeTable} />)}
      </Tab.Content>
      </Col>
      </Row>
      </Tab.Container>
      </Tab>
    </Tabs>
    <div className="mainpage">
      <br/>
      <br />
      <br />
      <br />
      <center><img className="imgsvg" alt="" src={TimeTrack} /></center>
      <br />
      <br />
      <h1>Welcome to TimeTrack</h1>
      <h3>Use the Create and View tabs to get started :')</h3>
    </div>
    </div>
  );
}

export default withFirebaseAuth({
  providers: providers,
  firebaseAppAuth: firebaseAppAuth,
})(App);

// sub name, day, time
// timeTable.map( (td) => (
//  <div key={td.id}>
//  <h1>{td.subname}</h1>
//  <h1>{td.day}</h1>
  //<h1>{td.time}</h1>
//</div>

//<div>
//{timeTable && 
//<div>
  //<h1>{timeTable[0].subname}</h1>
//</div>
//}
//</div>