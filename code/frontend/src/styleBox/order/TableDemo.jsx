import React, {Component} from "react";
import ImageUploader from "react-images-upload";
import tw from "twin.macro";

const Button = tw.button`w-full sm:w-32 mt-3 py-1 bg-pink-500 text-gray-100 rounded-full font-bold shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-pink-700 hocus:-translate-y-px hocus:shadow-xl`;

class Products extends React.Component {

	constructor(props) {
	  super(props);
  
	  //  this.state.products = [];
	  this.state = {};
	  this.state.products = [
		{
		  id: 0,
		  itemsId: "",
		  itemName: "",
		  link: "",
		  itemImage: []
		}, 
		// {
		//   id: 2,
		//   category: 'Sporting Goods',
		//   price: '9.99',
		//   qty: 15,
		//   name: 'baseball'
		// },
	  ];
  
	}

	handleRowDel(product) {
	  var index = this.state.products.indexOf(product);
	  this.state.products.splice(index, 1);
	  this.setState(this.state.products);
	  this.props.setItems(this.state.products);
	};
  
	handleAddEvent(evt) {
	  var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
	  var product = {
		id: id,
		itemsId: "",
		itemName: "",
		link: "",
		itemImage: []
	  }
	  console.log(id)
	  this.state.products.push(product);
	  this.setState(this.state.products);
	  this.props.setItems(this.state.products);
	}
  
	handleProductTable(evt) {
	  var item = {
		id: evt.target.id,
		name: evt.target.name,
		value: evt.target.value
	  };
	//   console.log(evt.target)
	  var products = this.state.products.slice();
	  var newProducts = products.map(function(product) {
  
	  for (var key in product) {
		if (key == item.name && product.id == item.id) {
		  product[key] = item.value;
  
		}
	  }
	  return product;
	});
	  this.setState({products:newProducts});
	//  console.log(this.state.products);
	this.props.setItems(this.state.products);
	};

	changeFile(evt) {
		var item = {
		  id: evt.target.id,
		  name: evt.target.name,
		  value: evt.target.files[0]
		};
		// console.log(evt.target.files)
		// console.log(evt.target)
		var products = this.state.products.slice();
		var newProducts = products.map(function(product) {
	
		for (var key in product) {
		  if (key == item.name && product.id == item.id) {
			// console.log(product[key])
			// console.log(evt.target.files[0])
			product[key] = item.value;
	
		  }
		}
		return product;
	  });
		this.setState({products:newProducts});
	  //  console.log(this.state.products);
	  this.props.setItems(this.state.products);
	  };

	render() {
	  return (
		<div>
		  <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} changeFile={this.changeFile.bind(this)}/>
		</div>
	  );
	}
  
  }
  
  class ProductTable extends React.Component {
  
	render() {
	  var onProductTableUpdate = this.props.onProductTableUpdate;
	  var rowDel = this.props.onRowDel;
	  var products = this.props.products;
	  var changeFile = this.props.changeFile;
	  var product = this.props.products.map(function(product) {
		return (<ProductRow onProductTableUpdate={onProductTableUpdate} products={products} product={product} onDelEvent={rowDel.bind(this)} key={product.id} changeFile={changeFile}/>)
	  });
	  return (
		<div>
  
  
		<Button type="button" onClick={this.props.onRowAdd}>Add Item</Button>
		  <table className="table table-bordered">
			<thead>
			  <tr>
				<th className="px-4">No.</th>
				<th className="px-8">ItemID</th>
				<th className="px-8">ItemName</th>
				<th className="px-16">ItemLink</th>
				<th className="px-40">ItemImage</th>
			  </tr>
			</thead>
  
			<tbody>
			  {product}
  
			</tbody>
  
		  </table>
		</div>
	  );
  
	}
  
  }
  
  class ProductRow extends React.Component {
	constructor(props){
		super(props)
		this.state={}

		// this.changeFile = this.changeFile.bind(this)
	}
	onDelEvent() {
	  this.props.onDelEvent(this.props.product);
  
	}

	// changeFile(event){
	// 	console.log(event.target.files)
	// }

	

	render() {
  
	  return (
		<tr className="eachRow">
		  <td align="center">
			  {this.props.products.indexOf(this.props.product)+1}
		  </td>
		  <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
			name: "itemsId",
			value: this.props.product.itemsId,
			id: this.props.product.id
		  }}/>
		  <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
			name: "itemName",
			value: this.props.product.itemName,
			id: this.props.product.id
		  }}/>
		  <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
			name: "link",
			value: this.props.product.link,
			id: this.props.product.id
		  }}/>
		  
		  <EditableCellFile changeFile={this.props.changeFile} cellData={{
			name: "itemImage",
			value: this.props.product.itemImage,
			id: this.props.product.id
		  }}/>
		  {/* <td>
		  <input type="file" accept="image/*" onChange={this.changeFile}/>
		  </td> */}
			
					
		  
		  <td className="del-cell">
			<input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
		  </td>
		</tr>
	  );
  
	}
  
  }
class EditableCell extends React.Component {
  
	render() {
	  return (
		<td>
		  <input type='text' name={this.props.cellData.name} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
		</td>
	  );
  
	}
  
  }

class EditableCellFile extends React.Component {
  
	render() {
	  return (
		<td>
		  <input type="file" accept="image/*" name={this.props.cellData.name} id={this.props.cellData.id} onChange={this.props.changeFile}/>
		</td>
	  );
  
	}
  
  }
  export default Products
//   ReactDOM.render( < Products/> , document.getElementById('container'));