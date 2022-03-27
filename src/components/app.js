import { Fragment, h } from "preact";

import styled from "styled-components";
import { useEffect, useState } from "preact/hooks";
import axios from "axios";

const AppStyle = styled.div`
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  const [data, updateData] = useState(false);
  const [filterInput, updateFilterInput] = useState("");

  useEffect(() => {
    if (!data) {
      // start fetch data
      axios.get("https://api.publicapis.org/categories").then((res) => {
        const fetchData = res.data;
        console.log(fetchData);
        updateData(fetchData);
      });
    }
  }, [data]);

  const handleInput = (e) => {
    let input = e.target.value;
    console.log(input);
    updateFilterInput(input);
  };
  return (
    <AppStyle>
      <input type="text" onChange={handleInput} value={filterInput} />
      {data && (
        <Fragment>
          <table>
            <tr>
              <th>categories</th>
            </tr>

            {data.categories.map((item, index) => {
              // filter
              if (filterInput) {
                if (item.includes(filterInput)) {
                  return (
                    <tr key={index}>
                      <td>{item}</td>
                    </tr>
                  );
                }
              } else {
                return (
                  <tr key={index}>
                    <td>{item}</td>
                  </tr>
                );
              }
            })}
          </table>
        </Fragment>
      )}
    </AppStyle>
  );
};

export default App;
