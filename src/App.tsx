import Autocomplete from "./components/AutoComplete";
import { BASE_URL } from "./contants";

const App: React.FC = () => {
  const apiEndpoint = BASE_URL;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">AutoComplete Search</h1>
      <Autocomplete apiEndpoint={apiEndpoint} />
    </div>
  </div>
  );
};

export default App;