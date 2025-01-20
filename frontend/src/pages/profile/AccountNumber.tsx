import { toast } from "react-toastify";
import { API_URL } from "@/lib/auth";
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AccountNumber: React.FC<{ userId: number }> = ({ userId }) => {
    const [accountNumber, setAccountNumber] = useState<string>("");
    const [placeholderText, setPlaceholderText] = useState<string>("No account number given");

    // Fetch account number for the user
    const { isLoading, error } = useQuery({
        queryKey: ["userAccountNumber", userId],
        queryFn: async () => {
            try {
                const response = await axios.get(`${API_URL}/users/${userId}`, { withCredentials: true });
                const fetchedAccountNumber = response.data.accountNumber || "No account number given";
                setPlaceholderText(fetchedAccountNumber); // Update placeholder
                return fetchedAccountNumber;
            } catch (err) {
                toast.error("Failed to fetch account number");
                throw err;
            }
        },
        onSuccess: (data) => {
            setAccountNumber(data || "");
        },
    });

    // Handle input change
    const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountNumber(e.target.value);
    };

    // Send account number to the backend
    const handleSaveAccountNumber = async () => {
        if (!accountNumber || accountNumber === "No account number given") {
            toast.error("Please enter a valid account number");
            return;
        }

        try {
            await axios.put(
                `${API_URL}/users/account`,
                null,
                {
                    params: { acc_number: accountNumber },
                    withCredentials: true,
                }
            );
            toast.success("Account number updated successfully!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to update account number");
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: Unable to fetch account number</p>;

    return (
        <div className="flex items-center gap-4">
            <label
                htmlFor="accountNumber"
                className="text-sm font-medium text-gray-700 whitespace-nowrap"
            >
                Bank Account Number
            </label>
            <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                placeholder={placeholderText} // Dynamic placeholder
                onChange={handleAccountNumberChange}
                className="w-[260px] rounded-md border border-gray-300 px-3 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
                onClick={handleSaveAccountNumber}
                className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-5"
            >
                Save
            </button>
        </div>
    );
};

export default AccountNumber;
