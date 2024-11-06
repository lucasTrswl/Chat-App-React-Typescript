import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function ConversationPage() {
  const { id } = useParams();
  const location = useLocation();
  const { name } = location.state || {};
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Conversation {name}</h1>
      </div>
  );
}
