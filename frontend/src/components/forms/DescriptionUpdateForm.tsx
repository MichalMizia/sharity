import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";  // Importujemy hooka do zarządzania stanem użytkownika
import axios from "axios";

interface DescriptionUpdateFormProps {
    id: string;
    currentDescription: string;
    onSave: (newDescription: string) => void;
}

const DescriptionUpdateForm = ({ id, currentDescription, onSave }: DescriptionUpdateFormProps) => {
    const { user, setUser } = useAuth(); // Hook do zarządzania użytkownikiem
    const [description, setDescription] = useState(currentDescription);

    const handleSave = async () => {
        try {
            const response = await axios.put(`/users/${id}/description`, {
                description: description,
            });

            if (response.status === 200) {
                // Zaktualizuj stan użytkownika w aplikacji
                setUser(response.data);
                onSave(description); // Możesz teraz wywołać zewnętrzną funkcję onSave
            } else {
                console.error("Failed to update description");
            }
        } catch (error) {
            console.error("Error updating description:", error);
        }
    };

    return (
        <div>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2"
            />
            <button onClick={handleSave} className="mt-2 p-2 bg-blue-500 text-white">
                Save
            </button>
        </div>
    );
};

export default DescriptionUpdateForm;
