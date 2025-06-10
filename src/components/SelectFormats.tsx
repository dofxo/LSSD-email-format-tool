import {Menu} from "antd";

const SelectFormats = ({setFormat}: { setFormat: React.Dispatch<React.SetStateAction<string>> }) => {

    const onClick = (e) => {
        setFormat(e.key);
        document.querySelectorAll('ul.ant-menu-sub').forEach(el => {
            if (el.classList.contains('ant-menu-hidden')) return
            el.classList.add('ant-menu-hidden')
        });
    }


    const items = [{
        key: 'sub1',
        label: 'Application Response Formats',
        children: [{key: '1', label: 'Application Pending Review'}, {
            key: '2', label: 'Application Shortlisted'
        }, {key: '3', label: 'Application Denied - Criminal Record'}, {
            key: '4', label: 'Application Denied - Input Reason(s)'
        }, {key: '5', label: 'Application Denied - No Spots'}, {key: '6', label: 'Application Pending Edit(s)'}, {
            type: 'divider',
        }, {key: '7', label: 'Accepted for Interview'}, {key: '8', label: 'Interview Scheduling Attempt'}, {
            key: '9', label: 'Interview Scheduled'
        }, {key: '10', label: 'Accepted for Academy'}, {key: '11', label: 'Passed Academy'},],
    }, {
        key: 'sub2', label: 'Assessment Formats', children: [{key: '12', label: 'Interview Assessment'},],
    },];
    return <section className="gap-5 flex flex-col">
        <h2 className="text-3xl font-[600] text-center">Formats</h2>
        <Menu
            onClick={onClick}
            mode="inline"
            items={items}
        />
    </section>
}
export default SelectFormats