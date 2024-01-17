import { useEffect, useState } from "react";
import { Component_1_Json_Interface } from "./Component_1_Json_Interface";
import axios from "axios";
import { Box } from '@mui/material';
import { DataGrid} from '@mui/x-data-grid';

export function Component_1_JsonData() {
    const [dataList, setDataList] = useState<Component_1_Json_Interface[]>([]);

    function FetchJsonDataList() {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                setDataList(response.data);
            })
    }

    const columns= [
        { field: 'userId', headerName: 'UserID', width: 90 },
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 400 },
        { field: 'body', headerName: 'Body', width: 700 },
    ];

    const rows = dataList.map((data) => ({
        userId: data.userId,
        id: data.id,
        title: data.title,
        body: data.body,
    }))

    useEffect(() => {
        FetchJsonDataList();
    }, [])
    return (
        <>
            <Box sx={{ height: "max-content", width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 8,
                            },
                        },
                    }}
                    pageSizeOptions={[8]}
                />
            </Box>
        </>
    )
}