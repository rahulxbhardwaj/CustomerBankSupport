export default function Dashboard(){
  return(
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard!</p>
        <p className="text-sm text-gray-500 mt-4">Protected by middleware authentication</p>
      </div>
    </div>
  )
}