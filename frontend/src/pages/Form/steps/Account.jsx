import { useStepperContext } from "../StepperContext";

export default function Account() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex flex-col">
       <p className="text-center text-black font-bold mb-5">
    To help you get started with DietFirst, let's make an account!
  </p>
      <div className="bg-gray-100 p-5 rounded-md">
      <div className="mx-2 w-full flex-1">
       
        <label className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-black">
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
        <label className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-black">
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
        <label className="mt-3 h-6 text-sm font-bold uppercase leading-8 text-black">
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

    </div>
  );
}
