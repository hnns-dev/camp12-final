import Image from "next/image";
import exampleImage from "../../public/example.png";

const VenueDetailsPage = () => {
  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      {/* Date Navigation */}
      <div className="flex items-center justify-center space-x-4">
        <button className="text-lg">←</button>
        <h2 className="text-lg font-bold">16.03.2067</h2>
        <button className="text-lg">→</button>
      </div>

      {/* Venue Name */}
      <h1 className="text-xl font-bold">Erich Zeigner Allee 78</h1>

      {/* Venue Image */}
      <div className="relative w-full max-w-md">
        <Image
          src={exampleImage}
          alt="Venue"
          className="rounded-lg"
          layout="responsive"
          width={640}
          height={320}
        />
        <div className="absolute bottom-3 left-7 flex space-x-3">
          <span className="bg-white bg-opacity-50 text-white border border-white rounded-full px-2 py-1 text-sm">
            Condition
          </span>
          <span className="bg-white bg-opacity-50 text-white border border-white rounded-full px-2 py-1 text-sm">
            Public
          </span>
        </div>
      </div>

      {/* Ongoing Event */}
      <h2 className="text-lg font-bold">Ongoing</h2>
      <div className="bg-gray-200 rounded-lg p-4 w-full max-w-md">
        <div className="flex justify-between">
          <div>
            <p>Type: Tournament</p>
            <p>Date: 16.03.2067</p>
            <p>Time: 06:00</p>
          </div>
          <div>
            <p>Duration: 2h</p>
            <p>Size: 16/16</p>
            <p>Private</p>
          </div>
        </div>
      </div>

      {/* Planned Event */}
      <h2 className="text-lg font-bold">Planned</h2>
      <div className="bg-gray-200 rounded-lg p-4 w-full max-w-md">
        <div className="flex justify-between">
          <div>
            <p>Type: Session</p>
            <p>Date: 18.03.2067</p>
            <p>Time: 12:00</p>
          </div>
          <div>
            <p>Duration: Open End</p>
            <p>Size: -</p>
            <p>Open</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <h2 className="text-lg font-bold">Description</h2>
      <div className="bg-gray-200 rounded-lg p-4 w-full max-w-md">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam
          nonummy...
        </p>
      </div>
    </div>
  );
};

export default VenueDetailsPage;
