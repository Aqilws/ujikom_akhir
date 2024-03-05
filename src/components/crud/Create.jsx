import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileInput, Label } from 'flowbite-react';

export const Create = () => {
  const [Data, setData] = useState({
    name: "",
    price: "",
    desc: "",
    img: null
  });
  



  function handleChangeFile(e) {
    const file = e.target.files[0]
    const img = URL.createObjectURL(file);
    setData(prevState => ({ ...prevState, img}))
  }
  


  const handleChage = (e) => {
    let data = { ...Data};

    data[e.target.name] = e.target.value;
    setData(data);
  };


  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:3004/travel", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Data)
    }).then((res) => {
      alert("Create success")
      navigate('/tour')
    }).catch((err) => {
      console.log(err.message);
    })

  }


  return (
    
    <div className="w-screen h-[120vh]  flex justify-center items-center mb-80">
      <Link to={'/admin'} className='absolute top-36 left-10 text-md w-16 h-10 neumorp flex justify-center items-center'>Back</Link>
      <div className=" w-4/5 h-[90%] bg-slate-800 flex justify-center items-center rounded-md">
        <form action="" className="flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit}>
          <h2 className="text-slate-200 text-4xl mb-8 font-bold">Create Data</h2>
          <input
            required
            type="text"
            value={Data.name}
            onChange={handleChage}
            name="name"
            placeholder="Masukan nama"
            className="w-[60vw] h-10 rounded-md p-4 bg-none"
          />
          <input
            required
            type="number"
            value={Data.price}
            onChange={handleChage}
            name="price"
            placeholder="Masukan Price"
            className="w-[60vw] h-10 rounded-md p-4 "
          />
          <textarea required name="desc" id="" cols="30" rows="10" value={Data.desc} className="w-[60vw] h-28 rounded-md p-4 bg-none"
            onChange={handleChage} ></textarea>
            <FileInput id="file-upload"  required
            type="file"
            onChange={handleChangeFile}
            name="img" className="w-full"/>
            <div className="neumorp-dark w-72 h-52 flex justify-center items-center p-2 rounded-md">
            {Data.img && <img className="w-full h-full object-cover rounded-sm" src={Data.img} alt="#"></img>}
            </div>
          
          <button type="submit" className="w-28 h-8 neumorp-dark text-slate-200 rounded-md mt-8">Submit</button>
        </form>
      </div>
    </div>
  );
};
