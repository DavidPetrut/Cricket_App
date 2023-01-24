import React from "react";
import styles from "../css/deleteplayer.module.css";
import axios from "../utils/axios";

export default function Deleteplayer() {
    const [name, setName] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/delete-player", {
                Player_Name: name,
            });

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
                    <h1>Delete Player By Name</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            <p>Name</p>
                            <input type="text" name="name" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <input type="submit" value={"Delete"} />
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </section>
    );
}
