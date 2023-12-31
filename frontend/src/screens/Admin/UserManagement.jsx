import React, {useEffect,useState}from 'react'
import { FaUnlock,FaLock } from 'react-icons/fa'
import './UserManagement.css'
import {DataGrid} from '@mui/x-data-grid'
import  adminAxiosInstance  from '../../utils/adminAxiosInstance.js'



const UserManagement=()=> {
  const columns=[
    {field:"_id",headerName:'ID',width:20},
    {field:'email',headerName:"Email",width:130},
    {field:"name",headerName:'Name',width:90},
    {field:'isBlocked',headerName:'Active',width:130,renderCell:(params)=>(
      <div className={`pill ${params.row.isBlocked?'inactive':'active'}`}>
        {params.row.isBlocked? 'Anactive':'Active'}
      </div>
    ),},
    {
      field:'action',headerName:'Action',width:100,renderCell:(params)=>{return(
        <button className={`custom-button ${params.row.isBlocked ?'-inactive':'-active'}`} onClick={(e)=>handleBlockClick(e,params.row._id,params.row.isBlocked)}>{params.row.isBlocked?<FaLock size={18}/>:<FaUnlock size={18}/>}</button>
      )}
    },
  
  ]

  // const [openModals,setOpenModals]=useState({})
  // const [modalDetails,setModalDetails]=useState('')
  const [blocked,setBlocked]=useState('')
  const handleBlockClick=async(e,userId,isBlocked)=>{
    e.stopPropagation()
    try{
      isBlocked=!isBlocked;
      setBlocked(!blocked)

      const response=await adminAxiosInstance.put(`/blockUnblockUser`,{userId,isBlocked})
    }catch(error){
      console.error('Error blocking user:',error)
    }
  }

useEffect(()=>{
  fetchData()

},[blocked])

const fetchData=async()=>{
  try{
    
const res=await adminAxiosInstance.get('/loadUsers')

setRows([...res.data.users])

  }catch(error){
console.error("Error fetching data:",error)
  }
}

const [rows,setRows]=useState([])

  return (
    
    <>
    <div className="data-grid-container pl-60">
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  </>
  )
}

export default UserManagement
