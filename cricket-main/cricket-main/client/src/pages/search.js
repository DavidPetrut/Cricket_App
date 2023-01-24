import React from "react";
import styles from "../css/search.module.css";
import axios from "../utils/axios";

export default function Search() {
    const [name, setName] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [player, setPlayer] = React.useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/api/player/${name}`, {
                Player_Name: name,
            });
            setPlayer(res.data.player);
            setMessage(res.data.message);
            resetform();
        } catch (err) {
            setMessage(err.response.data.message);
            resetform();
        }
    };

    const resetform = () => {
        setName("");

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.formcontainer}>
                    <h1>Search Player By Name</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            <p>Name</p>
                            <input type="text" name="name" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <input type="submit" value={"Search"} />
                    </form>
                    {message && <p>{message}</p>}
                </div>
                {Object.keys(player).length > 0 && (
                    <div className={styles.playercontainer}>
                        <h1>Player Info</h1>
                        <div className={styles.player}>
                            <p>Player Name: {player.Player_Name}</p>
                            <p>Player Matches: {player.Matches}</p>
                            <p>Player Runs: {player.Runs}</p>
                            <p>Player HS: {player.HS}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
