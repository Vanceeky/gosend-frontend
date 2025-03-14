import React from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"


import DashboardCard from '@/components/DashboardCard'
import {  Users, Receipt, Wallet } from 'lucide-react'
const CommunityHome = () => {
  return (
    <>
      <div className='flex flex-col gap-4 pt-0'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <DashboardCard title="Total Members" value="3" icon={<Users/>} changeColor="text-red-500" change="5 Inactive Members"/>
          <DashboardCard title="Reward Points" value="3" icon={<Wallet/>}/>
        </div>
      </div>
    </>
  )
}

export default CommunityHome