import { Router } from "express";
import { and, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { today } from "../../lib/functions";
const router = Router()

router.get('/transaction/:q', async (req, res) => {
  const uid = req.params.q

  const bigData: any = []
  const getData = async () => { 
    const data = await getDocs(query(collection(db, 'data'), where("uid", "==", uid), orderBy("detail.hour", "desc"), orderBy("detail.minute", "desc")));
    for(let i = 0; i <= 2; i++) {
      
      const listData: any = []
      data.forEach((item) => {
        const eachRawData = item.data()
        if(eachRawData.detail.day == parseInt(today().split('-')[2]) - i && eachRawData.detail.month == parseInt(today().split('-')[1]) && eachRawData.detail.year == parseInt(today().split('-')[0])) {
          const eachData = {
            id: item.id,
            icon: "🏥", 
            category: eachRawData.category,
            description: eachRawData.description,
            time: eachRawData.detail.hour + ":" + eachRawData.detail.minute,
            amount: eachRawData.amount,
            color: "hm"
          }
          listData.push(eachData)
        }
      })
      const eachDate = {
        id: i + 1,
        date: parseInt(today().split('-')[2]) - i + "/" + parseInt(today().split('-')[1]) + "/" + parseInt(today().split('-')[0]),
        data: listData
      }
      bigData.push(eachDate)
    }
    return bigData
  }
  res.json({
    status: "success",
    message: "Data fetched successfully",
    data: await getData()
  })
})

export default router
