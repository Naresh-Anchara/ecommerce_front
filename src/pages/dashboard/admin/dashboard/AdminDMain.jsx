import React from 'react'
import { useSelector } from 'react-redux'
import { useGetAdminStatsQuery } from '../../../../redux/features/stats/statsApi';
import AdminStats from './AdminStats';
import AdminStatsCharts from './AdminStatsCharts';

const AdminDMain = () => {
    const {user} = useSelector((state) => state.auth);
    const {data : stats,error,isLoading} = useGetAdminStatsQuery();
    if(isLoading){
        return <div>Loading...</div>
    }
    if(!stats){
        return <div>stats is not found</div>
    }
    if(error){
        return <div>failed to load stats!</div>
    }
  return (
    <div className='p-6'>
      <div>
        <h1 className='text-2xl font-semibold mb-4'>Admin Dashboard</h1>
        <p className='text-gray-500'>Hi, {user?.username}! Welcome to the 
            Admin dashboard!
        </p>
        <AdminStats stats={stats}/>
        <AdminStatsCharts stats={stats}/>
      </div>
    </div>
  )
}

export default AdminDMain
