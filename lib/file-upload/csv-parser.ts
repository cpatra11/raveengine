import Papa from "papaparse";
import { CSVRowData } from "../actions/import-testimonials";
import * as XLSX from "xlsx";

export async function parseCSVFile(file: File): Promise<CSVRowData[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Ensure we're returning plain objects with our expected structure
        const parsedData = results.data.map((row: any) => ({
          name: String(row.name || ""),
          rating: Number(row.rating || 5),
          testimonial: String(row.testimonial || row.review || row.text || ""),
          date: row.date ? String(row.date) : undefined,
        }));
        resolve(parsedData);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

export async function parseExcelFile(file: File): Promise<CSVRowData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        if (!e.target?.result) {
          reject(new Error("Failed to read file"));
          return;
        }

        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        // Get the first worksheet
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        // Convert to JSON and ensure we're returning plain objects
        const rawData = XLSX.utils.sheet_to_json(worksheet);
        const parsedData = rawData.map((row: any) => ({
          name: String(row.name || ""),
          rating: Number(row.rating || 5),
          testimonial: String(row.testimonial || row.review || row.text || ""),
          date: row.date ? String(row.date) : undefined,
        }));

        resolve(parsedData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsArrayBuffer(file);
  });
}

export async function parseFile(file: File): Promise<CSVRowData[]> {
  const fileType = file.name.split(".").pop()?.toLowerCase();

  if (fileType === "csv") {
    return parseCSVFile(file);
  } else if (["xlsx", "xls"].includes(fileType || "")) {
    return parseExcelFile(file);
  } else {
    throw new Error("Unsupported file format");
  }
}
