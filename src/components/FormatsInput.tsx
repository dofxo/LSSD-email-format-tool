import {Button, DatePicker, Input, Select} from "antd";
import type {FormatData} from "../types.ts";
import moment from 'moment';
import {useState} from "react";
import {DeleteTwoTone} from "@ant-design/icons";

const FormatsInput = ({formatId, formatData, setFormatData}: {
    formatId: string, setFormatData: React.Dispatch<React.SetStateAction<FormatData>>, formatData: FormatData
}) => {
    const [reasonsInput, setReasonsInput] = useState<string>("")

    const inputsByFormat = [{
        name: "applicantName",
        label: "Applicant's full/last name",
        type: "text",
        formats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '12']
    }, {
        name: "applicantGender",
        label: "Applicant's gender",
        type: "select",
        options: [{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}],
        formats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }, {
        name: "date",
        label: "Email Date",
        type: "date",
        formats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }, {
        name: "interviewDate", label: "Interview date", type: "date", formats: ['9']
    }, {
        name: "reasons", label: "Reason(s)", type: "text", formats: ["4", "6"]
    }]


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'reasons') {
            setReasonsInput(e.target.value)
        } else {

            const {name, value} = e.target;
            setFormatData(prev => ({...prev, [name]: value}));
        }
    };

    const handleDatePickerChange = (_: never, dateString: string) => {
        const utcFormattedDate = moment.utc(dateString).format('MMMM Do, YYYY');
        setFormatData(prev => ({...prev, date: utcFormattedDate}));
    }

    const handleInterviewDatePickerChange = (_: never, dateString: string) => {
        const formattedDate = moment(dateString).format('DD/MMM/YYYY,HH:MM');
        setFormatData(prev => ({...prev, interviewDate: formattedDate.split(',')}));
    }

    const handleGenderChange = (value: 'male' | 'female') => {
        setFormatData(prev => ({...prev, applicantGender: value}));
    };

    return <div className="flex flex-wrap gap-x-2 gap-y-5">
        {inputsByFormat.map((input, index) => {
            if (!input.formats.includes(formatId)) return null
            return (<div key={index} className="flex flex-col gap-2">
                    <label className="text-[13px]" htmlFor={input.name}>
                        {input.label}
                    </label>
                    {input.type !== 'date' ? (input.type === 'text' ? <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center">
                            <Input
                                onChange={handleInputChange}
                                name={input.name}
                                type={input.type}
                                value={input.name === 'reasons' ? reasonsInput : undefined}
                            /> {input.name === 'reasons' && <Button onClick={() => {
                            if (!reasonsInput) return;
                            const reason = reasonsInput
                            setFormatData(prev => ({...prev, reasons: [...prev.reasons, reason]}));
                            setReasonsInput('')

                        }} type="primary">add</Button>} </div>
                        {input.name === 'reasons' && <div className='flex md:flex-col gap-2'>
                            {formatData.reasons.map((reason, index) => {
                                return <div key={index} className='flex gap-2 items-center'>
                                    <span className='text-[12px]'>{reason}</span>
                                    <Button danger onClick={() => {
                                        setFormatData(prev => ({
                                            ...prev, reasons: prev.reasons.filter((_, i) => i !== index)
                                        }));
                                    }} icon={<DeleteTwoTone style={{color: "red"}}/>}/>
                                </div>
                            })}
                        </div>}
                    </div> : <Select defaultValue='male' onChange={handleGenderChange} options={input.options}/>) : (
                        <DatePicker
                            // @ts-ignore
                            onChange={input.name !== 'interviewDate' ? handleDatePickerChange : handleInterviewDatePickerChange}
                            name={input.name}
                            showTime={input.name === 'interviewDate'}
                        />)}
                </div>

            )
        })}
    </div>
}

export default FormatsInput;