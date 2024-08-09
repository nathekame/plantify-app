'use client'
import { useState, useEffect } from 'react';
import treatmentsData from '../../../treatments.json'; // Adjust the path to where you place the JSON file
import Navbar from '@/components/partials/nav';
import { Button } from '@/components/ui/button';

interface TreatmentInfo {
  "Disease and Cause"?: string;
  "Affected Plants"?: string;
  "Symptoms and Impact"?: string;
  "Treatment"?: string;
}

interface Treatment {
  class: string;
  treatment: TreatmentInfo;
}

const TreatmentsPage: React.FC = () => {
  const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Process the data to get Treatment objects
    const treatmentsList = Object.entries(treatmentsData).flatMap(([key, treatmentGroup]) => {
      return Object.entries(treatmentGroup).map(([className, treatment]) => ({
        class: className,
        treatment
      }));
    });

    setFilteredTreatments(treatmentsList);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      setFilteredTreatments(
        filteredTreatments.filter(item =>
          item.class.toLowerCase().includes(query)
        )
      );
    } else {
      // Re-load treatments if search is cleared
      const treatmentsList = Object.entries(treatmentsData).flatMap(([key, treatmentGroup]) => {
        return Object.entries(treatmentGroup).map(([className, treatment]) => ({
          class: className,
          treatment
        }));
      });
      setFilteredTreatments(treatmentsList);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    const treatmentsList = Object.entries(treatmentsData).flatMap(([key, treatmentGroup]) => {
      return Object.entries(treatmentGroup).map(([className, treatment]) => ({
        class: className,
        treatment
      }));
    });
    setFilteredTreatments(treatmentsList);
  };

  return (
    <div>
      <Navbar />
      
      <div className="lg:container">
        <div className="my-10 py-10 flex justify-center">
          <h1 className="font-bold text-4xl mt-5 uppercase text-center">Plant Treatment</h1>
        </div>

        <div className='flex justify-end'>
          <input
            type="text"
            placeholder="Filter by class"
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 mb-4"
          />

          <Button className="bg-green-500 text-white py-2 px-4 rounded text-center hover:bg-green-500 hover:font-extrabold" onClick={handleClear}>Clear</Button>
        </div>

        <div className="flex flex-col px-5 sm:flex-row h-96">
          <div>
            {filteredTreatments.map(item => {
              // Build the treatment detail HTML conditionally
              const diseaseAndCause = item.treatment["Disease and Cause"] ? 
                `<p><strong>Disease and Cause:</strong> ${item.treatment["Disease and Cause"]}</p>` : '';
              const affectedPlants = item.treatment["Affected Plants"] ? 
                `<p><strong>Affected Plants:</strong> ${item.treatment["Affected Plants"]}</p>` : '';
              const symptomsAndImpact = item.treatment["Symptoms and Impact"] ? 
                `<p><strong>Symptoms and Impact:</strong> ${item.treatment["Symptoms and Impact"]}</p>` : '';
              const treatment = item.treatment["Treatment"] ? 
                `<p><strong>Treatment:</strong> ${item.treatment["Treatment"]}</p>` : '';

              return (
                <div key={item.class} className="mb-6">
                  <p><strong>Class:</strong> {item.class}</p>
                  {diseaseAndCause || affectedPlants || symptomsAndImpact || treatment ? (
                    <>
                      <h1><strong>Treatment Details -</strong></h1>
                      <div dangerouslySetInnerHTML={{ __html: `${diseaseAndCause}${affectedPlants}${symptomsAndImpact}${treatment}` }} />
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentsPage;
