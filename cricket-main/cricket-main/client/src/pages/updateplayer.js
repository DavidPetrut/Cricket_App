import React from "react";
import styles from "../css/updateplayer.module.css";
import axios from "../utils/axios";

export default function Updateplayer() {
    const [name, setName] = React.useState("");
    const [matches, setMatches] = React.useState("");
    const [runs, setRuns] = React.useState("");
    const [hs, setHS] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/update-player/${name}`, {
                Player_Name: name,
                Matches: matches,
                Runs: runs,
                HS: hs,
            });
            setMessage(res.data.message);
            resetform();
        } catch (err) {
            setMessage(err.response.data.message);
        }
    };

    const resetform = () => {
        setName("");
        setMatches("");
        setRuns("");
        setHS("");

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.formcontainer}>
                    <h1>Update Player</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            <p>Name</p>
                            <input type="text" name="name" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label htmlFor="matches">
                            <p>Matches</p>
                            <input type="number" name="matches" id="matches" required value={matches} onChange={(e) => setMatches(e.target.value)} />
                        </label>
                        <label htmlFor="runs">
                            <p>Runs</p>
                            <input type="number" name="runs" id="runs" required value={runs} onChange={(e) => setRuns(e.target.value)} />
                        </label>
                        <label htmlFor="hs">
                            <p>High Score</p>
                            <input type="number" name="hs" id="hs" required value={hs} onChange={(e) => setHS(e.target.value)} />
                        </label>
                        <input type="submit" value={"Update"} />
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </section>
    );
}
