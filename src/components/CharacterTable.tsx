import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "../api";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { Character } from "../types";

const columnHelper = createColumnHelper<Character>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("species", {
    header: "Species",
  }),
];

export default function CharacterTable() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/" });
  const page = parseInt(search.page ?? "1", 10);

  const query = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(page),
    keepPreviousData: true,
  });

  const table = useReactTable({
    data: query.data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ paddingTop: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => query.refetch()}
          style={{ padding: "0.5rem 1rem" }}
        >
          Refresh
        </button>
      </div>

      {query.isLoading ? (
        <p>Loading...</p>
      ) : query.isError ? (
        <p>Error fetching characters.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "1rem",
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      textAlign: "left",
                      padding: "0.5rem",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() =>
                  navigate({ to: `/character/${row.original.id}` })
                }
                style={{
                  cursor: "pointer",
                  textAlign: "left",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: "0.5rem",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          disabled={page <= 1}
          onClick={() => navigate({ to: "/", search: { page: page - 1 } })}
          style={{ padding: "0.5rem 1rem" }}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={!query.data?.info?.next}
          onClick={() => navigate({ to: "/", search: { page: page + 1 } })}
          style={{ padding: "0.5rem 1rem" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
