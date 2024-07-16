import Image from "next/image";
import PlantIdentificationForm from "@/components/forms/plantIdentificationForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const PlantDiagnosis: React.FC = () => {

  return (
    <div className="lg:container">
   
   <div className="my-10 py-10 ">
      <h1 className="font-bold text-4xl">Support</h1>
      {/* <h1 className="font-bold text-2xl mt-5">Upload Image of plant leaf</h1> */}
       
      <Link href="/">
                            <Button className="bg-blue-500 mt-5 text-white py-2 px-4 rounded text-center hover:bg-blue-500 hover:font-extrabold">Back Home</Button>
                          </Link>
                          
      </div>

    </div>
  );
};

export default PlantDiagnosis;