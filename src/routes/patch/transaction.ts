import { Router } from "express";

import { db } from "../../lib/firebase";
import { today } from "../../lib/functions";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

const router = Router()

router.patch('/transaction/:q', async (req, res) => {
  const query = req.params.q;
  const { amount, description, category, date }: {
    amount?: number,
    description?: string,
    category?: string,
    date?: string
  } = req.body

  try {
    
    var preUpdate = {}
    console.log(query)
    const userRef = doc(db, 'data', query);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(data)
      preUpdate = {
        amount:      !amount      || amount      == null ? data.amount : amount,
        category:    !category    || category    == ""   ? data.category : category,
        date:        !date        || date        == ""   ? data.date : date,
        description: !description || description == ""   ? data.description : description,
        updated_at:  today()
      }
    } else {
      console.log("No such document!");
    }

    console.log(preUpdate)
    
    updateDoc(userRef, preUpdate)
    res.json({
      status: "success",
      message: "Data updated successfully",
      data: preUpdate
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Failed to update data",
      error
    })
  }
})

export default router