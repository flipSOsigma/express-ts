import { Router } from "express";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { makeDetailedDate, today } from "../../lib/functions";
const router = Router();

router.post('/transaction', async (req, res) => {
  const { uid, amount, description, category, date }: 
        { uid: string,
          amount: number,
          description: string,
          category: string,
          date: string
          created_at: string
        } = req.body

  const data = {
    uid,
    amount,
    description,
    category,
    date,
    created_at: today(),
    updated_at: today(),
    detail: makeDetailedDate(date),
  }
  console.log(data)

  try {
    const docRef = await addDoc(collection(db, 'data'), data)
    const docData = { id: docRef.id, ...data }
    res.json({
      status: "success",
      message: "Data fetched successfully",
      data: data,
      docRef: docData
    })
  } catch( error ) {
    res.json({ 
      status: "error",
      message: error,
    })
  }
})

export default router