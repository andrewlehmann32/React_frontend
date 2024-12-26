type TableData = {
  headers: string[];
  body: { [key: string]: string | number | any }[];
};

export const Table = ({ headers, body }: TableData) => {
  if (!headers || !body) return;
  return (
    <div className="relative overflow-x-auto sm:rounded-lg border-none">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th scope="col" className="px-3 sm:px-6 py-3" key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white border-b border-gray-100 hover:bg-gray-50"
            >
              {headers.map((header, cellIndex) => {
                const key = header.toLowerCase().replace(/\s+/g, "");
                return (
                  <td
                    className="px-1 sm:px-6 py-1 border w-12 text-xs"
                    key={cellIndex}
                  >
                    {row[key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
