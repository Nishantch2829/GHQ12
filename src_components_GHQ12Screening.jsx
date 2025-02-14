import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { jsPDF } from "jspdf";

const questions = [
  "Been feeling reasonably happy, all things considered?",
  "Been able to concentrate on what you're doing?",
  "Felt that you are playing a useful part in things?",
  "Been capable of making decisions?",
  "Felt constantly under strain?",
  "Felt you couldn't overcome difficulties?",
  "Been able to enjoy your normal activities?",
  "Been able to face up to your problems?",
  "Been feeling unhappy and depressed?",
  "Been losing confidence in yourself?",
  "Been thinking of yourself as a worthless person?",
  "Been feeling reasonably well mentally?"
];

const GHQ12Screening = () => {
  const [responses, setResponses] = useState(Array(12).fill(null));
  const options = ["Not at all", "No more than usual", "Rather more than usual", "Much more than usual"];

  const handleResponseChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const calculateScore = () => {
    return responses.reduce((acc, curr) => acc + (curr || 0), 0);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("GHQ-12 Screening Results", 20, 20);
    questions.forEach((q, i) => {
      doc.text(`${i + 1}. ${q} - ${options[responses[i]] || "Not answered"}`, 20, 30 + i * 10);
    });
    doc.text(`Total Score: ${calculateScore()}`, 20, 170);
    doc.save("GHQ12_Screening_Result.pdf");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">GHQ-12 Screening Tool</h2>
      {questions.map((question, index) => (
        <Card key={index} className="mb-4 p-4">
          <CardContent>
            <p className="font-medium">{index + 1}. {question}</p>
            <div className="mt-2 flex space-x-4">
              {options.map((option, idx) => (
                <label key={idx} className="cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={idx}
                    onChange={() => handleResponseChange(index, idx)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={generatePDF} className="mt-4">Download Results as PDF</Button>
    </div>
  );
};

export default GHQ12Screening;