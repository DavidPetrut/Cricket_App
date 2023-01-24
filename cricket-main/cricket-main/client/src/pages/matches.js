import React from "react";
import styles from "../css/matches.module.css";
import axios from "../utils/axios";

export default function Matches() {
    const [matches, setMatches] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [players, setPlayers] = React.useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/api/players/matches/${matches}`);
            if (res.data.players.length > 0) {
                setMessage(res.data.message);
            } else {
                setMessage("No players found");
            }
            setPlayers(res.data.players);
            resetform();
        } catch (err) {
            setMessage(err.response.data.message);
        }
    };

    const resetform = () => {
        setMatches("");

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.formcontainer}>
                    <h1>Top 20 Players By Matches</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="matches">
                            <p>Matches</p>
                            <input type="number" name="matches" id="matches" required value={matches} onChange={(e) => setMatches(e.target.value)} />
                        </label>
                        <input type="submit" value={"Search"} />
                    </form>
                    {message && <p>{message}</p>}
                </div>

                {players.length > 0 && (
                    <div className={styles.playercontainer}>
                        <h1>Total Results Found: {players.length}</h1>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Matches</th>
                                    <th>Runs</th>
                                    <th>HS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players?.map((player) => (
                                    <tr key={player._id}>
                                        <td>{player.Player_Name}</td>
                                        <td>{player.Matches}</td>
                                        <td>{player.Runs}</td>
                                        <td>{player.HS}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
