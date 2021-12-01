import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './products.css';
const Products = () => {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res=>res.json())
        .then(data =>setProducts(data))
    },[]);
    // delete functionality ready
    const handleDelete = id =>{
        const procced = window.confirm("Are You sure You Want to Delete ?")
        if(procced){
            const url = `http://localhost:5000/products/${id}`
        fetch(url, {
            method:"DELETE",
            
        })
        .then(res=>res.json())
        .then(data =>{
            if(data.deletedCount > 0){
                alert("Deleted Succesfully")
                const remainingProducts = products.filter(product =>product._id !==id)
                setProducts(remainingProducts);
            }
        })
        }

    }
    return (
        <div>
           
            <ul className="products-container">
                {
                    products.map(product =><li key={product._id}
                    >Name: {product.name}- Price: {product.price}- Qty:{product.quantity}
                    <Link to={`/products/update/${product._id}`}><button className="btn btn-danger m-2">Update</button></Link>
                    <button onClick={()=>handleDelete(product._id)} className="btn btn-danger m-2">Delete</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Products;