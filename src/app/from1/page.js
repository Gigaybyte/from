"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@/app/components/Modal";
const Page = () => {
  const [companyTypes, setCompanyTypes] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("error");
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const fetchCompanyTypes = async () => {
      try {
        const response = await axios.get("/api/vwcomany");
        setCompanyTypes(response.data.data);
      } catch (error) {
        console.error("Error fetching company types:", error);
      }
    };

    fetchCompanyTypes();
  }, []);

  const [formData, setFormData] = useState({
    companyType: "",
    DepartmentName: "",
    Departmentcode: "",
    HODName: "",
    HODEmail: "",
    Description: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
        "companyType",
        "DepartmentName",
        "Departmentcode",
        "HODName",
        "HODEmail",
        "Description",
        
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
        const response = await axios.post("/api/from2submit", formData);
  
        if (response.status === 200) {
          setModalType("success");
          setModalMessage("Record Inserted Sucessfully");
          setIsModalOpen(true);
  
          setFormData({
            companyType: "",
            DepartmentName: "",
            Departmentcode: "",
            HODName: "",
            HODEmail: "",
            Description: "",
          
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
  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (!isHydrated) {
    return null;
  }
  return (
    <div>
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
                Company Name
              </label>
              <select
                id="companyType"
                value={formData.companyType}
                onChange={handleInputChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select a Company Type</option>

                {Array.isArray(companyTypes) && companyTypes.length > 0 ? (
                  companyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No company types available</option>
                )}
              </select>
            </div>
            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
              <label
                htmlFor="legalName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Department Name
              </label>
              <input
                type="text"
                id="DepartmentName"
                value={formData.DepartmentName}
                onChange={handleInputChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                placeholder="Department Name"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4 justify-start">
            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
              <label
                htmlFor="legalName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Department code
              </label>
              <input
                type="text"
                id="Departmentcode"
                value={formData.Departmentcode}
                onChange={handleInputChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                placeholder="Department code"
                required
              />
            </div>
            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
              <label
                htmlFor="legalName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                HOD Name
              </label>
              <input
                type="text"
                id="HODName"
                value={formData.HODName}
                onChange={handleInputChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                placeholder="HOD Name"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4 justify-start">
            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
              <label
                htmlFor="legalName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                HOD Email
              </label>
              <input
                type="text"
                id="HODEmail"
                value={formData.HODEmail}
                onChange={handleInputChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                placeholder="HOD Email"
                required
              />
            </div>
            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
              <label
                htmlFor="legalName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                type="text"
                id="Description"
                value={formData.Description}
                onChange={handleInputChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                placeholder="Description "
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
      </div>
      <Modal
        message={modalMessage}
        isOpen={isModalOpen}
        closeModal={closeModal}
        type={modalType}
      />
    </div>
  );
};

export default Page;
