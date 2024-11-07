import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

interface Props {
    message: string;
    url: string;
}

function Notification({message, url}: Props) {
    const navigate = useNavigate();
    const [showFriendRequestNotif, setShowFriendRequestNotif] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setShowFriendRequestNotif(false);
        }, 5000);


        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Notification en bas à droite */}
            {showFriendRequestNotif && (
                <button type="button" onClick={() => navigate(url)}>
                    <div
                        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50 max-w-xs">
                        <span>{message}</span>
                        <button
                            onClick={() => setShowFriendRequestNotif(false)}
                            className="text-white font-bold"
                        >
                            X
                        </button>
                    </div>
                </button>
            )}
        </>
    );
}

export default Notification;
