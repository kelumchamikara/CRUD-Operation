import React, { Component } from 'react';
import { rowData } from './AppData';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    Alldata: rowData,
    id: '',
    title: '',
    info: '',
    price: '',  // Ensure price is part of the initial state
    company: '',
  };

  // Find the product based on id
  getRecord = (id) => {
    return this.state.Alldata.find((item) => item.id === id);
  };

  // Handle editing a product
  onEdit = (id) => {
    const productToEdit = this.getRecord(id);
    if (productToEdit) {
      this.setState({
        id: productToEdit.id,
        title: productToEdit.title,
        info: productToEdit.info,
        price: productToEdit.price,
        company: productToEdit.company,
      });
    }
  };

  // Handle input changes
  updateValue = (e, field) => {
    const value = e.target.value;
    this.setState({
      [field]: value, // Dynamically update the specific field
    });
  };

  // Handle saving a product (both add and update)
  onSave = () => {
    const { id, title, info, price, company, Alldata } = this.state;

    // Basic validation
    if (
      title.trim() === '' ||
      info.trim() === '' ||
      price === '' ||
      company.trim() === ''
    ) {
      alert("All fields are required.");
      return;
    }

    if (id !== '') {
      // Update existing record
      const updatedAlldata = Alldata.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title,
            info,
            price,
            company,
          };
        }
        return item;
      });

      this.setState({
        Alldata: updatedAlldata,
        id: "",
        title: "",
        info: "",
        price: "",
        company: '',
      });
    } else {
      // Add new record
      const maxId = Alldata.length > 0 ? Math.max(...Alldata.map((item) => item.id)) : 0;
      const newRecord = {
        id: maxId + 1,
        title,
        info,
        price,
        company,
      };

      this.setState({
        Alldata: [...Alldata, newRecord],
        id: "",
        title: "",
        info: "",
        price: "",
        company: '',
      });
    }
  };

  // Handle deleting a product
  onDelete = (id) => {
    const tempProduct = this.state.Alldata.filter((item) => item.id !== id);
    this.setState({
      Alldata: tempProduct,
    });
  };

  // Optional: Reset the form fields
  resetForm = () => {
    this.setState({
      id: "",
      title: "",
      info: "",
      price: "",
      company: '',
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          onEdit: this.onEdit,
          updateValue: this.updateValue,
          onSave: this.onSave,
          onDelete: this.onDelete,
          resetForm: this.resetForm, // Optional: Expose resetForm if needed
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
