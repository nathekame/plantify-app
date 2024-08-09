"use client"; // Use this directive at the top of your client-side components

import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import Link from 'next/link';
import config from '@/config/config';
import Loading from '../partials/loading';

interface PredictionsType {
  match: any;
  class: string;
  confidence: string;
}

interface TreatmentsType {
  [key: string]: string;
}

interface TreatmentInfo {
  DiseaseAndCause: string;
  AffectedPlants: string;
  SymptomsAndImpact: string;
  PreventionAndTreatment: string;
}

interface Treatments {
  [key: number]: {
    [diseaseName: string]: TreatmentInfo;
  };
}

const PlantDiagnosisForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [predictions, setPredictions] = useState<PredictionsType[]>([]);
  const [clearButton, setClearButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profilePicFile, setProfilePicFile] = useState({ src: '', alt: 'Upload an Image' });
  const [treatmentInfo, setTreatmentInfo] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
    setProfilePicFile({
      ...profilePicFile,
      src: file ? URL.createObjectURL(file) : '',
      alt: "image",
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('image_data', selectedFile);

    try {
      const response = await axios.post(`${config.backendUrl}/diagnose-plant`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setPredictions(response.data);
        setClearButton(true);
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      setError('Error uploading image. Please try again later.');
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClear = () => {
    setSelectedFile(null);
    setProfilePicFile({ src: '', alt: '' });
    setPredictions([]);
    setClearButton(false);
    setError('');
    setTreatmentInfo('')
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProfilePicFile({ src: '', alt: '' });
  };

  // const handleFindTreatment = async () => {
  //   try {
  //     // Import the JSON file and assert the type
  //     const treatments: any = await import('../../../treatments.json');

  //      console.log('THESE ARE THE PREDICTIONS ==> ' + JSON.stringify(predictions));


  //     // Find treatments by matching `class`
  //     const foundTreatments = predictions.map(prediction => {
  //       // Loop through the JSON to find the matching treatment
  //       let diseaseGroup: any 
  //       for (diseaseGroup of Object.values(treatments)) {
  //         const treatment = diseaseGroup[prediction.class];
  //         if (treatment) {
  //           console.log(treatment);
  //           console.log(prediction);

  //           return {
  //             class: prediction.class,
  //             treatment
  //           };
  //         }
  //       }
  //       return null;
  //     }).filter((item): item is { class: string; treatment: TreatmentInfo } => item !== null);

  //     if (foundTreatments.length > 0) {
  //       // const treatmentStrings = foundTreatments.map(item => 
  //       //   `Class: ${item.class}, Treatment Details: Disease and Cause: ${item.treatment.DiseaseAndCause}, Affected Plants: ${item.treatment.AffectedPlants}, Symptoms and Impact: ${item.treatment.SymptomsAndImpact}, Prevention and Treatment: ${item.treatment.PreventionAndTreatment}`
  //       // ).join('; ');
  //       const treatmentStrings = foundTreatments.map(item => 
  //         `Class: ${item.class}, Treatment Details: ${JSON.stringify(item.treatment)}`
  //       ).join('; ');
  //       setTreatmentInfo(treatmentStrings);
  //     } else {
  //       setTreatmentInfo('No treatments found.');
  //     }
  //   } catch (error) {
  //     console.error('Error finding treatments:', error);
  //   }
  // };



  // const handleFindTreatment = async () => {
  //   try {
  //     // Import treatments JSON file
  //     const treatments: any = await import('../../../treatments.json');
      
  //     // Map through predictions and find matching treatments
  //     const foundTreatments = predictions.map(prediction => {
  //       // Loop through the JSON to find the matching treatment
  //       let diseaseGroup: any;
  //       for (diseaseGroup of Object.values(treatments)) {
  //         const treatment = diseaseGroup[prediction.class];
  //         if (treatment) {
  //           return {
  //             class: prediction.class,
  //             treatment
  //           };
  //         }
  //       }
  //       return null;
  //     }).filter((item): item is { class: string; treatment: any } => item !== null);
  
  //     if (foundTreatments.length > 0) {
  //       const treatmentStrings = foundTreatments.map(item => 
  //         `<p><strong>Class:</strong> ${item.class}</p><br>
  //         <h1><strong>Treatment Details -</strong></h1>
  //         <p><strong>Disease and Cause:</strong> ${item.treatment["Disease and Cause"] ? item.treatment["Disease and Cause"] : '' }</p>
  //         <p><strong>Affected Plants:</strong> ${item.treatment["Affected Plants"] ? item.treatment["Affected Plants"] : '' }</p>
  //         <p><strong>Symptoms and Impact:</strong> ${item.treatment["Symptoms and Impact"] ? item.treatment["Symptoms and Impact"] : ''}</p>
  //         <p><strong>Treatment:</strong> ${item.treatment["Treatment"] ? item.treatment["Treatment"] : ''}</p>`
  //       ).join('<hr /><br >'); // Adding <hr /> for a horizontal rule between treatments
  //       setTreatmentInfo(treatmentStrings);
  //     } else {
  //       setTreatmentInfo('<p>No treatments found.</p>');
  //     }
  //   } catch (error) {
  //     console.error('Error finding treatments:', error);
  //   }
  // };
  

  const handleFindTreatment = async () => {
    try {
      // Import treatments JSON file
      const treatments: any = await import('../../../treatments.json');
  
      // Map through predictions and find matching treatments
      const foundTreatments = predictions.map(prediction => {
        // Loop through the JSON to find the matching treatment
        let diseaseGroup: any;
        for (diseaseGroup of Object.values(treatments)) {
          const treatment = diseaseGroup[prediction.class];
          if (treatment) {
            return {
              class: prediction.class,
              treatment
            };
          }
        }
        return null;
      }).filter((item): item is { class: string; treatment: any } => item !== null);
  
      if (foundTreatments.length > 0) {
        const treatmentStrings = foundTreatments.map(item => {
          // Build the treatment detail HTML conditionally
          const diseaseAndCause = item.treatment["Disease and Cause"] ? 
            `<p><strong>Disease and Cause:</strong> ${item.treatment["Disease and Cause"]}</p>` : '';
          const affectedPlants = item.treatment["Affected Plants"] ? 
            `<p><strong>Affected Plants:</strong> ${item.treatment["Affected Plants"]}</p>` : '';
          const symptomsAndImpact = item.treatment["Symptoms and Impact"] ? 
            `<p><strong>Symptoms and Impact:</strong> ${item.treatment["Symptoms and Impact"]}</p>` : '';
          const treatment = item.treatment["Treatment"] ? 
            `<p><strong>Treatment:</strong> ${item.treatment["Treatment"]}</p>` : '';
  
          return `
            <p><strong>Class:</strong> ${item.class}</p><br>
            ${diseaseAndCause || affectedPlants || symptomsAndImpact || treatment ? 
              `<h1><strong>Treatment Details -</strong></h1>` : ''}
            ${diseaseAndCause}
            ${affectedPlants}
            ${symptomsAndImpact}
            ${treatment}
          `;
        }).join('<hr /><br />'); // Adding <hr /> for a horizontal rule between treatments
  
        setTreatmentInfo(treatmentStrings);
      } else {
        setTreatmentInfo('<p>No treatments found.</p>');
      }
    } catch (error) {
      console.error('Error finding treatments:', error);
    }
  };
  


  const conStyle = {
    imgPreview: { display: profilePicFile.src ? 'inline' : 'none' },
    imgButton: { display: profilePicFile.src ? 'none' : 'inline' },
  };

              {/* {isLoading ? <span className='text-red-500 font-bold text-xl'>Diagnosis ongoing, please wait...</span> : ( */}


  return (
    <>
      <div className={` flex justify-center items-center`}>
        <div className='w-full'>
          <Card className='p-5'>
            <CardTitle className='flex justify-between'>
            </CardTitle>

            {isLoading ? <Loading /> : (


              <CardContent>
                <div className='flex justify-center'>
                  <div className="">
                    <div style={conStyle.imgButton}>
                      <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-green-500 rounded-lg  shadow-sm tracking-wide uppercase border border-green-500 cursor-pointer hover:bg-green-500 hover:text-white">
                        <svg
                          width="150"
                          height="150"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10 10 10 0 01-10-10A10 10 0 0112 2z" />
                          <path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10 10 10 0 01-10-10A10 10 0 0112 2z" />
                          <path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10 10 10 0 01-10-10A10 10 0 0112 2z" />
                        </svg>
                        <span className="mt-2 text-center font-bold text-base leading-normal">
                          Upload Image
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".png, .jpg, .jpeg"
                          name="plantImage"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    <div style={conStyle.imgPreview}>
                      <div className="flex flex-wrap w-full justify-center -mx-3 mb-3">
                        <div className="w-3/4 px-3 mb-6 md:mb-0">
                          <img src={profilePicFile.src} alt={profilePicFile.alt} className="form-img" />
                          <button
                            className="w-full h-16 bg-green-700 p-2 text-white text-lg font-bold border-primary"
                            style={conStyle.imgPreview}
                            onClick={handleCancel}
                          >
                            Cancel And Reupload Image
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='flex gap-1 mt-5 justify-between'>
                      <Link href="/">
                        <Button className="bg-green-500 text-white py-2 px-4 rounded text-center hover:bg-green-500 hover:font-extrabold">Back Home</Button>
                      </Link>
                      <Button onClick={handleUpload} className="bg-green-500 text-white py-2 px-4 rounded text-center hover:bg-green-500 hover:font-extrabold" disabled={!selectedFile || isLoading}>Diagnose</Button>
                    </div>
                  </div>
                </div>

                <div className='flex justify-center font-extrabold text-xl'>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>

                <div className='mt-2 flex justify-center'>
                  {clearButton ? (
                    <ul className='text-center'>
                      {predictions.map((pred, i) => (
                        <li key={i} className='text-base font-bold p-2'>
                          {`${pred.class} - ${pred.confidence}`}
                        </li>
                      ))}
                      <div className='mt-3 flex justify-between'>
                        <Button onClick={handleImageClear}>Clear Result</Button>
                        <Button className="bg-green-500 text-white py-2 px-4 rounded text-center hover:bg-green-500 hover:font-extrabold" onClick={handleFindTreatment}>Find Treatment</Button>
                      </div>
                    </ul>
                  ) : null}
                </div>

                {/* {treatmentInfo && (
                  <div className='mt-2'>
                    <p>{treatmentInfo}</p>
                  </div>
                )} */}
                {treatmentInfo && (
                  <div className='mt-2' dangerouslySetInnerHTML={{ __html: treatmentInfo }} />
                )}

              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default PlantDiagnosisForm;
