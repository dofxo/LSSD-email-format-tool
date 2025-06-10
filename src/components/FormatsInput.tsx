import {DatePicker, Input, Select} from "antd";
import type {FormatData} from "../types.ts";
import moment from 'moment';

const FormatsInput = ({formatId, setFormatData}: {
    formatId: string, setFormatData: React.Dispatch<React.SetStateAction<FormatData>>
}) => {
    const inputsByFormat = [{
        name: "applicantName",
        label: "Applicant's full/last name",
        type: "text",
        formats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }, {
        name: "applicantGender",
        label: "Applicant's gender",
        type: "select",
        options: [{value: 'male', label: 'male'}, {value: 'female', label: 'female'}],
        formats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }, {
        name: "date", label: "date", type: "date", formats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
    }]


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;
        setFormatData(prev => ({...prev, [name]: value}));
    };

    const handleDatePickerChange = (_: never, dateString: string) => {
        const utcFormattedDate = moment.utc(dateString).format('MMMM Do, YYYY');
        setFormatData(prev => ({...prev, date: utcFormattedDate}));
    }


    const handleGenderChange = (value: string) => {
        setFormatData(prev => ({...prev, applicantGender: value}));
    };

    return <div className="flex flex-wrap gap-2">
        {inputsByFormat.map((input, index) => {
            if (!input.formats.includes(formatId)) return null
            return (<div key={index} className="flex flex-col gap-2">
                    <label className="text-[13px]" htmlFor={input.name}>
                        {input.label}
                    </label>
                    {input.type !== 'date' ? (input.type === 'text' ? <Input
                        onChange={handleInputChange}
                        name={input.name}
                        type={input.type}
                    /> : <Select defaultValue='male' onChange={handleGenderChange} options={input.options}/>) : (
                        <DatePicker
                            // @ts-ignore
                            onChange={handleDatePickerChange}
                            name={input.name}
                        />)}
                </div>

            )
        })}
    </div>
}

export default FormatsInput;