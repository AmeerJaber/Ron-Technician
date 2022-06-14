import React,{useState} from "react";
import { jsPDF } from "jspdf";


const doc = new jsPDF();
const PDF = () => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf"); // will save the file in the current working directory

};

export default PDF;