import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import st from "@/styles/Todolist.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function todolist() {
  const [items, setItems] = useState([]);

  /*useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);*/

  useEffect(() => {
    const loadedItems = localStorage.getItem("items");
    if (loadedItems) {
      setItems(JSON.parse(loadedItems));
    }
  }, []);

  // Sauvegarder les éléments dans le localStorage chaque fois qu'ils changent
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function ajoutItem() {
    const donnée = document.querySelector("input").value;
    if (donnée !== "") {
      setItems([...items, donnée]);
    } else {
      alert("veuillez entrer un element");
    }
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
        <h1>Ma todolist</h1>
        <input type="text" placeholder="ajouter un element"></input>
        <button onClick={ajoutItem}>ajouter</button>
        <div className={st.tableauElement}>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item} <button onClick={() => supprimeritem(index)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
