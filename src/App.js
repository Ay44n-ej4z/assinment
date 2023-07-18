import React, { useEffect, useState } from 'react';
import "./App.css"
import branch1 from "./json/branch1.json"
import branch2 from "./json/branch2.json"
import branch3 from "./json/branch3.json"
const App = () => {
  const [branchData, setBranchData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [filterText, setFilterText] = useState('');

  let branchOneProducts = branch1.products;
  let branchTwoProducts = branch2.products;
  let branchThreeProducts = branch3.products;
  const allBranches = branchOneProducts.concat(branchTwoProducts, branchThreeProducts);
  
const uniqueMap = new Map();

const removeDuplicateValue = allBranches.reduce((result, item) => {
  const key = item.id + '|' + item.name;
  if (!uniqueMap.has(key)) {
    uniqueMap.set(key, true);
    result.push(item);
  }
  return result;
}, []);

  useEffect(() => {
        setBranchData(removeDuplicateValue);
  }, []);

  useEffect(() => {
    // Filter data based on the product name
    const filtered = branchData.filter((product) =>
      product.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredData(filtered);

    // Calculate total revenue for displayed products
    const total = filtered.reduce((total, product) => total + product.unitPrice * product.sold, 0);
    setTotalRevenue(total);
  }, [branchData, filterText]);

  return (
    <div className='page-table'>
      <input
        type="text"
        placeholder="Search by product name..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by product name
            .map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{(product.unitPrice * product.sold).toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Revenue for Displayed Products</td>
            <td>{totalRevenue.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div >
  );
};

export default App;
