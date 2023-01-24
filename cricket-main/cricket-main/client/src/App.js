import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Highscore from "./pages/highscore";
import Matches from "./pages/matches";
import Deleteplayer from "./pages/deleteplayer";
import Search from "./pages/search";
import Updateplayer from "./pages/updateplayer";

function App() {
    return (
        <main>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/update" element={<Updateplayer />} />
                <Route path="/hs" element={<Highscore />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/delete" element={<Deleteplayer />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </main>
    );
}

export default App;
