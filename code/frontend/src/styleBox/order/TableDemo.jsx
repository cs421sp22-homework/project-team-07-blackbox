import React, {Component} from "react";
import ImageUploader from "react-images-upload";
import tw from "twin.macro";

// const Uploader = tw(ImageUploader)`transparent`;

class Products extends React.Component {

	constructor(props) {
	  super(props);
  
	  //  this.state.products = [];
	  this.state = {};
	  this.state.filterText = "";
	  this.state.products = [
		// {
		//   id: 1,
		//   category: 'Sporting Goods',
		//   price: '49.99',
		//   qty: 12,
		//   name: 'football'
		// }, {
		//   id: 2,
		//   category: 'Sporting Goods',
		//   price: '9.99',
		//   qty: 15,
		//   name: 'baseball'
		// },
	  ];
  
	}
	handleUserInput(filterText) {
	  this.setState({filterText: filterText});
	};
	handleRowDel(product) {
	  var index = this.state.products.indexOf(product);
	  this.state.products.splice(index, 1);
	  this.setState(this.state.products);
	};
  
	handleAddEvent(evt) {
	  var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
	  var product = {
		id: id,
		itemId: "",
		itemName: "",
		itemLink: "",
		itemImage: ""
	  }
	  console.log(id)
	  this.state.products.push(product);
	  this.setState(this.state.products);
  
	}
  
	handleProductTable(evt) {
	  var item = {
		id: evt.target.id,
		name: evt.target.name,
		value: evt.target.value
	  };
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
	};
	render() {
  
	  return (
		<div>
		  {/* <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/> */}
		  <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
		</div>
	  );
  
	}
  
  }
  
  class ProductTable extends React.Component {
  
	render() {
	  var onProductTableUpdate = this.props.onProductTableUpdate;
	  var rowDel = this.props.onRowDel;
	  var filterText = this.props.filterText;
	  var products = this.props.products;
	  var product = this.props.products.map(function(product) {
		if (product.itemName.indexOf(filterText) === -1) {
		  return;
		}
		return (<ProductRow onProductTableUpdate={onProductTableUpdate} products={products} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
	  });
	  return (
		<div>
  
  
		<button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
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
	onDelEvent() {
	  this.props.onDelEvent(this.props.product);
  
	}
	render() {
  
	  return (
		<tr className="eachRow">
		  {/* <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
			type: "No",
			value: this.props.product.id,
			id: this.props.product.id
		  }}/> */}
		  <td align="center">
			  {this.props.products.indexOf(this.props.product)}
		  </td>
		  <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
			type: "itemId",
			value: this.props.product.itemId,
			id: this.props.product.id
		  }}/>
		  <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
			type: "itemName",
			value: this.props.product.itemName,
			id: this.props.product.id
		  }}/>
		  <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
			type: "itemLink",
			value: this.props.product.itemLink,
			id: this.props.product.id
		  }}/>
		  <td>
		  			{/* <Uploader
                      withIcon={false}
                      withPreview={true}
                      withLabel={false}
					  singleImage={true}
                      buttonText="Choose images"
                    //   buttonStyles={{background:'rgb(236 72 153'}}
                      onChange={this.onDropOutfit}
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      maxFileSize={5242880}
                    /> */}
   <input type="file" accept="image/*" />
    <button onClick={() => {
        document.querySelector("input[type='file']").click();
    }}>
        <i className="fa fa-picture-o" style={{fontSize: 20}}></i>
    </button>
		  </td>
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
		  <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
		</td>
	  );
  
	}
  
  }
  export default Products
//   ReactDOM.render( < Products/> , document.getElementById('container'));