import React, { useRef, useState, useEffect } from "react";

const ModalGlossary = ({ id, onClose }) => {
  const [countryData, setCountryData] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    if (id) {
      getCountry();
      ref.current.showModal();
    }
  }, [id]);

  const getCountry = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/country/${id}`);
      const data = await response.json();
      if (response.ok) {
        setCountryData(data);
        console.log(data);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <dialog
      ref={ref}
      className="p-6 rounded-lg shadow-lg w-full max-w-md mx-auto bg-white"
    >
      <h1 className="text-3xl font-bold text-center mb-6">
        {countryData.pais}
      </h1>
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">
          Capital
        </label>
        <p className="text-xl">{countryData.capital}</p>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">
          Bandera
        </label>
        <img src={countryData.bandera} alt="" className="w-36 mt-2" />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">
          Mapa del País
        </label>
        <img src={countryData.mapa} alt="" className="w-36 mt-2" />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">
          Mapa Continental
        </label>
        <img src={countryData.localizacion} alt="" className="w-36 mt-2" />
      </div>
      <button
        type="button"
        onClick={() => {
          ref.current.close();
          onClose();
        }}
        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Cancel
      </button>
    </dialog>
  );
};

export default ModalGlossary;
