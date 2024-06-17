"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import Image from 'next/image';




const PlantIdentificationForm: React.FC = () => {


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);

  const [apiMsg, setApiMsg] = useState<string>('');
  const [apiResultCode, setApiResultCode] = useState<number>();


  const [specie, setSpecie] = useState<string>('');
  const [specieClassID, setSpecieClassID] = useState<number>();



  const [isLoading, setIsLoading] = useState(false);
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);


    const formData = new FormData();
    formData.append('image_data', selectedFile);

 
    try {
      // const response = await axios.post('http://10.144.119.175:8000/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // console.log('Upload successful:', response.data);

      // console.log('Upload successful:', JSON.stringify(response));



      if (response.status) {

        const apiURL = 'http://localhost:8000/';
        // const apiURL = 'http://10.144.119.175:8000/';


        const inputImage = apiURL + response.data['input_image'];
        

        const specie_class_id = response.data['class_id'];
        const specie = response.data['specie'];



        setOriginalImageUrl(inputImage);

        setSpecie(specie);
        setSpecieClassID(specie_class_id);
      
      } else {
        console.error('Failed to send message');
        // Handle error
      }
    } catch (error) {
      setError('Error uploading image. Please try again later.');
      console.error('Upload error:', error);
      // Handle error as needed
    } finally {
      setIsLoading(false);
    }
  };


  const handleImageClear = () => {
    setOriginalImageUrl('');
    // console.log('the input url ---> ' + JSON.stringify(originalImageUrl))
    setProcessedImageUrl('');
    setApiMsg('');
    setApiResultCode(0);
    setSelectedFile(null);


  }



  // const handleUpload = async () => {
  //   if (!selectedFile) return;
  
  //   setUploading(true);
  //   try {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(selectedFile);
  
  //     reader.onload = async () => {
  //       const imageData = reader.result as string;
  
  //       const requestData = {
  //         image: imageData
  //       };
  
  //       try {
  //         const response = await axios.post('http://localhost:8000/upload', requestData);
  
  //         console.log('Upload successful:', response.data);
  //         setOriginalImageUrl(URL.createObjectURL(selectedFile));
  //         setProcessedImageUrl(response.data.processedImageUrl);
  //         // Add further handling for successful upload if needed
  //       } catch (error) {
  //         setError('Error uploading image. Please try again later.');
  //         console.error('Upload error:', error);
  //         // Handle error as needed
  //       } finally {
  //         setUploading(false);
  //       }
  //     };
  //   } catch (error) {
  //     setError('Error uploading image. Please try again later.');
  //     console.error('Upload error:', error);
  //     // Handle error as needed
  //     setUploading(false);
  //   }
  // };
  


  return (

          <>
          {/* <div className={`fixed bottom-0 right-0 p-4 bg-white rounded-lg shadow-md`}> */}
          <div className={` flex justify-center items-center`}>


           
                <div className='w-full'>

                  <Card className='p-5'>
                    <CardTitle className='flex justify-between'>
                      <span className='my-2 pb-4'>
                        Upload Plant Image
                      </span>

                    </CardTitle>

                     { isLoading ? <span className='text-red-500 font-bold text-xl'>Identification ongoing, please wait...</span> : (

                        <CardContent>
                        <div className='flex justify-between'>
                          <input type="file" accept="image/*" onChange={handleFileChange} />
                          <Button onClick={handleUpload} disabled={!selectedFile || isLoading}>Upload</Button>
                        </div>

                        <div className='flex justify-center font-extrabold text-xl'>

                            {error && <p className="text-red-500 mt-2">{error}</p>}

                            {apiMsg && apiResultCode === 1 ? (

                                <p className={` text-green-500 mt-2`}>{apiMsg}</p>

                            ) : null}

                            {apiMsg && apiResultCode === 0 ? (

                            <p className={` text-red-500 mt-2`}>{apiMsg}</p>

                            ) : null}

                        </div>

                        {/* <p className="mb-2 flex justify-center font-bold">{specie}</p>
                        <p className="mb-2 flex justify-center font-bold">{specieClassID}</p> */}

                        {/* <p className="mb-2 flex justify-center font-bold">{originalImageUrl}</p> */}

                        {/* {originalImageUrl ? <p className="mb-2 flex justify-center font-bold">{originalImageUrl}</p> : null} */}
                        


                          


                        {originalImageUrl ? (
                          <div className="flex justify-center gap-5 mt-4">
                            <div className="mr-4">
                              <p className="mb-2 flex justify-center font-bold">Uploaded Image</p>
                              <Image src={originalImageUrl} alt="Original" width={500} height={300} className="max-w-xs max-h-xs" />
                              {/* <img src={originalImageUrl} alt="Original" className="max-w-xs max-h-xs" /> */}

                              <p className="mb-2 flex justify-center font-bold">{specie}</p>
                              <p className="mb-2 flex justify-center font-bold">{specieClassID}</p>
                              <div className='flex justify-center mt-3'>
                                <Button onClick={handleImageClear}>Clear Result</Button>
                              </div>

                            </div>
                            <div>
                              {/* <p className="mb-2 flex justify-center font-bold">Plant Class</p> */}
                              {/* <Image  src={processedImageUrl} alt="Processed" width={500} height={300} className="max-w-xs max-h-xs" /> */}
                              {/* <p className="mb-2 flex justify-center font-bold">Processed Image</p> */}

                              {/* <img src={processedImageUrl} alt="Processed" className="max-w-xs max-h-xs" /> */}
                            
                            </div>

                           

                          </div>
                        ) : null}

                        </CardContent>
                     )}

                  


                       
                    {/* <CardFooter>
                      <Button onClick={handleClose}>Close Chat</Button>
                    </CardFooter> */}
            
                  </Card>

              </div>

              </div>

         
          </>



 
  );
};

export default PlantIdentificationForm;



// ChatPopup.tsx
// import React, { FC } from 'react';

// interface ChatPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   question: string;
//   answer: string;
// }

// const ChatPopup: FC<ChatPopupProps> = ({ isOpen, onClose, question, answer }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed bottom-4 right-4">
//       <div className="bg-white rounded-lg p-4 shadow-md">
//         <h2 className="text-lg font-semibold mb-2">Chat</h2>
//         <div className="flex flex-col space-y-2">
//           <div className="text-left">
//             <h3 className="font-semibold text-gray-700">Question:</h3>
//             <p className="bg-gray-100 p-2 rounded-md">{question}</p>
//           </div>
//           <div className="text-right">
//             <h3 className="font-semibold text-gray-700">Answer:</h3>
//             <p className="bg-blue-100 text-white p-2 rounded-md">{answer}</p>
//           </div>
//         </div>
//         <button
//           onClick={onClose}
//           className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mt-4"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPopup;
