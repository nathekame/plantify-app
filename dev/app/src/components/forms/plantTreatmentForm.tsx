"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import config from '@/config/config';



interface SearchFormProps {
    onSearch: (query: string) => void;
}
  

const PlantTreatmentForm: React.FC<SearchFormProps> = ({ onSearch }) => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);

  const [apiMsg, setApiMsg] = useState<string>('');
  const [apiResultCode, setApiResultCode] = useState<number>();


  const [specie, setSpecie] = useState<[]>();
  const [specieClassID, setSpecieClassID] = useState<number>();



  const [isLoading, setIsLoading] = useState(false);



//   const [profilePic, setProfilePic] = useState({
//     profilePic: '',
//   });

  const [profilePicFile, setProfilePicFile] = useState({
    src: '',
    alt: 'Upload an Image',
  });

  const { src, alt } = profilePicFile;




  

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
      // const response = await axios.post('http://10.144.119.175:8000/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      const response = await axios.post(`${config.backendUrl}/diagnose-plant`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);

      console.log('Upload successful:', JSON.stringify(response));



      if (response.status) {

        console.log('THE RESPONSE ==> ' + JSON.stringify(response.data))

        const apiURL = `${config.backendUrl}/`;
        
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

  const handleCancel = async () => {
    // e.preventDefault();

    setProfilePicFile({ src: '', alt: '' });
    // setProfilePic({ profilePic: '' });
  };

  const checkImgButton = () => {
    if (!src) {
      return 'inline';
    }
    return 'none';
  };

  const checkImgPreview = () => {
    if (src) {
      return 'inline';
    }
    return 'none';
  };

  const conStyle = {
    imgPreview: { display: checkImgPreview() },
    imgButton: { display: checkImgButton() },
  };
  


  return (

          <>
          {/* <div className={`fixed bottom-0 right-0 p-4 bg-white rounded-lg shadow-md`}> */}
          <div className={` flex justify-center items-center`}>


           
                <div className='w-full'>

                  <Card className='p-5'>
                    <CardTitle className='flex justify-between'>
                      {/* <span className='my-2 pb-4'>
                        Upload Plant Image
                      </span> */}

                    </CardTitle>

                     { isLoading ? <span className='text-red-500 font-bold text-xl'>Identification ongoing, please wait...</span> : (

                        <CardContent>
                        <div className='flex justify-center'>
                          {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}



                          <div className="">
                          <div style={conStyle.imgButton}>
          <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-green-500 rounded-lg  shadow-sm tracking-wide uppercase border border-green-500 cursor-pointer hover:bg-green-500 hover:text-white">
            {/* <svg
              width="150"
              height="150"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
              <circle cx="12" cy="10" r="3" />
              <circle cx="12" cy="12" r="10" />
            </svg> */}

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
              Upload Sick Plant Image
              <br />
              {/* (JPEG/PNG only) */}
            </span>
            <input
              type="file"
              className="hidden"
              accept=".png, .jpg, .jpeg"
              name="plantImage"
              onChange={handleFileChange} 
            //   onChange={(e) => handleImageChange(e)}

            />
          </label>

          </div>

          <div style={conStyle.imgPreview}>
        <div className="flex flex-wrap w-full justify-center -mx-3 mb-3">
          <div className="w-3/4 px-3 mb-6 md:mb-0">
            <img src={src} alt={alt} className="form-img" />
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
                          
                          <Button onClick={handleUpload} className='bg-green-500' disabled={!selectedFile || isLoading}>Search</Button>

                          </div>



        </div>




















                      
                         
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
                              {/* {specie?.map((item) => (
                                <p key={item[0]} >{item[1]}</p>
                              ))} */}
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

export default PlantTreatmentForm;


