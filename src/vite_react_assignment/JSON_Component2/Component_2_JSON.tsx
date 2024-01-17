import { Checkbox, FormControlLabel } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from "react";

export function Component_2_Json() {
    const [collapseIcon, setCollapseIcon] = useState(1);
    const [collapse, setCollapse] = useState(false);
    var JsonData: any = ([
        {
            id: 1,
            department: "customer_service",
            parentChecked: false,
            sub_departments: [
                {
                    id: 11,
                    subLable: "support",
                    checked: false
                },
                {
                    id: 12,
                    subLable: "customer_success",
                    checked: false
                },

            ]
        },
        {
            id: 2,
            department: "design",
            parentChecked: false,
            sub_departments: [
                {
                    id: 21,
                    subLable: "graphic_design",
                    checked: false
                },
                {
                    id: 22,
                    subLable: "product_design",
                    checked: false
                },
                {
                    id: 23,
                    subLable: "web_design",
                    checked: false
                },

            ]
        }
    ]
    );

    const [checkBoxData, setCheckBoxData] = useState<any>([]);


    useEffect(() => {
        setCheckBoxData(JsonData);
    }, [])

    //Collapse Function..
    function HandleCollapseClick(e: any) {
        setCollapseIcon(e.currentTarget.id);
        if (collapse === false) {
            setCollapse(true);
        }
        else {
            setCollapse(false);
        }
    }

    //Checkbox Check-Uncheck Function..
    function HandleChange(pindex: any) {
        const updatedItems = [...checkBoxData];
        // console.log(updatedItems);
        updatedItems[pindex].parentChecked = !updatedItems[pindex].parentChecked;

        // If the parent is selected, select all sub_departments
        if (updatedItems[pindex].parentChecked) {
            updatedItems[pindex].sub_departments.forEach((child: any) => (child.checked = true));
        }
        else if (!updatedItems[pindex].parentChecked) {
            updatedItems[pindex].sub_departments.forEach((child: any) => (child.checked = false));
        }
        setCheckBoxData(updatedItems);
    }


    function HandleChildChange(subIndex: any, pindex: any) {
        const updatedItems = [...checkBoxData];
        updatedItems[pindex].sub_departments[subIndex].checked = !updatedItems[pindex].sub_departments[subIndex].checked;

        // If all sub_departments are selected, select the parent
        const allChildrenChecked = updatedItems[pindex].sub_departments.every(
            (child: any) => child.checked === true
        );
        // console.log(allChildrenChecked);
        updatedItems[pindex].parentChecked = allChildrenChecked;

        setCheckBoxData(updatedItems);

    }

    return (
        <>
            <div style={{ marginLeft: "2em", height: "70vh" }}>
                {
                    checkBoxData.map((data: any, pindex: any) =>
                        <dl key={data.sub_departments}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div id={data.id} onClick={HandleCollapseClick}>
                                    {data.id == collapseIcon && collapse ? <AddIcon sx={{ marginRight: "0.5em", cursor: "pointer" }} /> : <RemoveIcon sx={{ marginRight: "0.5em", cursor: "pointer" }} />}
                                </div>
                                <dt>
                                    <FormControlLabel control={<Checkbox value={data.department} onChange={() => { HandleChange(pindex as any) }} checked={data.parentChecked} />} label={data.department.toUpperCase()} />
                                </dt>
                            </div>
                            {
                                data.sub_departments.map((subDep: any, subIndex: any) =>
                                    data.id == collapseIcon ?
                                        <div style={collapse ? { visibility: 'hidden' } : { visibility: 'visible' }} key={subDep.id}>
                                            <dd style={{ marginLeft: "4em" }}>
                                                <FormControlLabel control={<Checkbox value={subDep} onChange={() => { HandleChildChange(subIndex, pindex) }} checked={subDep.checked} />} label={subDep.subLable} />
                                            </dd>
                                        </div> : <div key={subDep.id}>
                                            <dd style={{ marginLeft: "4em" }}>
                                                <FormControlLabel control={<Checkbox value={subDep} onChange={() => { HandleChildChange(subIndex, pindex) }} checked={subDep.checked} />} label={subDep.subLable} />
                                            </dd>
                                        </div>
                                )
                            }
                        </dl>
                    )
                }
            </div >
        </>
    )
}
