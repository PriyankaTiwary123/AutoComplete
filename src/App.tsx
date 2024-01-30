import Autocomplete from "./components/AutoComplete";

const App: React.FC = () => {
  const suggestions = ['priyanka', 'Rishikesh', 'John', 'marry', 'Niru'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">AutoComplete Search</h1>
      <Autocomplete suggestions={suggestions} />
    </div>
  </div>
  );
};

export default App;