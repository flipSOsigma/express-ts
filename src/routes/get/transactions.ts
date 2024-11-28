import { Router } from "express";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../lib/firebase";
const router = Router()

router.get('/transaction/uid/:q', async (req, res) => {
  const q = req.params.q;
  const getData = async () => {   
    const data = await getDoc(doc(db, 'data', q));
    return data.data()
  }
  res.json({
    status: "success",
    message: "Data fetched successfully",
    data: await getData()
  })
})

export default router
