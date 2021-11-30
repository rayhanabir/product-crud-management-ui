import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateProducts = () => {
    const [product, setProduct] = useState({})
    const {id} = useParams();

    useEffect(()=>{
        const url = `http://localhost:5000/products/${id}`
        fetch(url)
        .then(res => res.json())
        .then(data =>setProduct(data))
    },[]);

    //updated product

    const handleNameChange = e =>{
        const name = e.target.value;
        const updateName = {name, price:product.price, quantity:product.quantity}
        setProduct(updateName)
    }
    const handlePriceChange = e =>{
        const price = e.target.value
        const updatePrice = {name:product.name, price, quantity:product.quantity}
        setProduct(updatePrice)
    }
    const handleQtyChange = e =>{
        const qty = e.target.value
        const updateQty = {name:product.name, price:product.price, quantity:qty}
        setProduct(updateQty)
    }

    const handleUpdateProduct = e =>{
        const url = `http://localhost:5000/products/${id}`
        fetch(url, {
            method:"PUT",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(product)
        })
        .then(res=> res.json())
        .then(data =>{
            if(data.modifiedCount){
                alert("Updated Succefully")
                setProduct({})
            }
        })

        e.preventDefault();
    }
    return (
        <div className="d-flex justify-content-center">
            
            <div className="update-info w-50">
                <form onSubmit={handleUpdateProduct}>
                    <input type="text" className="form-control my-2" onChange={handleNameChange} value={product.name ||""}  placeholder="name"/>
                    
                    <input type="number" className="form-control my-2" onChange={handlePriceChange} value={product.price ||''} placeholder="price"/>
                    
                    <input type="number" className="form-control my-2" onChange={handleQtyChange} value={product.quantity ||''} placeholder="quantity"/>
                    
                    <input className="btn btn-danger my-2 w-50" type="submit" value="Update" />
                </form>
            </div>
        </div>
    );
};

export default UpdateProducts;