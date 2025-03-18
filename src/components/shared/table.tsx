type TableData = {
  headers: string[];
  body: { [key: string]: string | number | any }[];
};

export const Table = ({ headers, body }: TableData) => {
  if (!headers?.length) return null;

  const updatedHeaders = headers.map((header) =>
    header === "Action" ? "" : header
  );

  return (
    <div className="relative overflow-x-auto w-full rounded-t-lg">
      <table className="min-w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            {updatedHeaders.map((header, index) => (
              <th
                scope="col"
                className="px-4 py-3 sm:px-6 whitespace-nowrap"
                key={index}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.length ? (
            body.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
                {headers.map((header, cellIndex) => {
                  const key = header.toLowerCase().replace(/\s+/g, "");
                  return (
                    <td
                      className="px-4 py-3 sm:px-6 text-gray-700 text-xs truncate"
                      key={cellIndex}
                    >
                      {row[key] || ""}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b hover:bg-gray-50">
              <td
                className="px-4 py-3 sm:px-6 text-gray-600 text-xs truncate text-center font-medium"
                colSpan={headers.length}
              >
                No Data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
