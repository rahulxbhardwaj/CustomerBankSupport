import RegisterForm from "../pages/components/registerform";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
