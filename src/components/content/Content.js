import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { Rating } from "flowbite-react";
import { Link } from "react-router-dom";

AOS.init();
export const Content = ({ data }) => {
  return (
    <div className="mt-10 p-5">
      <h1 className="text-3xl md:text-5xl font-bold mt-10 text-start ml-10" data-aos="fade-right">
        Choose Your tour
      </h1>
      <div className=" mt-5 p-10 inline-grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
        {data.map((item) => (
          <Link to={`/view/${item.id}`}>
            <div className="w-60 flex flex-col hover:skew-x-3 neumorp pb-5 hover:scale-105" data-aos="fade-right">
              <img src={item.img} alt={item.name} className="mb-5 rounded-xl h-40" />
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
