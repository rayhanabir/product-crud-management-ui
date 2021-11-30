import React, { useRef } from 'react';

const AddProducts = () => {
    const nameRef = useRef()
    const priceRef = useRef()
    const quantityRef = useRef();

    const handleAddProducts = e =>{
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        const quantity = quantityRef.current.value;
        
        const newProducts = {name, price, quantity};
        fetch('http://localhost:5000/products', {
            method:"post",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newProducts)
        })
        .then(res =>res.json())
        .then(data =>{
            if(data.insertedId){
                alert('product added succesfully')
                e.target.reset();
            }
        })
        e.preventDefault();
    }
    return (
        <div className="d-flex justify-content-center">
            

           <div className="product-info w-50">
           
           <form onSubmit={handleAddProducts}>
                <input type="text" className="form-control my-2 " ref={nameRef} placeholder="Name"/>
                
                <input type="number" className="form-control my-2" ref={priceRef} name="" id="" placeholder="price"/>
               
                <input type="number" className="form-control my2" ref={quantityRef} name="" id="" placeholder="Quantity"/>
                <input type="submit" className="btn btn-danger mt-2 w-50" value="Add Product" />
            </form>
           </div>
        </div>
    );
};

export default AddProducts;