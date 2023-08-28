import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Productlist = () => {
    const [data, setdata] = useState([]);
    const [newdata, setnewdata] = useState({
        Name: "",
        Model: "",
        Type: "",
        Displacement: "",
        Variant: "",
        Specs: 0,
        Year: 0,
        Abs: 0,
        Fueltype: 0

    });
    const navigate = useNavigate();
    const axios_list = async () => {
        try {
            const response = await axios.get('https://64dbd961593f57e435b17ae8.mockapi.io/volkswagen')
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
            const response = await axios.post('https://64dbd961593f57e435b17ae8.mockapi.io/volkswagen', newdata)
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
            const response = await axios.delete(`https://64dbd961593f57e435b17ae8.mockapi.io/volkswagen/${id}`)
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
            Name: "",
            Model: "",
            Type: "",
            Displacement: "",
            Variant: "",
            Specs: 0,
            Year: 0,
            Abs: 0,
            Fueltype: 0
        })
    }
    const handleupdate = async (id) => {
        setnewdata(newdata)
        try {
            const response = await axios.put(`https://64dbd961593f57e435b17ae8.mockapi.io/volkswagen/'/${id}`, newdata)
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
                    <input value={newdata.Name} placeholder="Enter a name"
                        onChange={(e) => setnewdata({ ...newdata, Nameame: e.target.value })} /> <br />
                    <input value={newdata.Model} placeholder="Enter a category"
                        onChange={(e1) => setnewdata({ ...newdata, Model: e1.target.value })} /> <br />
                    <input value={newdata.Type} placeholder="Enter a Gst"
                        onChange={(e) => setnewdata({ ...newdata, Type: e.target.value })} /><br />
                    <input value={newdata.Displacement} placeholder="Enter a brand"
                        onChange={(e) => setnewdata({ ...newdata, Displacement: e.target.value })} /> <br />
                    <input value={newdata.Variant} placeholder="Enter a Manufacturing"
                        onChange={(e) => setnewdata({ ...newdata, Variant: e.target.value })} /><br />
                    <input value={newdata.Specs} placeholder="Enter a Gst"
                        onChange={(e) => setnewdata({ ...newdata, Specs: e.target.value })} /><br />
                    <input value={newdata.Year} placeholder="Enter a ratings"
                        onChange={(e) => setnewdata({ ...newdata, Year: e.target.value })} /><br />
                    <input value={newdata.Abs} placeholder="Enter a Discout"
                        onChange={(e) => setnewdata({ ...newdata, Abs: e.target.value })} /><br />
                        <input value={newdata.Fueltype} placeholder="Enter a Discout"
                        onChange={(e) => setnewdata({ ...newdata, Fueltype: e.target.value })} /><br />
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
                                    <span>Model : {todo.Model}</span><br />
                                    <span>Type : {todo.Type}</span><br />
                                    <span>Displacement : {todo.Displacement}</span><br />
                                    <span>Variant : {todo.Variant}</span><br />
                                    <span>Specs : {todo.Specs}</span><br />
                                    <span>Year : {todo.Year}</span><br />
                                    <span>Abs : {todo.Abs}</span><br />
                                    <span>Fueltype : {todo.Fueltype}</span><br />
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
export default Productlist;