import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacter } from "../api";

export default function CharacterPage() {
  const { id } = useParams({ from: "/character/$id" });
  const query = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
  });

  if (query.isLoading) return <p>Loading character...</p>;
  if (query.isError) return <p>Error loading character.</p>;

  const char = query.data;

  return (
    <div>
      <h2>{char.name}</h2>
      <img src={char.image} alt={char.name} width={200} />
      <p>Status: {char.status}</p>
      <p>Species: {char.species}</p>
      <p>Gender: {char.gender}</p>
    </div>
  );
}
