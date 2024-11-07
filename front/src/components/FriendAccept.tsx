import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function FriendNotification() {
    const navigate = useNavigate();
    const [showFriendRequestNotif, setShowFriendRequestNotif] = useState(false);

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
                <button type="button" onClick={() => navigate("/chat")}>
                    <div
                        className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50 max-w-xs">
                        <span>Quelqu'un a accepté votre demande d'ami !</span>
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

export default FriendNotification;
