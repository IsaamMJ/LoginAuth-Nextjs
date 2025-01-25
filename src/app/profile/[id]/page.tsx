export default function UserProfile({ params }: { params: { id: string } }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100 px-4">
        <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">User Profile</h1>
          <hr className="mb-4" />
          <p className="text-xl text-gray-700 text-center">Welcome to your profile page!</p>
          <div className="mt-6 text-center">
            <span className="inline-block px-4 py-2 text-white bg-orange-500 rounded-lg text-lg">
              User ID: {params.id}
            </span>
          </div>
        </div>
      </div>
    );
  }
  