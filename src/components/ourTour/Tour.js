import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "flowbite-react";



export const Tour = () => {

  const [term, setTerm] = useState("");
  const [select, setSelect] = useState("")
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3004/travel")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    const search = async () => {
      await fetch("http://localhost:3004/travel")
        .then((res) => res.json())
        .then((json) => setData(json));
    };
    if (term) {
      search();
    }
  }, [term])

  const sortData = (a, b) => {
    if (select == "low") return a.price - b.price;
    else if (select == "high") return b.price - a.price;
  }

  return (
    <div className="mt-10 mb-60" data-aos="fade-left">
      <div className="flex justify-between items-center px-10">
        <h1 className="text-3xl md:text-5xl font-bold mt-10 text-start ml-10">
          Choose Your tour
        </h1>

        <div className="flex justify-center items-center gap-3">
          <select onChange={e => setSelect(e.target.value)} defaultValue="all" placeholder="filter" className="w-[200px] h-[35px] text-xs rounded-full border-trasnparent focus:outline-none neumorp border-none" data-aos="zoom-in" data-aos-duration="1500">
            <option value="all"> All </option>
            <option value="low" >Harga Terendah</option>
            <option value="high">Harga Tertinggi</option>
          </select>
          <input onChange={e => setTerm(e.target.value)} placeholder="Search ... " className="w-[200px] h-[35px] text-xs rounded-full border-trasnparent focus:outline-none neumorp border-none" type="search" data-aos="zoom-in" data-aos-duration="1500" />
        </div>


      </div>
      <div className=" mt-5 p-10 inline-grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">

        {Data.filter(item => item.name.toLowerCase().includes(term.toLowerCase())).sort((a, b) => sortData(a, b)).map(item => (
          <Link to={`/view/${item.id}`}>
            <div className="w-60 flex flex-col hover:skew-x-2 hover:scale-105  neumorp pb-5">
              <div className="h-40 w-full">
                <img src={item.img} alt={item.name} className="mb-5 rounded-xl w-full h-full object-cover" />
              </div>
              <h1 className="font-semibold">{item.name}</h1>
              <h3>${item.price}/Person</h3>
              <div className="w-full flex justify-center items-center mt-5">
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
