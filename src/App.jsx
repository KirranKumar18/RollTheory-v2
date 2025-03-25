
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Expence from "./expence"; // Import Expence Component
// import Home from "./home";
// import "./App.css";

// function App() {
//   return (
//     <>
//     <Router>
      
//         <nav>
//           <div className="navHolder">
//             <div>
//               <Link to="/home"><button>HOME</button></Link>
//             </div>
//             <div>
//               <Link to="/expence"><button>EXPENCE</button></Link>
//             </div>
//             <div>
//               <button>TASK</button>
//             </div>
//           </div>
//         </nav>
//         <hr />
//         {/* Routes for Navigation */}
//         <Routes>
//           <Route path="/" element={<Home/>}></Route>
//           <Route path="/home" element={<Home/>}></Route>
//           <Route path="/expence" element={<Expence />} />
//         </Routes>
      
//     </Router>

    

//     </>



//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Expence from "./expence"; // Import Expence Component
import Home from "./home"; // Import Home Component
import Popup from "./Popup"; // Import Popup Component
import "./App.css";

function App() {
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  return (
    <Router>
      <>
        <nav>
          <div className="navHolder">
            <div>
              <Link to="/"><button>HOME</button></Link>
            </div>
            <div>
              <Link to="/expence"><button>EXPENCE</button></Link>
            </div>
            <div>
              <button onClick={() => setShowPopup(true)}>TASK</button>
            </div>
          </div>
        </nav>
        

        {/* Routes for Navigation */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/expence" element={<Expence />} />
        </Routes>

        {/* Show Popup when showPopup is true */}
        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      </>
    </Router>
  );
}

export default App;
