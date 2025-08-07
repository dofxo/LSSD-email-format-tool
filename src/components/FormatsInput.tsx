import {Button, DatePicker, Input, Select} from "antd";
import type {FormatData} from "../types.ts";
import moment from 'moment';
import {useState} from "react";
import {DeleteTwoTone} from "@ant-design/icons";

const {TextArea} = Input;

const FormatsInput = ({formatId, formatData, setFormatData}: {
    formatId: string, setFormatData: React.Dispatch<React.SetStateAction<FormatData>>, formatData: FormatData
}) => {
    const [reasonsInput, setReasonsInput] = useState<string>("")
    const [screenshotsInput, setScreenshotsInput] = useState<string>("")

    const inputsByFormat = [{
        name: "applicantName",
        label: "Applicant's full/last name",
        type: "text",
        formats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '12', '13']
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
        name: "interviewDate", label: "Interview date", type: "date", formats: ['9', '13']
    }, {
        name: "reasons", label: "Reason(s)", type: "text", formats: ["4", "6"]
    },
        {name: "appLink", label: "Application Link", type: "text", formats: ["13"]},
        {
            name: "firstImpression",
            label: "How was your first impression of the applicant, were they friendly with you, introduced themselves, etc?",
            type: "textarea",
            formats: ["13"]
        },
        {
            name: "answeredTruthfully",
            label: "Did the applicant answer all questions truthfully, provide their full ID, and were they compliant during their search? Did they bring something to the interview they are not supposed to, a firearm for an example?",
            type: "textarea",
            formats: ["13"]
        },
        {
            name: "situationalQuestions",
            label: "How did the applicant respond to the situational questions? Did they have common sense when it came to answering the questions? Do you think they will be a good fit for the department?\n",
            type: "textarea",
            formats: ["13"]
        },
        {
            name: "greatestWeakness",
            label: "What's the Applicant's greatest weakness ( Please be specific )",
            type: "textarea",
            formats: ["13"]
        },
        {
            name: "obstacleCourseProblems",
            label: "Did the applicant have any problems with the physical obstacle course?",
            type: "textarea",
            formats: ["13"]
        },
        {
            name: "acceptedIntoAcademy",
            label: "Do you believe this applicant should be accepted into the academy?",
            type: "textarea",
            formats: ["13"]
        },
        {
            name: "oocQuestions",
            label: "(( Did they answer all OOC questions correctly, were they familiar with the server rules? ))",
            type: "textarea",
            formats: ["13"]
        },
        {
            name: "usageOfMeAndDo",
            label: "(( Do you think they have provided sufficient details and fair usage of /me's and /do's? ))",
            type: "textarea",
            formats: ["13"]
        },
        {
            name: "characterDevelopment",
            label: "(( Did they role-play any 'character development' during the role-play test? E.g. role-playing fatigue/exhaustion, pain etc. ))",
            type: "textarea",
            formats: ["13"]
        },
        {
            name: "workingMicrophone",
            label: "(( Does the player have a working microphone? ))",
            type: "textarea",
            formats: ["13"]
        },
        {
            name: "playerAge",
            label: "(( Is the player 16 or older? ))",
            type: "textarea",
            formats: ["13"]
        },
        {
            name: "speakingEnglish",
            label: "(( Was the applicant proficient at speaking English? ))",
            type: "textarea",
            formats: ["13"]
        },
        {
            name: "roleplayScreenShots",
            label: "(( Provide screenshots of ALL of their RP throughout the physical evaluation ))",
            hint: "Either add album link or the format that starts with imgur.com not the i.imgur one. E.g. https://imgur.com/a/OMjmFnG",
            type: "screenshots",
            formats: ["13"]
        },
        {
            name: "generalFeeling",
            label: "(( How was your general feeling towards them? Do they come across as willing to learn and invest time into this faction, or do they seem like they want to rush and can't dedicate themselves to something long-term? ))\n",
            type: "textarea",
            formats: ["13"]
        },
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        if (name === 'reasons') {
            setReasonsInput(value);
        } else if (name === 'roleplayScreenShots') {
            setScreenshotsInput(value);
        } else {
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

    const addItem = (type: 'reasons' | 'screenshots') => {
        const inputValue = type === 'reasons' ? reasonsInput : screenshotsInput;
        const inputSetter = type === 'reasons' ? setReasonsInput : setScreenshotsInput;

        if (!inputValue) return;

        setFormatData(prev => ({
            ...prev,
            [type === 'reasons' ? 'reasons' : 'roleplayScreenShots']: [
                ...(prev[type === 'reasons' ? 'reasons' : 'roleplayScreenShots'] as string[]),
                inputValue
            ]
        }));
        inputSetter('');
    };

    return (
        <div className="flex flex-wrap gap-x-2 gap-y-5">
            {inputsByFormat
                .filter(input => input.formats.includes(formatId))
                .map((input, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <label className="text-[13px]" htmlFor={input.name}>
                            {input.label}
                        </label>
                        {input.hint && <span className="text-[12px] text-red-400">{input.hint}</span>}

                        {input.type === 'date' ? (
                            <DatePicker
                                //@ts-ignore
                                onChange={
                                    input.name === 'interviewDate'
                                        ? handleInterviewDatePickerChange
                                        : handleDatePickerChange
                                }
                                name={input.name}
                                showTime={input.name === 'interviewDate'}
                            />
                        ) : input.type === 'select' ? (
                            <Select
                                defaultValue="male"
                                onChange={handleGenderChange}
                                options={input.options}
                            />
                        ) : input.type === 'textarea' ? (
                            <TextArea
                                onChange={handleInputChange}
                                name={input.name}
                                value={formatData[input.name as keyof FormatData] as string}
                            />
                        ) : (
                            <>
                                <div className="flex gap-2 items-center">
                                    <Input
                                        onChange={handleInputChange}
                                        name={input.name}
                                        type="text"
                                        value={
                                            input.name === 'reasons'
                                                ? reasonsInput
                                                : input.name === 'roleplayScreenShots'
                                                    ? screenshotsInput
                                                    : formatData[input.name as keyof FormatData] as string
                                        }
                                    />
                                    {(input.name === 'reasons' || input.name === 'roleplayScreenShots') && (
                                        <Button
                                            onClick={() => addItem(input.name === 'reasons' ? 'reasons' : 'screenshots')}
                                            type="primary"
                                        >
                                            add
                                        </Button>
                                    )}
                                </div>
                                {(input.name === 'reasons' || input.name === 'roleplayScreenShots') && (
                                    <div className="flex md:flex-col gap-2">
                                        {(formatData[input.name === 'reasons' ? 'reasons' : 'roleplayScreenShots'] as string[] || []).map((item, idx) => (
                                            <div key={idx} className="flex gap-2 items-center">
                                                <span className="text-[12px]">{item}</span>
                                                <Button
                                                    danger
                                                    onClick={() => {
                                                        setFormatData(prev => ({
                                                            ...prev,
                                                            [input.name === 'reasons' ? 'reasons' : 'roleplayScreenShots']:
                                                                (prev[input.name === 'reasons' ? 'reasons' : 'roleplayScreenShots'] as string[])
                                                                    .filter((_, i) => i !== idx)
                                                        }));
                                                    }}
                                                    icon={<DeleteTwoTone style={{color: "red"}}/>}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
        </div>
    );
}

export default FormatsInput;
