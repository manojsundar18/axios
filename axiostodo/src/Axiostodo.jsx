import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

const Axiostodo = () => {
    const [data, setdata] = useState([]);
    const [newdata, setnewdata] = useState({
        name: "",
        size: "",
        color: "",
        native: "",
        weight: "",
        price: "",
        lifespan: "",
        intelligence: "",
        energylevel: "",
        patterns: "",
        othertraits: "",
    });
    const axios_list = async () => {
        try {
            const response = await axios.get('')
            console.log(response.data)
            setdata(response.data)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        axios_list();
    }, [])

    const handlenew = async () => {
        setnewdata(newdata)
        console.log(newdata)
        try {
            const response = await axios.post('https://64da1fefe947d30a260acfd9.mockapi.io/api/v2/dress_list', newdata)
            alert("sucessfully created")
            console.log(response.data)
            const newapi = [...data, response.data];
            setdata(newapi);
        } catch (error) {
            console.error(error);
        }
    }

    const delete_todo = async (id) => {
        try {
            const response = await axios.delete(`https://64da1fefe947d30a260acfd9.mockapi.io/api/v2/dress_list ${id}`)
            alert("record deleted")
            console.log(response.data)
            axios_list();
        } catch (error) {
            console.error(error);
        }
    };

    const edit_todo = (todo) => {
        setnewdata(todo)
    }
    const handlecancel = () => {
        setnewdata({
            name: "",
            size: "",
            color: "",
            native: "",
            weight: "",
            price: "",
            lifespan: "",
            intelligence: "",
            energylevel: "",
            patterns: "",
            othertraits: "",
        })
    }
    const handleupdate = async (id) => {
        setnewdata(newdata)
        try {
            const response = await axios.put(`https://64da1fefe947d30a260acfd9.mockapi.io/api/v2/student_details/${id}`, newdata)
            alert("deleted successfully")
            console.log(response.data)
            const newapi = [...data, response.data];
            setdata(newapi);
            axios_list();
            handlecancel();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div className="layout">
                <h1>Axios Todo</h1>
                <div className="inputbox" >
                    <input value={newdata.name} placeholder="Enter a name"
                        onChange={(e) => setnewdata({ ...newdata, name: e.target.value })} /> <br />

                    <input value={newdata.size} placeholder="Enter a size"
                        onChange={(e1) => setnewdata({ ...newdata, size: e1.target.value })} /><br />

                    <input value={newdata.color} placeholder="Enter a color"
                        onChange={(e) => setnewdata({ ...newdata, color: e.target.value })} /><br />

                    <input value={newdata.native} placeholder="Enter a native"
                        onChange={(e) => setnewdata({ ...newdata, native: e.target.value })} /> <br />

                    <input value={newdata.weight} placeholder="Enter a weight"
                        onChange={(e) => setnewdata({ ...newdata, weight: e.target.value })} /><br />

                    <input value={newdata.price} placeholder="Enter a price"
                        onChange={(e) => setnewdata({ ...newdata, price: e.target.value })} /><br />

                    <input value={newdata.lifespan} placeholder="Enter a lifespan"
                        onChange={(e) => setnewdata({ ...newdata, lifespan: e.target.value })} /><br />

                    <input value={newdata.intelligence} placeholder="Enter a intelligence"
                        onChange={(e) => setnewdata({ ...newdata, intelligence: e.target.value })} /><br />

                    <input value={newdata.energylevel} placeholder="energylevel"
                        onChange={(e) => setnewdata({ ...newdata, energylevel: e.target.value })} /><br />

                    <input value={newdata.patterns} placeholder="Enter a patterns"
                        onChange={(e) => setnewdata({ ...newdata, patterns: e.target.value })} /><br />

                    <input value={newdata.othertraits} placeholder="Enter a othertraits"
                        onChange={(e) => setnewdata({ ...newdata, othertraits: e.target.value })} /><br />
                </div>
            </div>
            <div className="buttonpress">
                {newdata.id ?
                    <>  <button onClick={() => handleupdate(newdata.id)}>Update</button>
                        <button onClick={() => handlecancel()}>Cancel</button></> :
                    <button onClick={() => handlenew()}>create new</button>
                }
            </div>
            <ol>
                {data ? (
                    data.map((todo, index) => {
                        return (
                            <li key={`index ${index}`}>
                                <label>
                                    Name : {todo.name}<br />
                                    <span>Size : {todo.size}</span><br />
                                    <span>Color : {todo.color}</span><br />
                                    <span>Brand : {todo.native}</span><br />
                                    <span>Sleeves : {todo.weight}</span><br />
                                    <span>Price : {todo.price}</span><br />
                                    <span>Ratings : {todo.lifespan}</span><br />
                                    <span>Offer : {todo.intelligence}</span><br />
                                    <span>Offer : {todo.energylevel}</span><br />
                                    <span>Offer : {todo.patterns}</span><br />
                                    <span>Offer : {todo.othertraits}</span><br />
                                </label>
                                <button onClick={() => delete_todo(todo.id)}>Delete</button>
                                <button onClick={() => edit_todo(todo)}>Edit</button>
                            </li>
                        )
                    })
                ) :
                    <li>datas not found </li>}
            </ol></>
    )
}
export default Axiostodo;