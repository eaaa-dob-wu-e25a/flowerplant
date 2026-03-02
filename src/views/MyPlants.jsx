import { useEffect, useMemo, useState } from "react";

const emptyPlant = {
  commonName: "",
  scientificName: "",
  light: "",
  watering: "",
  soil: "",
  level: "Beginner",
};

export default function MyPlants() {
  // Loads saved plants from your localStorage
  const [plants, setPlants] = useState(() => {
    const saved = localStorage.getItem("myPlants");
    return saved ? JSON.parse(saved) : [];
  });

  // Save plants whenever they change
  useEffect(() => {
    localStorage.setItem("myPlants", JSON.stringify(plants));
  }, [plants]);

  const [form, setForm] = useState(emptyPlant);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");

  const filteredPlants = useMemo(() => {
    const q = search.trim().toLowerCase();
    return plants.filter((p) => {
      const matchesSearch =
        !q ||
        p.commonName.toLowerCase().includes(q) ||
        p.scientificName.toLowerCase().includes(q);

      const matchesLevel = levelFilter === "All" || p.level === levelFilter;

      return matchesSearch && matchesLevel;
    });
  }, [plants, search, levelFilter]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // A bit of validation
    if (!form.commonName.trim() || !form.scientificName.trim()) return;

    if (editingId) {
      // Update existing plant
      setPlants((prev) =>
        prev.map((p) => p.id === editingId ? { ...p, ...form } : p));
    } else {
      // Create new plants
      const newPlant = { id: crypto.randomUUID(), ...form };
      setPlants((prev) => [newPlant, ...prev]);
    }

    setForm(emptyPlant);
    setEditingId(null);
  }

  function startEditing(plant) {
    setForm({
      commonName: plant.commonName,
      scientificName: plant.scientificName,
      light: plant.light,
      watering: plant.watering,
      soil: plant.soil,
      level: plant.level,
    });
    setEditingId(plant.id);
  }

  function removePlant(id) {
    setPlants((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) {
      setForm(emptyPlant);
      setEditingId(null);
    }
  }

  return (
    <section>
      <h1>My Plants</h1>

      <h2>Filter</h2>
      <div className="filterbar">
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value="All">All levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      <h2>{editingId ? "Edit Plant" : "Add a New Plant"}</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Common Name
          <input
            value={form.commonName}
            onChange={(e) => handleChange("commonName", e.target.value)}
          />
        </label>

        <label>
          Scientific Name
          <input
            value={form.scientificName}
            onChange={(e) => handleChange("scientificName", e.target.value)}
          />
        </label>

        <label>
          Light
          <input value={form.light} onChange={(e) => handleChange("light", e.target.value)} />
        </label>

        <label>
          Watering
          <input
            value={form.watering}
            onChange={(e) => handleChange("watering", e.target.value)}
          />
        </label>

        <label>
          Soil
          <input value={form.soil} onChange={(e) => handleChange("soil", e.target.value)} />
        </label>

        <label>
          Level
          <select value={form.level} onChange={(e) => handleChange("level", e.target.value)}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </label>

        <div className="form-actions">
          <button type="submit">{editingId ? "Save" : "Add Plant"}</button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setForm(emptyPlant);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>

        <p className="muted">* Common name and scientific name are required.</p>
      </form>

      <h2>Your Saved Plants</h2>
      {filteredPlants.length === 0 ? (
        <p>No plants found.</p>
      ) : (
        filteredPlants.map((p) => (
          <div key={p.id} className="card">
            <h3>{p.commonName}</h3>
            <p>
              <em>{p.scientificName}</em>
            </p>
            <p><strong>Light:</strong> {p.light}</p>
            <p><strong>Water:</strong> {p.watering}</p>
            <p><strong>Soil:</strong> {p.soil}</p>
            <p><strong>Level:</strong> {p.level}</p>

            <div className="card-actions">
              <button onClick={() => startEditing(p)}>Edit</button>
              <button onClick={() => removePlant(p.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </section>
  );
}