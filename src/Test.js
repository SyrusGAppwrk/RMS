import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { GetDepartmentData } from "../src/Redux/Action/DepartmentAction"
import { useSelector, useDispatch } from 'react-redux'


export const Test = () => {
    // Redux Tools
    const dispatch = useDispatch()
    const department = useSelector((state) => state.department)
    const [search, setSearch] = useState("")
    const [filterData, setFilterddata] = useState([department.departmentUser])

    useEffect(() => {
        dispatch(GetDepartmentData(1))
    }, [])

    // Run Useeffect When Search Applied
    useEffect(() => {
        var result = department.departmentUser.filter(fdata => {
            return fdata.userName.toLowerCase().match(search.toLowerCase());
        })
        setFilterddata(result)
    }, [search, department.departmentUser])
 
    const column = [

        {
            name: "Developer Name",
            selector: (row) => row.userName,
            sortable: true
        },
        {
            name: "Project Name",
            selector: (row) => row.projectName,
        },
        {
            name: "Avail",
            selector: (row) => row.avalibiltty,
        },
        {
            name: "Billing Name",
            selector: (row) => <input type='number' defaultValue={row.totalBilling} className='form-control'/>,
        },
        {
            name: "Coordinator Name",
            selector: (row) => row.cordinatorName,
        },
        {
            name: "Manager Name",
            selector: (row) => row.managerName,
        },
        {
            name: "Action",
            cell: (row) => <i className="ri-edit-2-fill" onClick={() => alert(row.id)} />
        },
    ]

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Test</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active">Test</li>
                    </ol>
                </nav>
            </div>
            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <DataTable
                                    columns={column}
                                    data={filterData}
                                    pagination
                                    title="Task Allotment"
                                    //fixedHeader
                                    highlightOnHover
                                    subHeader
                                    subHeaderComponent={
                                        <input type='text'
                                            placeholder='Search'
                                            className='w-25 form-control'
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)} />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </main>
    )
}
