import React, {useState} from 'react';
import { filterByStocked, filterByName } from './productUtils';
import { PRODUCTS } from './mockData';
import './App.css';

function ProductCategoryRow(props) {

  return (
    <tr><th colSpan="2">
      <span>{props.category}</span>
      </th>
    </tr>
  )
}

function SearchBar(props) {

  const filterTextChanged = (e) => {
    props.setFilterText(e.target.value);
  }

  const onlyInStockChanged = (e) => {
    props.setOnlyInStock(e.target.checked);
  }  
  
  return (
    <form>
      <input type="text" placeholder="Search..." value={props.filterText}
             onChange = {filterTextChanged} />
    <p>
      <input type="checkbox" checked = {props.onlyInStock}
             onChange = {onlyInStockChanged} /> Only show products in stock</p>
    </form>
  )
}

function ProductRow(props) {
  const product = props.product;
  let name = product.stocked ? product.name :
    <span style = {{color: 'red'}}>{product.name}</span>;
  return (
    <tr>
    <td>{name}</td>
    <td>{product.price}</td>
    </tr>
  )
}

function FilterableProductTable(props) {

  const [onlyInStock, setOnlyInStock] = useState(false);
  const [filterText, setFilterText] = useState('');

  return (
    <div>
      <SearchBar filterText = {filterText} onlyInStock = {onlyInStock} 
        setFilterText = {setFilterText}
        setOnlyInStock = {setOnlyInStock}/>
      <ProductTable products = {props.products} filterText = {filterText} onlyInStock = {onlyInStock} />
    </div>
  )

}
function ProductTable(props) {

  const rows = [];

  let category = null;
  const filterText = props.filterText || '';
  const onlyInStock = props.onlyInStock;

  let products = filterByStocked(props.products, onlyInStock);
  products = filterByName(products, filterText)

  for (let currProduct of products) {
    const currCategory = currProduct.category;

    if (currCategory !== category) {
      rows.push(<ProductCategoryRow 
          key={currCategory} 
          category={currCategory}/>);
      category = currCategory;
    }
    rows.push(<ProductRow 
        product = {currProduct}
        key = {currProduct.name}
        />)
  }

  return (
    <table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody>
      { rows }
    </tbody>
    </table>

  )
}

function App() {
  return (
    <div className="TIR">
      <header>
        <h1>This is Functional React</h1>
      </header>
      <FilterableProductTable products = {PRODUCTS} />
    </div>
  );
}

export default App;
