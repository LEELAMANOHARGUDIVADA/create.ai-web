import PaymentButton from "./PaymentButton";

export default function Subscriptions(){
    return(
        <div className="w-full flex items-center justify-center gap-5">
            <PaymentButton amount={24900} />
        </div>
    )
}