import {Input, Select} from "antd";
import {useState, useEffect} from "react";

interface DeputyDetailsState {
    name: string;
    signature: string;
    dRank: string;
    rRank: string;
}

const DeputyDetails = () => {
    const [details, setDetails] = useState<DeputyDetailsState>(() => {
        const savedDetails = localStorage.getItem('deputyDetails');
        return savedDetails ? JSON.parse(savedDetails) : {
            name: '',
            signature: '',
            dRank: 'Deputy Sheriff II',
            rRank: 'Trial Application Handler'
        };
    });


    useEffect(() => {
        localStorage.setItem('deputyDetails', JSON.stringify(details));
    }, [details]);
    const deputyDetails = [
        {
            name: "name",
            label: "Deputy Name",
            placeHolder: "e.g. Bobby Kirk",
            type: "text"
        },


        {
            name: "dRank",
            label: "Deputy Rank",
            type: "select",
            options: [
                {value: 'Deputy Sheriff II', label: "Deputy Sheriff II"},
                {value: 'Deputy Sheriff III', label: "Deputy Sheriff III"},
                {value: 'Master Deputy', label: "Master Deputy"},
                {value: 'Investigator', label: "Investigator"},
                {value: 'Corporal', label: "Corporal"},
                {value: 'Sergeant ', label: "Sergeant "},
                {value: 'Staff Sergeant', label: "Staff Sergeant"},
                {value: 'Lieutenant', label: "Lieutenant"},
                {value: 'Captain', label: "Captain"},
                {value: 'Commander', label: "Commander"},
                {value: 'Assistant Sheriff', label: "Assistant Sheriff"},
                {value: 'Undersheriff', label: "Undersheriff"},
                {value: 'Sheriff', label: "Sheriff"},
            ]
        },
        {
            name: "rRank",
            label: "RED Rank",
            type: "select",
            options: [{
                value: 'Trial Application Handler', label: "Trial Application Handler"
            }, {
                value: 'Application Handler', label: "Application Handler"
            },
                {
                    value: 'Senior Application Handler', label: "Senior Application Handler"
                },
                {
                    value: 'R.E.D. Supervisor', label: "R.E.D. Supervisor"
                },

                {
                    value: 'R.E.D. Commanding Officer', label: "R.E.D. Commanding Officer"
                }
            ]
        },
        {
            name: "signature",
            label: "Signature",
            placeHolder: "Signature link",
            type: "text"
        },

    ]

    const redRankHandleChange = (value: string) => {
        setDetails(prev => ({...prev, rRank: value}));
    };

    const deputyRankHandleChange = (value: string) => {
        setDetails(prev => ({...prev, dRank: value}));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDetails(prev => ({...prev, [name]: value}));
    };


    return <section className="flex flex-col gap-5">
        <h2 className='font-semibold text-3xl text-white'>Deputy Details</h2>
        <form id="inputs" className="flex gap-2 flex-wrap">
            {
                deputyDetails.map((detail, index) => {
                    return <div key={index} className="flex flex-col gap-2">
                        <label htmlFor={detail.name}>{detail.label}</label>
                        {detail.type !== "select" ?
                            <Input
                                id={detail.name}
                                type={detail.type}
                                placeholder={detail.placeHolder}
                                name={detail.name}
                                value={details[detail.name as keyof DeputyDetailsState]}
                                onChange={handleInputChange}/> :
                            <Select
                                showSearch={detail.name === 'dRank'}
                                optionFilterProp="label"
                                onChange={detail.name === 'rRank' ? redRankHandleChange : deputyRankHandleChange}
                                defaultValue={detail.options ? detail.options[0].value : ""}
                                options={detail.options}/>}
                    </div>
                })
            }
        </form>
    </section>
}

export default DeputyDetails