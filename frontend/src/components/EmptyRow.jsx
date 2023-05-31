import React from "react";

function EmptyRow() {
  return (
    <tr style={{backgroundColor:'rgb(49 55 71)'}}>
      <td style={{ color: "lightgray", textAlign: "center" }} colSpan= "7">
        No rows entered
      </td>
    </tr>
  );
}

export default EmptyRow;
