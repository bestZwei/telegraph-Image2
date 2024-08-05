'use client'
import { signOut } from "next-auth/react"
import Table from "@/components/Table"
import { useState, useEffect, useRef, useCallback } from 'react';
import { ToastContainer, toast } from "react-toastify";
// import { toast } from "react-toastify";




export default function Admin() {
  const [listData, setListData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTotal, setSearchTotal] = useState(0); // 初始化为0，因为初始时还没有搜索结果


  const getListdata = useCallback(async (page) => {
    try {
      const res = await fetch(`/api/admin/list`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({
          page: (page-1),
        })
      })
      const res_data = await res.json()
      if (!res_data?.success) {
        toast.error(res_data.message)
      } else {
        setListData(res_data.data)
        const totalPages = Math.ceil(res_data.total / 10);
        setSearchTotal(totalPages);
      }

    } catch (error) {
      toast.error(error.message)
    }

  })


  useEffect(() => {
    getListdata(currentPage)


  }, [currentPage]);

  // 分页控制按钮
  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage > searchTotal) { // 检查下一页是否在总页数范围内
      toast.error('当前已为最后一页！')
    }
    if (nextPage <= searchTotal) { // 检查下一页是否在总页数范围内
      setCurrentPage(nextPage);
    }

  };

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) { // 检查上一页是否在总页数范围内
      setCurrentPage(prevPage);
      // searchVideo(prevPage);
    }

  };


  const handlePage = () => {
    setCurrentPage(1); // 重置页码为1
    searchVideo(1, selectedOption); // 重新搜索第一页的数据
  };
  return (
    <>
      <div className="overflow-auto h-full flex w-full min-h-screen flex-col items-center justify-between">
        <header className="fixed top-0 h-[50px] left-0 w-full border-b bg-white flex z-50 justify-center items-center">
          <nav className="flex justify-between items-center w-full max-w-4xl px-4">图床</nav>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="px-4 py-2 mx-2 w-28  sm:w-28 md:w-20 lg:w-16 xl:w-16  2xl:w-20 bg-blue-500 text-white rounded ">登出</button>
        </header>
        <main className="mt-[60px] w-9/10 sm:w-9/10 md:w-9/10 lg:w-9/10 xl:w-3/5 2xl:w-full">
          <Table data={listData} />
          <div className="pagination mt-5 mb-5 ">
            {
              <>
                <button className='transition ease-in-out delay-150 bg-blue-500  hover:scale-110 hover:bg-indigo-500 duration-300p-2 p-2 rounded-lg mr-5' onClick={handlePrevPage} disabled={currentPage === 1}>
                  上一页
                </button>
                <span>第 {`${currentPage}/${searchTotal}`} 页</span>
                <button className='transition ease-in-out delay-150 bg-blue-500  hover:scale-110 hover:bg-indigo-500 duration-300 p-2 rounded-lg ml-5' onClick={handleNextPage}>
                  下一页</button>
              </>
            }
          </div>
        </main>
        <ToastContainer/>
      </div>
    </>

  )
}