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

export default function CenteredRightAlignedForm() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("error");
  const [isFModalOpen, setIsFModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toggleFModal = () => {
    setIsFModalOpen((prevState) => !prevState);
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

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
        // fetchData();
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

  if (loading) {
    return (
      <Spin
        size="32"
        colors={["red", "green", "yellow"]}
        speedClasses={["", "slow-spin", "faster-spin"]}
      />
    );
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
        <button
          onClick={toggleFModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
          type="button"
        >
          + Add New
        </button>

        <DataTable data={data} columns={columns} />

        <Fmodal
          isOpen={isFModalOpen}
          toggleModal={toggleFModal}
          Header={"Add Comany Deatails"}
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
        </Fmodal>
      </div>
    </>
  );
}
