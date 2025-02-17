"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ClipLoader } from "react-spinners";

import {
  FaMoon,
  FaSun,
  FaFilePdf,
  FaFileExcel,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import * as XLSX from "xlsx";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

export function DataTable({
  data,
  columns,
  showActions,
  onEditClick,
  onDeleteClick,
  Actionid,
  Onhighligt,
  Isslno,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditClick = (rowId) => {
    setSelectedRow(rowId);
    onEditClick(rowId);
  };

  const handleDeleteClick = (rowId) => {
    setSelectedRow(rowId);
    onDeleteClick(rowId);
  };

  const toggleExportMenu = () => {
    setIsExportOpen(!isExportOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, column) => {
      acc[column.accessor] = true;
      return acc;
    }, {})
  );

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdownVisibility = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setVisibleColumns((prevState) => ({
      ...prevState,
      [value]: checked,
    }));
  };

  const [colSearchTerm, setcolSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setcolSearchTerm(event.target.value);
  };

  const exportPDF = async () => {
    setLoading(true);

    setTimeout(() => {
      try {
        const doc = new jsPDF();

        // Filter out columns that are not visible
        const filteredColumns = columns.filter(
          (col) => visibleColumns[col.accessor]
        );

        // Prepare the head (header) and body (row data) for the table
        const head = [filteredColumns.map((col) => col.header)];
        const body = data.map(
          (row) => filteredColumns.map((col) => row[col.accessor]) // Only include visible columns
        );

        doc.autoTable({
          head,
          body,
          theme: "grid",
          styles: {
            cellPadding: 5,
            fontSize: 10,
            cellWidth: "auto",
            halign: "center",
            textColor: [0, 0, 0],
          },
          headStyles: {
            fontStyle: "bold",
            fillColor: [255, 255, 255],
          },
          tableLineWidth: 0.5,
          tableLineColor: [0, 0, 0],
          margin: { top: 20, left: 10, right: 10, bottom: 10 },
        });

        doc.save("data-export.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setLoading(false);
      }
    }, 0);
  };

  const exportExcel = async () => {
    setLoading(true);

    setTimeout(() => {
      try {
        const wb = XLSX.utils.book_new();

        const filteredColumns = columns.filter(
          (column) => visibleColumns[column.accessor]
        );

        const ws = XLSX.utils.json_to_sheet(
          data.map((row) =>
            filteredColumns.reduce((acc, col) => {
              acc[col.header] = row[col.accessor];
              return acc;
            }, {})
          )
        );

        XLSX.utils.book_append_sheet(wb, ws, "Data");
        XLSX.writeFile(wb, "data-export.xlsx");
      } catch (error) {
        console.error("Error generating Excel:", error);
      } finally {
        setLoading(false);
      }
    }, 0);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        }`}
      >
        1
      </button>
    );

    if (currentPage > 3) {
      buttons.push(
        <span key="ellipsis1" className="text-gray-500">
          ...
        </span>
      );
    }

    let start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, start + maxVisiblePages - 3);
    start = Math.max(2, end - maxVisiblePages + 3);

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      buttons.push(
        <span key="ellipsis2" className="text-gray-500">
          ...
        </span>
      );
    }

    if (totalPages > 1 && end < totalPages) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div
      className={`w-full shadow-lg rounded-lg overflow-hidden ${
        isDarkMode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-center">
            <ClipLoader size={50} color="#36d7b7" loading={loading} />
          </div>
        </div>
      )}

      <div
        className={`p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="flex items-center space-x-2">
          <div className="relative inline-block">
            <button
              onClick={toggleDropdownVisibility}
              className="flex items-center space-x-1 text-sm bg-blue-500 text-white p-2 rounded-md"
            >
              Column visibility
            </button>

            {isDropdownVisible && (
              <div
                ref={dropdownRef}
                className={`absolute left-0 mt-2 w-72 rounded-md shadow-lg z-10 max-h-64 overflow-hidden transition-all ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                <div className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`w-full px-3 py-2 text-sm rounded-md border ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    onChange={handleSearchChange}
                  />
                </div>

                <ul className="space-y-2 p-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                  {columns
                    .filter((column) =>
                      column.header
                        .toLowerCase()
                        .includes(colSearchTerm.toLowerCase())
                    )
                    .map((column) => (
                      <li
                        key={column.accessor}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={column.accessor}
                          value={column.accessor}
                          checked={visibleColumns[column.accessor]}
                          onChange={handleCheckboxChange}
                          className={`mr-2 rounded-sm border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 ${
                            isDarkMode ? "bg-gray-600 text-white" : ""
                          }`}
                        />
                        <label
                          htmlFor={column.accessor}
                          className="font-semibold"
                        >
                          {column.header}
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={exportPDF}
            disabled={loading}
            className="flex items-center space-x-1 text-sm bg-blue-500 text-white p-2 rounded-md"
          >
            <FaFilePdf />
            <span>Export PDF</span>
          </button>

          <button
            onClick={exportExcel}
            className="flex items-center space-x-1 text-sm bg-green-500 text-white p-2 rounded-md"
          >
            <FaFileExcel />
            <span>Export Excel</span>
          </button>

          <div
            onClick={toggleTheme}
            className="cursor-pointer text-xl text-gray-700 dark:text-white"
          >
            {isDarkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </div>

          <label
            htmlFor="rowsPerPage"
            className={`text-sm font-medium select-none ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Rows per page:
          </label>

          <select
            id="rowsPerPage"
            className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 py-1 px-2 text-black"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {[10, 15, 20, 30, 50, 100].map((number) => (
              <option key={number} value={number} className="text-black">
                {number}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead
            className={`text-xs uppercase ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <tr>
              {Isslno && (
                <th
                  scope="col"
                  className="px-6 py-3 text-center whitespace-nowrap"
                >
                  Sl no
                </th>
              )}

              {columns.map(
                (column, index) =>
                  visibleColumns[column.accessor] && (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 "
                    >
                      {column.header}
                    </th>
                  )
              )}
              {showActions && (
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  isDarkMode
                    ? rowIndex % 2 === 0
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : rowIndex % 2 === 0
                    ? "bg-white text-gray-800 hover:bg-gray-100"
                    : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                } border-b transition duration-150 ease-in-out ${
                  Onhighligt === "edit" && selectedRow === row[Actionid]
                    ? isDarkMode
                      ? "bg-blue-600"
                      : "bg-blue-300"
                    : Onhighligt === "delete" && selectedRow === row[Actionid]
                    ? isDarkMode
                      ? "bg-red-600"
                      : "bg-red-300"
                    : Onhighligt === "green" && selectedRow === row[Actionid]
                    ? isDarkMode
                      ? "bg-green-600"
                      : "bg-green-300"
                    : ""
                }`}
              >
                {Isslno && (
                  <td
                    scope="col"
                    className="px-6 py-3 whitespace-nowrap text-center"
                  >
                        {(currentPage - 1) * itemsPerPage + (rowIndex + 1)}

                  </td>
                )}
                {columns.map(
                  (column, colIndex) =>
                    visibleColumns[column.accessor] && (
                      <td
                        key={colIndex}
                        className="px-6 py-4 whitespace-nowrap "
                      >
                        {row[column.accessor]}
                      </td>
                    )
                )}

                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      className={`text-blue-500 hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      onClick={() => handleEditClick(row[Actionid])}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={`text-red-500 hover:text-white hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 ml-4 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                      onClick={() => handleDeleteClick(row[Actionid])}
                    >
                      <FaTrash />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 py-4">No results found</p>
      )}

      {filteredData.length > 0 && (
        <div
          className={`flex flex-col sm:flex-row justify-between items-center px-6 py-4 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? "text-white" : "text-gray-700"
            } mb-2 sm:mb-0`}
          >
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </p>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {renderPageButtons()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
