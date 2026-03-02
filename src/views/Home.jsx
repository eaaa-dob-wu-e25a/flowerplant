import { predefinedGuides } from "../data/predefinedGuides";
import { useState } from "react";
import plantImg from "../images/plantimg.jpg";

export default function Home() {
    const [visibleCount, setVisibleCount] = useState(3);
    return (
    <section>
        <h1>Welcome to FlowerPlant</h1>
        <p>Find plant care guides and create your own plant lists.</p>

        {/* Vite will replace the import with the correct hashed URL */}
        <img src={plantImg} alt="A pretty plant" style={{ width: "100%", marginBottom: "16px" }}/>


    <h2>Some Plant Guides:</h2>

    {predefinedGuides.slice(0, visibleCount).map((p) => (
        <div key={p.id} className="card">
        <img className="card-img" src={p.image} alt={p.commonName} />
        <h3>{p.commonName}</h3>
     <p>
        <em>{p.scientificName}</em>
        </p>
        <p>Light: {p.light}</p>
        <p>Water: {p.watering}</p>
        <p>Soil: {p.soil}</p>
        <p>Level: {p.level}</p>
    </div>
    ))}

{visibleCount < predefinedGuides.length && (
  <button onClick={() => setVisibleCount((c) => c + 2)}>
    Load more
  </button>
)}

        <h2>Plant care basics</h2>
        <ul>
            <li>Give plants their proper amount of water.</li>
            <li>Don't overwater your plants, this could kill them.</li>
            <li>Make sure your plants get the right amount of sunlight.</li>
        </ul>
    </section>
    );
}
