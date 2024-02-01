import Autocomplete from "./components/AutoComplete";
import { BASE_URL } from "./contants";

const App: React.FC = () => {
  const apiEndpoint = BASE_URL;

  return (
    <div className="m-5 md:m-20 flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4">AutoComplete Search</h1>
      <div className="bg-gray-100 p-8 mb-40 rounded-md shadow-md">
        <Autocomplete api_URL={apiEndpoint} searchCategory="Dog Breed" />
      </div>
    </div>
  );
};

export default App;