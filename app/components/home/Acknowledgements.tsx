import { DarkMosaic } from "@/public/images";
import {
  faCrown,
  faMap,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Acknowledgements = () => {
  return (
    <div
      className="bg-[#f067a6] w-full relative z-10 bg-center"
      style={{ backgroundImage: `url(${DarkMosaic.src})` }}
    >
      <div className="grid grid-cols-12 mx-auto max-w-[1100px]">
        <div className="flex flex-col justify-center items-center py-16 px-8 border-b md:border-l col-span-12 md:col-span-3 border-white">
          <FontAwesomeIcon icon={faCrown} className="w-8 h-8 mb-4 text-white" />
          <p className="text-white font-bold text-center">
            5+ Years of Experience
          </p>
        </div>
        <div className="flex flex-col justify-center items-center py-16 px-8 border-b md:border-l col-span-12 md:col-span-3 border-white">
          <FontAwesomeIcon icon={faUsers} className="w-8 h-8 mb-4 text-white" />
          <p className="text-white font-bold text-center">
            100+ Satisfied Clients
          </p>
        </div>
        <div className="flex flex-col justify-center items-center py-16 px-8 border-b md:border-l col-span-12 md:col-span-3 border-white">
          <FontAwesomeIcon icon={faMap} className="w-8 h-8 mb-4 text-white" />
          <p className="text-white font-bold text-center">Serving all of MA</p>
        </div>
        <div className="flex flex-col justify-center items-center py-16 px-8 border-b md:border-l md:border-r col-span-12 md:col-span-3 border-white">
          <FontAwesomeIcon icon={faStar} className="w-8 h-8 mb-4 text-white" />
          <p className="text-white font-bold text-center">
            Multiple Five Star Ratings
          </p>
        </div>
      </div>
    </div>
  );
};

export default Acknowledgements;
