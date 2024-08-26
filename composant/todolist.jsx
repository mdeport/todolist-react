import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import st from "@/styles/Todolist.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function todolist() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const loadedItems = localStorage.getItem("items");
    if (loadedItems) {
      setItems(JSON.parse(loadedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function ajoutItem() {
    if (input !== "") {
      setItems([...items, input]);
    } else {
      alert("veuillez entrer un element");
    }
    setInput("");
  }

  function supprimeritem(index) {
    const newItems = items.filter((_, data) => data !== index);
    setItems(newItems);
  }
  return (
    <>
      <Head>
        <title>Todolist</title>
        <meta name="description" content="Todolist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Ma todolist test</h1>
        <div className={st.containerInputButton}>
          <input className={st.inputTexte} type="text" placeholder="ajouter un element" value={input} onChange={(e) => setInput(e.target.value)}></input>
          <button onClick={ajoutItem} className={st.buttonAjout}>
            ajouter
          </button>
        </div>
        <div className={st.tableauElement}>
          <ul className={st.tableauUl}>
            {items.map((item, index) => (
              <li className={st.tableauLi} key={index}>
                {item}{" "}
                <button className={st.tableauButtonSup} onClick={() => supprimeritem(index)}>
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
