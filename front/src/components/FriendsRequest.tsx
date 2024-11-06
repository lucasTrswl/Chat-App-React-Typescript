import imgValidate from '../img/valide.png';

const people = [
    'Joe',
    'Marc',
    'Bob',
    'Stéphanie'
];

function FriendsRequest() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-2xl font-bold text-center mb-4">My Friends Request</h1>
                <table className="table-auto w-full text-center border-collapse">
                    <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6">Username</th>
                        <th className="py-3 px-6">Add Friend?</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700">
                    {people.map((person, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="py-3 px-6 font-semibold">{person}</td>
                            <td className="py-3 px-6">
                                <button type="button" className="hover:scale-110 transition-transform">
                                    <img
                                        alt="accept"
                                        src={imgValidate}
                                        className="w-9 h-9 mx-auto"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FriendsRequest;
