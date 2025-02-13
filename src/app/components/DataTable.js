"use client";

import { useState, useMemo,useRef,useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  FaMoon,
  FaSun,
  FaFilePdf,
  FaFileExcel,
  FaArrowDown,
} from "react-icons/fa";

import * as XLSX from "xlsx";

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export function DataTable({ data, columns }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const toggleExportMenu = () => {
    setIsExportOpen(!isExportOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsExportOpen(false); 
    }
  };

  useEffect(() => {
    if (isExportOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isExportOpen]);





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

  const dropdownRef = useRef(null);

  const exportPDF = () => {
    const doc = new jsPDF();
    
  
    doc.autoTable({
      head: [columns.map((col) => col.header)],
      body: data.map((row) => columns.map((col) => row[col.accessor])),
      theme: 'grid',
      styles: {
        cellPadding: 5,
        fontSize: 10,
        cellWidth: 'auto',
        halign: 'center',
        textColor: [0, 0, 0],
      },
      headStyles: {
        fontStyle: 'bold',  
        fillColor: [255, 255, 255],
      },
      tableLineWidth: 0.5,
      tableLineColor: [0, 0, 0],
      margin: { top: 20, left: 10, right: 10, bottom: 10 },
    });
  
    doc.save("data-export.pdf");
    setIsExportOpen(false);
  };
  


  const exportExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      data.map((row) =>
        columns.reduce((acc, col) => {
          acc[col.header] = row[col.accessor];
          return acc;
        }, {})
      )
    );
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "data-export.xlsx");
    setIsExportOpen(false); 
  };

  return (
    <div
      className={`w-full shadow-lg rounded-lg overflow-hidden ${
        isDarkMode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      
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
          {/* <div
            onClick={toggleExportMenu}
            className="cursor-pointer text-xl text-gray-700 dark:text-white"
          >
            {isDarkMode ? (
              <FaArrowDown className="text-white" />
            ) : (
              <FaArrowDown className="text-gray-800" />
            )}

          </div>

          {isExportOpen && (
            <div className="flex flex-col space-y-2 absolute bg-white dark:bg-gray-800 border border-gray-300 rounded-md shadow-lg py-2 px-4">
              <button
                onClick={exportPDF}
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
            </div>
          )} */}
       <div
        onClick={toggleExportMenu}
        className="cursor-pointer text-xl text-gray-700 dark:text-white"
      >
        {isDarkMode ? (
          <FaArrowDown className="text-white" />
        ) : (
          <FaArrowDown className="text-gray-800" />
        )}
      </div>

      {isExportOpen && (
        <div
          ref={dropdownRef}
          className="flex flex-col space-y-2 absolute bg-white dark:bg-gray-800 border border-gray-300 rounded-md shadow-lg py-2 px-4"
        >
          <button
            onClick={exportPDF}
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
        </div>
      )}
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
            className="text-sm font-medium text-gray-700"
          >
            Rows per page:
          </label>

          <select
            id="rowsPerPage"
            className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 py-1 px-2 text-black"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {[5, 10, 15, 20].map((number) => (
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
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {column.header}
                </th>
              ))}
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
                } border-b transition duration-150 ease-in-out`}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 py-4">No results found</p>
      )}

      {/* Pagination */}
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
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
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
