import { ShoppingCartIcon } from "lucide-react";
import PaymentButton from "./PaymentButton";
import  { useState } from "react";

const creditOptions = [
  { id: 1, credits: 100, price: "₹99", amount: 9900 },
  { id: 2, credits: 250, price: "₹149", amount: 14900 },
  { id: 3, credits: 500, price: "₹199", amount: 19900 },
  { id: 4, credits: 1000, price: "₹249", amount: 24900 },
];

export default function Subscriptions() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };
    return (
        <div className="w-full flex items-center justify-center gap-5 p-5">
            <div className="w-full flex flex-col items-center justify-center gap-5 mt-5">
                <div className="bg-violet-500 p-2.5 rounded-full">
                    <ShoppingCartIcon color="#fff" />
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="font-semibold text-xl">Purchase Credits</h3>
                    <p className="text-sm text-slate-500">Select the number of credits you want to Purchase</p>
                </div>

                <div className="w-full max-w-xl mx-auto space-y-6 mt-10">
                    <div className="grid grid-cols-2 gap-4">
                        {creditOptions.map((credit) => (
                            <div
                                key={credit.id}
                                onClick={() => handleSelect(credit.id)}
                                className={`w-full cursor-pointer border rounded-md p-4 transition-all
                                    ${selectedId === credit.id
                                        ? "bg-violet-500 text-white border-violet-600 shadow-lg"
                                        : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"}
                                 `}
                            >
                                <h3 className="text-xl font-bold">{credit.credits} Credits</h3>
                                <p className="text-sm">{credit.price}</p>
                            </div>
                        ))}
                    </div>

                    {selectedId && (
                        <div className="p-4 border rounded-md bg-gray-50 text-center">
                            <p className="text-sm text-gray-600">You selected:</p>
                            <h3 className="text-lg font-semibold">
                                {creditOptions.find((c) => c.id === selectedId)?.credits} Credits
                            </h3>
                            <PaymentButton count={creditOptions.find((c) => c.id === selectedId)?.credits ?? 0} amount={creditOptions.find((c) => c.id === selectedId)?.amount ?? 0} />
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}