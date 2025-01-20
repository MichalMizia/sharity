import { toast } from "react-toastify";
import { API_URL } from "@/lib/auth";
import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const AccountNumber: React.FC<{ userId: number }> = ({ userId }) => {
    const [accountNumber, setAccountNumber] = useState<string | "">("");
    const [feedbackMessage, setFeedbackMessage] = useState<string>("");

    // Pobieranie numeru konta dla użytkownika po ID
    const { data, error, isLoading} = useQuery({
        queryKey: ["userAccountNumber", userId],
        queryFn: async () => {
            console.log('userid=', userId);
            const response = await axios.get(API_URL + `/users/${userId}`, { withCredentials: true });
            console.log(response);
            return response.data.accountNumber; // Zakładamy, że numer konta jest w polu "accountNumber"
        },
        onSuccess: (data) => {
            setAccountNumber(data || "");
        },
    });

    // // Mutacja do aktualizacji numeru konta
    // const queryClient = useQueryClient();
    // const { mutate: updateAccountNumber } = useMutation(
    //     async (newAccountNumber: string) => {
    //         return await axios.put(
    //             `${API_URL}/users/account`,
    //             null, // Brak ciała żądania, numer konta przekazujemy jako parametr
    //             {
    //                 params: { acc_number: newAccountNumber },
    //                 withCredentials: true,
    //             }
    //         );
    //     },
    //     {
    //         onSuccess: () => {
    //             queryClient.invalidateQueries(["userAccountNumber", userId]);
    //             setFeedbackMessage("Account number updated successfully!");
    //         },
    //         onError: (error: any) => {
    //             setFeedbackMessage(
    //                 error.response?.data || "Failed to update account number"
    //             );
    //         },
    //     }
    // );

    // Obsługa zmiany numeru konta
    const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountNumber(e.target.value);
    };

    // const saveAccountNumber = () => {
    //     if (accountNumber) {
    //         updateAccountNumber(accountNumber);
    //     } else {
    //         setFeedbackMessage("Please enter a valid account number");
    //     }
    // };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: Unable to fetch account number</p>;

    return (
        <div className="flex flex-col gap-4">
            <div className="">
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                    Bank Account Number
                </label>
                <input
                    // add default text to "No account number given"
                    type="text"
                    id="accountNumber"
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            {/*    <button*/}
            {/*        onClick={saveAccountNumber}*/}
            {/*        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"*/}
            {/*    >*/}
            {/*        Save Account Number*/}
            {/*    </button>*/}
            {/*    {feedbackMessage && <p className="text-sm mt-2 text-gray-500">{feedbackMessage}</p>}*/}
            </div>
        </div>
    );
};

export default AccountNumber;
