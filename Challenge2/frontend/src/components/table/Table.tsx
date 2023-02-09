import { TableProps } from "./types";
import "./table.css";

function Table({ tableHead, tableBody, darkHead }: TableProps) {
  const tableLength = () => {
    if (tableHead.length > 5) {
      return "longer-table";
    }
    if (tableHead.length > 4) {
      return "long-table";
    }

    return "";
  };
  return (
    <div className={`table-wrapper ${darkHead ? "dark-head" : ""}`}>
      <table className={tableLength()}>
        <thead>
          <tr>
            {tableHead.map(item => (
              <th key={item.key}>{item.value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.map(item => (
            <tr key={item.key}>
              {item.entry.map(entry => (
                <td key={entry.key}>{entry.value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
