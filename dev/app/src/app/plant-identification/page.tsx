import Image from "next/image";
import PlantIdentificationForm from "@/components/forms/plantIdentificationForm";


const PlantIdentification: React.FC = () => {

  return (
    <div className="lg:container">
   
   <div className="my-10 py-10 ">
      <h1 className="font-bold text-4xl">Plant Identifcation</h1>
      {/* <h1 className="font-bold text-2xl mt-5">Upload Image of plant leaf</h1> */}
      </div>

      <PlantIdentificationForm />
    </div>
  );
};

export default PlantIdentification;