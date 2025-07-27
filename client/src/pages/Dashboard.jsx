// import React, { useEffect, useState } from 'react'
// import { dummyCreationData } from '../assets/assets'
// import { Gem, Sparkles } from 'lucide-react'
// import { Protect , useAuth } from '@clerk/clerk-react'
// import CreationItem from '../components/CreationItem'
// import axios from 'axios';


// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// const Dashboard = () => {
   
//    const [creations, setCreations] = useState([])
//     const [loading, setLoading] = useState(true);

//     const { getToken } = useAuth();

//    const getDashboardData = async ()=>{
//     try {
//       const { data } = await axios.get('/api/user/get-user-creations', {
//         headers: {
//           Authorization: `Bearer ${await getToken()}`
//         }
//       })
//       if (data.success) {
//         setCreations(data.creations);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error('Failed to load dashboard data');
      
//     }
//     setLoading(false);
//    }

//    useEffect(()=>{
//     getDashboardData()
//    }, [])
//   return (
//     <div className='h-full overflow-y-scroll p-6'>
//         <div className='flex justify-start gap-4 flex-wrap'>
//           {/*Total Creations Card */}
//           <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
//             <div className='text-slate-600'>
//               <p className='text-sm'>Total Creations</p>
//               <h2 className='text-xl font-semibold'>{creations.length}</h2>
//             </div>
//             <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
//               <Sparkles className='w-5 text-white'/>
//             </div>
//           {/* Active Plan Card */}
//           </div>
//           <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
//             <div className='text-slate-600'>
//               <p className='text-sm'>Active Plan</p>
//               <h2 className='text-xl font-semibold'>
//                 <Protect plan='premium' fallback="Free">Premium</Protect>
//               </h2>
//             </div>
//             <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
//               <Gem className='w-5 text-white'/>
//             </div>

//           </div>
//           {
//             loading ? (
//               <div className='flex items-center justify-center w-full h-3/4'>
//                 <div className='animate-span rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent'>

//                 </div>
//               </div>
//             ):
//             (
//                   <div className='space-y-3'>
//           <p className='mt-6 mb-4'>Recent Creations</p>
//           {
//             creations.map((item)=> <CreationItem key={item.id} item={item}/> )
//           }

//         </div>
//             )
//           }


//         </div>
    
//     </div>
//   )
// }

// export default Dashboard
import React, { useEffect, useState } from 'react';
import { dummyCreationData } from '../assets/assets';
import { Gem, Sparkles } from 'lucide-react';
import { Protect, useAuth } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Loader or Recent Creations Section */}
      {
        loading ? (
          <div className="flex items-center justify-center w-full h-64">
            <div className="animate-spin rounded-full h-11 w-11 border-[3px] border-purple-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-3 mt-6">
            <p className="text-lg font-medium text-gray-700">Recent Creations</p>
            {
              creations.map((item) => (
                <CreationItem key={item.id} item={item} />
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default Dashboard;
