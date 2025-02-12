"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import axios from "axios";

export default function CenteredRightAlignedForm() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("error");

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const [formData, setFormData] = useState({
    companyType: "",
    legalName: "",
    tradingName: "",
    abnNumber: "",
    acnNumber: "",
    arbnNumber: "",
    incorporationNumber: "",
    otherLicenseNumber: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const requiredFields = [
      "companyType",
      "legalName",
      "tradingName",
      "abnNumber",
      "acnNumber",
      "arbnNumber",
      "incorporationNumber",
      "otherLicenseNumber",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        const formattedFieldName = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        setModalType("error");
        setModalMessage(`The ${formattedFieldName} field is required.`);
        setIsModalOpen(true);
        return;
      }
    }

    try {
      const response = await axios.post("/api/from1submit", formData);

      if (response.status === 200) {
        setModalType("success");
        setModalMessage("Record Inserted Sucessfully");
        setIsModalOpen(true);

        setFormData({
          companyType: "",
          legalName: "",
          tradingName: "",
          abnNumber: "",
          acnNumber: "",
          arbnNumber: "",
          incorporationNumber: "",
          otherLicenseNumber: "",
        });
      } else {
        console.log("Error submitting form");
      }
    } catch (error) {
      setModalType("error");
      setModalMessage("Something went wrong. Please try again later.");
      setIsModalOpen(true);
    }
  };

  if (!isHydrated) {
    return null;
  }
  return (
    <div className="w-full flex m-10 justify-center">
      <form
        className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-4 justify-start">
          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label
              htmlFor="companyType"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Choose Company Type
            </label>
            <select
              id="companyType"
              value={formData.companyType}
              onChange={handleInputChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select a Company Type</option>
              <option>Company Limited by Guarantee</option>
              <option>Incorporated Association</option>
              <option>Partnership</option>
              <option>Shareholding Company</option>
            </select>
          </div>
          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label
              htmlFor="legalName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Legal Name
            </label>
            <input
              type="text"
              id="legalName"
              value={formData.legalName}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="Legal Name"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4 justify-start">
          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label
              htmlFor="tradingName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Trading Name
            </label>
            <input
              type="text"
              id="tradingName"
              value={formData.tradingName}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="Trading Name"
              required
            />
          </div>

          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label
              htmlFor="abnNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ABN Number
            </label>
            <input
              type="text"
              id="abnNumber"
              value={formData.abnNumber}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="ABN Number"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4 justify-start">
          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label
              htmlFor="acnNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ACN Number
            </label>
            <input
              type="text"
              id="acnNumber"
              value={formData.acnNumber}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="ACN Number"
            />
          </div>

          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label
              htmlFor="arbnNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ARBN Number
            </label>
            <input
              type="text"
              id="arbnNumber"
              value={formData.arbnNumber}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="ARBN Number"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4 justify-start">
          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label
              htmlFor="incorporationNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Incorporation Number
            </label>
            <input
              type="text"
              id="incorporationNumber"
              value={formData.incorporationNumber}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="Incorporation Number"
            />
          </div>

          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label
              htmlFor="otherLicenseNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Any Other License Number
            </label>
            <input
              type="text"
              id="otherLicenseNumber"
              value={formData.otherLicenseNumber}
              onChange={handleInputChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="Any Other License Number"
            />
          </div>
        </div>

        <div className="flex items-center justify-end mt-11">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-1/4"
          >
            Submit
          </button>
        </div>
      </form>
      <Modal
        message={modalMessage}
        isOpen={isModalOpen}
        closeModal={closeModal}
        type={modalType}
      />
    </div>
  );
}
