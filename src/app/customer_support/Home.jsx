import React from 'react'
import DashboardCard from '@/components/DashboardCard'
import { Users, Wallet } from 'lucide-react'

const CsHome = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        
          <DashboardCard title="Wallet Balance" icon={<Wallet/>} value="3,099" changeColor="text-blue-500" change=""/>
        
          <DashboardCard title="Reward Points" icon={<Users/>} value="300" changeColor="text-red-500" change=""/>

          <DashboardCard title="Total Members" icon={<Users/>} value="153" changeColor="text-red-500" change=""/>

          <DashboardCard title="Merchants" icon={<Users/>} value="10" changeColor="text-red-500" change=""/>

      
        </div>

      </div>
    </div>
  )
}

export default CsHome
