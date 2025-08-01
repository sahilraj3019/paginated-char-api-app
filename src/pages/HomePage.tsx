import CharacterTable from "../components/CharacterTable";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Paginated Characters List</h1>
      <CharacterTable />
    </div>
  );
}
