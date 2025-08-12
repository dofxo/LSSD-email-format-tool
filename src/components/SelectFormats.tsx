import {Menu} from "antd";

const SelectFormats = ({setFormat}: { setFormat: React.Dispatch<React.SetStateAction<string>> }) => {

    //@ts-ignore
    const onClick = (e) => {
        setFormat(e.key);
        document.querySelectorAll('ul.ant-menu-sub').forEach(el => {
            if (el.classList.contains('ant-menu-hidden')) return
            el.classList.add('ant-menu-hidden')
        });
    }


    const items = [{
        key: 'sub1',
        label: 'Formats',
        children: [{key: '14', label: 'Personal Email'}, {key: '12', label: 'Letter of Recommendation'}, {
            key: '13',
            label: 'Interview Assessment'
        }, {
            type: 'divider',
        },
            {key: '1', label: 'Application Pending Review'},
            {
                key: '2', label: 'Application Shortlisted'
            }, {key: '3', label: 'Application Denied - Criminal Record'}, {
                key: '4', label: 'Application Denied - Input Reason(s)'
            }, {key: '5', label: 'Application Denied - No Spots'}, {key: '6', label: 'Application Pending Edit(s)'}, {
                type: 'divider',
            }, {key: '7', label: 'Accepted for Interview'}, {key: '8', label: 'Interview Scheduling Attempt'}, {
                key: '9', label: 'Interview Scheduled'
            }, {key: '10', label: 'Accepted for Academy'}, {key: '11', label: 'Passed Academy'},
        ],
    }];
    return <section className="gap-5 flex flex-col">
        <h2 className="md:text-3xl text-2xl font-[600] text-center">Application Response Formats</h2>
        <Menu
            onClick={onClick}
            mode="inline"
            items={items}
        />
    </section>
}
export default SelectFormats