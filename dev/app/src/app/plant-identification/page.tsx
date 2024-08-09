import PlantIdentificationForm from "@/components/forms/plantIdentificationForm";
import Navbar from "@/components/partials/nav";

const PlantIdentification: React.FC = () => {
  return (
    <div>
      <Navbar />

      <div className="lg:container mx-auto px-4">
        <div className="my-10 py-10 flex justify-center">
          <h1 className="font-bold text-4xl mt-5 uppercase text-center">Plant Identification</h1>
        </div>
        <div className="flex justify-center">
          <PlantIdentificationForm />
        </div>
      </div>
    </div>
  );
};

export default PlantIdentification;
