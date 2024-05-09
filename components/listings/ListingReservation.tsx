'use client'
import { Range } from "react-date-range";
import Calendar from "@/components/inputs/Calendar";
import Button from "@/components/Button";

interface ListingReservation {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservation> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
}) => {
    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-x-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    {price}€
                </div>
                <div className="font-light text-neutral-600">
                    nuit
                </div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                <Button
                    disabled={disabled}
                    label="Réserver"
                    onClick={onSubmit}
                />
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>Total</div>
                <div>{totalPrice}€</div>
            </div>
        </div>
    )
}

export default ListingReservation
