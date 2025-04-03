"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import axios from "axios";
import Label from "@/app/components/Label";
import Select from "@/app/components/Select";
import Input from "@/app/components/InputField";
import Row from "@/app/components/Fromrow";
import Col6 from "@/app/components/coleg6";
import Fmodal from "@/app/components/Modalfrom";
import { DataTable } from "@/app/components/DataTable";
import Spin from "@/app/components/Spinner";
import { FaTrashAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export default function CenteredRightAlignedForm() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("error");
  const [isFModalOpen, setIsFModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingmsg, setLoadingmsg] = useState("");
  const [error, setError] = useState(null);
  const [isDeModalOpen, setIsDeModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [preloading, setpreLoading] = useState(false);
  const [isUpdateVisible, setisUpdateVisible] = useState(false);
  const [isInsertVisible, setisInsertVisible] = useState(false);
  const [Updateid, setUpdateid] = useState("");
  const [selectedAction, setSelectedAction] = useState(null);
  // const [selectedAction, setSelectedAction] = useState(null);

  // const [selectedRow, setSelectedRow] = useState(null);

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

  const handleConfirmDelete = async () => {
    setIsDeModalOpen(false);
    setpreLoading(true);
    const response = await axios.post("/api/Crude", {
      company_id: itemIdToDelete,
    });
    if (response.status === 200) {
    setData(prevData => {
    return prevData.filter(item => item.company_id !== itemIdToDelete);
    });
      setModalType("success");
      setModalMessage("Item Deleted Suessfully");
      setIsModalOpen(true);
      setpreLoading(false);
    } else {
      setModalType("error");
      setModalMessage("Something went wrong. Please try again later.");
      setIsModalOpen(true);
    }
  };

  const handleCancelDelete = () => {
    setIsDeModalOpen(false);
    setSelectedAction("");
  };

  const handleinsert = () => {
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

    setisInsertVisible(true);
    setisUpdateVisible(false);
    toggleFModal();
  };

  const Updatefromdata = async (e) => {
    e.preventDefault();

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
    setIsFModalOpen(false);
    setpreLoading(true);
    const response = await axios.put(`/api/update?id=${Updateid}`, formData);
    if (response.status === 200) {
    //ONLY UPDATE ONE ROW {Updateid}
      setData(prevData => {
        return prevData.map(item =>
          item.company_id === Updateid
            ? {
                ...item,
                company_type: formData.companyType,
                legal_name: formData.legalName,
                trading_name: formData.tradingName,
                abn_number: formData.abnNumber,
                acn_number: formData.acnNumber,
                arbn_number: formData.arbnNumber,
                incorporation_number: formData.incorporationNumber,
                other_license_number: formData.otherLicenseNumber
              }
            : item
        );
      });
      setpreLoading(false);
      setModalType("success");
      setModalMessage("Data Updated Sucessfully");
      setIsModalOpen(true);
      setSelectedAction("green");
      setTimeout(() => {
      setSelectedAction("");
      }, 3000);
    }
  };
  

  const toggleFModal = () => {
    setIsFModalOpen((prevState) => {
      const newState = !prevState;

      if (newState === false) {
        setSelectedAction("");
      }
      return newState;
    });
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);
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
    setIsFModalOpen(false);
    try {
      setLoadingmsg("Please Wait..");
      setpreLoading(true);
      const response = await axios.post("/api/from1submit", formData);

      if (response.status === 200) {
       setData([response.data.data, ...data]);
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

        setpreLoading(false);
        setIsFModalOpen(false);
        setModalType("success");
        setModalMessage("Record Inserted Sucessfully");
        setIsModalOpen(true);
      } else {
        console.log("Error submitting form");
      }
    } catch (error) {
      setModalType("error");
      setModalMessage("Something went wrong. Please try again later.");
      setIsModalOpen(true);
    }
  };

  const companyTypes = [
    "Company Limited by Guarantee",
    "Incorporated Association",
    "Partnership",
    "Shareholding Company",
  ];
  const columns = [
    { header: "Company Name", accessor: "legal_name" },
    { header: "Company Type", accessor: "company_type" },
    { header: "Trading Name", accessor: "trading_name" },
    { header: "Abn Number", accessor: "abn_number" },
    { header: "Acn Number", accessor: "acn_number" },
    { header: "Arbn Number", accessor: "arbn_number" },
    { header: "Incorporation Number", accessor: "incorporation_number" },
    { header: "License Number", accessor: "other_license_number" },
    { header: "Submitted At", accessor: "dt" },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/vw_alldtls");
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleEditClick = async (id) => {
    setisInsertVisible(false);
    setisUpdateVisible(true);
    setSelectedAction("edit");
    // setSelectedRow(id);
    const row = data.find((item) => item.company_id === id);
    // console.log("Editing row with ID:", id);
    // console.log("Selected Row Data:", row);
    setUpdateid(id);
    setFormData({
      companyType: row.company_type,
      legalName: row.legal_name,
      tradingName: row.trading_name,
      abnNumber: row.abn_number,
      acnNumber: row.acn_number,
      arbnNumber: row.arbn_number,
      incorporationNumber: row.incorporation_number,
      otherLicenseNumber: row.other_license_number,
    });
    toggleFModal();

    //  const response = await axios.put(`/api/update?id=${id}`, formData);
  };

  const handleDeleteClick = (id) => {
    // console.log("Deleting row with ID:", id);
    setItemIdToDelete(id);
    setIsDeModalOpen(true);
    setSelectedAction("delete");
  };

  if (loading) {
    return <Spin message={loadingmsg} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!isHydrated) {
    return null;
  }
  return (
    <>
      <div className="m-10">
        {preloading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="text-center">
              <ClipLoader size={50} color="#36d7b7" loading={preloading} />
            </div>
          </div>
        )}

        {/* {loading && <Spin message="Please wait..." />} */}
        <button
          onClick={handleinsert}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
          type="button"
        >
          + Add New
        </button>

        <DataTable
          data={data}
          columns={columns}
          showActions={true}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          Actionid={"company_id"}
          Onhighligt={selectedAction}
          Isslno={true}
        />

        <Fmodal
          isOpen={isFModalOpen}
          toggleModal={toggleFModal}
          Header={"Add Comany Deatails"}
          CancelSelect={setSelectedAction}
        >
          <form
            className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            onSubmit={handleSubmit}
          >
            <Row>
              <Col6>
                <Label text="Choose Company Type" />
                <Select
                  id="companyType"
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleInputChange}
                  options={companyTypes}
                  defaultval={"Select a Company Type"}
                  required
                />
              </Col6>
              <Col6>
                <Label text="Legal Name" />
                <Input
                  id="legalName"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleInputChange}
                  placeholder="Legal Name"
                  required
                />
              </Col6>
            </Row>

            <Row>
              <Col6>
                <Label text="Trading Name" />
                <Input
                  id="tradingName"
                  name="tradingName"
                  value={formData.tradingName}
                  onChange={handleInputChange}
                  placeholder="Legal Name"
                  required
                />
              </Col6>
              <Col6>
                <Label text="ABN Number" />
                <Input
                  id="abnNumber"
                  name="abnNumber"
                  value={formData.abnNumber}
                  onChange={handleInputChange}
                  placeholder="ABN Number"
                  required
                />
              </Col6>
            </Row>

            <Row>
              <Col6>
                <Label text="ACN Number" />

                <Input
                  id="acnNumber"
                  name="acnNumber"
                  value={formData.acnNumber}
                  onChange={handleInputChange}
                  placeholder="ACN Number"
                />
              </Col6>
              <Col6>
                <Label text="ARBN Number" />
                <Input
                  id="arbnNumber"
                  name="arbnNumber"
                  value={formData.arbnNumber}
                  onChange={handleInputChange}
                  placeholder="ARBN Number"
                  required
                />
              </Col6>
            </Row>

            <Row>
              <Col6>
                <Label text="Incorporation Number" />
                <Input
                  id="incorporationNumber"
                  name="incorporationNumber"
                  value={formData.incorporationNumber}
                  onChange={handleInputChange}
                  placeholder="Incorporation Number"
                  required
                />
              </Col6>

              <Col6>
                <Label text="Any Other License Number" />
                <Input
                  id="otherLicenseNumber"
                  name="otherLicenseNumber"
                  value={formData.otherLicenseNumber}
                  onChange={handleInputChange}
                  placeholder="Any Other License Number"
                  required
                />
              </Col6>
            </Row>

            <div className="flex items-center justify-end mt-11">
              {isInsertVisible && (
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-1/4"
                >
                  Submit
                </button>
              )}
              {isUpdateVisible && (
                <button
                  type="button"
                  onClick={Updatefromdata}
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-1/4"
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </Fmodal>
        <Modal
          message={modalMessage}
          isOpen={isModalOpen}
          closeModal={closeModal}
          type={modalType}
        />
        {isDeModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg max-w-sm w-full shadow-lg">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Are you sure you want to delete this item?
              </h3>
              <div className="flex justify-around space-x-4">
                <button
                  onClick={handleConfirmDelete}
                  className="flex items-center bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                >
                  <FaTrashAlt className="mr-2 text-white" />
                  Yes, delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}