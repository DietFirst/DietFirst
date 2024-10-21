import { useStepperContext } from "../StepperContext";

export default function Account() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex flex-col">
      <div className="mx-2 w-full flex-1">
        <p className="text-center mb-5">
          To help you get started with DietFirst, let's make an account!
        </p>
        <label className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Username
        </label>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData.username || ""}
            name="username"
            placeholder="Username"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <label className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Password
        </label>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData.password || ""}
            name="password"
            placeholder="Password"
            type="password"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <label className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Email
        </label>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData.email || ""}
            name="email"
            placeholder="Email"
            type="email"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
